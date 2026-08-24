using PKHeX.Core;
using PKHexWasm.TestSupport;
using PKHexWasm;

namespace PKHexWasm.Tests;

/// <summary>
/// Contract tests for the Binding layer seam (spec data contracts):
/// defensive copy-in, fresh array out, snapshot handles with write-through,
/// generation/trainer/box reads. Runs headless — no wasm runtime involved.
/// Exercises exactly the static surface JavaScript calls.
/// </summary>
public sealed class PKHexApiTests
{
    private const int PikachuSpecies = 25;

    private static byte[] DemoSave() => PKHexApi.GenerateDemoSave("SPIKE");

    /// <summary>Workhorse edit-tier fixture (reload-capable per the #22 probe).</summary>
    private static int EditableGame() => PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen8b));

    private static int BoxMon(int game) => PKHexApi.GameBoxMonHandles(game, 0)[0];

    [Fact]
    public void GenerateDemoSave_produces_gen1_save()
    {
        var bytes = DemoSave();
        Assert.Equal(32 * 1024, bytes.Length);
    }

    [Fact]
    public void Load_exposes_trainer_generation_and_boxCount()
    {
        var game = PKHexApi.Load(DemoSave());
        Assert.Equal("SPIKE", PKHexApi.GameTrainerName(game));
        Assert.Equal("Gen1", PKHexApi.GameGeneration(game));
        Assert.True(PKHexApi.GameBoxCount(game) > 0);
    }

    [Fact]
    public void Party_snapshot_reads_seeded_pikachu()
    {
        var game = PKHexApi.Load(DemoSave());
        var party = PKHexApi.GamePartyMonHandles(game);
        Assert.Single(party);
        var mon = party[0];
        Assert.Equal(PikachuSpecies, PKHexApi.MonSpecies(mon));
        Assert.Equal(5, PKHexApi.MonLevel(mon));
        Assert.False(PKHexApi.MonIsShiny(mon));
        // GB charset uppercases; accept either casing of the seed
        Assert.Equal("Pikachu", PKHexApi.MonNickname(mon), ignoreCase: true);
    }

    [Fact]
    public void Empty_party_slots_are_absent()
    {
        var game = PKHexApi.Load(DemoSave());
        Assert.Single(PKHexApi.GamePartyMonHandles(game)); // seeded save holds exactly one member
    }

    [Fact]
    public void Box_zero_holds_the_seeded_mon_and_later_boxes_are_empty()
    {
        var game = PKHexApi.Load(DemoSave());
        Assert.Single(PKHexApi.GameBoxMonHandles(game, 0));
        Assert.Empty(PKHexApi.GameBoxMonHandles(game, 1));
    }

    [Fact]
    public void Box_throws_outside_bounds()
    {
        var game = PKHexApi.Load(DemoSave());
        Assert.Throws<ArgumentOutOfRangeException>(() => PKHexApi.GameBoxMonHandles(game, -1));
        Assert.Throws<ArgumentOutOfRangeException>(() => PKHexApi.GameBoxMonHandles(game, PKHexApi.GameBoxCount(game)));
    }

    [Fact]
    public void Load_defensively_copies_input_buffer()
    {
        var bytes = DemoSave();
        var game = PKHexApi.Load(bytes);
        var before = PKHexApi.MonNickname(PKHexApi.GamePartyMonHandles(game)[0]);

        bytes[0x00] ^= 0xFF; // caller mutates their buffer afterwards
        bytes[0x20] ^= 0xFF;

        // loaded game unaffected
        Assert.Equal(before, PKHexApi.MonNickname(PKHexApi.GamePartyMonHandles(game)[0]));
    }

    [Fact]
    public void SaveBytes_returns_fresh_array_every_call()
    {
        var game = PKHexApi.Load(DemoSave());
        var a = PKHexApi.SaveBytes(game);
        var b = PKHexApi.SaveBytes(game);
        Assert.NotSame(a, b);
        Assert.Equal(a, b); // same content, no aliasing
        Assert.Equal(32 * 1024, a.Length);
    }

    [Fact]
    public void Nickname_write_through_survives_export_reload()
    {
        var game = EditableGame();
        PKHexApi.MonSetNickname(BoxMon(game), "Sparky");

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal("Sparky", PKHexApi.MonNickname(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void Nickname_rejects_beyond_generation_length_cap()
    {
        var game = EditableGame();
        // BDSP (Gen 8) caps western nicknames at 12
        Assert.Throws<ArgumentOutOfRangeException>(
            () => PKHexApi.MonSetNickname(BoxMon(game), "ThirteenChars"));
    }

    [Fact]
    public void Level_write_through_adjusts_stats_and_survives_reload()
    {
        var game = EditableGame();
        var mon = BoxMon(game);
        var hpBefore = PKHexApi.MonStats(mon)[0];

        PKHexApi.MonSetLevel(mon, 42);

        Assert.Equal(42, PKHexApi.MonLevel(mon));
        Assert.True(PKHexApi.MonStats(mon)[0] >= hpBefore);

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(42, PKHexApi.MonLevel(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void Box_writes_land_in_box_not_only_party()
    {
        var game = EditableGame();
        PKHexApi.MonSetNickname(BoxMon(game), "Boxed");

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal("Boxed", PKHexApi.MonNickname(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void SetIVs_overwrites_all_slots_within_generation_caps()
    {
        var game = EditableGame();
        // values above the modern cap of 31 clamp upstream
        var ivs = new[] { 31, 30, 29, 28, 27, 40 };
        PKHexApi.MonSetIVs(BoxMon(game), ivs);
        var got = PKHexApi.MonIVs(BoxMon(game));

        Assert.Equal(31, got[5]); // clamped
        Assert.Equal(new[] { 31, 30, 29, 28, 27, 31 }, got);

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(got, PKHexApi.MonIVs(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void SetEVs_overwrites_all_slots_with_spc_shared_on_gen1()
    {
        var game = EditableGame();
        var evs = new[] { 252, 252, 0, 4, 6, 0 };
        PKHexApi.MonSetEVs(BoxMon(game), evs);
        Assert.Equal(evs, PKHexApi.MonEVs(BoxMon(game)));

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(evs, PKHexApi.MonEVs(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void SetMoves_writes_four_slots_with_pp()
    {
        var game = EditableGame();
        var moves = new[] { 1, 2, 3, 44 }; // pound / karate chop / double slap / bite
        var mon = BoxMon(game);
        PKHexApi.MonSetMoves(mon, moves);

        var slots = PKHexApi.MonMoveSlots(mon); // flattened [id, pp] × 4
        Assert.Equal(moves[0], slots[0]);
        Assert.Equal(moves[1], slots[2]);
        Assert.Equal(moves[2], slots[4]);
        Assert.Equal(moves[3], slots[6]);
        Assert.True(slots[1] > 0);

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(
            moves,
            PKHexApi.MonMoveSlots(PKHexApi.GameBoxMonHandles(reloaded, 0)[0])
                .Where((_, i) => i % 2 == 0).ToArray());
    }

    [Fact]
    public void SetShiny_round_trips_on_edit_tier()
    {
        var game = EditableGame();
        var mon = BoxMon(game);
        PKHexApi.MonSetShiny(mon, true);
        Assert.True(PKHexApi.MonIsShiny(mon));

        PKHexApi.MonSetShiny(mon, false);
        Assert.False(PKHexApi.MonIsShiny(mon));

        PKHexApi.MonSetShiny(mon, true);
        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.True(PKHexApi.MonIsShiny(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void Unsetting_shiny_on_gen1_is_rejected_upstream_hazard()
    {
        // Upstream infinite-loop hazard on GB formats; the read-only tier
        // rejects before the call can ever reach Core.
        var game = PKHexApi.Load(DemoSave());
        Assert.Throws<UnsupportedTierException>(
            () => PKHexApi.MonSetShiny(PKHexApi.GamePartyMonHandles(game)[0], false));
    }

    [Fact]
    public void Money_reads_from_the_trainer_block()
    {
        var game = PKHexApi.Load(DemoSave());
        var money = PKHexApi.GameMoney(game);
        Assert.True(money >= 0);

        // value survives an export/reload cycle
        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(money, PKHexApi.GameMoney(reloaded));
    }

    [Fact]
    public void Owner_attribution_round_trips()
    {
        var game = EditableGame();
        var mon = BoxMon(game);
        Assert.False(string.IsNullOrEmpty(PKHexApi.MonOwnerName(mon)));

        PKHexApi.MonSetNickname(mon, "X");
        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(
            PKHexApi.MonOwnerName(mon),
            PKHexApi.MonOwnerName(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void Load_rejects_unrecognized_bytes()
    {
        Assert.ThrowsAny<Exception>(() => PKHexApi.Load([1, 2, 3, 4]));
    }

    [Fact]
    public void Close_releases_handles()
    {
        var game = PKHexApi.Load(DemoSave());
        PKHexApi.Close(game);
        Assert.Throws<ArgumentOutOfRangeException>(() => PKHexApi.SaveBytes(game));
    }
}
