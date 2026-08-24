using PKHeX.Core;
using PKHexWasm.TestSupport;

namespace PKHexWasm.Tests;

/// <summary>
/// Contract of the shared blank-fixture factory (ticket #24): every loadable
/// context's fixture re-recognizes through <see cref="PKHexApi.Load"/>,
/// surfaces exactly one seeded box mon, and round-trips an export/reload
/// cycle. This is the seam the E2E suite consumes via tools/fixturegen.
/// </summary>
public sealed class FixtureFactoryTests
{
    public static TheoryData<EntityContext> Loadable => new(TestSaves.LoadableContexts);

    [Theory]
    [MemberData(nameof(Loadable))]
    public void Every_loadable_context_reloads_with_the_seeded_mon(EntityContext context)
    {
        var game = PKHexApi.Load(TestSaves.WithBoxMon(context));
        var mon = Assert.Single(PKHexApi.GameBoxMonHandles(game, 0));
        Assert.Equal(TestSaves.Species, PKHexApi.MonSpecies(mon));
        Assert.Equal(TestSaves.Level, PKHexApi.MonLevel(mon));

        var reloaded = PKHexApi.Load(PKHexApi.SaveBytes(game));
        var mon2 = Assert.Single(PKHexApi.GameBoxMonHandles(reloaded, 0));
        Assert.Equal(TestSaves.Species, PKHexApi.MonSpecies(mon2));

        if (context is EntityContext.Gen1 or EntityContext.Gen2)
        {
            // GB recognition requires the party list seeded too
            Assert.Equal(
                TestSaves.Species,
                PKHexApi.MonSpecies(Assert.Single(PKHexApi.GamePartyMonHandles(reloaded))));
        }
    }

    [Fact]
    public void Tier_partition_covers_every_loadable_context()
    {
        var edit = TestSaves.EditTierContexts.ToHashSet();
        var readOnly = TestSaves.ReadOnlyLoadableContexts.ToHashSet();

        Assert.Empty(edit.Intersect(readOnly));
        Assert.Superset(
            TestSaves.LoadableContexts.ToHashSet(),
            edit.Union(readOnly).ToHashSet());
    }

    /// <summary>
    /// Classification coverage for the contexts blank fixtures cannot serve
    /// (#22 probe, pinned so upstream changes surface as intentional edits):
    /// Gen 3/4 blanks cannot Write() at all; Swish-family blanks (SwSh, PLA,
    /// SV, Z-A) write bytes whose block layout matches no retail size, so
    /// SaveUtil cannot re-recognize them. Neither is loadable via the API.
    /// </summary>
    [Theory]
    [InlineData(EntityContext.Gen3)]
    [InlineData(EntityContext.Gen4)]
    [InlineData(EntityContext.Gen8)]
    [InlineData(EntityContext.Gen8a)]
    [InlineData(EntityContext.Gen9)]
    [InlineData(EntityContext.Gen9a)]
    public void Unloadable_contexts_stay_unloadable_through_the_api(EntityContext context)
    {
        byte[]? bytes = null;
        try
        {
            bytes = TestSaves.WithBoxMon(context);
        }
        catch (Exception)
        {
            // Write()-time failure (Gen 3/4): classification holds.
            return;
        }

        // Written but not re-recognizable (Swish family).
        Assert.Throws<InvalidDataException>(() => PKHexApi.Load(bytes));
    }
}
