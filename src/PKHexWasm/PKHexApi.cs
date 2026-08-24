using System.Collections.Concurrent;
using System.Runtime.InteropServices.JavaScript;
using PKHeX.Core;

namespace PKHexWasm;

/// <summary>
/// Synchronous entry points of the pkhex-wasm Binding, exposed to JavaScript
/// via <c>[JSExport]</c>. .NET JS interop exposes static methods only, so
/// entity/game Handles are represented as integer handle ids into a wasm-side
/// registry; the TypeScript layer wraps them behind the locked Handle API.
///
/// Contracts follow docs/spec/v1-api.md: defensive copy-in on load, fresh
/// arrays out on export, snapshot accessors materializing write-through
/// handles. The registry persists for the process lifetime - bounded by how
/// many saves/entities a consumer materializes (documented v1 trade-off).
/// </summary>
public static partial class PKHexApi
{
    private static int _nextHandle;
    private static readonly ConcurrentDictionary<int, GameEntry> Games = new();
    private static readonly ConcurrentDictionary<int, MonEntry> Mons = new();

    private sealed record GameEntry(SaveFile Sav);
    private sealed record MonEntry(SaveFile Sav, PKM Pk, int Box, int Slot) // Box = -1 - party
    {
        public bool IsParty => Box < 0;
    }

    // ---- lifecycle ---------------------------------------------------------

    private static int _cryptoRegistered;

    /// <summary>
    /// Registers the Managed crypto providers onto RuntimeCryptographyProvider
    /// (spec bootstrap step 2). Must run before any save can be parsed so the
    /// BDSP/Gen 7/HOME seams work transparently the first time they are
    /// reached; idempotent, and never overrides an explicitly-set provider.
    /// </summary>
    [JSExport]
    public static string Initialize()
    {
        if (Interlocked.CompareExchange(ref _cryptoRegistered, 1, 0) == 0)
        {
            RuntimeCryptographyProvider.Aes = new ManagedAes();
            RuntimeCryptographyProvider.Md5 = new ManagedMd5();
        }
        return GetApiVersion();
    }

    /// <summary>API version stamp (semver contract per the API-surface decision).</summary>
    [JSExport]
    public static string GetApiVersion() => "v0-binding";

    /// <summary>
    /// Parse one complete logical save buffer into a game handle.
    /// Defensive copy at the boundary; callers retain ownership of their bytes.
    /// </summary>
    [JSExport]
    public static int Load(byte[] saveBytes)
    {
        ArgumentNullException.ThrowIfNull(saveBytes);
        var copy = new byte[saveBytes.Length];
        Array.Copy(saveBytes, copy, saveBytes.Length);

        SaveFile? sav;
        try
        {
            sav = SaveUtil.GetSaveFile(copy);
        }
        catch (Exception ex)
        {
            throw new InvalidDataException("Unrecognized save file format.", ex);
        }
        if (sav is null)
        {
            throw new InvalidDataException("Unrecognized save file format.");
        }

        var handle = NextHandle();
        Games[handle] = new GameEntry(sav);
        return handle;
    }

    /// <summary>Serialize a save back to a fresh byte array; nothing aliases prior exports.</summary>
    [JSExport]
    public static byte[] SaveBytes(int game) =>
        RequireGame(game).Write().ToArray();

    /// <summary>Release a game handle and its entity handles. Optional - dropping all references is also fine in v1.</summary>
    [JSExport]
    public static void Close(int game)
    {
        if (Games.TryRemove(game, out var entry))
        {
            foreach (var (monHandle, mon) in Mons)
            {
                if (ReferenceEquals(mon.Sav, entry.Sav))
                {
                    Mons.TryRemove(monHandle, out _);
                }
            }
        }
    }

    /// <summary>Development helper (demo page + fixtures): blank Gen 1 save with a level-5 Pikachu in box 1 + party slot 1.</summary>
    [JSExport]
    public static byte[] GenerateDemoSave(string trainerName)
    {
        var sav = BlankSaveFile.Get(EntityContext.Gen1, trainerName);

        var pk = sav.BlankPKM;
        sav.ApplyTo(pk);
        pk.Species = 25; // Pikachu
        pk.CurrentLevel = 5;
        pk.SetNickname("Pikachu");

        sav.SetBoxSlotAtIndex(pk, 0);
        sav.SetPartySlotAtIndex(pk, 0);
        return sav.Write().ToArray();
    }

    // ---- game reads --------------------------------------------------------

    [JSExport]
    public static string GameTrainerName(int game) => RequireGame(game).OT ?? string.Empty;

    [JSExport]
    public static int GameTrainerId(int game) => (int)RequireGame(game).TID16;

    [JSExport]
    public static int GameTrainerSecretId(int game) => (int)RequireGame(game).SID16;

    [JSExport]
    public static string GameTrainerGender(int game) => FormatGender(RequireGame(game).Gender);

    [JSExport]
    public static int GameBoxCount(int game) => RequireGame(game).BoxCount;

    [JSExport]
    public static string GameGeneration(int game) => RequireGame(game).Context.ToString();

    /// <summary>Money held by the trainer, when the format tracks it.</summary>
    [JSExport]
    public static int GameMoney(int game) => (int)RequireGame(game).Money;

    /// <summary>Snapshot of one storage box as entity handles; empty slots are absent.</summary>
    [JSExport]
    public static int[] GameBoxMonHandles(int game, int boxIndex)
    {
        var sav = RequireGame(game);
        if ((uint)boxIndex >= (uint)sav.BoxCount)
        {
            throw new ArgumentOutOfRangeException(nameof(boxIndex), boxIndex, $"box index outside [0, {sav.BoxCount})");
        }

        var handles = new List<int>(sav.BoxSlotCount);
        for (var slot = 0; slot < sav.BoxSlotCount; slot++)
        {
            var pk = sav.GetBoxSlotAtIndex(boxIndex, slot);
            if (pk.Species != 0)
            {
                handles.Add(RegisterMon(sav, pk, boxIndex, slot));
            }
        }
        return [.. handles];
    }

    /// <summary>Snapshot of the party as entity handles; empty slots are absent.</summary>
    [JSExport]
    public static int[] GamePartyMonHandles(int game)
    {
        var sav = RequireGame(game);
        var handles = new List<int>(sav.PartyCount);
        for (var slot = 0; slot < sav.PartyCount; slot++)
        {
            var pk = sav.GetPartySlotAtIndex(slot);
            if (pk.Species != 0)
            {
                handles.Add(RegisterMon(sav, pk, -1, slot));
            }
        }
        return [.. handles];
    }

    // ---- pokemon reads -----------------------------------------------------

    [JSExport]
    public static int MonSpecies(int mon) => RequireMon(mon).Pk.Species;

    [JSExport]
    public static string MonNickname(int mon) => RequireMon(mon).Pk.Nickname;

    [JSExport]
    public static int MonLevel(int mon) => RequireMon(mon).Pk.CurrentLevel;

    [JSExport]
    public static bool MonIsShiny(int mon) => RequireMon(mon).Pk.IsShiny;

    [JSExport]
    public static string MonGender(int mon) => FormatGender(RequireMon(mon).Pk.Gender);

    /// <summary>Nature id, or -1 where the concept does not exist (Gen 1"2).</summary>
    [JSExport]
    public static int MonNatureId(int mon)
    {
        var pk = RequireMon(mon).Pk;
        return pk.Context <= EntityContext.Gen2 ? -1 : (int)pk.Nature;
    }

    [JSExport]
    public static string MonOwnerName(int mon) => RequireMon(mon).Pk.OriginalTrainerName ?? string.Empty;

    [JSExport]
    public static int MonOwnerId(int mon) => (int)RequireMon(mon).Pk.TID16;

    [JSExport]
    public static int MonOwnerSecretId(int mon) => (int)RequireMon(mon).Pk.SID16;

    [JSExport]
    public static string MonOwnerGender(int mon) => FormatGender(RequireMon(mon).Pk.OriginalTrainerGender);

    /// <summary>Individual values as [HP, Atk, Def, Spe, SpA, SpD] - Core's own order.</summary>
    [JSExport]
    public static int[] MonIVs(int mon)
    {
        var ivs = new int[6];
        RequireMon(mon).Pk.GetIVs(ivs);
        return ivs;
    }

    /// <summary>Effort values as [HP, Atk, Def, Spe, SpA, SpD] - Core's own order.</summary>
    [JSExport]
    public static int[] MonEVs(int mon)
    {
        var evs = new int[6];
        RequireMon(mon).Pk.GetEVs(evs);
        return evs;
    }

    /// <summary>Computed battle stats as [HP, Atk, Def, Spe, SpA, SpD].</summary>
    [JSExport]
    public static int[] MonStats(int mon) => (int[])RequireMon(mon).Pk.Stats.Clone();

    /// <summary>Four move slots flattened as [moveId, pp] - 4; empty slots carry id 0.</summary>
    [JSExport]
    public static int[] MonMoveSlots(int mon)
    {
        var pk = RequireMon(mon).Pk;
        return
        [
            pk.Move1, pk.Move1_PP,
            pk.Move2, pk.Move2_PP,
            pk.Move3, pk.Move3_PP,
            pk.Move4, pk.Move4_PP,
        ];
    }

    // ---- pokemon mutators (write-through) ----------------------------------

    [JSExport]
    public static void MonSetNickname(int mon, string nickname)
    {
        ArgumentNullException.ThrowIfNull(nickname);
        var entry = RequireMon(mon);
        RequireEditable(entry, "setNickname");
        var maxNick = Legal.GetMaxLengthNickname(entry.Pk.Context.Generation, (LanguageID)entry.Pk.Language);
        if (nickname.Length > maxNick)
        {
            throw new ArgumentOutOfRangeException(nameof(nickname), nickname,
                ErrorTags.Compose(ErrorTags.Range,
                    $"nickname exceeds this generation's {maxNick} character limit"));
        }
        if (!CanStoreLosslessly(entry.Pk, nickname))
        {
            throw new ArgumentOutOfRangeException(nameof(nickname), nickname,
                ErrorTags.Compose(ErrorTags.Range,
                    "nickname contains characters this generation cannot store"));
        }
        CommonEdits.SetNickname(entry.Pk, nickname);
        Flush(entry);
    }

    [JSExport]
    public static void MonSetLevel(int mon, int level)
    {
        var entry = RequireMon(mon);
        RequireEditable(entry, "setLevel");
        entry.Pk.CurrentLevel = (byte)level;
        Flush(entry);
    }

    [JSExport]
    public static void MonSetMoves(int mon, int[] moveIds)
    {
        ArgumentNullException.ThrowIfNull(moveIds);
        var entry = RequireMon(mon);
        RequireEditable(entry, "setMoves");
        if (moveIds.Length != 4)
        {
            throw new ArgumentException("exactly four move ids are required", nameof(moveIds));
        }
        var maxMove = entry.Pk.MaxMoveID;
        foreach (var id in moveIds)
        {
            if ((uint)id > maxMove) // 0 is the cleared-slot sentinel and stays legal
            {
                throw new ArgumentOutOfRangeException(nameof(moveIds), id,
                    ErrorTags.Compose(ErrorTags.Range,
                        $"move id {id} is unknown to this generation's movepool"));
            }
        }
        entry.Pk.Move1 = (ushort)moveIds[0];
        entry.Pk.Move2 = (ushort)moveIds[1];
        entry.Pk.Move3 = (ushort)moveIds[2];
        entry.Pk.Move4 = (ushort)moveIds[3];
        entry.Pk.HealPP();
        Flush(entry);
    }

    /// <summary>
    /// Mint-aware nature write (Facade Natures.ChangeAll semantics): sets both
    /// the displayed nature and stat alignment, since naïve writes silently
    /// no-op on Gen 8+ formats where stats derive through mints/stat-alignment.
    /// </summary>
    [JSExport]
    public static void MonSetNature(int mon, int natureId)
    {
        var entry = RequireMon(mon);
        if (entry.Pk.Context <= EntityContext.Gen2)
        {
            throw new UnsupportedOperationException("setNature", entry.Pk.Context.ToString());
        }
        RequireEditable(entry, "setNature");
        if (!Enum.IsDefined(typeof(Nature), (Nature)natureId))
        {
            throw new ArgumentOutOfRangeException(nameof(natureId), natureId,
                ErrorTags.Compose(ErrorTags.Range, $"unknown nature id {natureId}"));
        }

        var nature = (Nature)natureId;
        entry.Pk.Nature = nature;
        entry.Pk.StatAlignment = nature;
        Flush(entry);
    }

    [JSExport]
    public static void MonSetShiny(int mon, bool shiny)
    {
        var entry = RequireMon(mon);
        RequireEditable(entry, "setShiny"); // GB formats reject here; upstream unset path never reached
        if (shiny)
        {
            entry.Pk.SetShiny();
        }
        else
        {
            CommonEdits.SetUnshiny(entry.Pk);
        }
        Flush(entry);
    }

    /// <summary>Overwrite all six IV slots (Gen 1 caps at 15 upstream).</summary>
    [JSExport]
    public static void MonSetIVs(int mon, int[] ivs)
    {
        ArgumentNullException.ThrowIfNull(ivs);
        var entry = RequireMon(mon);
        RequireEditable(entry, "setIVs");
        if (ivs.Length != 6)
        {
            throw new ArgumentException("exactly six values are required", nameof(ivs));
        }
        entry.Pk.SetIVs((ReadOnlySpan<int>)ivs);
        Flush(entry);
    }

    /// <summary>Overwrite all six EV slots (caps follow the generation upstream).</summary>
    [JSExport]
    public static void MonSetEVs(int mon, int[] evs)
    {
        ArgumentNullException.ThrowIfNull(evs);
        var entry = RequireMon(mon);
        RequireEditable(entry, "setEVs");
        if (evs.Length != 6)
        {
            throw new ArgumentException("exactly six values are required", nameof(evs));
        }
        entry.Pk.SetEVs((ReadOnlySpan<int>)evs);
        Flush(entry);
    }

    // ---- plumbing ----------------------------------------------------------

    /// <summary>Tier guard: read-only formats reject every mutator before reaching Core.</summary>
    private static void RequireEditable(MonEntry entry, string operation)
    {
        if (entry.Pk.Context.Tier() == SupportTier.ReadOnly)
        {
            throw new UnsupportedTierException(operation, entry.Pk.Context.ToString());
        }
    }

    /// <summary>
    /// Charset guard: a value is storable only when the entity's own format
    /// codec round-trips it losslessly - upstream setters otherwise truncate
    /// or drop unmappable characters silently.
    /// </summary>
    private static bool CanStoreLosslessly(PKM pk, string value)
    {
        Span<byte> buffer = stackalloc byte[(value.Length + 4) * 2];
        buffer.Clear();
        try
        {
            pk.SetString(buffer, value, value.Length, StringConverterOption.None);
            return pk.GetString(buffer) == value;
        }
        catch
        {
            return false;
        }
    }

    private static SaveFile RequireGame(int game) =>
        Games.TryGetValue(game, out var entry)
            ? entry.Sav
            : throw new ArgumentOutOfRangeException(nameof(game), game, "unknown game handle");

    private static MonEntry RequireMon(int mon) =>
        Mons.TryGetValue(mon, out var entry)
            ? entry
            : throw new ArgumentOutOfRangeException(nameof(mon), mon, "unknown entity handle");

    private static int RegisterMon(SaveFile sav, PKM pk, int box, int slot)
    {
        var handle = NextHandle();
        Mons[handle] = new MonEntry(sav, pk, box, slot);
        return handle;
    }

    private static void Flush(MonEntry entry)
    {
        if (entry.IsParty)
        {
            entry.Sav.SetPartySlotAtIndex(entry.Pk, entry.Slot);
        }
        else
        {
            entry.Sav.SetBoxSlotAtIndex(entry.Pk, (entry.Box * entry.Sav.BoxSlotCount) + entry.Slot);
        }
    }

    private static int NextHandle() => Interlocked.Increment(ref _nextHandle);

    private static string FormatGender(byte gender) => gender switch { 1 => "female", 2 => "genderless", _ => "male" };
}
