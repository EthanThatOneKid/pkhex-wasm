## Packaging & release

Locked by [Define testing strategy and packaging/CI gates](https://github.com/EthanThatOneKid/pkhex-wasm/issues/11), following the [docxodus](https://github.com/EthanThatOneKid/pkhex-wasm/issues/4) and libsidplayfp-wasm patterns:

- **Tarball shape** (docxodus wholesale): ESM-only entry exporting `initPKHex` + Lookup tables, per-entry `.d.ts`, entire wasm runtime under `dist/wasm/_framework`, precompressed brotli siblings.
- **Size budget gate**: hard build failure above **8 MB gz first-load** (spike baseline ~6 MB leaves headroom for tables + compliance kit).
- **GPL compliance kit** (libsidplayfp pattern): `complete-source.tar.gz` shipped *inside the npm tarball* **and** attached to every GitHub release (satisfying GPLv3 §3a), plus `THIRD-PARTY-NOTICES.md`, a `MODIFICATIONS.md` log, and a commit-pinned `upstream.json`.
- **Publishing**: tag `v*` → assemble compliance kit → build → `npm publish --access public` with OIDC trusted publishing (npm ≥ 11 pinned), mirroring docxodus's release workflow.
- **Upstream sync ritual** (manual, owner-owned — upstream has no stable release train to watch mechanically): bump the `PKHeX.Everywhere` submodule → full suite green → changelog note → semver call per the API-surface contract ([#7](https://github.com/EthanThatOneKid/pkhex-wasm/issues/7)): minor if behavior adds, patch if fixes, major if the JS surface breaks. Documented CONTRIBUTING-style.
