using System.Text.Json;
using System.Text.Json.Serialization;
using PKHeX.Core;

// Build-time Lookup-table generator (ticket #23; sources per the #19 survey).
// Emits JSON for the universal species/natures/moves tables and per-context
// item tables into src/ts/gen/data/, hydrated by initPKHex() at runtime.
//
//   dotnet run --project tools/tablegen -c Release
//
// Deterministic output: fixed context chains, no timestamps, stable ordering.

var outDir = Path.Combine(Directory.GetCurrentDirectory(), "src", "ts", "gen", "data");
Directory.CreateDirectory(outDir);

var strings = GameInfo.Strings;

WriteSpecies(strings, outDir);
WriteNatures(strings, outDir);
WriteMoves(strings, outDir);
WriteItems(strings, outDir);

Console.WriteLine($"tablegen -> {outDir}");

// ---- species ------------------------------------------------------------

static void WriteSpecies(GameStrings strings, string outDir)
{
    // Newest-available chain: the first personal entry with a real stat
    // spread wins. Undefined species read as all-zero rows, so HP>0 is the
    // existence test - no per-game max-id tables needed.
    (string table, Func<ushort, IPersonalInfo?> lookup)[] chain =
    [
        ("ZA", id => PersonalTable.ZA.GetFormEntry(id, 0)),
        ("SV", id => PersonalTable.SV.GetFormEntry(id, 0)),
        ("SWSH", id => PersonalTable.SWSH.GetFormEntry(id, 0)),
        ("BDSP", id => PersonalTable.BDSP.GetFormEntry(id, 0)),
        ("GG", id => PersonalTable.GG.GetFormEntry(id, 0)),
        ("USUM", id => PersonalTable.USUM.GetFormEntry(id, 0)),
        ("AO", id => PersonalTable.AO.GetFormEntry(id, 0)),
        ("B2W2", id => PersonalTable.B2W2.GetFormEntry(id, 0)),
        ("HGSS", id => PersonalTable.HGSS.GetFormEntry(id, 0)),
        ("E", id => PersonalTable.E.GetFormEntry(id, 0)),
        ("RS", id => PersonalTable.RS.GetFormEntry(id, 0)),
    ];

    var entries = new List<object>();
    for (ushort id = 1; id < strings.specieslist.Length; id++)
    {
        var name = strings.specieslist[id];
        if (string.IsNullOrEmpty(name))
            continue;

        foreach (var (_, lookup) in chain)
        {
            var info = lookup(id);
            if (info is null || info.HP == 0)
                continue;

            entries.Add(new SpeciesEntry(
                Id: id,
                Name: name,
                NationalDex: id,
                Types: TypeNames(strings, info.Type1, info.Type2),
                BaseStats: new StatBlockDto(info.HP, info.ATK, info.DEF, info.SPA, info.SPD, info.SPE)));
            break;
        }
    }

    Emit(Path.Combine(outDir, "species.json"), entries);
}

static string[] TypeNames(GameStrings strings, byte type1, byte type2)
{
    var names = new List<string>(2);
    if (type1 != 0 && (int)type1 < strings.types.Length)
        names.Add(strings.types[type1]);
    if (type2 != type1 && type2 != 0 && (int)type2 < strings.types.Length)
        names.Add(strings.types[type2]);
    return [.. names];
}

// ---- natures ------------------------------------------------------------

static void WriteNatures(GameStrings strings, string outDir)
{
    var entries = new List<object>();
    for (var id = 0; id < strings.natures.Length && id < 25; id++)
    {
        var name = strings.natures[id];
        if (string.IsNullOrEmpty(name))
            continue;
        var (atk, def, spe, spa, spd) = GetNatureAmps(id);
        entries.Add(new NatureEntry(
            Id: id,
            Name: name,
            StatMultipliers: new Multipliers(Amp(atk), Amp(def), Amp(spe), Amp(spa), Amp(spd))));
    }
    Emit(Path.Combine(outDir, "natures.json"), entries);
}

static decimal Amp(int amp) => amp switch { > 0 => 1.1m, < 0 => 0.9m, _ => 1.0m };

static (int atk, int def, int spe, int spa, int spd) GetNatureAmps(int nature)
{
    // Core's nature modification pair indexes the five amplified stats in
    // internal order [ATK, DEF, SPE, SPA, SPD] (up = n/5, dn = n%5).
    var (up, dn) = ((Nature)nature).GetNatureModification();
    int At(int statIndex) => statIndex == up ? 1 : statIndex == dn ? -1 : 0;
    return (At(0), At(1), At(2), At(3), At(4));
}

// ---- moves --------------------------------------------------------------

static void WriteMoves(GameStrings strings, string outDir)
{
    const EntityContext reference = EntityContext.Gen9; // newest complete mainline tables
    var pp = MoveInfo.GetPPTable(reference).ToArray();
    var types = MoveInfo.GetTypeTable(reference).ToArray();

    var entries = new List<object>();
    for (ushort id = 1; id < strings.movelist.Length; id++)
    {
        var name = strings.movelist[id];
        if (string.IsNullOrEmpty(name) || id >= pp.Length || id >= types.Length)
            continue;
        entries.Add(new MoveEntry(Id: id, Name: name, Type: strings.types[types[id]], Pp: pp[id]));
    }
    Emit(Path.Combine(outDir, "moves.json"), entries);
}

// ---- items --------------------------------------------------------------

static void WriteItems(GameStrings strings, string outDir)
{
    EntityContext[] itemContexts =
    [
        EntityContext.Gen1,
        EntityContext.Gen2,
        EntityContext.Gen3,
        EntityContext.Gen4,
        EntityContext.Gen5,
        EntityContext.Gen6,
        EntityContext.Gen7,
        EntityContext.Gen7b,
        EntityContext.Gen8,
        EntityContext.Gen8a,
        EntityContext.Gen8b,
        EntityContext.Gen9,
        EntityContext.Gen9a,
    ];
    foreach (var context in itemContexts)
    {
        var names = strings.GetItemStrings(context);
        var legalIds = CollectLegalItems(context);
        var entries = new List<object>();
        for (ushort id = 0; id < names.Length; id++)
        {
            if (!legalIds.Contains(id) || string.IsNullOrEmpty(names[id]))
                continue;
            entries.Add(new ItemEntry(Id: id, Name: names[id]));
        }
        Emit(Path.Combine(outDir, $"items-{context}.json"), entries);
    }
}

/// <summary>Unions every pouch the family's storages can hold (per the #19 survey).</summary>
static HashSet<ushort> CollectLegalItems(EntityContext context)
{
    IItemStorage[] storages = context switch
    {
        EntityContext.Gen1 => [ItemStorage1.Instance],
        EntityContext.Gen2 => [ItemStorage2.InstanceGS, ItemStorage2.InstanceC],
        EntityContext.Gen3 => [ItemStorage3RS.Instance, ItemStorage3E.Instance, ItemStorage3FRLG.Instance],
        EntityContext.Gen4 => [ItemStorage4DP.Instance, ItemStorage4Pt.Instance, ItemStorage4HGSS.Instance],
        EntityContext.Gen5 => [ItemStorage5BW.Instance, ItemStorage5B2W2.Instance],
        EntityContext.Gen6 => [ItemStorage6XY.Instance, ItemStorage6AO.Instance],
        EntityContext.Gen7 => [ItemStorage7SM.Instance, ItemStorage7USUM.Instance],
        EntityContext.Gen7b => [ItemStorage7GG.Instance],
        EntityContext.Gen8 => [ItemStorage8SWSH.Instance],
        EntityContext.Gen8a => [ItemStorage8LA.Instance],
        EntityContext.Gen8b => [ItemStorage8BDSP.Instance],
        EntityContext.Gen9 => [ItemStorage9SV.Instance],
        EntityContext.Gen9a => [ItemStorage9ZA.Instance],
        _ => [],
    };

    var ids = new HashSet<ushort>();
    foreach (var storage in storages)
    {
        foreach (InventoryType pouch in Enum.GetValues<InventoryType>())
        {
            // Some storages throw for unsupported pouch kinds rather than
            // returning empty - treat those as "no items here".
            ReadOnlySpan<ushort> items;
            try
            {
                items = storage.GetItems(pouch);
            }
            catch (ArgumentOutOfRangeException)
            {
                continue;
            }
            ids.UnionWith(items.ToArray());
        }
    }
    return ids;
}

// ---- plumbing -----------------------------------------------------------

static void Emit<T>(string path, IEnumerable<T> entries)
{
    var options = new JsonSerializerOptions
    {
        WriteIndented = false,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        IncludeFields = true,
    };
    File.WriteAllText(path, JsonSerializer.Serialize(entries, options));
    Console.WriteLine($"{Path.GetFileName(path)}: {entries.Count()} entries");
}

internal sealed record SpeciesEntry(
    ushort Id, string Name, ushort NationalDex, string[] Types, [property: JsonPropertyName("baseStats")] StatBlockDto BaseStats);

[JsonSerializable(typeof(StatBlockDto))]
internal sealed record StatBlockDto(
    [property: JsonPropertyName("health")] int Hp,
    [property: JsonPropertyName("attack")] int Atk,
    [property: JsonPropertyName("defense")] int Def,
    [property: JsonPropertyName("specialAttack")] int Spa,
    [property: JsonPropertyName("specialDefense")] int Spd,
    [property: JsonPropertyName("speed")] int Spe);

internal sealed record NatureEntry(int Id, string Name, Multipliers StatMultipliers);

internal sealed record Multipliers(decimal Attack, decimal Defense, decimal Speed, decimal SpecialAttack, decimal SpecialDefense);

internal sealed record MoveEntry(ushort Id, string Name, string Type, byte Pp);

internal sealed record ItemEntry(ushort Id, string Name);
