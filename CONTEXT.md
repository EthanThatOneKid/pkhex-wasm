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

**Wasm host**:
The browser-side arrangement of the .NET runtime running Core; committed to bare Mono-wasm (`wasmbrowser`) with no Blazor.
_Avoid_: "runtime backend"

**Crypto bridge**:
JavaScript-side synchronous crypto backing `RuntimeCryptographyProvider` where the browser-BCL restricts `System.Security.Cryptography`; a distinct mechanism from the Binding.
_Avoid_: conflating with the Binding
