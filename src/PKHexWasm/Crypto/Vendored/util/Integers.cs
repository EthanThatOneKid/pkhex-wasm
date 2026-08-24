using System.Numerics;
using System.Runtime.CompilerServices;

namespace Org.BouncyCastle.Utilities;

/// <summary>
/// Trimmed from upstream bc-csharp (util/Integers.cs) to the rotations used
/// by the vendored MD5Digest. Bodies are verbatim upstream implementations.
/// </summary>
internal static class Integers
{
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static int RotateLeft(int i, int distance)
    {
        return (int)BitOperations.RotateLeft((uint)i, distance);
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public static uint RotateLeft(uint i, int distance)
    {
        return BitOperations.RotateLeft(i, distance);
    }
}
