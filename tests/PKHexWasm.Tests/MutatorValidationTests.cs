using PKHeX.Core;

namespace PKHexWasm.Tests;

/// <summary>
/// Mutator argument contracts beyond tiers (spec Public surface):
/// setMoves rejects ids unknown to the generation's movepool with a range
/// error; zero clears a slot; setNickname rejects strings the format cannot
/// store losslessly (charset limits).
/// </summary>
public sealed class MutatorValidationTests
{
    private const string RangeTag = "RangeError:";

    [Fact]
    public void SetMoves_rejects_ids_above_the_generation_movepool()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen5));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];
        // one past the Gen 5 ceiling - unknown to this generation's movepool
        var ceiling = BlankMaxMoveId(EntityContext.Gen5);

        var ex = Assert.Throws<ArgumentOutOfRangeException>(
            () => PKHexApi.MonSetMoves(mon, [1, 2, 3, ceiling + 1]));
        Assert.StartsWith(RangeTag, ex.Message);
    }

    [Fact]
    public void SetMoves_rejects_negative_ids()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.Throws<ArgumentOutOfRangeException>(
            () => PKHexApi.MonSetMoves(PKHexApi.GameBoxMonHandles(game, 0)[0], [1, -1, 0, 0]));
    }

    [Fact]
    public void SetMoves_accepts_boundary_id_and_writes_through()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen5));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];

        var ceiling = BlankMaxMoveId(EntityContext.Gen5);
        PKHexApi.MonSetMoves(mon, [(ushort)ceiling, 0, 0, 0]);
        Assert.Equal(ceiling, PKHexApi.MonMoveSlots(mon)[0]);
    }

    [Fact]
    public void SetMoves_zero_clears_a_slot_per_spec()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen8b));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];

        PKHexApi.MonSetMoves(mon, [1, 0, 0, 0]);

        var slots = PKHexApi.MonMoveSlots(mon);
        Assert.Equal(1, slots[0]);
        Assert.Equal(0, slots[2]); // cleared slot carries move id 0
        Assert.Equal(0, slots[4]);
        Assert.Equal(0, slots[6]);
    }

    [Fact]
    public void SetNickname_rejects_strings_the_format_cannot_store()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen8b));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];

        // embedded terminator truncates silently upstream; must reject instead
        var ex = Assert.Throws<ArgumentOutOfRangeException>(
            () => PKHexApi.MonSetNickname(mon, "AB\u0000CD"));
        Assert.StartsWith(RangeTag, ex.Message);

        // rejection happens without mutating state
        Assert.NotEqual("A", PKHexApi.MonNickname(mon));
    }

    [Fact]
    public void SetNickname_accepts_storable_unicode_and_persists_it()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen5));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];

        PKHexApi.MonSetNickname(mon, "Pika\u26A1"); // lightning emoji stores losslessly
        Assert.Equal("Pika\u26A1", PKHexApi.MonNickname(mon));

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(
            "Pika\u26A1",
            PKHexApi.MonNickname(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    private static ushort BlankMaxMoveId(EntityContext context) =>
        BlankSaveFile.Get(context, TestSaves.Trainer).MaxMoveID;
}
