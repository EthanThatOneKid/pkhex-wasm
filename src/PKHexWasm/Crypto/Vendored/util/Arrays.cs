using System.Security.Cryptography;

namespace Org.BouncyCastle.Utilities;

/// <summary>
/// Trimmed from upstream bc-csharp (util/Arrays.cs) to the members used by
/// the vendored MD5Digest, AesEngine, and KeyParameter. Bodies are verbatim
/// upstream implementations.
/// </summary>
internal static class Arrays
{
    public static byte[] Clone(byte[] data)
    {
        if (data == null)
            return null;

#if NET5_0_OR_GREATER
        byte[] result = GC.AllocateUninitializedArray<byte>(data.Length);
#else
        byte[] result = new byte[data.Length];
#endif
        Buffer.BlockCopy(data, 0, result, 0, data.Length);
        return result;
    }

    public static T[] CopyBuffer<T>(T[] buf)
    {
        if (buf == null)
            return null;

        return InternalCopyBuffer(buf);
    }

    public static void CopyBufferToSegment<T>(T[] srcBuf, T[] dstBuf, int dstOff, int dstLen)
    {
        if (srcBuf == null)
            throw new ArgumentNullException(nameof(srcBuf));
        if (dstBuf == null)
            throw new ArgumentNullException(nameof(dstBuf));

        InternalCopyBufferToSegment(srcBuf, dstBuf, dstOff, dstLen);
    }

    public static T[] CopySegment<T>(T[] buf, int off, int len)
    {
        if (buf == null)
            return null;

        return InternalCopySegment(buf, off, len);
    }

    public static T[] InternalCopyBuffer<T>(T[] buf)
    {
#if NET5_0_OR_GREATER
        T[] result = GC.AllocateUninitializedArray<T>(buf.Length);
#else
        T[] result = new T[buf.Length];
#endif
        Array.Copy(buf, 0, result, 0, buf.Length);
        return result;
    }

    public static bool FixedTimeEquals(byte[] a, byte[] b)
    {
        if (a.Length != b.Length)
            return false;

        return CryptographicOperations.FixedTimeEquals(a, b);
    }

    public static void Reverse(byte[] buf, byte[] reversed)
    {
        int n = buf.Length;
        for (int i = 0; i < n; ++i)
        {
            reversed[i] = buf[n - 1 - i];
        }
    }

    private static void InternalCopyBufferToSegment<T>(T[] srcBuf, T[] dstBuf, int dstOff, int dstLen)
    {
        if (srcBuf.Length != dstLen)
            throw new ArgumentOutOfRangeException(nameof(dstLen));

        Array.Copy(srcBuf, 0, dstBuf, dstOff, dstLen);
    }

    private static T[] InternalCopySegment<T>(T[] buf, int off, int len)
    {
#if NETCOREAPP2_1_OR_GREATER || NETSTANDARD2_1_OR_GREATER
        return buf.AsSpan(off, len).ToArray();
#else
        T[] result = new T[len];
        Array.Copy(buf, off, result, 0, len);
        return result;
#endif
    }
}
