using System.Buffers.Binary;
using System.Security.Cryptography;
using System.Text.Json;
using PKHeX.Core;
using PKHexWasm.TestSupport;

namespace PKHexWasm.Tests;

/// <summary>
/// Managed crypto verification bar (ticket #21): RFC 1321 vectors for MD5,
/// NIST SP 800-38A vectors for AES-128 ECB/CBC-NoPadding, oracle
/// cross-checks against the platform implementations (available headless),
/// and the bootstrap contract that Initialize() swaps providers in.
///
/// The vectors live in tests/crypto-vectors.json - the single source of truth
/// shared with the JS E2E suite (spec: constants shared across layers), so
/// both layers assert identical results.
/// </summary>
public sealed class ManagedCryptoTests
{
    private static readonly Lazy<CryptoVectors> Vectors = new(() =>
        JsonSerializer.Deserialize<CryptoVectors>(
            File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "crypto-vectors.json")),
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
        ?? throw new InvalidOperationException("crypto-vectors.json deserialized to null"));

    public static TheoryData<string, string> Md5Rfc1321
    {
        get
        {
            var data = new TheoryData<string, string>();
            foreach (var v in Vectors.Value.Md5Rfc1321)
            {
                data.Add(v.Input!, v.DigestHex!);
            }
            return data;
        }
    }

    [Theory]
    [MemberData(nameof(Md5Rfc1321))]
    public void ManagedMd5_matches_rfc1321_vectors(string input, string expectedHex)
    {
        Span<byte> digest = stackalloc byte[16];
        new ManagedMd5().HashData(System.Text.Encoding.ASCII.GetBytes(input), digest);
        Assert.Equal(expectedHex, Convert.ToHexString(digest).ToLowerInvariant());
    }

    [Fact]
    public void ManagedMd5_matches_platform_oracle_on_random_buffers()
    {
        var provider = new ManagedMd5();
        for (var length = 0; length <= 1024; length += 97)
        {
            var source = RandomBytes(length);
            var managed = new byte[16];
            var platform = new byte[16];
            provider.HashData(source, managed);
            MD5.HashData(source, platform);
            Assert.Equal(platform, managed);
        }
    }

    // NIST SP 800-38A F.2.1 CBC-AES128.Encrypt; IV from F.2.1.
    private static string NistAes128Key => Vectors.Value.Aes128NistSp80038A.KeyHex!;
    private static string[] EcbPlaintext => Vectors.Value.Aes128NistSp80038A.PlaintextBlocksHex!.ToArray();
    private static string[] EcbCiphertext => Vectors.Value.Aes128NistSp80038A.EcbCiphertextBlocksHex!.ToArray();
    private static string NistCbcIv => Vectors.Value.Aes128NistSp80038A.CbcIvHex!;
    private static string[] CbcCiphertext => Vectors.Value.Aes128NistSp80038A.CbcCiphertextBlocksHex!.ToArray();

    [Fact]
    public void ManagedAes_ecb_encrypt_matches_nist_sp800_38a()
    {
        using var aes = CreateManaged(NistAes128Key, CipherMode.ECB, iv: null);
        AssertRoundTripVectors(aes.EncryptEcb, EcbPlaintext, EcbCiphertext);
    }

    [Fact]
    public void ManagedAes_ecb_decrypt_matches_nist_sp800_38a()
    {
        using var aes = CreateManaged(NistAes128Key, CipherMode.ECB, iv: null);
        AssertRoundTripVectors(aes.DecryptEcb, EcbCiphertext, EcbPlaintext);
    }

    [Fact]
    public void ManagedAes_cbc_encrypt_matches_nist_sp800_38a()
    {
        using var aes = CreateManaged(NistAes128Key, CipherMode.CBC, NistCbcIv);
        AssertRoundTripVectors(aes.EncryptCbc, EcbPlaintext, CbcCiphertext);
    }

    [Fact]
    public void ManagedAes_cbc_decrypt_matches_nist_sp800_38a()
    {
        using var aes = CreateManaged(NistAes128Key, CipherMode.CBC, NistCbcIv);
        AssertRoundTripVectors(aes.DecryptCbc, CbcCiphertext, EcbPlaintext);
    }

    [Fact]
    public void ManagedAes_round_trips_against_platform_oracle_in_both_modes()
    {
        foreach (var mode in new[] { CipherMode.ECB, CipherMode.CBC })
        {
            var key = RandomBytes(16);
            var iv = mode == CipherMode.CBC ? RandomBytes(16) : null;
            var plaintext = RandomBytes(16 * 7);

            using var managed = new ManagedAes().Create(key, mode, PaddingMode.None, iv);

            var cipherText = new byte[plaintext.Length];
            InvokeEncrypt(managed, mode, plaintext, cipherText);

            var roundTripped = new byte[plaintext.Length];
            InvokeDecrypt(managed, mode, cipherText, roundTripped);
            Assert.Equal(plaintext, roundTripped);

            using var oracle = Aes.Create();
            oracle.Mode = mode;
            oracle.Padding = PaddingMode.None;
            oracle.Key = key;
            if (iv is null)
            {
                Assert.Equal(oracle.EncryptEcb(plaintext, PaddingMode.None), cipherText);
            }
            else
            {
                oracle.IV = iv;
                Assert.Equal(oracle.EncryptCbc(plaintext, iv, PaddingMode.None), cipherText);
            }
        }
    }

    [Fact]
    public void Initialize_registers_managed_providers_before_any_parse()
    {
        // The default providers use native APIs that throw under wasmbrowser;
        // Initialize() must swap in the managed ones exactly once.
        PKHexApi.Initialize();

        Assert.IsType<ManagedAes>(RuntimeCryptographyProvider.Aes);
        Assert.IsType<ManagedMd5>(RuntimeCryptographyProvider.Md5);

        // idempotent: a second call does not disturb the registered instances
        var aes = RuntimeCryptographyProvider.Aes;
        PKHexApi.Initialize();
        Assert.Same(aes, RuntimeCryptographyProvider.Aes);

        // and the BDSP checksum seam now runs through the managed path
        var game = PKHexApi.Load(TestSaves.WithBoxMon(EntityContext.Gen8b));
        Assert.NotEmpty(PKHexApi.SaveBytes(game));
    }

    private static IAesCryptographyProvider.IAes CreateManaged(string keyHex, CipherMode mode, string? iv) =>
        new ManagedAes().Create(Convert.FromHexString(keyHex), mode, PaddingMode.None,
            iv is null ? null : Convert.FromHexString(iv));

    private static void AssertRoundTripVectors(
        Action<ReadOnlySpan<byte>, Span<byte>> transform,
        string[] inputs, string[] expected)
    {
        var combinedInput = Convert.FromHexString(string.Concat(inputs));
        var combinedExpected = Convert.FromHexString(string.Concat(expected));
        var actual = new byte[combinedInput.Length];
        transform(combinedInput, actual);
        Assert.Equal(combinedExpected, actual);
    }

    private static void InvokeEncrypt(
        IAesCryptographyProvider.IAes session, CipherMode mode,
        ReadOnlySpan<byte> input, Span<byte> destination)
    {
        if (mode == CipherMode.ECB)
        {
            session.EncryptEcb(input, destination);
        }
        else
        {
            session.EncryptCbc(input, destination);
        }
    }

    private static void InvokeDecrypt(
        IAesCryptographyProvider.IAes session, CipherMode mode,
        ReadOnlySpan<byte> input, Span<byte> destination)
    {
        if (mode == CipherMode.ECB)
        {
            session.DecryptEcb(input, destination);
        }
        else
        {
            session.DecryptCbc(input, destination);
        }
    }

    private static byte[] RandomBytes(int length)
    {
        var bytes = new byte[length];
        Random.Shared.NextBytes(bytes);
        return bytes;
    }

    private sealed record CryptoVectors(
        IReadOnlyList<Md5Vector> Md5Rfc1321,
        AesVectors Aes128NistSp80038A);

    private sealed record Md5Vector(string? Input, string? DigestHex);

    private sealed record AesVectors(
        string? KeyHex,
        string? CbcIvHex,
        IReadOnlyList<string> PlaintextBlocksHex,
        IReadOnlyList<string> EcbCiphertextBlocksHex,
        IReadOnlyList<string> CbcCiphertextBlocksHex);
}
