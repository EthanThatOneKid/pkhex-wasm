using PKHeX.Core;

namespace SpikeLib;

public sealed record DemoPokemon(int Species, string Nickname, int Level);

public sealed class SpikeSaveService
{
    public const string DefaultTrainerName = "SPIKE";
    private const int PikachuSpeciesId = 25;
    private const int FirstSlotIndex = 0;

    public byte[] CreateDemoSave(string trainerName)
    {
        var sav = BlankSaveFile.Get(EntityContext.Gen1, trainerName);

        var pk = sav.BlankPKM;
        sav.ApplyTo(pk);
        pk.Species = PikachuSpeciesId;
        pk.CurrentLevel = 5;
        pk.SetNickname("Pikachu");

        sav.SetBoxSlotAtIndex(pk, FirstSlotIndex);
        sav.SetPartySlotAtIndex(pk, FirstSlotIndex);
        return Write(sav);
    }

    public DemoPokemon ReadFirstPokemon(byte[] saveBytes)
    {
        var mon = RequireSaveFile(saveBytes).GetBoxSlotAtIndex(FirstSlotIndex);
        return new DemoPokemon(mon.Species, mon.Nickname, mon.CurrentLevel);
    }

    public byte[] RenameFirstPokemon(byte[] saveBytes, string nickname)
    {
        var sav = RequireSaveFile(saveBytes);
        var boxMon = sav.GetBoxSlotAtIndex(FirstSlotIndex);
        boxMon.SetNickname(nickname);
        sav.SetBoxSlotAtIndex(boxMon, FirstSlotIndex);

        // keep the party copy of the demo mon in sync so the two never diverge
        var partyMon = sav.GetPartySlotAtIndex(FirstSlotIndex);
        if (partyMon.Species == boxMon.Species)
        {
            partyMon.SetNickname(nickname);
            sav.SetPartySlotAtIndex(partyMon, FirstSlotIndex);
        }

        return Write(sav);
    }

    private static byte[] Write(SaveFile sav) => sav.Write().ToArray();

    private static SaveFile RequireSaveFile(byte[] saveBytes)
    {
        SaveFile? sav;
        try
        {
            sav = SaveUtil.GetSaveFile(saveBytes);
        }
        catch (Exception)
        {
            throw new InvalidDataException("Unrecognized save file format.");
        }
        return sav ?? throw new InvalidDataException("Unrecognized save file format.");
    }
}
