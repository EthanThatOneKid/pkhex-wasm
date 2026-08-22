# Research: In-browser crypto requirements of PKHeX.Core

**Issue:** #5 · **Method:** direct source inspection of `kwsch/PKHeX` (shallow clone, current master) and `arleypadua/PKHeX.Everywhere` (raw file fetches), plus the official .NET compatibility doc for Blazor WASM cryptography.

## 1. The constraint: what Blazor WASM actually allows

Per [Cryptography APIs not supported on Blazor WebAssembly](https://learn.microsoft.com/en-us/dotnet/core/compatibility/cryptography/5.0/cryptography-apis-not-supported-on-blazor-webassembly) (.NET 5+): **every** `System.Security.Cryptography` API throws `PlatformNotSupportedException` in the browser **except**:

- `RandomNumberGenerator`
- `IncrementalHash`
- `SHA1`, `SHA256`, `SHA384`, `SHA512` (+ their `*Managed` variants)

So `Aes.Create()` and `MD5.HashData(...)` throw; the SHA family and `IncrementalHash` work (managed implementations ship in the browser runtime pack). PKHeX.Core itself documents this exact rationale in `IAesCryptographyProvider.cs` remarks.

## 2. Complete inventory of crypto call sites in PKHeX.Core

Grep-verified across the whole of `PKHeX.Core` (`MD5|SHA1|SHA256|Aes|HMAC|RSA|RNGCryptoServiceProvider|RandomNumberGenerator|IncrementalHash|...`). This is the exhaustive list — there are no other `System.Security.Cryptography` consumers in the library.

| API | Call site(s) | Generation / save-format impact | Managed fallback on Blazor WASM? | JS bridge needed? |
|---|---|---|---|---|
| `MD5.HashData` (via `IMd5Provider`) | `Saves/SAV8BS.cs:177` → `RuntimeCryptographyProvider.Md5` | **Gen 8b (BDSP)** whole-save MD5 @ `0xE9818`, recomputed on every load + export/checksum-fix | No — throws PNSE | **Yes** |
| `Aes` ECB/NoPadding (via `IAesCryptographyProvider`) | `Saves/Encryption/MemeCrypto/MemeKey.cs:134` → `RuntimeCryptographyProvider.Aes` (used by `MemeCrypto.VerifyMemePOKE`/`SignInPlace`) | **Gen 7 (SM/USUM)** save export re-signature block; QR/competition "POKE" payload verify/sign | No — throws PNSE | **Yes** |
| `Aes` CBC/NoPadding (via `IAesCryptographyProvider`) | `PKM/HOME/HomeCrypto.cs:100` → `RuntimeCryptographyProvider.Aes` | **Pokémon HOME** entity crypt (PK8/PB7/PB8/PA8/PK9 import & export) | No — throws PNSE | **Yes** |
| `SHA1.HashData` | `ColoCrypto.cs:85,106,141,166`; `SAV4Ranch.cs:160`; `MemeCrypto.cs:96,119`; `SaveHandlerNSO.cs:43` | Gen 3 GC (**Colosseum/XD**) slot decrypt+checksums; **Ranch** checksums; **Gen 7** signature chain; **NSO (Switch Online)** dump finalize/re-sign | Yes (whitelisted) | No |
| `SHA256.HashData` | `MemeCrypto.cs:160` | Gen 7 export signature block input | Yes (whitelisted) | No |
| `IncrementalHash` SHA256 | `SwishCrypto/SwishCrypto.cs:76` (`ComputeHash`) | **Gen 8 SwSh / PLA / Gen 9 SV+ZA** save load validation (`GetIsHashValid` from `SaveUtil.IsG8LA/IsG8SWSH/IsG9SV/IsG9ZA`) and export hash | Yes (whitelisted) | No |
| `IncrementalHash` SHA1 | `MemeKey.cs:144` (`GetAesKey`) | AES key derivation for MemeCrypto (Gen 7 sign path) | Yes (whitelisted) | No |
| `RandomNumberGenerator` / `RNGCryptoServiceProvider` | **not used** anywhere in PKHeX.Core (PRNG is `Random.Shared` in `Util/RandUtil.cs`) | — | n/a | No |

### Deliberately *not* real crypto (no bridge, pure managed arithmetic)

These are frequently mistaken for crypto requirements but never touch `System.Security.Cryptography`:

- **CRCs / additive checksums**: `Saves/Util/Checksums.cs` — CRC16-CCITT, CRC16/CRC32 table-driven, `CheckSum32`, `Add16` etc. Used by Gen 1–5 saves, Gen 6 blocks, WC6/WCS gifts.
- **Entity encryption Gen 3–7**: `PKM/Util/PokeCrypto.CryptArray` (line 327) — LCG xorpad `(0x41C64E6D*seed)+0x6073` over u16 lanes. Not AES.
- **Gen 3 XD / Colosseum block cipher**: `Encryption/XDCrypto.cs`, `Encryption/GeniusCrypto.cs` — custom Feistel-style cipher keyed by stored u16 keys.
- **"RSA" in MemeKey**: implemented as raw `System.Numerics.BigInteger.ModPow` (`MemeKey.Exponentiate`, line 193) with hardcoded DER keys/exponents. No `RSACryptoServiceProvider` — works everywhere .NET runs, including wasm.

## 3. Which paths run during SaveUtil.GetSaveFile / write / checksum-fix

- **Load**: `SaveUtil.GetSaveFile` → size/format sniffing. SWSH/LA/SV/ZA immediately run `SwishCrypto.GetIsHashValid` (IncrementalHash-SHA256). BDSP loads compute MD5 via the provider seam. Colo/XD slots run SHA1 chains via `ColoCrypto`. NSO dumps SHA1-resign headers via `SaveHandlerNSO.Finalize`.
- **Write/export**: `SaveFile.GetFinalData` → per-generation: `SwishCrypto.Encrypt` (SHA256), `MemeCrypto.SignInPlace` (Gen 7: SHA256→AES-ECB(provider)→BigInteger RSA), BDSP MD5 refresh, everything else plain CRC fixes.
- **HOME round-trips**: `HomeCrypto.DecryptIfEncrypted/Encrypt` — AES-CBC(provider) per entity.
- **Gen 1–5, Gen 6 saves**: no `System.Security.Cryptography` at all (CRCs + PRNG xorpads).

## 4. Verification of the upstream PKHeX.Everywhere swap

Files inspected on `main`: `src/PKHeX.Web/Program.cs`, `Services/BlazorAesProvider.cs`, `Services/BlazorMd5Provider.cs`, `Services/JsService.cs`, `_js/lib/crypto/aes.ts`, `_js/lib/crypto/md5.ts`.

The pattern, confirmed verbatim:

```csharp
// Program.cs (after builder.Build())
RuntimeCryptographyProvider.Aes = app.Services.GetRequiredService<BlazorAesProvider>();
RuntimeCryptographyProvider.Md5 = app.Services.GetRequiredService<BlazorMd5Provider>();
```

- `BlazorAesProvider : IAesCryptographyProvider` → `JsService.EncryptAes/DecryptAes` → sync `IJSInProcessRuntime.Invoke<string>("encryptAes"/"decryptAes", keyHex, dataHex, mode)` → TS `encryptAes`/`decryptAes` backed by **crypto-js** (`CryptoJS.AES`, `NoPadding`, mode mapped ECB/CBC).
- `BlazorMd5Provider : IMd5Provider` → `JsService.Md5Hash` → sync `Invoke<string>("md5Hash", hex)` → TS `md5Hash` via `CryptoJS.MD5`.
- PKHeX.Core is consumed as a git submodule (`external/PKHeX-Plugins` → `ProjectReference`), so it carries the same two-seam provider surface as upstream master.

### Verdict: the swap is COMPLETE for Blazor WASM — nothing else silently breaks

Cross-referencing section 2 against the MS whitelist:

1. Every PKHeX.Core API that **throws** under Blazor WASM (`Aes`, `MD5`) sits behind a `RuntimeCryptographyProvider` seam that the swap replaces. There are no other PNSE-capable call sites.
2. Every direct (unseamed) call site uses only whitelisted APIs: `SHA1`, `SHA256`, `IncrementalHash`. These execute fine in the browser's .NET runtime pack without any bridge.
3. HMAC/RSA/ECDsa/DSA/CNG APIs — the ones that would silently break unseamed — are simply never used by PKHeX.Core (the only RSA is BigInteger math).

So: **two providers, two JS functions, full coverage.** Any remaining risk is host-level, not swap-level.

## 5. Frictions and requirements a headless/AOT or WebCrypto-based host must handle

1. **WebCrypto cannot back this interface synchronously.** `IAesCryptographyProvider.IAes.EncryptEcb/DecryptCbc` and `IMd5Provider.HashData` are synchronous void/span methods, and upstream exploits `IJSInProcessRuntime.Invoke<T>` (sync interop — available only on Blazor WASM, not Server/MAUI/wasi). `crypto.subtle` is promise-only; you'd deadlock trying to `.GetAwaiter().GetResult()` it inside wasm. That is why upstream picked **crypto-js** (pure synchronous JS), not SubtleCrypto. Using WebCrypto requires either making the provider interfaces async (a PKHeX.Core API change) or pre-warming/batching results ahead of each save operation.
2. **Sync-interop dependency**: any non-Blazor host replicating this must offer a synchronous JS↔wasm entry point (e.g., exported wasm functions calling into JS, or a pure-managed implementation) rather than `JSRuntime`-style async calls.
3. **Managed SHA must exist in the runtime**: the direct `SHA1`/`SHA256`/`IncrementalHash` call sites have *no* provider seam. A headless/NativeAOT/wasi host must ship the .NET crypto primitives package (or equivalent managed implementations) for those to work — trimming them away breaks SWSH/LA/SV load, Colo/XD, Ranch, Gen 7 export signing, and NSO dumps even though Aes/Md5 are bridged.
4. **Interop volume is small but hot**: MemeKey does AES-ECB in 16-byte chunks (≈12–24 interop hops per sign/verify of the 0x60-byte signature region); HOME crypt is one CBC call per entity; BDSP MD5 is one call over ~15 MB per load/write. Hex-string marshaling (as upstream does) multiplies bytes ×2 per hop — a headless host should pass byte arrays/hex more efficiently or implement these in managed code instead.
5. **Alternative worth considering**: since MD5 and AES here are used purely as data-format primitives (not security), a small vendored managed MD5 + AES implementation compiled into the wasm module would eliminate both the bridge and the sync-interop problem entirely — at the cost of maintaining that code.

## Bottom line

> PKHeX.Core touches exactly three throwing-on-wasm crypto primitives — MD5 (BDSP saves), AES-ECB (Gen 7 resigning/QR), AES-CBC (HOME entities) — all behind the `RuntimeCryptographyProvider.Aes/.Md5` seams, while every other crypto use (SHA1/SHA256/IncrementalHash) is whitelisted as working on Blazor WASM. Upstream PKHeX.Everywhere's startup swap of those two providers to crypto-js-backed sync JS functions is therefore **complete**: no other System.Security.Cryptography dependency can break in-browser today. The catch for pkhex-wasm: the interface is synchronous by design, so WebCrypto (async-only) cannot slot in without changing PKHeX.Core's provider contract — a headless/AOT host must provide sync JS interop plus managed SHA1/SHA256 in its runtime, or vendor managed MD5/AES to drop the bridge altogether.

### Key sources

- kwsch/PKHeX: `Saves/Encryption/Providers/{RuntimeCryptographyProvider,IAesCryptographyProvider,IMd5Provider}.cs`, `Saves/SAV8BS.cs`, `Saves/Encryption/{SwishCrypto,MemeCrypto,ColoCrypto,XDCrypto,GeniusCrypto}`, `PKM/HOME/HomeCrypto.cs`, `Saves/Util/{Checksums.cs,Recognition/SaveHandlerNSO.cs}`, `Saves/Util/SaveUtil.cs`, `PKM/Util/PokeCrypto.cs`, `Saves/SAV4Ranch.cs`, `Saves/SAV7.cs`
- arleypadua/PKHeX.Everywhere (`main`): `src/PKHeX.Web/Program.cs`, `src/PKHeX.Web/Services/{JsService,BlazorAesProvider,BlazorMd5Provider}.cs`, `src/PKHeX.Web/_js/lib/crypto/{aes,md5}.ts`, `src/PKHeX.Web/PKHeX.Web.csproj`
- Microsoft Learn: [System.Security.Cryptography APIs not supported on Blazor WebAssembly](https://learn.microsoft.com/en-us/dotnet/core/compatibility/cryptography/5.0/cryptography-apis-not-supported-on-blazor-webassembly)
