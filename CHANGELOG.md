# Changelog

All notable changes to pkhex-wasm are noted here. Format: [Keep a
Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows the
semver call in [CONTRIBUTING.md](CONTRIBUTING.md#upstream-sync-ritual).

## [0.1.0] - 2026-08-24

First tagged release, distributed via GitHub Releases (npm registry publishing
is parked; install with `npm install github:EthanThatOneKid/pkhex-wasm#v0.1.0`).

### Added

- Binding layer over `[JSExport]` services with Handle semantics, tier
  enforcement (edit vs read-only), mint-aware `setNature`, and mutator
  validation at the boundary.
- Managed crypto (MD5, AES-128 ECB/CBC-NoPadding) vendored and registered at
  bootstrap; verified against RFC 1321 / NIST SP 800-38A vectors shared across
  the C# and JS test layers.
- Lookup-table pipeline: universal species/natures/moves plus per-game item
  tables, generated from PKHeX.Core's own data.
- Test infrastructure: blank-fixture factory per `EntityContext`, playwright
  E2E suite in headless Chromium, CI gates (build → tests → drift check → E2E).
- Packaging pipeline: docxodus-shaped npm tarball, brotli siblings, GPL
  compliance kit (`complete-source.tar.gz`, notices, modifications log,
  commit-pinned `upstream.json`), 8 MB gz first-load size gate.
- Release workflow exposing package artifacts via GitHub Releases.
