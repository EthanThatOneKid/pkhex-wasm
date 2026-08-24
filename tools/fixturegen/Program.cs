using PKHeX.Core;
using PKHexWasm;
using PKHexWasm.TestSupport;

// Materializes the shared blank-fixture factory (tests/PKHexWasm.TestSupport)
// into real files for the playwright E2E suite. Spec testing strategy: no
// fixture binaries are committed - the E2E setup regenerates them into a
// gitignored directory on every run, so the factory stays the single source.
//
// Self-verifying: each emitted fixture is re-parsed through PKHexApi.Load and
// must expose exactly one seeded box mon before it counts as written.

var outDir = args.Length > 0 ? args[0] : Path.Combine("artifacts", "test-fixtures");
Directory.CreateDirectory(outDir);

PKHexApi.Initialize();

var fixtures = new List<object>();
foreach (var context in TestSaves.LoadableContexts)
{
    var bytes = TestSaves.WithBoxMon(context);
    var file = $"blank-{context}.bin";
    var path = Path.Combine(outDir, file);

    // Verify-before-write: the bytes must re-recognize through the public API
    // and read back as the seeded mon, or the recipe regressed upstream.
    var game = PKHexApi.Load(bytes);
    var mons = PKHexApi.GameBoxMonHandles(game, 0);
    if (mons.Length != 1 || PKHexApi.MonSpecies(mons[0]) != TestSaves.Species)
    {
        Console.Error.WriteLine($"fixture {context}: reload does not surface the seeded mon");
        return 1;
    }
    var readOnly = TestSaves.ReadOnlyLoadableContexts.ToHashSet();
    var tier = readOnly.Contains(context) ? "read-only" : "edit";

    File.WriteAllBytes(path, bytes);
    fixtures.Add(new
    {
        file,
        generation = context.ToString(),
        tier,
        size = bytes.Length,
    });
    Console.WriteLine($"{file}  ({bytes.Length} bytes, {tier} tier)");
}

var manifestPath = Path.Combine(outDir, "manifest.json");
File.WriteAllText(manifestPath, System.Text.Json.JsonSerializer.Serialize(new { fixtures }));
Console.WriteLine($"manifest -> {manifestPath}");
return 0;
