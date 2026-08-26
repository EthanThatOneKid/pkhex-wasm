using System.Runtime.InteropServices.JavaScript;
using PKHexWasm;

namespace PKHexWasm.Wasm;

/// <summary>
/// Thin [JSExport] facade hosted by the app assembly (the shape the wasm
/// SDK reliably wires); every call forwards to the Binding implementation
/// in the PKHexWasm library.
/// </summary>
public static partial class PkHexExports
{
    [JSExport]
    public static string GetApiVersion() => PKHexApi.GetApiVersion();

    /// <summary>Registers Managed crypto onto the Core provider seam; call before any parse.</summary>
    [JSExport]
    public static string Initialize() => PKHexApi.Initialize();

    /// <summary>Parses one complete logical save buffer; defensive copy at the boundary.</summary>
    [JSExport]
    [JsThrows("SaveParseError", "when the bytes match no supported format")]
    public static int Load(byte[] saveBytes) => PKHexApi.Load(saveBytes);

    [JSExport]
    public static byte[] SaveBytes(int game) => PKHexApi.SaveBytes(game);

    [JSExport]
    public static void Close(int game) => PKHexApi.Close(game);

    [JSExport]
    public static byte[] GenerateDemoSave(string trainerName) => PKHexApi.GenerateDemoSave(trainerName);

    [JSExport]
    public static string GameTrainerName(int game) => PKHexApi.GameTrainerName(game);

    [JSExport]
    public static int GameTrainerId(int game) => PKHexApi.GameTrainerId(game);

    [JSExport]
    public static int GameTrainerSecretId(int game) => PKHexApi.GameTrainerSecretId(game);

    [JSExport]
    public static string GameTrainerGender(int game) => PKHexApi.GameTrainerGender(game);

    /// <summary>Money held by the trainer, when the format tracks it.</summary>
    [JSExport]
    public static int GameMoney(int game) => PKHexApi.GameMoney(game);

    [JSExport]
    public static int GameBoxCount(int game) => PKHexApi.GameBoxCount(game);

    [JSExport]
    public static string GameGeneration(int game) => PKHexApi.GameGeneration(game);

    /// <summary>Snapshot of one storage box as entity handles; empty slots are absent.</summary>
    [JSExport]
    [JsThrows("RangeError", "when boxIndex is outside [0, boxCount)")]
    public static int[] GameBoxMonHandles(int game, int boxIndex) => PKHexApi.GameBoxMonHandles(game, boxIndex);

    [JSExport]
    public static int[] GamePartyMonHandles(int game) => PKHexApi.GamePartyMonHandles(game);

    [JSExport]
    public static int MonSpecies(int mon) => PKHexApi.MonSpecies(mon);

    [JSExport]
    public static string MonNickname(int mon) => PKHexApi.MonNickname(mon);

    [JSExport]
    public static int MonLevel(int mon) => PKHexApi.MonLevel(mon);

    [JSExport]
    public static bool MonIsShiny(int mon) => PKHexApi.MonIsShiny(mon);

    [JSExport]
    public static string MonGender(int mon) => PKHexApi.MonGender(mon);

    /// <summary>Nature id, or -1 where the concept does not exist (Gen 1-2).</summary>
    [JSExport]
    public static int MonNatureId(int mon) => PKHexApi.MonNatureId(mon);

    [JSExport]
    public static string MonOwnerName(int mon) => PKHexApi.MonOwnerName(mon);

    [JSExport]
    public static int MonOwnerId(int mon) => PKHexApi.MonOwnerId(mon);

    [JSExport]
    public static int MonOwnerSecretId(int mon) => PKHexApi.MonOwnerSecretId(mon);

    [JSExport]
    public static string MonOwnerGender(int mon) => PKHexApi.MonOwnerGender(mon);

    /// <summary>Individual values in Core wire order [HP, Atk, Def, Spe, SpA, SpD].</summary>
    [JSExport]
    public static int[] MonIVs(int mon) => PKHexApi.MonIVs(mon);

    /// <summary>Effort values in Core wire order [HP, Atk, Def, Spe, SpA, SpD].</summary>
    [JSExport]
    public static int[] MonEVs(int mon) => PKHexApi.MonEVs(mon);

    /// <summary>Computed battle stats in Core wire order [HP, Atk, Def, Spe, SpA, SpD].</summary>
    [JSExport]
    public static int[] MonStats(int mon) => PKHexApi.MonStats(mon);

    /// <summary>Four move slots flattened as [moveId, pp] x4.</summary>
    [JSExport]
    public static int[] MonMoveSlots(int mon) => PKHexApi.MonMoveSlots(mon);

    [JSExport]
    [JsThrows("UnsupportedTierError", "on read-only-tier saves")]
    [JsThrows("RangeError", "when exceeding the generation's nickname length limit")]
    public static void MonSetNickname(int mon, string nickname) => PKHexApi.MonSetNickname(mon, nickname);

    [JSExport]
    [JsThrows("UnsupportedTierError", "on read-only-tier saves")]
    public static void MonSetLevel(int mon, int level) => PKHexApi.MonSetLevel(mon, level);

    [JSExport]
    [JsThrows("UnsupportedTierError", "on read-only-tier saves")]
    [JsThrows("RangeError", "when an id is unknown to this generation's movepool")]
    public static void MonSetMoves(int mon, int[] moveIds) => PKHexApi.MonSetMoves(mon, moveIds);

    /// <summary>Mint-aware write: sets nature and stat alignment together.</summary>
    [JSExport]
    [JsThrows("UnsupportedOperationError", "on Gen 1-2 (natures do not exist)")]
    [JsThrows("UnsupportedTierError", "on other read-only-tier saves")]
    [JsThrows("RangeError", "when the nature id is unknown")]
    public static void MonSetNature(int mon, int natureId) => PKHexApi.MonSetNature(mon, natureId);

    /// <summary>PID manipulation on Gen 3+; read-only tiers reject before reaching Core.</summary>
    [JSExport]
    [JsThrows("UnsupportedTierError", "on read-only-tier saves")]
    public static void MonSetShiny(int mon, bool shiny) => PKHexApi.MonSetShiny(mon, shiny);

    /// <summary>Merges individual values; omitted stats keep theirs. Clamps per generation.</summary>
    [JSExport]
    [JsThrows("UnsupportedTierError", "on read-only-tier saves")]
    public static void MonSetIVs(int mon, int[] ivs) => PKHexApi.MonSetIVs(mon, ivs);

    /// <summary>Merges effort values; omitted stats keep theirs. Caps per generation.</summary>
    [JSExport]
    [JsThrows("UnsupportedTierError", "on read-only-tier saves")]
    public static void MonSetEVs(int mon, int[] evs) => PKHexApi.MonSetEVs(mon, evs);

    // ---- v2 generic accessor (ticket #36) ---------------------------------

    /// <summary>Initialises the property registry; idempotent.</summary>
    [JSExport]
    public static void InitV2() { /* PropertyRegistry static ctor fires on first access */ _ = typeof(PropertyRegistry); }

    /// <summary>Load a save and return a v2 generic-accessor game handle.</summary>
    [JSExport]
    [JsThrows("SaveParseError", "when the bytes match no supported format")]
    public static int LoadV2(byte[] saveBytes)
    {
        ArgumentNullException.ThrowIfNull(saveBytes);
        var copy = new byte[saveBytes.Length];
        Array.Copy(saveBytes, copy, saveBytes.Length);

        SaveFile? sav;
        try { sav = SaveUtil.GetSaveFile(copy); }
        catch (Exception ex) { throw new InvalidDataException("Unrecognized save file format.", ex); }
        if (sav is null) throw new InvalidDataException("Unrecognized save file format.");

        return GenericAccessor.CreateHandle("SaveFile", sav);
    }

    [JSExport]
    public static byte[] SaveBytesV2(int game)
    {
        var entry = GenericAccessor.GetHandle(game);
        return ((SaveFile)entry.Value).Write().ToArray();
    }

    [JSExport]
    public static void CloseV2(int game) => GenericAccessor.RemoveHandle(game);

    /// <summary>Box contents as v2 entity handles; empty slots are absent.</summary>
    [JSExport]
    [JsThrows("RangeError", "when boxIndex is outside [0, boxCount)")]
    public static int[] GetBoxMonHandlesV2(int game, int boxIndex)
    {
        var entry = GenericAccessor.GetHandle(game);
        var sav = (SaveFile)entry.Value;
        if ((uint)boxIndex >= (uint)sav.BoxCount)
            throw new ArgumentOutOfRangeException(nameof(boxIndex), boxIndex,
                $"box index outside [0, {sav.BoxCount})");

        var handles = new List<int>(sav.BoxSlotCount);
        for (var slot = 0; slot < sav.BoxSlotCount; slot++)
        {
            var pk = sav.GetBoxSlotAtIndex(boxIndex, slot);
            if (pk.Species != 0)
                handles.Add(GenericAccessor.CreateHandle("PKM", pk));
        }
        return [.. handles];
    }

    [JSExport]
    public static int[] GetPartyMonHandlesV2(int game)
    {
        var entry = GenericAccessor.GetHandle(game);
        var sav = (SaveFile)entry.Value;
        var handles = new List<int>(sav.PartyCount);
        for (var slot = 0; slot < sav.PartyCount; slot++)
        {
            var pk = sav.GetPartySlotAtIndex(slot);
            if (pk.Species != 0)
                handles.Add(GenericAccessor.CreateHandle("PKM", pk));
        }
        return [.. handles];
    }

    /// <summary>Read any projected member by name.</summary>
    [JSExport]
    [JsThrows("RangeError", "when the handle or member is unknown")]
    public static object? GetMember(int handle, string memberId) =>
        GenericAccessor.GetMember(handle, memberId);

    /// <summary>Write any projected member by name.</summary>
    [JSExport]
    [JsThrows("UnsupportedTierError", "on read-only-tier saves")]
    [JsThrows("RangeError", "when the handle or member is unknown")]
    public static void SetMember(int handle, string memberId, object value) =>
        GenericAccessor.SetMember(handle, memberId, value);
}
