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
        var game = PKHexApi.Load(DemoSave());
        var mon = PKHexApi.GamePartyMonHandles(game)[0];
        PKHexApi.MonSetNickname(mon, "Sparky");

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal("Sparky", PKHexApi.MonNickname(PKHexApi.GamePartyMonHandles(reloaded)[0]));
    }

    [Fact]
    public void Level_write_through_adjusts_stats_and_survives_reload()
    {
        var game = PKHexApi.Load(DemoSave());
        var mon = PKHexApi.GamePartyMonHandles(game)[0];
        var hpBefore = PKHexApi.MonStats(mon)[0];

        PKHexApi.MonSetLevel(mon, 42);

        Assert.Equal(42, PKHexApi.MonLevel(mon));
        Assert.True(PKHexApi.MonStats(mon)[0] >= hpBefore);

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(42, PKHexApi.MonLevel(PKHexApi.GamePartyMonHandles(reloaded)[0]));
    }

    [Fact]
    public void Box_writes_land_in_box_not_only_party()
    {
        var game = PKHexApi.Load(DemoSave());
        var boxMon = PKHexApi.GameBoxMonHandles(game, 0)[0];
        PKHexApi.MonSetNickname(boxMon, "Boxed");

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal("Boxed", PKHexApi.MonNickname(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    [Fact]
    public void SetIVs_on_gen1_respects_dv_derivation()
    {
        // Spec GB quirks: HP DV derives from the others; SpA/SpD alias SPC.
        // Sent in Core span order [HP, Atk, Def, Spe, SpA, SpD].
        var game = PKHexApi.Load(DemoSave());
        var ivs = new[] { 15, 14, 13, 12, 11, 10 };
        PKHexApi.MonSetIVs(PKHexApi.GamePartyMonHandles(game)[0], ivs);
        var got = PKHexApi.MonIVs(PKHexApi.GamePartyMonHandles(game)[0]);

        Assert.Equal(14, got[1]); // Atk stored as-is
        Assert.Equal(13, got[2]); // Def stored as-is
        Assert.Equal(got[4], got[5]); // SpA/SpD alias one SPC stat
        // GB HP DV formula from parity bits: (Atk&1)*8 + (Def&1)*4 + (Spe&1)*2 + (SpA&1)
        Assert.Equal(((14 & 1) << 3) | ((13 & 1) << 2) | ((12 & 1) << 1) | (11 & 1), got[0]);
    }

    [Fact]
    public void SetEVs_overwrites_all_slots_with_spc_shared_on_gen1()
    {
        var game = PKHexApi.Load(DemoSave());
        // SpA/SpD share the legacy SPC stat; keep them equal for an exact round-trip
        var evs = new[] { 1000, 2000, 3000, 4000, 5000, 5000 };
        PKHexApi.MonSetEVs(PKHexApi.GamePartyMonHandles(game)[0], evs);
        Assert.Equal(evs, PKHexApi.MonEVs(PKHexApi.GamePartyMonHandles(game)[0]));
    }

    [Fact]
    public void SetMoves_writes_four_slots_with_pp()
    {
        var game = PKHexApi.Load(DemoSave());
        var moves = new[] { 1, 2, 3, 44 }; // pound / karate chop / double slap / bite
        var mon = PKHexApi.GamePartyMonHandles(game)[0];
        PKHexApi.MonSetMoves(mon, moves);

        var slots = PKHexApi.MonMoveSlots(mon); // flattened [id, pp] × 4
        Assert.Equal(moves[0], slots[0]);
        Assert.Equal(moves[1], slots[2]);
        Assert.Equal(moves[2], slots[4]);
        Assert.Equal(moves[3], slots[6]);
        Assert.True(slots[1] > 0);
    }

    [Fact]
    public void SetShiny_enables_on_gen1()
    {
        var game = PKHexApi.Load(DemoSave());
        var mon = PKHexApi.GamePartyMonHandles(game)[0];
        PKHexApi.MonSetShiny(mon, true);
        Assert.True(PKHexApi.MonIsShiny(mon));

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.True(PKHexApi.MonIsShiny(PKHexApi.GamePartyMonHandles(reloaded)[0]));
    }

    [Fact]
    public void Unsetting_shiny_on_gen1_is_rejected_upstream_hazard()
    {
        // Upstream infinite-loop hazard on GB formats; rejected at the boundary.
        var game = PKHexApi.Load(DemoSave());
        Assert.Throws<NotSupportedException>(
            () => PKHexApi.MonSetShiny(PKHexApi.GamePartyMonHandles(game)[0], false));
    }

    [Fact]
    public void Owner_attribution_round_trips()
    {
        var game = PKHexApi.Load(DemoSave());
        var mon = PKHexApi.GamePartyMonHandles(game)[0];
        Assert.False(string.IsNullOrEmpty(PKHexApi.MonOwnerName(mon)));

        PKHexApi.MonSetNickname(mon, "X");
        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(
            PKHexApi.MonOwnerName(mon),
            PKHexApi.MonOwnerName(PKHexApi.GamePartyMonHandles(reloaded)[0]));
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
