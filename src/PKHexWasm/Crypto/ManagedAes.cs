using System.Security.Cryptography;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Parameters;
using PKHeX.Core;

namespace PKHexWasm;

/// <summary>
/// Managed AES provider over the vendored BouncyCastle block cipher,
/// supporting the two shapes PKHeX.Core needs under wasmbrowser:
/// AES-128-ECB-NoPadding (MemeCrypto) and AES-128-CBC-NoPadding (HOME).
/// The CBC chaining is this repository's own work; see PROVENANCE.md.
/// </summary>
public sealed class ManagedAes : IAesCryptographyProvider
{
    private const int BlockSize = 16;

    public IAesCryptographyProvider.IAes Create(byte[] key, CipherMode mode, PaddingMode padding, byte[]? iv = null)
    {
        ArgumentNullException.ThrowIfNull(key);
        if (padding != PaddingMode.None)
        {
            throw new NotSupportedException("the managed AES provider only supports NoPadding");
        }
        return mode switch
        {
            CipherMode.ECB => new EcbSession(key),
            CipherMode.CBC when iv is not null => new CbcSession(key, iv),
            CipherMode.CBC => throw new NotSupportedException("CBC requires an initialization vector"),
            _ => throw new NotSupportedException($"cipher mode '{mode}' is not supported by the managed AES provider"),
        };
    }

    private abstract class BlockSession : IAesCryptographyProvider.IAes
    {
        protected const int Size = ManagedAes.BlockSize;

        private readonly AesEngine _engine = new();
        protected readonly byte[] Key;

        protected BlockSession(byte[] key) => Key = (byte[])key.Clone();

        public void Dispose() { }

        public abstract void EncryptEcb(ReadOnlySpan<byte> plaintext, Span<byte> destination);
        public abstract void DecryptEcb(ReadOnlySpan<byte> ciphertext, Span<byte> destination);
        public abstract void EncryptCbc(ReadOnlySpan<byte> plaintext, Span<byte> destination);
        public abstract void DecryptCbc(ReadOnlySpan<byte> ciphertext, Span<byte> destination);

        /// <summary>Runs one engine pass per aligned block (ECB semantics).</summary>
        protected void TransformBlocks(bool forEncryption, ReadOnlySpan<byte> input, Span<byte> destination)
        {
            EnsureTransformable(input, destination);
            _engine.Init(forEncryption, new KeyParameter(Key));
            for (var offset = 0; offset < input.Length; offset += Size)
            {
                _engine.ProcessBlock(input.Slice(offset, Size), destination.Slice(offset, Size));
            }
        }

        protected static void EnsureTransformable(ReadOnlySpan<byte> input, Span<byte> destination)
        {
            if (input.Length % Size != 0 || destination.Length < input.Length)
            {
                throw new ArgumentException(
                    $"AES-NoPadding requires {Size}-byte aligned input that fits the destination");
            }
        }
    }

    private sealed class EcbSession : BlockSession
    {
        public EcbSession(byte[] key) : base(key) { }

        public override void EncryptEcb(ReadOnlySpan<byte> plaintext, Span<byte> destination) =>
            TransformBlocks(forEncryption: true, plaintext, destination);

        public override void DecryptEcb(ReadOnlySpan<byte> ciphertext, Span<byte> destination) =>
            TransformBlocks(forEncryption: false, ciphertext, destination);

        public override void EncryptCbc(ReadOnlySpan<byte> plaintext, Span<byte> destination) =>
            throw new NotSupportedException("this session was created for ECB");

        public override void DecryptCbc(ReadOnlySpan<byte> ciphertext, Span<byte> destination) =>
            throw new NotSupportedException("this session was created for ECB");
    }

    private sealed class CbcSession : BlockSession
    {
        private readonly byte[] _iv;

        public CbcSession(byte[] key, byte[] iv) : base(key)
        {
            if (iv.Length != Size)
            {
                throw new ArgumentException($"the initialization vector must be {Size} bytes", nameof(iv));
            }
            _iv = (byte[])iv.Clone();
        }

        public override void EncryptEcb(ReadOnlySpan<byte> plaintext, Span<byte> destination) =>
            throw new NotSupportedException("this session was created for CBC");

        public override void DecryptEcb(ReadOnlySpan<byte> ciphertext, Span<byte> destination) =>
            throw new NotSupportedException("this session was created for CBC");

        public override void EncryptCbc(ReadOnlySpan<byte> plaintext, Span<byte> destination)
        {
            EnsureTransformable(plaintext, destination);
            var engine = new AesEngine();
            engine.Init(forEncryption: true, new KeyParameter(Key));
            Span<byte> chain = stackalloc byte[Size];
            _iv.CopyTo(chain);
            Span<byte> masked = stackalloc byte[Size];
            for (var offset = 0; offset < plaintext.Length; offset += Size)
            {
                var cipher = destination.Slice(offset, Size);
                plaintext.Slice(offset, Size).CopyTo(masked);
                for (var i = 0; i < Size; i++)
                {
                    masked[i] ^= chain[i];
                }
                engine.ProcessBlock(masked, cipher);
                cipher.CopyTo(chain);
            }
        }

        public override void DecryptCbc(ReadOnlySpan<byte> ciphertext, Span<byte> destination)
        {
            EnsureTransformable(ciphertext, destination);
            var engine = new AesEngine();
            engine.Init(forEncryption: false, new KeyParameter(Key));
            Span<byte> chain = stackalloc byte[Size];
            _iv.CopyTo(chain);
            Span<byte> decrypted = stackalloc byte[Size];
            for (var offset = 0; offset < ciphertext.Length; offset += Size)
            {
                var block = ciphertext.Slice(offset, Size);
                engine.ProcessBlock(block, decrypted);
                for (var i = 0; i < Size; i++)
                {
                    decrypted[i] ^= chain[i];
                }
                decrypted.CopyTo(destination.Slice(offset, Size));
                block.CopyTo(chain);
            }
        }
    }
}
