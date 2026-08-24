# Third-party notices for pkhex-wasm

This package ships compiled WebAssembly built from several upstream projects.
Their notices and license obligations are summarized here; exact commit pins
live in [`upstream.json`](./upstream.json), and the complete corresponding
source ships as [`complete-source.tar.gz`](./complete-source.tar.gz).

## PKHeX.Core fork — GPL-3.0-or-later

- **Source**: the `PKHeX` fork nested in [PKHeX.Everywhere](https://github.com/arleypadua/PKHeX.Everywhere)
  (upstream lineage: [kwsch/PKHeX](https://github.com/kwsch/PKHeX))
- **Pinned commit**: see `pkhexCoreFork.commit` in [`upstream.json`](./upstream.json)
- **License**: GNU General Public License v3.0 or later — full text in [`LICENSE`](./LICENSE)
- **Role**: save-format parsing, editing, and serialization logic; compiled into
  the wasm bundle under `wasm/_framework/`.
- **Modifications**: none at the Core level. This repository compiles it unmodified;
  distribution-level changes are logged in [`MODIFICATIONS.md`](./MODIFICATIONS.md).

## PKHeX.Everywhere — MIT

- **Source**: <https://github.com/arleypadua/PKHeX.Everywhere>
- **Pinned commit**: see `pkhexEverywhere.commit` in [`upstream.json`](./upstream.json)
- **License**: MIT (its facade/web layers are *not* linked into this bundle; it is
  vendored as the hosting monorepo of the Core fork and its submodule pins).

## Vendored cryptography (MD5, AES-128) — MIT

- **Source**: [bcgit/bc-csharp](https://github.com/bcgit/bc-csharp) (BouncyCastle C#),
  pinned at `214b5f881be55d708e528ae43693a70211557075`
- **License**: MIT
- **Role**: pure-managed MD5 / AES-128-ECB implementations registered into
  PKHeX.Core's `RuntimeCryptographyProvider` during bootstrap, because native
  crypto APIs throw under the bare mono-wasm runtime.
- **Scope**: algorithm files verbatim; support utilities trimmed to referenced
  members. File-by-file mapping and the re-sync ritual:
  `src/PKHexWasm/Crypto/Vendored/PROVENANCE.md` inside
  [`complete-source.tar.gz`](./complete-source.tar.gz).
- The CBC-NoPadding mode around the vendored AES engine is this project's own work.

## .NET runtime — MIT

The wasm runtime under `wasm/_framework/` is produced by the .NET SDK
(MIT-licensed components of the .NET project) from Microsoft.
