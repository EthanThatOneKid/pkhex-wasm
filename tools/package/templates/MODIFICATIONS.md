# Modifications to upstream sources

GPLv3 §5a requires modified versions to "carry prominent notices stating that
you changed the software". This log records every deviation of pkhex-wasm from
the vendored upstreams pinned in [`upstream.json`](./upstream.json). New
entries go on top; each entry names what changed and why.

## Vendored crypto subset (`src/PKHexWasm/Crypto/Vendored/`, since initial import)

- **What**: BouncyCastle-lineage MD5 + AES engine copied verbatim; support
  utilities (`Pack`, `Arrays`, `Integers`, `Platform`) trimmed to the members
  the algorithm files reference, with trims noted in per-file header comments.
- **Why**: shrink the vendored license surface to exactly what the wasm bundle
  executes; native `System.Security.Cryptography` throws under wasmbrowser.
- **Detail**: file-by-file table in `PROVENANCE.md` next to the sources.
- CBC-NoPadding chaining is **not** vendored code — implemented fresh in
  `src/PKHexWasm/Crypto/ManagedAes.cs`.

## PKHeX.Core — no modifications

Compiled into the wasm bundle exactly as pinned in `upstream.json`. All save-
format behavior differences live in this repository's own layers
(`src/PKHexWasm`, `src/ts`), which are original work, not modifications of
upstream code.
