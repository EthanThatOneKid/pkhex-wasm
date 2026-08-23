using System.Text;

namespace PKHexWasm;

/// <summary>
/// Message tags that let the TypeScript layer rethrow wasm-side guard
/// failures as the locked JS error classes. The mono-wasm boundary delivers
/// only the exception message text (no managed type identity), so the tag
/// prefix is the machine-readable contract; clients strip it for display.
/// </summary>
internal static class ErrorTags
{
    public const string Tier = "UnsupportedTierError:";
    public const string Operation = "UnsupportedOperationError:";
    public const string Range = "RangeError:";

    public static string Compose(string tag, string clause)
    {
        var sb = new StringBuilder(tag.Length + clause.Length + 1);
        sb.Append(tag);
        sb.Append(' ');
        sb.Append(clause);
        return sb.ToString();
    }
}

/// <summary>A mutator was called on a read-only-tier save (Gen 1-2, LGPE, PLA).</summary>
public sealed class UnsupportedTierException(string operation, string context)
    : InvalidOperationException(ErrorTags.Compose(
        ErrorTags.Tier, $"{operation} is not available on {context} saves (read-only tier)"))
{
    /// <summary>Exported surface operation that was rejected, e.g. <c>setLevel</c>.</summary>
    public string Operation { get; } = operation;
}

/// <summary>An operation has no meaning for the entity's generation (e.g. natures before Gen 3).</summary>
public sealed class UnsupportedOperationException(string operation, string context)
    : InvalidOperationException(ErrorTags.Compose(
        ErrorTags.Operation, $"{operation} does not exist on {context} entities"))
{
    /// <summary>Exported surface operation that was rejected, e.g. <c>setNature</c>.</summary>
    public string Operation { get; } = operation;
}
