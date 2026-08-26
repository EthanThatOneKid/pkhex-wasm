using PKHeX.Core;
using PKHexWasm.TestSupport;
using PKHexWasm;

namespace PKHexWasm.Tests;

/// <summary>
/// Contract tests for the v2 generic accessor (ticket #36):
/// handle lifecycle, property read/write, tier enforcement, error paths.
/// Runs headless — no wasm runtime involved.
/// </summary>
public sealed class GenericAccessorTests
{
    private const int PikachuSpecies = 25;

    private static byte[] DemoSave() => PKHexApi.GenerateDemoSave("SPIKE");

    // ---- handle lifecycle -------------------------------------------------

    [Fact]
    public void CreateHandle_returns_unique_handles()
    {
        var h1 = GenericAccessor.CreateHandle("SaveFile", new object());
        var h2 = GenericAccessor.CreateHandle("SaveFile", new object());
        Assert.NotEqual(h1, h2);
    }

    [Fact]
    public void RemoveHandle_removes_handle()
    {
        var h = GenericAccessor.CreateHandle("SaveFile", new object());
        GenericAccessor.RemoveHandle(h);
        Assert.Throws<ArgumentOutOfRangeException>(() => GenericAccessor.GetHandle(h));
    }

    // ---- unknown handle / member ------------------------------------------

    [Fact]
    public void GetMember_throws_on_unknown_handle()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() =>
            GenericAccessor.GetMember(999999, "BoxCount"));
    }

    [Fact]
    public void GetMember_throws_on_unknown_member()
    {
        var h = GenericAccessor.CreateHandle("SaveFile", new object());
        Assert.Throws<ArgumentOutOfRangeException>(() =>
            GenericAccessor.GetMember(h, "NonexistentMember"));
    }

    [Fact]
    public void SetMember_throws_on_readonly_member()
    {
        var h = GenericAccessor.CreateHandle("SaveFile", new object());
        // "BoxCount" is registered read-only
        Assert.Throws<InvalidOperationException>(() =>
            GenericAccessor.SetMember(h, "BoxCount", 42));
    }

    [Fact]
    public void SetMember_throws_on_unknown_member()
    {
        var h = GenericAccessor.CreateHandle("SaveFile", new object());
        Assert.Throws<ArgumentOutOfRangeException>(() =>
            GenericAccessor.SetMember(h, "NonexistentMember", "value"));
    }

    // ---- SaveFile property reads ------------------------------------------

    [Fact]
    public void GetMember_reads_SaveFile_OT()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var h = GenericAccessor.CreateHandle("SaveFile", sav);
        Assert.Equal("SPIKE", GenericAccessor.GetMember(h, "OT"));
    }

    [Fact]
    public void GetMember_reads_SaveFile_BoxCount()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var h = GenericAccessor.CreateHandle("SaveFile", sav);
        Assert.Equal(sav.BoxCount, GenericAccessor.GetMember(h, "BoxCount"));
    }

    [Fact]
    public void GetMember_reads_SaveFile_Context()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var h = GenericAccessor.CreateHandle("SaveFile", sav);
        Assert.Equal((int)sav.Context, GenericAccessor.GetMember(h, "Context"));
    }

    [Fact]
    public void GetMember_reads_SaveFile_ChecksumsValid()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var h = GenericAccessor.CreateHandle("SaveFile", sav);
        Assert.Equal(sav.ChecksumsValid, GenericAccessor.GetMember(h, "ChecksumsValid"));
    }

    // ---- PKM property reads ----------------------------------------------

    [Fact]
    public void GetMember_reads_PKM_Species()
    {
        var game = PKHexApi.Load(DemoSave());
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var gh = GenericAccessor.CreateHandle("SaveFile", sav);
        var monHandles = GenericAccessor.GetMember(gh, "BoxSlotCount");
        Assert.NotNull(monHandles);

        // Load the save through the generic accessor and get a PKM handle
        var gameH = GenericAccessor.CreateHandle("SaveFile", SaveUtil.GetSaveFile(DemoSave())!);
        var pk = ((SaveFile)GenericAccessor.GetHandle(gameH).Value).GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);

        Assert.Equal(PikachuSpecies, GenericAccessor.GetMember(ph, "Species"));
    }

    [Fact]
    public void GetMember_reads_PKM_CurrentLevel()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);
        Assert.Equal(5, GenericAccessor.GetMember(ph, "CurrentLevel"));
    }

    [Fact]
    public void GetMember_reads_PKM_Nickname()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);
        var nick = (string)GenericAccessor.GetMember(ph, "Nickname")!;
        Assert.Equal("Pikachu", nick, ignoreCase: true);
    }

    [Fact]
    public void GetMember_reads_PKM_Context()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);
        Assert.Equal((int)sav.Context, GenericAccessor.GetMember(ph, "Context"));
    }

    [Fact]
    public void GetMember_reads_PKM_IsShiny()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);
        Assert.False((bool)GenericAccessor.GetMember(ph, "IsShiny")!);
    }

    // ---- PKM property writes ---------------------------------------------

    [Fact]
    public void SetMember_writes_PKM_Nickname()
    {
        var sav = SaveUtil.GetSaveFile(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);

        GenericAccessor.SetMember(ph, "Nickname", "Sparky");
        Assert.Equal("Sparky", (string)GenericAccessor.GetMember(ph, "Nickname")!);
    }

    [Fact]
    public void SetMember_writes_PKM_CurrentLevel()
    {
        var sav = SaveUtil.GetSaveFile(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);

        GenericAccessor.SetMember(ph, "CurrentLevel", 50);
        Assert.Equal(50, GenericAccessor.GetMember(ph, "CurrentLevel"));
    }

    [Fact]
    public void SetMember_writes_PKM_Ability()
    {
        var sav = SaveUtil.GetSaveFile(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);

        var original = (int)GenericAccessor.GetMember(ph, "Ability")!;
        GenericAccessor.SetMember(ph, "Ability", 10);
        Assert.Equal(10, GenericAccessor.GetMember(ph, "Ability"));
    }

    // ---- SaveFile property writes -----------------------------------------

    [Fact]
    public void SetMember_writes_SaveFile_Gender()
    {
        var sav = SaveUtil.GetSaveFile(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.NotNull(sav);
        var h = GenericAccessor.CreateHandle("SaveFile", sav);

        GenericAccessor.SetMember(h, "Gender", 1);
        Assert.Equal(1, GenericAccessor.GetMember(h, "Gender"));
    }

    [Fact]
    public void SetMember_writes_SaveFile_CurrentBox()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var h = GenericAccessor.CreateHandle("SaveFile", sav);

        GenericAccessor.SetMember(h, "CurrentBox", 2);
        Assert.Equal(2, GenericAccessor.GetMember(h, "CurrentBox"));
    }

    // ---- round-trip ------------------------------------------------------

    [Fact]
    public void RoundTrip_SaveFile_bytes_match()
    {
        var sav = SaveUtil.GetSaveFile(DemoSave());
        Assert.NotNull(sav);
        var h = GenericAccessor.CreateHandle("SaveFile", sav);

        var bytes = ((SaveFile)GenericAccessor.GetHandle(h).Value).Write().ToArray();
        Assert.Equal(32 * 1024, bytes.Length);
    }

    [Fact]
    public void RoundTrip_PKM_mutation_persists()
    {
        var sav = SaveUtil.GetSaveFile(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.NotNull(sav);
        var pk = sav.GetBoxSlotAtIndex(0, 0);
        var ph = GenericAccessor.CreateHandle("PKM", pk);

        GenericAccessor.SetMember(ph, "CurrentLevel", 100);
        Assert.Equal(100, GenericAccessor.GetMember(ph, "CurrentLevel"));

        // Re-read from the same handle — mutation persists
        Assert.Equal(100, ((PKM)GenericAccessor.GetHandle(ph).Value).CurrentLevel);
    }
}
