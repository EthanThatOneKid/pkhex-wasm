## Crypto requirements

Locked by [Choose crypto strategy](https://github.com/EthanThatOneKid/pkhex-wasm/issues/8):

- **Strategy: managed in-bundle.** Pure-managed MD5 + AES-128 (ECB & CBC, NoPadding) vendored into the wasm bundle and registered onto `RuntimeCryptographyProvider.Aes` / `.Md5` during `initPKHex()` — before any save parsing, invisible to consumers. Managed crypto only: no JavaScript crypto involvement anywhere, no crypto-js dependency, nothing for consumers to install.
- **The three real seams** this unblocks: BDSP whole-save MD5, MemeCrypto AES-128-ECB-NoPadding, HOME AES-128-CBC-NoPadding. Gen 1–6 paths never touch them (zero cost when unused).
- **Sourcing**: existing MIT/public-domain pure-C# implementations (BouncyCastle-lineage or equivalent), stripped to MD5 + the AES block cipher + the two modes only. Provenance reviewed at adoption; GPLv3 unaffected by MIT-vendored parts.
- **Rejected alternatives**: crypto-js `[JSImport]` bridge (~60 KB gz on every consumer bundle, maintenance-mode dependency, hex-marshaling per call); native WebCrypto (no MD5 in `subtle.digest`, ECB deliberately excluded, CBC is PKCS#7-only against the NoPadding requirement, async-only interface clashes with the sync parse chain, `Atomics.wait`/SharedArrayBuffer sync-ification would force COOP/COEP headers onto every consuming page).
- **Verification bar**: RFC 1321 test vectors (MD5) and NIST SP 800-38A vectors (AES-ECB/AES-CBC) as xUnit cases, round-trip properties, Node-crypto cross-checks via shared constants; upstream MemeCrypto/Home tests stay green untouched.
