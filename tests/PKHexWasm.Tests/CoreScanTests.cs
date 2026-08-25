using System.Text.Json;
using PKHexWasm.Reflector;
using Xunit;

namespace PKHexWasm.Tests;

/// <summary>
/// Seam tests for the v2 Core scanner (ADR 0001 raw-facts contract).
/// Runs against the real vendored PKHeX.Core assembly produced by the
/// solution build; locates it relative to the repo root like the reflector.
/// </summary>
public static class CoreScanTestHarness
{
    public static readonly Lazy<(CoreMeta Meta, string DllPath)> Scanned = new(() =>
    {
        var dll = Locate("PKHeX.Core.dll");
        // Prefer the stable committed docs file; fall back to whatever sits
        // beside the assembly.
        var docs = CoreScan.DocsXmlPath(CoreScan.FindRepoRoot());
        var xml = File.Exists(docs) ? docs
            : File.Exists(Path.ChangeExtension(dll, ".xml")) ? Path.ChangeExtension(dll, ".xml")
            : null;
        var meta = CoreScan.Scan([dll], xml, sourceCommit: "test-commit");
        return (meta, dll);
    });

    public static string Locate(string fileName)
    {
        var root = CoreScan.FindRepoRoot();
        var coreBin = Path.Combine(CoreScan.CoreProjectDirectory(root), "bin");
        foreach (var config in new[] { "Release", "Debug" })
        {
            var candidate = Path.Combine(coreBin, config, "net10.0", fileName);
            if (File.Exists(candidate))
            {
                return candidate;
            }
        }
        throw new FileNotFoundException($"built {fileName} not found under {coreBin} — build the solution first");
    }
}

public sealed class CoreScanTests
{
    private static CoreMeta Meta => CoreScanTestHarness.Scanned.Value.Meta;

    private const string CoreNs = "PKHeX.Core";

    [Fact]
    public void Schema_version_is_two()
    {
        Assert.Equal(2, Meta.SchemaVersion);
    }

    [Fact]
    public void All_eighteen_concrete_format_classes_are_projected()
    {
        string[] expected =
        [
            "PK1", "PK2", "SK2",
            "PK3", "CK3", "XK3",
            "PK4", "BK4", "RK4",
            "PK5",
            "PK6", "PK7", "PB7",
            "PK8", "PB8", "PA8",
            "PK9", "PA9",
        ];
        foreach (var name in expected)
        {
            Assert.True(Meta.Classes.ContainsKey($"{CoreNs}.{name}"), $"missing concrete format class {name}");
        }
    }

    [Fact]
    public void Intermediate_bases_are_projected_with_full_chains()
    {
        Assert.Equal([$"{CoreNs}.PKM"], Meta.Classes[$"{CoreNs}.PK9"].BaseChain);
        Assert.Equal(
            [$"{CoreNs}.PKM", $"{CoreNs}.G8PKM"],
            Meta.Classes[$"{CoreNs}.PK8"].BaseChain);
        Assert.Equal(
            [$"{CoreNs}.PKM", $"{CoreNs}.GBPKM", $"{CoreNs}.GBPKML"],
            Meta.Classes[$"{CoreNs}.PK1"].BaseChain);
    }

    [Fact]
    public void Base_pkm_members_carry_contract_facts()
    {
        var pkm = Meta.Classes[$"{CoreNs}.PKM"];
        // overloads are legitimate raw facts; first declaration wins for lookups
        var byName = pkm.Members.GroupBy(m => m.CsName).ToDictionary(g => g.Key, g => g.First());

        var shiny = Assert.Contains(nameof(global::PKHeX.Core.PKM.IsShiny), byName);
        Assert.Equal("get", shiny.Access);
        Assert.True(shiny.Computed, "IsShiny is derived (TSV==PSV) and must be marked computed");

        var heldItem = Assert.Contains(nameof(global::PKHeX.Core.PKM.HeldItem), byName);
        Assert.Equal("getSet", heldItem.Access);
        Assert.False(heldItem.Computed);

        // ADR 0001 names CurrentLevel as computed: the getter derives from EXP
        // and the setter re-derives it — mutation must route through mutators.
        Assert.True(byName["CurrentLevel"].Computed);
        // Nature is format-conditional (PID-derived pre-Gen6, stored after) and
        // deliberately NOT a scan-time computed fact.
        Assert.False(byName["Nature"].Computed);

        Assert.Equal("DateOnly?", byName["MetDate"].CsType);

        // u64 fields live where Core declares them: Tracker on the Gen8 base,
        // JunkData on the Gen5 format (surface inventory §1/§2)
        Assert.Equal("ulong", Meta.Classes[$"{CoreNs}.G8PKM"].Members.Single(m => m.CsName == "Tracker").CsType);
        Assert.Equal("ulong", Meta.Classes[$"{CoreNs}.PK5"].Members.Single(m => m.CsName == "JunkData").CsType);
    }

    [Fact]
    public void Format_specific_members_surface_on_their_own_class()
    {
        Assert.Contains(Meta.Classes[$"{CoreNs}.PK9"].Members, m => m.CsName == "TeraTypeOverride" && m.Access == "getSet");
        Assert.Contains(Meta.Classes[$"{CoreNs}.PK9"].Members, m => m.CsName == "ObedienceLevel");

        Assert.Contains(Meta.Classes[$"{CoreNs}.PA8"].Members, m => m.CsName == "IsAlpha");
        Assert.Contains(Meta.Classes[$"{CoreNs}.PA8"].Members, m => m.CsName == "GV_HP");

        Assert.Contains(Meta.Classes[$"{CoreNs}.PK7"].Members, m => m.CsName == "HT_HP");
        Assert.Contains(Meta.Classes[$"{CoreNs}.PB7"].Members, m => m.CsName == "AV_HP");
    }

    [Fact]
    public void Savefile_subsystem_members_are_declared_on_their_owning_class()
    {
        var saveFile = Meta.Classes[$"{CoreNs}.SaveFile"];
        var money = saveFile.Members.Single(m => m.CsName == "Money");
        Assert.Equal("getSet", money.Access);
        Assert.Equal("uint", money.CsType);
        Assert.Contains(saveFile.Members, m => m.CsName == "BoxCount");

        Assert.Contains(Meta.Classes[$"{CoreNs}.PlayerBag"].Members, m => m.CsName == "Pouches");
        Assert.Contains(Meta.Classes[$"{CoreNs}.InventoryPouch"].Members, m => m.CsName == "Items");

        Assert.Contains(Meta.Classes[$"{CoreNs}.ZukanBase`1"].Members, m => m.CsName == "SeenCount" && m.Computed);
    }

    [Fact]
    public void Enums_referenced_by_members_are_captured()
    {
        foreach (var fqn in new[] { "PKHeX.Core.EntityContext", "PKHeX.Core.GameVersion", "PKHeX.Core.Nature", "PKHeX.Core.InventoryType" })
        {
            Assert.True(Meta.Enums.ContainsKey(fqn), $"missing enum {fqn}");
        }

        var inventoryType = Meta.Enums["PKHeX.Core.InventoryType"];
        Assert.Equal(16, inventoryType.Values.Length);
        Assert.Contains(inventoryType.Values, v => v.Name == "Items");
    }

    [Fact]
    public void Concrete_save_classes_are_projected()
    {
        Assert.True(Meta.Classes.ContainsKey($"{CoreNs}.SAV3"), "missing concrete save class SAV3");
        // Gen 9 splits per game rather than one SAV9 class
        Assert.True(Meta.Classes.ContainsKey($"{CoreNs}.SAV9SV"), "missing concrete save class SAV9SV");
        Assert.True(Meta.Classes.ContainsKey($"{CoreNs}.SAV9ZA"), "missing concrete save class SAV9ZA");
    }

    [Fact]
    public void Doc_pipeline_flows_from_the_generated_xml()
    {
        var docsPath = CoreScan.DocsXmlPath(CoreScan.FindRepoRoot());
        if (!File.Exists(docsPath))
        {
            // The docs artifact is produced by `deno task reflect`; a fresh
            // checkout that never ran it legitimately has none. The pipeline
            // itself is exercised whenever reflect runs (determinism test
            // covers the same scan path).
            return;
        }
        // Upstream documents its surface sparsely; this asserts the XML→JSON
        // pipeline works at all, not full coverage.
        var documented = Meta.Classes[$"{CoreNs}.PKM"].Members.Count(m => m.Docs is not null);
        Assert.True(documented >= 15, $"expected ≥15 documented PKM members, found {documented}");
    }

    [Fact]
    public void Members_are_deterministically_ordered_and_self_consistent()
    {
        foreach (var (fqn, info) in Meta.Classes)
        {
            Assert.Equal(fqn, info.Name);
            for (var i = 1; i < info.Members.Length; i++)
            {
                var cmp = string.CompareOrdinal(info.Members[i - 1].CsName, info.Members[i].CsName);
                Assert.True(cmp <= 0, $"members of {fqn} not sorted by name at '{info.Members[i].CsName}'");
                Assert.Equal(info.Name, info.Members[i].DeclaredBy);
            }
        }
    }

    [Fact]
    public void Serialization_is_byte_stable_across_scans()
    {
        var dll = CoreScanTestHarness.Locate("PKHeX.Core.dll");
        var docsPath = CoreScan.DocsXmlPath(CoreScan.FindRepoRoot());
        var xml = File.Exists(docsPath) ? docsPath : null;

        var options = new JsonSerializerOptions { WriteIndented = true };
        var first = JsonSerializer.Serialize(
            CoreScan.Scan([dll], xml, sourceCommit: "test-commit"), options);
        var second = JsonSerializer.Serialize(
            CoreScan.Scan([dll], xml, sourceCommit: "test-commit"), options);
        Assert.Equal(first, second);
    }
}
