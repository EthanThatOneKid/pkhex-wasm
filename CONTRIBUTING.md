# Contributing

Thanks for your interest in pkhex-wasm. Day-to-day PRs follow the standard
fork-branch-test flow; the suites to keep green are listed in the README's
[Development](README.md#development) section and enforced by CI on every PR.

This document's normative half is the **upstream sync ritual** — the manual,
owner-owned procedure for tracking vendored upstream, since PKHeX has no
stable release train to watch mechanically.

## Upstream sync ritual

The vendored upstream lives at `external/PKHeX.Everywhere` (MIT monorepo) with
the GPLv3 `PKHeX` fork as its nested submodule; both pins are recorded in
`upstream.json` by the packaging pipeline. When you want new upstream behavior:

1. **Bump the submodule** to the upstream commit you want:
   `git -C external/PKHeX.Everywhere fetch && git -C external/PKHeX.Everywhere checkout <commit>`
   then stage the nested fork bump inside it if needed. Commit the pointer moves.
2. **Full suite green** — no exceptions, locally before pushing:
   - `dotnet test pkhex-wasm.slnx` (logic seam + fixture factory + crypto vectors)
   - `deno task gen:check`, `deno task apigen:test`, `deno task typecheck`
   - `deno task e2e` (headless Chromium round-trips)
3. **Re-sync vendored crypto** if the crypto seam changed: follow the re-sync
   ritual in `src/PKHexWasm/Crypto/Vendored/PROVENANCE.md` and update its pin.
4. **Changelog note**: one entry per user-visible change in `CHANGELOG.md`.
5. **Bump the root `package.json` version** to the semver you just chose —
   git-based installs resolve their tarball via this field.
6. **Semver call** for the next tag, strictly per the API-surface contract:
   - **major** — the JS surface breaks (renames/removals/signature or error-type changes)
   - **minor** — behavior adds (new generation support, new reads/writes)
   - **patch** — fixes only, surface unchanged

Then push the tag `v<semver>`; the release workflow assembles the package and
GPL compliance kit, runs every gate again, verifies the packaged artifact in
Chromium, and attaches the tarball plus `complete-source.tar.gz` to a GitHub
Release.

## Pull requests

- One logical change per PR; keep commits tidy.
- New behavior needs coverage at the seam it touches: C# xUnit for Binding/
  Core behavior (`tests/PKHexWasm.Tests`), E2E specs for JS-surface behavior
  (`tests/e2e/specs`). Fixture saves are always blank-generated — never commit
  real save binaries.
- Generated files (`src/ts/gen/**`, `tools/apigen/fixtures/pkhex-wasm.d.ts`,
  the spec's generated chapter) are never hand-edited; change the model and run
  `deno task gen`. The drift gate fails otherwise.
- Update `docs/spec/v1-api.md` section sources under `tools/apigen/sections/`
  when decisions change, not the stitched spec text directly.
