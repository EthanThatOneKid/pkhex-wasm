# Prior art and npm packaging patterns for .NET-on-wasm libraries

Research for [issue #4](https://github.com/EthanThatOneKid/pkhex-wasm/issues/4) — what exists, which patterns to copy, and what GPL obligations apply when shipping compiled PKHeX.Core as wasm.

---

## 1. Prior art: PKHeX in the browser (outside the official Blazor apps)

### Direct JS-library wrappers (the exact pkhex-wasm niche)

**`pkhex` on npm — github.com/pokality/pkhex (source repo now 404; package still live).**
This is the closest prior art found: a published npm package whose README describes exactly pkhex-wasm's goal — "Provides WebAssembly bindings for PKHeX.Core. Allows editing Pokémon save files in JavaScript environments (Browser, NodeJS, etc)."

- Latest version `26.1.22` (published ~Feb 2026), 57 files, ~23 MB unpacked, GPL-3.0 license tag, maintainer `monokrome`.
- ESM (`"type": "module"`) with an exports map (`.` and `./helpers`) and bundled TypeScript definitions; `engines.node >= 18`.
- API shape worth studying (handle-based sessions over base64 marshalling):
  - `const pkhex = await setupPKHeX()` boots the runtime.
  - `pkhex.loadSave(base64)` → `{ success, handle }`; then `getSaveInfo(handle)`, `getAllPokemon(handle)`, `exportSave(handle)`, `disposeSave(handle)`.
  - Features claimed: Gen 1–9 load/save, Pokémon/trainer/item/dex editing, legality checking, Showdown import/export.
- Build approach per README: PKHeX.Core pinned as a git submodule at `lib/PKHeX`, compiled to wasm by `scripts/build.sh`, with C# tests (`dotnet test tests/PKHeX.Tests`) run alongside vitest. Docs via typedoc to GitHub Pages.
- **Cautionary tale:** the GitHub source repo (`pokality/pkhex`) now returns 404 while the compiled npm artifact persists (~8 weekly downloads). Anyone consuming it can no longer trivially reach the source for the exact published version — precisely the failure mode GPL compliance is meant to prevent. It also means **the unscoped npm name `pkhex` is taken**.

### Blazor WASM save editors (apps, not libraries)

| Project | Repo / URL | Approach | Status |
|---|---|---|---|
| **PKHeX.Everywhere** ("official" web PKHeX) | [arleypadua/PKHeX.Everywhere](https://github.com/arleypadua/PKHeX.Everywhere) · [pkhex-web.github.io](https://pkhex-web.github.io/) | Blazor WASM porting PKHeX.Core client-side; plugin SDK (ALM auto-legality, Nuzlocke actions, browser emulator integration) | Active, blog + docs |
| **PKMDS** | [codemonkey85/PKMDS-Blazor](https://github.com/codemonkey85/PKMDS-Blazor) · [pkmds.app](https://pkmds.app/) | Blazor WASM powered by PKHeX.Core; layered as `Pkmds.Core` (reusable PKHeX utility library), `Pkmds.Rcl` (Razor components), `Pkmds.Web` (app) | Actively maintained (.NET 10 tooling); note `Pkmds.Core` is a reusable non-UI library — useful design reference |
| **PKHeX.Web (older)** | [aymeric-giraudet/PKHeX.Web](https://github.com/aymeric-giraudet/PKHeX.Web) · pkhex-web.vercel.app | HTML/C#/JS + C# web version of PKHeX deployed to Vercel | Dormant since May 2022 |

### Adjacent approaches (server-side PKHeX behind a web UI)

- **[fmangela/pkmanager](https://github.com/fmangela/pkmanager)** — React 19 frontend + ASP.NET Core backend that runs PKHeX.Core server-side (save CRUD, legality analysis/AutoFix, Showdown I/O), paired with in-browser mGBA/melonDS *emulation* wasm. Licensed GPL-3.0-or-later. Shows the REST-API alternative when browser-side PKHeX isn't required.
- **[David-H-Afonso/BeastVault.Api](https://github.com/David-H-Afonso/BeastVault.Api)** — .NET 9 minimal API using PKHeX.Core for `.pk*` parsing/validation; same server-side pattern.

**Bottom line for sub-question 1:** one direct precedent existed (`pkhex` npm) but its source has vanished; everything else is either a full Blazor app or a server-side API. No healthy, maintained JS-callable PKHeX library exists — the niche pkhex-wasm targets is open.

---

## 2. Established patterns for publishing .NET-on-wasm as npm-consumable packages

Microsoft's supported foundation since .NET 7 is `System.Runtime.InteropServices.JavaScript` `[JSImport]`/`[JSExport]` interop, usable without Blazor ([.NET blog announcement](https://devblogs.microsoft.com/dotnet/use-net-7-from-any-javascript-app-in-net-7/), [WASM Browser App docs](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/wasm-browser-app)). The publish output is a static bundle: `dotnet.js` glue loader + `_framework/` (`dotnet.native.wasm`, `dotnet.boot.js`, assemblies as `.wasm`/Webcil). On top of that, five distribution patterns have emerged:

### Pattern A — npm tarball ships the full publish output; loader resolves assets relative to itself
The dominant pattern for "npm-installable .NET wasm". Study these:
- **[`docxodus`](https://www.npmjs.com/package/docxodus)** ([JSv4/Docxodus](https://github.com/JSv4/Docxodus)) — production-grade example of this exact layout: ships `dist/wasm/_framework/*` inside the npm package; runtime loads lazily from the directory the bundle was loaded from (`import.meta.url`, `document.currentScript` fallback); `wasmBasePath` option to redirect assets; works directly off jsDelivr/unpkg CDNs (CORS `*` + correct `application/wasm` MIME); React hooks + a no-build `embed.bundle.js`. Also demonstrates web-worker execution and an ~18 MB lazy-loaded runtime set — realistic size expectations for a Mono-runtime payload.
- **[`@pavelsavara/express-csharp-mcp-echo`](https://github.com/pavelsavara/node-mono-server)** (Node target) — literally `npm publish`es the `dotnet publish …/publish/wwwroot` folder so a C# ASP.NET-style server runs under Node with zero native files. Proof that raw publish output is npm-shippable with a thin manifest.
- Reference material: [Andrew Lock, "Running .NET in the browser without Blazor"](https://andrewlock.net/running-dotnet-in-the-browser-without-blazor/) — .NET 10 fingerprinting/import maps/integrity hashes and the template flags (`OverrideHtmlAssetPlaceholders`, `StaticWebAssetFingerprintPattern`).

### Pattern B — bundler plugin ingests dotnet build output into any JS project
- **[`unplugin-dotnet-wasm`](https://github.com/ArcadeMode/unplugin-dotnet-wasm)** — one plugin, every major bundler (Vite, webpack, Rollup, Rspack, esbuild, Bun…) via [unplugin](https://github.com/unjs/unplugin); consumes `dotnet build`/`publish` output using `WasmBundlerFriendlyBootConfig`; handles dev servers, watch mode, MIME types. Worth copying conceptually if pkhex-wasm wants first-class DX in Vite apps; at minimum, test that the shipped assets survive Vite/webpack processing.

### Pattern C — single-file embedded library
- **[DotNetJS](https://github.com/Elringus/DotNetJS)** ([NuGet](https://www.nuget.org/packages/DotNetJS)) — MSBuild task packs runtime + assemblies into one environment-agnostic `dotnet.js` (UMD/CJS/ESM/script-tag), auto two-way bindings + TypeScript defs; designed for VS Code web extensions where no fetch/DOM exists. Cost: ~30% size inflation from base64 embedding; `EmbedBinaries=false` enables side-loading binaries instead. Best when consumers can't host static assets — probably not pkhex-wasm's primary path given payload size.

### Pattern D — binding-generator frameworks
- **[Bootsharp](https://bootsharp.com/guide/getting-started)** — compiles a .NET project into an ES module with generated TS-typed bindings; Release builds automatically use NativeAOT-LLVM + aggressive trimming + Binaryen `wasm-opt`. Interesting for minimizing payload, but imposes its own programming model (events/bindings) rather than exposing arbitrary PKHeX.Core calls.

### Pattern E — web-worker embedding
- Official docs: [.NET on Web Workers](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-on-webworkers?view=aspnetcore-10.0) (React sample; `blazorwebworker` template in .NET 11; WebAssembly SDK `OutputType=Library` "library mode" produces `_framework` without an app entry point).
- Known gotchas (all documented): workers don't inherit the page's import map, so fingerprinted `dotnet.js` URLs must be resolved main-thread and passed in ([dotnet/aspnetcore#65885](https://github.com/dotnet/aspnetcore/pull/65885)); a worker that installs its own `onmessage` before boot needs `self.dotnetSidecar = true` or startup hangs ([dotnet/runtime#114918](https://github.com/dotnet/runtime/issues/114918), resolved by "ST build is always sidecar on a worker"); `maxParallelDownloads: 1` helps flaky asset loading in workers.
- Community samples: [maraf/dotnet-wasm-react](https://github.com/maraf/dotnet-wasm-react), [maraf/blazor-wasm-react](https://github.com/maraf/blazor-wasm-react).

### CDN hosting notes
npm CDNs (jsDelivr/unpkg) serve with CORS enabled and correct `.wasm` MIME, which is what lets docxodus be consumed with zero hosting. Caveats: CDN file-count/size practicalities (pkhex npm unpacked is 23 MB; docxodus' runtime request set ~18 MB), gzip/brotli compression is automatic on major CDNs, and fingerprinting/integrity hashes must not break cross-origin loading.

---

## 3. Licensing precedents: GPLv3 compiled code distributed via npm/CDN

> **Flag: general practice research, not legal advice.** Nothing below is settled law; wasm-specific case law doesn't exist and derivative-work boundaries are contested.

Core principles observed across projects:

1. **Minified/wasm artifacts are object code, not source.** GPLv3 §1 defines source as "the preferred form for making modifications"; minified JS fails that bar (FSF position, e.g. Stallman's "The JavaScript Trap"). A `.wasm` binary is unambiguously object code. Serving it from a web page or shipping it in an npm tarball is **distribution**, so GPLv3 §§4–6 attach (license text, notices, corresponding source).
2. **Corresponding source must actually accompany or be offered with the object code.** Discussion precedent: the Stockfish-in-browser threads on [opensource.stackexchange](https://opensource.stackexchange.com/questions/11490/minified-gpl-code-inside-javascript-webapp) — distributing a minified GPL engine client-side is permissible *only if* recipients can obtain the preferred-form source; pointing at whatever arrives in the network tab does not satisfy this.
3. **Gold-standard worked example: [`chrisgleissner/libsidplayfp-wasm`](https://deepwiki.com/chrisgleissner/libsidplayfp-wasm/6-compliance-and-licensing)** (GPL-2.0 engine → npm wasm package). Its compliance kit is directly copyable:
   - `dist/complete-source.tar.gz` **bundled inside the npm tarball**: pristine upstream trees pinned at the exact commits built (`upstream.json`), the build toolchain/scripts needed to reproduce the binaries, and the binding sources → satisfies §3(a) with no "written offer" needed.
   - `THIRD-PARTY-NOTICES.md` covering every component compiled into the binaries (runtimes, toolchains).
   - `MODIFICATIONS.md` recording downstream changes (§2(a) notice requirement).
   - `LICENSE` copied next to every `.wasm` artifact so an extracted file is compliant on its own.
   - CI gate (`check-package.mjs`) failing the build if any compliance file is missing or pins drift.
4. **npm-specific custom practice:** `repository` field + README attribution (what `pkhex` npm does: "License: This project uses PKHeX.Core which is licensed under GPLv3", GPL-3.0 package tag) is common but is generally considered necessary-not-sufficient; the robust routes are (a) bundle CCS in the tarball, or (b) exact-version-tagged public source plus a written offer. pokality/pkhex shows why (a)/(b) matter: once its repo vanished, the remaining artifact had no reachable source for its published versions.
5. **Downstream coupling question:** whether a JS app that links/calls a GPLv3 wasm library becomes a derivative work is unsettled (FSF says yes for linking; courts haven't tested it; process-boundary arguments exist both ways — see [this discussion](https://opensource.stackexchange.com/questions/11326/web-front-end-uses-gpl3-library) and [this one](https://opensource.stackexchange.com/questions/9336/does-using-a-webassembly-compiled-gpl-library-require-calling-application-to-be)). Practical consequence seen in the wild: PKHeX-derived projects simply adopt GPL-compatible licenses for the whole wrapper (pokality/pkhex → GPL-3.0; pkmanager → GPL-3.0-or-later), which moots the question for their own code.

**Practical requirements checklist for pkhex-wasm** (uncertainty flagged above applies):
- Include the full GPLv3 text (`LICENSE`) in the package root **and** beside the wasm artifacts.
- Attribution/notice file crediting PKHeX / kwsch with upstream link and version pin.
- Ship Complete Corresponding Source: simplest robust route is including a source archive (pinned PKHeX submodule commit + build scripts + facade sources) in the tarball, à la libsidplayfp-wasm; keep the public repo tagged per release so source never becomes unreachable (anti-pokality).
- Record modifications to upstream in a changelog/MODIFICATIONS doc.
- License the JS/TS glue layer GPLv3(-or-later) to avoid mixed-license ambiguity.

---

## 4. Recommended pattern for pkhex-wasm

**Verdict: copy Pattern A (docxodus layout) — an npm package containing a small ESM/TypeScript loader plus the `dotnet publish` `_framework` assets, lazy-loading the runtime relative to the module URL, with a byte-oriented handle-based API — wrapped in the libsidplayfp-wasm GPL-compliance kit.**

Rationale against pkhex-wasm's goal (load save bytes in → read/edit Pokémon → export bytes out):

- **It's proven end-to-end for exactly this shape of library.** docxodus proves npm+CDN distribution of a .NET-on-wasm document-manipulation library with zero-hosting consumption; pokality/pkhex proved the PKHeX-specific API shape (`loadSave(bytes) → handle → getPokemon/edit/export/dispose`). Both validate byte-array-in/handle-out marshalling, which `[JSImport]/[JSExport]` supports natively (`JSMarshalAs<JSType.Array>` / `Uint8Array`) — prefer real byte arrays over pokality's base64 strings where possible.
- **Build stack:** `Microsoft.NET.Sdk.WebAssembly` browser-wasm project with a thin `[JSExport]` facade over PKHeX.Core; `dotnet publish -c Release` gives trimming + brotli/gzip for free. Keep PKHeX pinned by tag/submodule and record it in the compliance metadata.
- **Worker support as an optional layer,** not the core: expose a promise-based main-thread API first; add a worker wrapper later using the official template patterns (resolve `dotnet.js` URL main-thread, `dotnetSidecar` semantics documented).
- **Naming:** unscoped `pkhex` is taken on npm; use a scoped name (e.g. `@ethanthatonekid/pkhex-wasm`) or `pkhex-wasm`.
- **Compliance:** ship LICENSE (GPLv3) + THIRD-PARTY-NOTICES + pinned-source archive in the tarball; tag releases; never let a published version's source become unreachable.
- **Size expectation-setting:** Mono interpreter runtime + PKHeX.Core assemblies ≈ high-teens-of-MB unpacked (comparable packages: 18–23 MB), heavily compressible and lazy-loadable; consider trimming/invariant globalization and possibly Bootsharp-style AOT later if cold start matters.

## Bottom line

Prior art confirms feasibility but leaves the niche open: the only direct predecessor (`pkhex` npm, pokality) is dormant with its source gone, and all living PKHeX web projects are Blazor apps or server APIs. The recommended packaging is the docxodus pattern — npm tarball = TS/ESM glue + `_framework` publish output, lazy-loaded, CDN-friendly, optional worker wrapper — combined with the libsidplayfp-wasm GPL kit (in-tarball complete-source archive, notices beside artifacts, release tagging) so every published version stays source-reachable as GPLv3 requires.
