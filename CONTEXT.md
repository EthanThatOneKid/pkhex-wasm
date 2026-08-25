# pkhex-wasm

PKHeX.Core Pokémon save editing, compiled to WebAssembly and packaged for npm so JavaScript apps can load, read, edit, and export save files in the browser.

## Language

**pkhex-wasm**:
This package — the npm-distributable wasm build plus its JavaScript-facing API.
_Avoid_: "the wrapper", "the port"

**Core**:
PKHeX.Core, the upstream GPLv3 save-format library, vendored here as a git submodule.
_Avoid_: PKHeX (ambiguous with the desktop app)

**Facade**:
The C# object-model layer (`Game`, `Trainer`, `Pokemon`, `Inventories`) wrapping raw Core structures; the reference model for the JS-facing API.
_Avoid_: "the object layer"

**Binding**:
The interop layer between JavaScript and .NET, built on `[JSExport]`.
_Avoid_: "glue", "shim"

**Handle**:
A JavaScript object referencing a live wasm-side instance (`Game`, `Pokemon`); mutations through it are reflected in the next export.
_Avoid_: "wrapper object", "ref"

**Lookup table**:
Build-time-generated reference data (species, natures, items) exposed to JS; universal tables are global, game-dependent ones live on the `Game` handle.
_Avoid_: "repository", "database"

**Edit tier**:
Generations where every v1 mutator applies (Gen 3–7, SwSh, BDSP, SV, Z-A); natures are written mint-aware.
_Avoid_: "full support"

**Read-only tier**:
Generations that load and inspect but reject mutators with descriptive errors (Gen 1–2, LGPE, PLA).
_Avoid_: "partial support"

**Wasm host**:
The browser-side arrangement of the .NET runtime running Core; committed to bare Mono-wasm (`wasmbrowser`) with no Blazor.
_Avoid_: "runtime backend"

**Managed crypto**:
Vendored pure-C# MD5/AES implementations registered into `RuntimeCryptographyProvider` at init; no JavaScript crypto involvement anywhere.
_Avoid_: "crypto bridge", "JS bridge"

**Projection**:
The systematic copying of Core's shapes, types, and methods into TypeScript — Roslyn scans the C# source, ts-morph emits; names follow a mechanical transform with drift-gated overrides.
_Avoid_: "mirror", "the port"
