# pkhex-wasm

PKHeX.Core Pokémon save editing, compiled to WebAssembly — load, read, edit,
and export save files entirely in the browser. No Blazor, no server, no extra
crypto dependencies.

```ts
import { initPKHex } from "pkhex-wasm";

const PKHex = await initPKHex();
const game = PKHex.load(saveBytes); // one complete logical save buffer
game.box(0)[0].setNickname("Sparky");
const out = PKHex.saveBytes(game);
```

The runtime assets under `wasm/_framework/` must stay siblings of `index.js`
(the default `initPKHex()` resolves them relative to the module URL). Bundlers:
exclude this package from pre-bundling or copy `wasm/` alongside your output
and pass `initPKHex({ wasmBaseUrl })`.

Support tiers (v1): edit tier = Gen 3–7, SwSh, BDSP, SV, Legends Z-A;
read-only tier (mutators throw) = Gen 1–2, LGPE, PLA.

Full API reference: <https://ethanthatonekid.github.io/pkhex-wasm/>

## License

GPL-3.0-or-later — the wasm bundle links PKHeX.Core (GPLv3).
`THIRD-PARTY-NOTICES.md`, `MODIFICATIONS.md`, `upstream.json`, and
`complete-source.tar.gz` (complete corresponding source) ship inside this
package per GPLv3 §6.
