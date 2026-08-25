# pkhex-wasm

PKHeX.Core Pokémon save editing, compiled to WebAssembly and packaged for npm — so JavaScript apps can load, read, edit, and export save files entirely in the browser.

> **Status: v1 shipped via GitHub Releases.** The JS API contract lives at [`docs/spec/v1-api.md`](docs/spec/v1-api.md). Browsable API docs: <https://ethanthatonekid.github.io/pkhex-wasm/>

## Usage

Install into your TypeScript app straight from GitHub (no npm registry involved):

```bash
npm install github:EthanThatOneKid/pkhex-wasm#v0.1.0
```

The install runs a small `prepare` script that downloads the packaged tarball for
that version from [GitHub Releases](https://github.com/EthanThatOneKid/pkhex-wasm/releases)
into `dist/` — no .NET toolchain or submodules needed on your side. (Installing
a ref between releases falls back to the latest release with a warning. Prefer a
tarball by hand? Grab `pkhex-wasm-x.y.z.tgz` from the Release page and
`npm install ./pkhex-wasm-x.y.z.tgz`.)

Then:

```ts
import { initPKHex } from "pkhex-wasm";

// One-time async wasm bootstrap; everything after is synchronous.
const PKHex = await initPKHex();

// Parse one complete logical save buffer (defensively copied).
const game = PKHex.load(saveBytes);

console.log(PKHex.species.get(game.party()[0].species.id)?.name); // "Pikachu"

// Entity handles write through; export reflects every mutation.
game.box(0)[0]?.setNickname("Sparky");
const out: Uint8Array = PKHex.saveBytes(game);
```

What you get on the root:

- **Lookup tables** — `PKHex.species` / `natures` / `moves`: `get(id)` → `{ id, name, … }`, `all()`. Items are per-game: `game.items`.
- **Save handle** (`game`) — `trainer`, `boxCount`, `generation`; snapshots via `game.box(i)` / `game.party()` returning entity handles.
- **Entity handles** — reads (`species`, `nickname`, `level`, `isShiny`, `ivs`/`evs`/`stats`, four move slots, nature, original trainer) plus mutators: `setNickname`, `setLevel`, `setMoves([m1, m2, m3, m4])`, `setNature(id)`, `setShiny(bool)`, `setIVs(partial)`, `setEVs(partial)`.

Tier behavior: **edit tier** (all mutators apply) covers Gen 3–7, SwSh, BDSP, SV and Legends Z-A; **read-only tier** (mutators throw) covers Gen 1–2, LGPE and PLA. Failures surface as typed errors — `SaveParseError` from `load`, `UnsupportedTierError` / `UnsupportedOperationError` from mutators, `RangeError` for value limits.

Bundlers note: the runtime assets under the package's `wasm/_framework/` must stay siblings of `index.js` — the default `initPKHex()` resolves them relative to the module URL. If your bundler chokes on them, copy `wasm/` alongside your output and pass `initPKHex({ wasmBaseUrl })`.

A runnable CLI example lives at [`examples/deno-cli.ts`](examples/deno-cli.ts)
(`deno run -A examples/deno-cli.ts <save>` prints a save's party).


## What works today

The [validation spike](spike/) proves the whole pipeline end-to-end in a real browser:

- PKHeX.Core compiles and runs on the bare Mono-wasm runtime — no Blazor anywhere
- JavaScript calls into .NET through `[JSExport]` (bytes in both directions)
- Load a save file → read box Pokémon → edit a nickname → export bytes back to disk
- ~6 MB gzipped transferred to interactive

![Validation spike UI](docs/spike-ui.png)

## Run it locally

Prerequisites:

- [.NET SDK 10.x](https://dotnet.microsoft.com/download/dotnet/10.0)
- Node.js ≥ 18 (used only as a static file server)
- Git with submodule support

```bash
git clone https://github.com/EthanThatOneKid/pkhex-wasm
cd pkhex-wasm
git submodule update --init --recursive

dotnet publish spike/SpikeApp -c Release
npx http-server spike/SpikeApp/bin/Release/net10.0/publish/wwwroot
# open http://127.0.0.1:8123
```

> The vendored upstream (`external/PKHeX.Everywhere`) declares two nested submodules. Only its `external/PKHeX` fork is needed for the spike; `PKHeX-Plugins` is not referenced. To skip the large Plugins clone:
>
> ```bash
> git -C external/PKHeX.Everywhere submodule update --init external/PKHeX
> ```

In the page: **Generate demo save** creates a blank Gen 1 save with a level-5 Pikachu in box 1, **Rename** writes the edit and re-parses it through the binding, **Export** downloads the bytes as a `.sav` file, and the file picker loads any real Gen 1 `.sav`.

## Development

```bash
dotnet test pkhex-wasm.slnx   # C# logic-seam suite (blank fixtures, crypto vectors)
deno task gen                 # regenerate d.ts + binding skeleton + spec chapter
deno task gen:check           # drift gate — fails when outputs lag the model
deno task apigen:test         # generator tests
deno task typecheck           # Deno check over the generator + src/ts
deno task e2e                 # playwright E2E: fixtures → site → harness → headless Chromium
deno task package             # build the npm tarball + GPL kit, gate the 8 MB gz budget
```

The E2E suite (`tests/e2e/`) boots the real `initPKHex()` surface against the
published wasm host in headless Chromium: load/read/edit/export round-trips on
every edit-tier fixture, read-tier rejection matrix, data contracts, and a
Node-side cross-check of the shared [crypto vectors](tests/crypto-vectors.json).
Fixture saves are always blank-generated by [`tools/fixturegen`](tools/fixturegen/)
into a gitignored directory — no binaries are committed. A gitignored
`.local-fixtures/` directory stays available for development against personal dumps.

| Path | What it is |
| --- | --- |
| `spike/SpikeLib` | Save logic over PKHeX.Core (generate / load / read / edit / export), no interop concerns |
| `spike/SpikeLib.Tests` | xUnit tests for the logic seam |
| `spike/SpikeApp` | `wasmbrowser` host exposing the logic via `[JSExport]`, plus a minimal HTML UI |
| `tools/apigen` | API model + ts-morph generators — single source of truth for the v1 surface |
| `src/ts` | TypeScript binding skeleton bootstrapped by the generator (`gen/` stays generated) |
| `tests/PKHexWasm.TestSupport` | Shared blank-fixture factory over PKHeX.Core (`TestSaves`) |
| `tests/PKHexWasm.Tests` | xUnit logic seam: contracts, tiers, crypto vectors, fixture factory |
| `tests/e2e` | Playwright E2E suite driving the published site in headless Chromium |
| `tests/crypto-vectors.json` | Shared RFC 1321 / NIST SP 800-38A vectors consumed by both test layers |
| `tools/package` | Packaging pipeline: docxodus-shaped npm tarball, brotli siblings, GPL compliance kit, size gate |
| `scripts/prepare-dist.mjs` | npm `prepare` hook backing git-based installs: pulls this repo's Release tarball into `dist/` |
| `examples/deno-cli.ts` | Minimal CLI usage: print a save's party (`deno run -A examples/deno-cli.ts <save>`) |
| `docs/spec/v1-api.md` | The locked v1 JavaScript API specification |
| `external/PKHeX.Everywhere` | Vendored upstream (MIT facade/web layers wrapping the GPLv3 `PKHeX.Core` fork, itself a nested submodule) |

## Roadmap

Every decision feeding v1 is resolved — see the completed [v1 map](https://github.com/EthanThatOneKid/pkhex-wasm/issues/15); the active effort is [v2: the complete API surface projected from Core](https://github.com/EthanThatOneKid/pkhex-wasm/issues/30). Pushing a `v*` tag runs the release workflow: full gates, then a GitHub Release carrying the package tarball + GPL compliance kit. npm registry publishing is parked; install from GitHub (see [Usage](#usage)).

## License

The vendored `PKHeX.Core` is **GPLv3**; obligations flow to anything linking it, including this package's wasm bundle. This repo's own licensing is being settled alongside the compliance work tracked on the map.
