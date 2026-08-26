using PKHeX.Core;

namespace PKHexWasm;

/// <summary>
/// Static property registry for the generic accessor (ticket #36).
/// Registers the most useful projected properties for SaveFile and PKM.
/// </summary>
public static class PropertyRegistry
{
    /// <summary>True after the static constructor has run. Used by GenericAccessor to trigger initialization.</summary>
    public static bool Registered { get; } = true;

    static PropertyRegistry()
    {
        // ---- SaveFile reads (get-only) ----
        R("SaveFile", "OT", o => ((SaveFile)o).OT ?? string.Empty);
        R("SaveFile", "TID16", o => (int)((SaveFile)o).TID16);
        R("SaveFile", "SID16", o => (int)((SaveFile)o).SID16);
        R("SaveFile", "BoxCount", o => ((SaveFile)o).BoxCount);
        R("SaveFile", "BoxSlotCount", o => ((SaveFile)o).BoxSlotCount);
        R("SaveFile", "Context", o => (int)((SaveFile)o).Context);
        R("SaveFile", "Money", o => (long)((SaveFile)o).Money);
        R("SaveFile", "ChecksumsValid", o => ((SaveFile)o).ChecksumsValid);
        R("SaveFile", "Extension", o => ((SaveFile)o).Extension ?? string.Empty);
        R("SaveFile", "CaughtCount", o => (int)((SaveFile)o).CaughtCount);
        R("SaveFile", "HasBox", o => ((SaveFile)o).HasBox);
        R("SaveFile", "HasParty", o => ((SaveFile)o).HasParty);
        R("SaveFile", "CurrentBox", o => (int)((SaveFile)o).CurrentBox,
                                     (o, v) => ((SaveFile)o).CurrentBox = (int)v);

        // ---- SaveFile reads (get/set) ----
        R("SaveFile", "Gender", o => (int)((SaveFile)o).Gender,
                                     (o, v) => ((SaveFile)o).Gender = (byte)(int)v);
        R("SaveFile", "DisplayTID", o => (int)((SaveFile)o).DisplayTID,
                                        (o, v) => ((SaveFile)o).DisplayTID = (uint)(int)v);
        R("SaveFile", "DisplaySID", o => (int)((SaveFile)o).DisplaySID,
                                        (o, v) => ((SaveFile)o).DisplaySID = (uint)(int)v);

        // ---- PKM reads (get-only) ----
        R("PKM", "AO", o => ((PKM)o).AO);
        R("PKM", "B2W2", o => ((PKM)o).B2W2);
        R("PKM", "BDSP", o => ((PKM)o).BDSP);
        R("PKM", "BW", o => ((PKM)o).BW);
        R("PKM", "ChecksumValid", o => ((PKM)o).ChecksumValid);
        R("PKM", "Context", o => (int)((PKM)o).Context);
        R("PKM", "E", o => ((PKM)o).E);
        R("PKM", "Extension", o => ((PKM)o).Extension ?? string.Empty);
        R("PKM", "FRLG", o => ((PKM)o).FRLG);
        R("PKM", "GG", o => ((PKM)o).GG);
        R("PKM", "Gen1", o => ((PKM)o).Gen1);
        R("PKM", "Gen2", o => ((PKM)o).Gen2);
        R("PKM", "Gen3", o => ((PKM)o).Gen3);
        R("PKM", "Gen4", o => ((PKM)o).Gen4);
        R("PKM", "Gen5", o => ((PKM)o).Gen5);
        R("PKM", "Gen6", o => ((PKM)o).Gen6);
        R("PKM", "Gen7", o => ((PKM)o).Gen7);
        R("PKM", "Gen8", o => ((PKM)o).Gen8);
        R("PKM", "Gen9", o => ((PKM)o).Gen9);
        R("PKM", "GO", o => ((PKM)o).GO);
        R("PKM", "IsShiny", o => ((PKM)o).IsShiny);
        R("PKM", "Nickname", o => ((PKM)o).Nickname ?? string.Empty,
                                     (o, v) => { ((PKM)o).Nickname = (string)v; });
        R("PKM", "Species", o => (int)((PKM)o).Species);
        R("PKM", "OriginalTrainerName", o => ((PKM)o).OriginalTrainerName ?? string.Empty);
        R("PKM", "CurrentLevel", o => (int)((PKM)o).CurrentLevel);
        R("PKM", "Nature", o => (int)((PKM)o).Nature);
        R("PKM", "Gender", o => (int)((PKM)o).Gender);
        R("PKM", "Characteristic", o => ((PKM)o).Characteristic);
        R("PKM", "EVTotal", o => ((PKM)o).EVTotal);
        R("PKM", "CurrentFriendship", o => (int)((PKM)o).CurrentFriendship);
        R("PKM", "CurrentHandler", o => (int)((PKM)o).CurrentHandler);

        // ---- PKM reads (get/set) ----
        R("PKM", "Ability", o => (int)((PKM)o).Ability,
                                 (o, v) => ((PKM)o).Ability = (int)v);
        R("PKM", "AbilityNumber", o => (int)((PKM)o).AbilityNumber,
                                      (o, v) => ((PKM)o).AbilityNumber = (int)v);
        R("PKM", "Ball", o => (int)((PKM)o).Ball,
                              (o, v) => ((PKM)o).Ball = (byte)(int)v);
        R("PKM", "CurrentLevel", o => (int)((PKM)o).CurrentLevel,
                                      (o, v) => ((PKM)o).CurrentLevel = (byte)(int)v);
        R("PKM", "EXP", o => (long)((PKM)o).EXP,
                             (o, v) => ((PKM)o).EXP = (uint)(long)v);
        R("PKM", "DisplayTID", o => (int)((PKM)o).DisplayTID,
                                    (o, v) => ((PKM)o).DisplayTID = (uint)(int)v);
        R("PKM", "DisplaySID", o => (int)((PKM)o).DisplaySID,
                                    (o, v) => ((PKM)o).DisplaySID = (uint)(int)v);

        // ---- PKM EVs (get/set) ----
        R("PKM", "EV_HP",  o => ((PKM)o).EV_HP,  (o, v) => ((PKM)o).EV_HP = (int)v);
        R("PKM", "EV_ATK", o => ((PKM)o).EV_ATK, (o, v) => ((PKM)o).EV_ATK = (int)v);
        R("PKM", "EV_DEF", o => ((PKM)o).EV_DEF, (o, v) => ((PKM)o).EV_DEF = (int)v);
        R("PKM", "EV_SPE", o => ((PKM)o).EV_SPE, (o, v) => ((PKM)o).EV_SPE = (int)v);
        R("PKM", "EV_SPA", o => ((PKM)o).EV_SPA, (o, v) => ((PKM)o).EV_SPA = (int)v);
        R("PKM", "EV_SPD", o => ((PKM)o).EV_SPD, (o, v) => ((PKM)o).EV_SPD = (int)v);

        // ---- PKM IVs (get only — computed) ----
        R("PKM", "IV_HP",  o => ((PKM)o).IV_HP);
        R("PKM", "IV_ATK", o => ((PKM)o).IV_ATK);
        R("PKM", "IV_DEF", o => ((PKM)o).IV_DEF);
        R("PKM", "IV_SPE", o => ((PKM)o).IV_SPE);
        R("PKM", "IV_SPA", o => ((PKM)o).IV_SPA);
        R("PKM", "IV_SPD", o => ((PKM)o).IV_SPD);

        // ---- PKM Moves (get/set) ----
        R("PKM", "Move1", o => (int)((PKM)o).Move1,
                               (o, v) => ((PKM)o).Move1 = (ushort)(int)v);
        R("PKM", "Move2", o => (int)((PKM)o).Move2,
                               (o, v) => ((PKM)o).Move2 = (ushort)(int)v);
        R("PKM", "Move3", o => (int)((PKM)o).Move3,
                               (o, v) => ((PKM)o).Move3 = (ushort)(int)v);
        R("PKM", "Move4", o => (int)((PKM)o).Move4,
                               (o, v) => ((PKM)o).Move4 = (ushort)(int)v);

        // ---- PKM PP (get only) ----
        R("PKM", "Move1_PP", o => (int)((PKM)o).Move1_PP);
        R("PKM", "Move2_PP", o => (int)((PKM)o).Move2_PP);
        R("PKM", "Move3_PP", o => (int)((PKM)o).Move3_PP);
        R("PKM", "Move4_PP", o => (int)((PKM)o).Move4_PP);

        // ---- PKM OT info (get only) ----
        R("PKM", "TID16", o => (int)((PKM)o).TID16);
        R("PKM", "SID16", o => (int)((PKM)o).SID16);
        R("PKM", "OriginalTrainerName", o => ((PKM)o).OriginalTrainerName ?? string.Empty);
        R("PKM", "OriginalTrainerGender", o => (int)((PKM)o).OriginalTrainerGender);

        // ---- PKM friendship (get/set) ----
        R("PKM", "CurrentFriendship", o => (int)((PKM)o).CurrentFriendship,
                                          (o, v) => ((PKM)o).CurrentFriendship = (byte)(int)v);
    }

    private static void R(string classId, string memberId,
        Func<object, object?> getter, Action<object, object?>? setter = null)
    {
        GenericAccessor.Register(classId, memberId, getter, setter);
    }
}
