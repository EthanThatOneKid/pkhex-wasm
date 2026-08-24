using Org.BouncyCastle.Crypto.Digests;
using PKHeX.Core;

namespace PKHexWasm;

/// <summary>
/// Managed MD5 provider over the vendored BouncyCastle digest. Replaces the
/// platform default, whose native backing is unavailable under wasmbrowser -
/// the BDSP whole-save checksum depends on this being registered at init.
/// </summary>
public sealed class ManagedMd5 : IMd5Provider
{
    public void HashData(ReadOnlySpan<byte> source, Span<byte> destination)
    {
        // Digest instances carry mutable state; allocate per call so the
        // singleton provider stays safe under concurrent saves.
        var digest = new MD5Digest();
        digest.BlockUpdate(source);
        digest.DoFinal(destination);
    }
}
