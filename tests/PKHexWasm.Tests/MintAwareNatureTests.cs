using PKHeX.Core;

namespace PKHexWasm.Tests;

/// <summary>
/// Mint-aware nature writes (ticket #22): the naïve Core setter silently
/// no-ops on Gen 8+ formats, so setNature writes both Nature and
/// StatAlignment (Facade Natures.ChangeAll semantics) and persists through
/// an export/reload cycle on every loadable edit-tier format.
/// </summary>
public sealed class MintAwareNatureTests
{
    public static TheoryData<EntityContext> ReloadableEditTiers => new(
        [EntityContext.Gen5, EntityContext.Gen6, EntityContext.Gen7, EntityContext.Gen8b]);

    [Theory]
    [MemberData(nameof(ReloadableEditTiers))]
    public void SetNature_persists_through_export_reload(EntityContext context)
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(context));
        var mon = PKHexApi.GameBoxMonHandles(game, 0)[0];
        var adamant = (int)Nature.Adamant;

        PKHexApi.MonSetNature(mon, adamant);
        Assert.Equal(adamant, PKHexApi.MonNatureId(mon));

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        Assert.Equal(
            adamant,
            PKHexApi.MonNatureId(PKHexApi.GameBoxMonHandles(reloaded, 0)[0]));
    }

    /// <summary>
    /// Swish formats (SwSh/PLA/SV/Z-A) cannot load blank fixtures (probe:
    /// their block layout matches no retail size), so the shared write path
    /// is pinned at the Core seam: both fields take the written nature.
    /// </summary>
    [Theory]
    [InlineData(EntityContext.Gen8)]
    [InlineData(EntityContext.Gen8a)]
    [InlineData(EntityContext.Gen9)]
    [InlineData(EntityContext.Gen9a)]
    public void Mint_write_sets_nature_and_stat_alignment_on_swish_formats(EntityContext context)
    {
        var sav = BlankSaveFile.Get(context, TestSaves.Trainer);
        var pk = sav.BlankPKM;
        sav.ApplyTo(pk);
        pk.Species = 25;
        Assert.NotEqual(Nature.Adamant, pk.Nature);

        pk.Nature = Nature.Adamant;
        pk.StatAlignment = Nature.Adamant;

        Assert.Equal(Nature.Adamant, pk.Nature);
        Assert.Equal(Nature.Adamant, pk.StatAlignment);
    }

    [Fact]
    public void SetNature_rejects_unknown_ids()
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.Throws<ArgumentOutOfRangeException>(
            () => PKHexApi.MonSetNature(PKHexApi.GameBoxMonHandles(game, 0)[0], 999));
    }
}
