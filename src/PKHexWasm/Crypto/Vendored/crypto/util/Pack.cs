using System.Buffers.Binary;

namespace Org.BouncyCastle.Crypto.Utilities;

/// <summary>
/// Trimmed from upstream bc-csharp (crypto/util/Pack.cs) to the little-endian
/// word conversions used by the vendored MD5Digest and AesEngine. Bodies are
/// verbatim upstream implementations.
/// </summary>
internal static class Pack
{
    internal static void UInt32_To_LE(uint n, byte[] bs)
    {
#if NETCOREAPP2_1_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        BinaryPrimitives.WriteUInt32LittleEndian(bs, n);
#else
        bs[0] = (byte)n;
        bs[1] = (byte)(n >> 8);
        bs[2] = (byte)(n >> 16);
        bs[3] = (byte)(n >> 24);
#endif
    }

    internal static void UInt32_To_LE(uint n, byte[] bs, int off)
    {
#if NETCOREAPP2_1_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        BinaryPrimitives.WriteUInt32LittleEndian(bs.AsSpan(off), n);
#else
        bs[off] = (byte)n;
        bs[off + 1] = (byte)(n >> 8);
        bs[off + 2] = (byte)(n >> 16);
        bs[off + 3] = (byte)(n >> 24);
#endif
    }

    internal static void UInt32_To_LE(uint n, Span<byte> bs)
    {
        BinaryPrimitives.WriteUInt32LittleEndian(bs, n);
    }

    internal static uint LE_To_UInt32(byte[] bs)
    {
#if NETCOREAPP2_1_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        return BinaryPrimitives.ReadUInt32LittleEndian(bs);
#else
        return bs[0]
            | (uint)bs[1] << 8
            | (uint)bs[2] << 16
            | (uint)bs[3] << 24;
#endif
    }

    internal static uint LE_To_UInt32(byte[] bs, int off)
    {
#if NETCOREAPP2_1_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        return BinaryPrimitives.ReadUInt32LittleEndian(bs.AsSpan(off));
#else
        return bs[off]
            | (uint)bs[off + 1] << 8
            | (uint)bs[off + 2] << 16
            | (uint)bs[off + 3] << 24;
#endif
    }

    internal static uint LE_To_UInt32(ReadOnlySpan<byte> bs)
    {
        return BinaryPrimitives.ReadUInt32LittleEndian(bs);
    }

    internal static uint LE_To_UInt32(ReadOnlySpan<byte> bs, int off)
    {
        return BinaryPrimitives.ReadUInt32LittleEndian(bs[off..]);
    }
}
