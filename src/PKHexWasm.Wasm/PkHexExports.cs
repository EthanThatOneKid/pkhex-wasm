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

    [JSExport]
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

    [JSExport]
    public static int GameBoxCount(int game) => PKHexApi.GameBoxCount(game);

    [JSExport]
    public static string GameGeneration(int game) => PKHexApi.GameGeneration(game);

    [JSExport]
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

    [JSExport]
    public static int[] MonIVs(int mon) => PKHexApi.MonIVs(mon);

    [JSExport]
    public static int[] MonEVs(int mon) => PKHexApi.MonEVs(mon);

    [JSExport]
    public static int[] MonStats(int mon) => PKHexApi.MonStats(mon);

    [JSExport]
    public static int[] MonMoveSlots(int mon) => PKHexApi.MonMoveSlots(mon);

    [JSExport]
    public static void MonSetNickname(int mon, string nickname) => PKHexApi.MonSetNickname(mon, nickname);

    [JSExport]
    public static void MonSetLevel(int mon, int level) => PKHexApi.MonSetLevel(mon, level);

    [JSExport]
    public static void MonSetMoves(int mon, int[] moveIds) => PKHexApi.MonSetMoves(mon, moveIds);

    [JSExport]
    public static void MonSetNature(int mon, int natureId) => PKHexApi.MonSetNature(mon, natureId);

    [JSExport]
    public static void MonSetShiny(int mon, bool shiny) => PKHexApi.MonSetShiny(mon, shiny);

    [JSExport]
    public static void MonSetIVs(int mon, int[] ivs) => PKHexApi.MonSetIVs(mon, ivs);

    [JSExport]
    public static void MonSetEVs(int mon, int[] evs) => PKHexApi.MonSetEVs(mon, evs);
}
