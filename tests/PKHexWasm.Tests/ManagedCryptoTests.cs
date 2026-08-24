using System.Buffers.Binary;
using System.Security.Cryptography;
using PKHeX.Core;

namespace PKHexWasm.Tests;

/// <summary>
/// Managed crypto verification bar (ticket #21): RFC 1321 vectors for MD5,
/// NIST SP 800-38A vectors for AES-128 ECB/CBC-NoPadding, oracle
/// cross-checks against the platform implementations (available headless),
/// and the bootstrap contract that Initialize() swaps providers in.
/// </summary>
public sealed class ManagedCryptoTests
{
    // RFC 1321 section A.5 test suite.
    public static TheoryData<string, string> Md5Rfc1321 => new()
    {
        { "", "d41d8cd98f00b204e9800998ecf8427e" },
        { "a", "0cc175b9c0f1b6a831c399e269772661" },
        { "abc", "900150983cd24fb0d6963f7d28e17f72" },
        { "message digest", "f96b697d7cb7938d525a2f31aaf161d0" },
        { "abcdefghijklmnopqrstuvwxyz", "c3fcd3d76192e4007dfb496cca67e13b" },
        {
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            "d174ab98d277d9f5a5611c2c9f419d9f"
        },
        {
            "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
            "57edf4a22be3c955ac49da2e2107b67a"
        },
    };

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

    // NIST SP 800-38A F.1.1 ECB-AES128.Encrypt and F.1.2 ECB-AES128.Decrypt.
    private const string NistAes128Key = "2b7e151628aed2a6abf7158809cf4f3c";
    private static readonly string[] EcbPlaintext =
    [
        "6bc1bee22e409f96e93d7e117393172a",
        "ae2d8a571e03ac9c9eb76fac45af8e51",
        "30c81c46a35ce411e5fbc1191a0a52ef",
        "f69f2445df4f9b17ad2b417be66c3710",
    ];
    private static readonly string[] EcbCiphertext =
    [
        "3ad77bb40d7a3660a89ecaf32466ef97",
        "f5d3d58503b9699de785895a96fdbaaf",
        "43b1cd7f598ece23881b00e3ed030688",
        "7b0c785e27e8ad3f8223207104725dd4",
    ];

    // NIST SP 800-38A F.2.1 CBC-AES128.Encrypt; IV from F.2.1.
    private const string NistCbcIv = "000102030405060708090a0b0c0d0e0f";
    private static readonly string[] CbcCiphertext =
    [
        "7649abac8119b246cee98e9b12e9197d",
        "5086cb9b507219ee95db113a917678b2",
        "73bed6b8e3c1743b7116e69e22229516",
        "3ff1caa1681fac09120eca307586e1a7",
    ];

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

            using var managed = ManagedProvider().Create(key, mode, PaddingMode.None, iv);

            var cipherText = new byte[plaintext.Length];
            InvokeEncrypt(managed, mode, plaintext, cipherText);

            var roundTripped = new byte[plaintext.Length];
            InvokeDecrypt(managed, mode, cipherText, roundTripped);
            Assert.Equal(plaintext, roundTripped);

            if (iv is null)
            {
                using var oracle = Aes.Create();
                oracle.Mode = mode;
                oracle.Padding = PaddingMode.None;
                oracle.Key = key;
                Assert.Equal(oracle.EncryptEcb(plaintext, PaddingMode.None), cipherText);
            }
            else
            {
                using var oracle = Aes.Create();
                oracle.Mode = mode;
                oracle.Padding = PaddingMode.None;
                oracle.Key = key;
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
        ManagedProvider().Create(Convert.FromHexString(keyHex), mode, PaddingMode.None,
            iv is null ? null : Convert.FromHexString(iv));

    private static IAesCryptographyProvider ManagedProvider() => new ManagedAes();

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
}
