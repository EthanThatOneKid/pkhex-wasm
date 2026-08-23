## Data contracts

Locked by [byte transport](https://github.com/EthanThatOneKid/pkhex-wasm/issues/9) and the [API surface](https://github.com/EthanThatOneKid/pkhex-wasm/issues/7):

- **Copy-in**: `load(bytes)` defensively copies at the boundary. The consumer's buffer remains fully theirs afterwards; mutating it never affects a loaded game.
- **Copy-out**: every `saveBytes(game)` returns a brand-new `Uint8Array`. Nothing aliases prior exports.
- **No dirty tracking**: re-exporting an unmodified save costs one memcpy; Facade's edited flag stays informational only.
- **Single-buffer input**: v1 accepts exactly one complete logical buffer — the same contract as upstream `SaveUtil.GetSaveFile`. Ceiling: the largest accepted buffer ≈ **4,436,719 bytes (~4.4 MB)** (SV DLC range bounds + deltas + tolerance).
- **Switch-era multi-file assembly is consumer-side for v1**: main/backup/poke_trade file trios must be merged by the caller before `load`. A convenience assembler is a candidate post-v1 addition.
- **Snapshot vs write-through**: `game.box(i)` / `game.party()` return snapshots of Handles; reads through Handles hit live Core state immediately; mutator calls write through instantly and are visible to the next export.
- **GC lifecycle**: no `dispose()`, no handles to close. Consumers drop references; the runtimes collect.
- **Memory profile**: peak footprint ≈ the copied-in save buffer (≤ ~4.4 MB) plus Core's parsed representation of it; entity Handles reference live managed objects, so a held `Pokemon` keeps its save's graph reachable. Dropping all JS references to the root and its Handles makes everything collectable on both sides. No streaming, no chunking, no manual pressure valves in v1.
