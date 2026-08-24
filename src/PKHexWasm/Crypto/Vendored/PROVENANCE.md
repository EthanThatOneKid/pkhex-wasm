# Vendored cryptography sources — provenance

Managed crypto for the wasm host (ticket #21; decision record: [#17](https://github.com/EthanThatOneKid/pkhex-wasm/issues/17)).

## Source

- **Upstream**: [bcgit/bc-csharp](https://github.com/bcgit/bc-csharp) (BouncyCastle C# distribution)
- **License**: MIT — see [`LICENSE.md`](./LICENSE.md) (verbatim at the pinned commit)
- **Pinned commit**: `214b5f881be55d708e528ae43693a70211557075`
- **Fetched**: 2026-08-23 from `raw.githubusercontent.com` / shallow git fetch of the exact SHA above

## Files

Algorithm files are **verbatim** upstream sources (diffable against the pinned SHA); support
utilities are trimmed to the members the algorithm files reference, with bodies verbatim.
Original namespaces and file layout are preserved so future re-syncs stay mechanical.

| Vendored path | Upstream path | State |
| --- | --- | --- |
| `crypto/digests/MD5Digest.cs` | `crypto/src/crypto/digests/MD5Digest.cs` | verbatim |
| `crypto/digests/GeneralDigest.cs` | `crypto/src/crypto/digests/GeneralDigest.cs` | verbatim |
| `crypto/engines/AesEngine.cs` | `crypto/src/crypto/engines/AesEngine.cs` | verbatim |
| `crypto/parameters/KeyParameter.cs` | `crypto/src/crypto/parameters/KeyParameter.cs` | verbatim |
| `crypto/IBlockCipher.cs` | `crypto/src/crypto/IBlockCipher.cs` | verbatim |
| `crypto/ICipherParameters.cs` | `crypto/src/crypto/ICipherParameters.cs` | verbatim |
| `crypto/IDigest.cs` | `crypto/src/crypto/IDigest.cs` | verbatim |
| `crypto/CryptoException.cs` | `crypto/src/crypto/CryptoException.cs` | verbatim |
| `crypto/DataLengthException.cs` | `crypto/src/crypto/DataLengthException.cs` | verbatim |
| `crypto/Check.cs` | `crypto/src/crypto/Check.cs` | verbatim |
| `crypto/OutputLengthException.cs` | `crypto/src/crypto/OutputLengthException.cs` | verbatim |
| `util/IMemoable.cs` | `crypto/src/util/IMemoable.cs` | verbatim |
| `util/Pack.cs` | `crypto/src/crypto/util/Pack.cs` | trimmed to LE word conversions used here |
| `util/Arrays.cs` | `crypto/src/util/Arrays.cs` | trimmed to `Clone`/`CopyBuffer*`/`CopySegment`/`FixedTimeEquals`/`Reverse` |
| `util/Integers.cs` | `crypto/src/util/Integers.cs` | trimmed to `RotateLeft` overloads |
| `util/Platform.cs` | `crypto/src/util/Platform.cs` | trimmed to `GetTypeName` |

## Modifications log

- No algorithm file is modified. Trimmed utility files keep upstream bodies verbatim and note
  their trims in a header comment.
- CBC-NoPadding chaining is **not** vendored: it is implemented in this repository as our own
  work (`src/PKHexWasm/Crypto/ManagedAes.cs`, a ~40-line XOR chain around the vendored
  `AesEngine`), shrinking the vendored license surface per the [#17 verdict](https://github.com/EthanThatOneKid/pkhex-wasm/issues/17).

## Re-sync ritual

On an upstream bump: update the pinned commit here, re-copy each file, re-apply trims,
and run the full crypto vector suite (`dotnet test --filter ManagedCryptoTests`).
