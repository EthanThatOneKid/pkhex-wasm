using System;

namespace Org.BouncyCastle.Utilities;

/// <summary>
/// Trimmed from upstream bc-csharp (util/Platform.cs) to the type-name helper
/// used by the vendored AesEngine error paths. Bodies are verbatim.
/// </summary>
internal static class Platform
{
    internal static string GetTypeName(object obj)
    {
        return GetTypeName(obj?.GetType());
    }

    internal static string GetTypeName(Type t)
    {
        return t?.FullName ?? "null";
    }
}
