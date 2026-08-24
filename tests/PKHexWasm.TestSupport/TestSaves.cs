using System.Buffers.Binary;
using PKHeX.Core;

namespace PKHexWasm.TestSupport;

/// <summary>
/// Shared blank-fixture factory (spec testing strategy: no real save binaries
/// are committed; blanks are generated per <see cref="EntityContext"/>).
///
/// Consumers: the xUnit logic suite, and tools/fixturegen which materializes
/// the same fixtures for the playwright E2E suite into a gitignored directory.
///
/// Encodes the per-format recipes discovered by the #22 constructibility probe:
///
/// - Gen 1-2 recognition requires both box and party lists seeded.
/// - Gen 6/7 and LGPE blanks lack the console-stamped footer magic; the
///   factory stamps what a console-written save would carry so exported
///   bytes re-recognize through SaveUtil.
/// - LGPE party lists reject direct seeding; box seeding suffices.
/// - Swish formats (SwSh/PLA/SV/Z-A) write valid bytes but their blank block
///   layout matches no retail size, so SaveUtil cannot re-recognize them;
///   Gen 3/4 blanks cannot Write() at all. Neither is loadable via the API
///   with blank factories - covered by classification tests instead.
/// </summary>
public static class TestSaves
{
    public const string Trainer = "TEST";

    /// <summary>The one species every fixture seeds (national dex id).</summary>
    public const ushort Species = 25; // Pikachu

    /// <summary>The level every fixture seeds.</summary>
    public const byte Level = 5;

    /// <summary>Contexts whose blanks load through <see cref="PKHexApi.Load"/>.</summary>
    public static readonly EntityContext[] LoadableContexts =
    [
        EntityContext.Gen1,
        EntityContext.Gen2,
        EntityContext.Gen5,
        EntityContext.Gen6,
        EntityContext.Gen7,
        EntityContext.Gen7b,
        EntityContext.Gen8b,
    ];

    /// <summary>Read-only-tier contexts that load through the public API.</summary>
    public static readonly EntityContext[] ReadOnlyLoadableContexts =
    [
        EntityContext.Gen1,
        EntityContext.Gen2,
        EntityContext.Gen7b,
    ];

    /// <summary>Loadable edit-tier contexts (mutators apply and persist).</summary>
    public static IEnumerable<EntityContext> EditTierContexts =>
        LoadableContexts.Except(ReadOnlyLoadableContexts);

    /// <summary>A blank save of <paramref name="context"/> with one Pikachu (<see cref="Level"/>) in box 0.</summary>
    public static byte[] WithBoxMon(EntityContext context, ushort species = Species, byte level = Level)
    {
        var sav = BlankSaveFile.Get(context, Trainer);
        var pk = sav.BlankPKM;
        sav.ApplyTo(pk);
        pk.Species = species;
        pk.CurrentLevel = level;
        sav.SetBoxSlotAtIndex(pk, 0);
        if (context is EntityContext.Gen1 or EntityContext.Gen2)
        {
            sav.SetPartySlotAtIndex(pk, 0);
        }

        var bytes = sav.Write().ToArray();
        StampConsoleFooters(context, bytes);
        return bytes;
    }

    private static void StampConsoleFooters(EntityContext context, byte[] bytes)
    {
        switch (context)
        {
            case EntityContext.Gen6 or EntityContext.Gen7:
                BinaryPrimitives.WriteUInt32LittleEndian(bytes.AsSpan(^0x1F0), FooterBEEF);
                break;
            case EntityContext.Gen7b:
                const int activeLen = 0xB8800;
                BinaryPrimitives.WriteUInt32LittleEndian(bytes.AsSpan(activeLen - 0x1F0), FooterBEEF);
                BinaryPrimitives.WriteUInt16LittleEndian(bytes.AsSpan(activeLen - 0x200 + 0xB0), LgpeBlockMarker);
                break;
        }
    }

    private const uint FooterBEEF = 0x42454546;
    private const ushort LgpeBlockMarker = 0x13;
}
