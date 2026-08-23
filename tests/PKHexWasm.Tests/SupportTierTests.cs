using PKHeX.Core;

namespace PKHexWasm.Tests;

/// <summary>
/// Exhaustive tier classification over every constructible format, pinning
/// the locked generation matrix (docs/spec/v1-api.md) as the single contract.
/// </summary>
public sealed class SupportTierTests
{
    [Theory]
    [InlineData(EntityContext.Gen1, SupportTier.ReadOnly)]
    [InlineData(EntityContext.Gen2, SupportTier.ReadOnly)]
    [InlineData(EntityContext.Gen3, SupportTier.Edit)]
    [InlineData(EntityContext.Gen4, SupportTier.Edit)]
    [InlineData(EntityContext.Gen5, SupportTier.Edit)]
    [InlineData(EntityContext.Gen6, SupportTier.Edit)]
    [InlineData(EntityContext.Gen7, SupportTier.Edit)]
    [InlineData(EntityContext.Gen7b, SupportTier.ReadOnly)] // LGPE
    [InlineData(EntityContext.Gen8, SupportTier.Edit)] // SwSh
    [InlineData(EntityContext.Gen8a, SupportTier.ReadOnly)] // PLA
    [InlineData(EntityContext.Gen8b, SupportTier.Edit)] // BDSP
    [InlineData(EntityContext.Gen9, SupportTier.Edit)] // SV
    [InlineData(EntityContext.Gen9a, SupportTier.Edit)] // Legends Z-A
    public void Classifies_every_constructible_format_per_the_locked_matrix(
        EntityContext context, SupportTier expected)
    {
        Assert.Equal(expected, context.Tier());
    }
}
