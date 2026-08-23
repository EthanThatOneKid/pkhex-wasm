using PKHeX.Core;

namespace PKHexWasm;

/// <summary>
/// Support tier of a save format per the locked v1 generation matrix
/// (docs/spec/v1-api.md): every mutator applies within the edit tier;
/// read-only tiers reject all mutators with descriptive errors.
/// </summary>
public enum SupportTier
{
    /// <summary>Gen 3-7, SwSh, BDSP, SV, Legends Z-A - all seven mutators apply.</summary>
    Edit,

    /// <summary>Gen 1-2, LGPE, PLA - loads and inspects; mutators reject.</summary>
    ReadOnly,
}

/// <summary>Single source of truth for tier classification, shared by guards and tests.</summary>
public static class SupportTierExtensions
{
    /// <summary>Classifies a save format context into its v1 support tier.</summary>
    public static SupportTier Tier(this EntityContext context) => context switch
    {
        EntityContext.Gen1 or EntityContext.Gen2 or EntityContext.Gen7b or EntityContext.Gen8a =>
            SupportTier.ReadOnly,
        EntityContext.Gen3 or EntityContext.Gen4 or EntityContext.Gen5 or EntityContext.Gen6 or
            EntityContext.Gen7 or EntityContext.Gen8 or EntityContext.Gen8b or EntityContext.Gen9 or
            EntityContext.Gen9a => SupportTier.Edit,
        _ => throw new ArgumentOutOfRangeException(nameof(context), context, "unclassified entity context"),
    };
}
