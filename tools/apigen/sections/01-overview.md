# pkhex-wasm v1 JavaScript API Specification

**Status: Locked · 2026-08-22** — the destination artifact of the [wayfinder map](https://github.com/EthanThatOneKid/pkhex-wasm/issues/1). An implementation session builds v1 from this document without re-deciding anything.

Normative decision tickets: [hosting](https://github.com/EthanThatOneKid/pkhex-wasm/issues/6) · [API surface](https://github.com/EthanThatOneKid/pkhex-wasm/issues/7) · [crypto strategy](https://github.com/EthanThatOneKid/pkhex-wasm/issues/8) · [byte transport](https://github.com/EthanThatOneKid/pkhex-wasm/issues/9) · [generation matrix](https://github.com/EthanThatOneKid/pkhex-wasm/issues/10) · [testing & packaging gates](https://github.com/EthanThatOneKid/pkhex-wasm/issues/11) · [docs pipeline](https://github.com/EthanThatOneKid/pkhex-wasm/issues/12).

Vocabulary follows [`CONTEXT.md`](../../CONTEXT.md): **Handle**, **Binding**, **Lookup table**, **Edit tier**, **Read-only tier**, **Managed crypto**.

This document is partly generated. The [public surface](#public-surface) chapter and the canonical declaration file are emitted from `tools/apigen/model.ts`:

```bash
deno task gen          # regenerate outputs
deno task gen:check    # CI drift gate — fails when outputs lag the model
```

Never hand-edit generated content; change the model or a section source and regenerate.
