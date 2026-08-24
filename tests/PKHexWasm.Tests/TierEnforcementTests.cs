using PKHeX.Core;
using PKHexWasm.TestSupport;

namespace PKHexWasm.Tests;

/// <summary>
/// Tier enforcement at the API boundary (ticket #22): every mutator rejects
/// read-only-tier formats before reaching Core; setNature additionally
/// rejects Gen 1-2 where the concept does not exist.
/// </summary>
public sealed class TierEnforcementTests
{
    public static TheoryData<EntityContext> ReadOnlyTiers => new(TestSaves.ReadOnlyLoadableContexts);

    [Theory]
    [MemberData(nameof(ReadOnlyTiers))]
    public void Every_mutator_rejects_read_only_tier(EntityContext context)
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(context));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];

        AssertTier(() => PKHexApi.MonSetNickname(mon, "Sparky"));
        AssertTier(() => PKHexApi.MonSetLevel(mon, 42));
        AssertTier(() => PKHexApi.MonSetMoves(mon, [1, 2, 3, 4]));
        // setNature is concept-aware first: Gen 1-2 reject as unsupported
        // operation; other read-only tiers as unsupported tier.
        if (context is EntityContext.Gen1 or EntityContext.Gen2)
        {
            Assert.Throws<UnsupportedOperationException>(
                () => PKHexApi.MonSetNature(mon, (int)Nature.Adamant));
        }
        else
        {
            AssertTier(() => PKHexApi.MonSetNature(mon, (int)Nature.Adamant));
        }
        AssertTier(() => PKHexApi.MonSetShiny(mon, true));
        AssertTier(() => PKHexApi.MonSetShiny(mon, false));
        AssertTier(() => PKHexApi.MonSetIVs(mon, [15, 15, 15, 15, 15, 15]));
        AssertTier(() => PKHexApi.MonSetEVs(mon, [0, 0, 0, 0, 0, 0]));

        // rejection happens without mutating state
        Assert.Equal(25, PKHexApi.MonSpecies(mon));
    }

    [Theory]
    [InlineData(EntityContext.Gen1)]
    [InlineData(EntityContext.Gen2)]
    public void SetNature_rejects_gen1_and_gen2_as_unsupported_operation(EntityContext context)
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(context));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];

        var ex = Assert.Throws<UnsupportedOperationException>(
            () => PKHexApi.MonSetNature(mon, (int)Nature.Adamant));
        Assert.Equal("setNature", ex.Operation);
    }

    [Fact]
    public void Tier_rejections_name_the_operation_in_the_message()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen1));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];

        var ex = Assert.Throws<UnsupportedTierException>(() => PKHexApi.MonSetLevel(mon, 42));
        Assert.Equal("setLevel", ex.Operation);
        Assert.Contains("Gen1", ex.Message);
    }

    private static void AssertTier(Action mutate) =>
        Assert.Throws<UnsupportedTierException>(mutate);
}
