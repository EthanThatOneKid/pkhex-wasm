## Architecture

Locked by the [hosting verdict](https://github.com/EthanThatOneKid/pkhex-wasm/issues/6) and validated end-to-end by the [spike](../../spike/):

- **Wasm host**: bare Mono-wasm (`wasmbrowser` workload). No Blazor anywhere.
- **Binding**: `[JSExport]`-annotated C# surface; JavaScript talks to managed objects directly. The JS-facing model mirrors `PKHeX.Facade`'s object model — entity Handles bound to Core structures, not a reimplementation.
- **Managed crypto**: vendored pure-C# MD5/AES implementations registered into `RuntimeCryptographyProvider` during init; no JavaScript crypto involvement anywhere (see [Crypto requirements](#crypto-requirements)).
- **Transport**: copy-in/copy-out typed arrays across the boundary (see [Data contracts](#data-contracts)).
- **Lifecycle**: GC-reliant on both sides. No `dispose()`, no manual memory management for consumers.

The spike measured ~5.9–6.0 MB gzipped transferred to interactive with PKHeX.Core trimmed into the bundle; that is the packaging budget baseline (see [Packaging & release](#packaging--release)).
