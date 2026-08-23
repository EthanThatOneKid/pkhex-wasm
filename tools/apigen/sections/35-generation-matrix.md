## Generation support

Locked by [Choose supported save-generation matrix for v1](https://github.com/EthanThatOneKid/pkhex-wasm/issues/10), backed by an empirical probe across all 13 constructible formats:

| Tier | Generations |
| --- | --- |
| Edit (all seven mutators apply) | Gen 3, 4, 5, 6, 7, SwSh, BDSP, SV, Legends Z-A |
| Read-only (mutators throw descriptive errors) | Gen 1, 2, LGPE, PLA |

The tier table above is the **consumer contract**. It was set from the empirical capability probe required by [#10](https://github.com/EthanThatOneKid/pkhex-wasm/issues/10), recorded here verbatim as evidence (Core-level behavior, not API promises):

| Format | nickname | level | moves | nature | shiny on/off | IVs | EVs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Gen 1–2 | ✓ (GB charset caps: 5 JP / 10 EN) | ✓ | ✓ | ✗ concept absent (no-op) | on ✓ via DV-poke; unset has upstream infinite-loop hazard | clamp @15, SPC aliased | legacy u16 scale |
| Gen 3–7 mainline | ✓ | ✓ | ✓ | ✓ (PID-routed) | ✓✓ | full 31 | standard caps |
| LGPE | ✓ | ✓ | ✓ | ✓ | ✓✓ | full | writable but gameplay-meaningless (Awakened system) |
| SwSh / PLA / BDSP / SV / Z-A | ✓ | ✓ | ✓ | no-op via naïve path (mints/stat-alignment) | ✓✓ | full | standard (PLA uses Ganbaru levels) |

Hard requirements surfaced by verification:

- **`setNature` must be mint-aware.** The naïve `CommonEdits.SetNature` silently no-ops on every Gen 8+ format (natures derive through mints/stat-alignment there). v1 writes nature via the Facade `Natures.ChangeAll` path exclusively.
- **Natures read as `null` before Gen 3** — the concept does not exist.
- **GB quirks** (Gen 1–2): nickname caps at 5 chars JP / 10 EN with restricted charsets; IVs cap at 15 with special-defense aliasing special; EVs use the legacy scale; shiny is DV-derived — enabling works via a DV pattern, unsetting is unsupported in v1 (upstream's unset path has an infinite-loop hazard on GB formats).
- **LGPE/PLA**: EV fields are writable but gameplay-meaningless (Awakened / Ganbaru systems) — one reason both sit in the read-only tier.
- **Capability surfacing**: descriptive `Error`s plus this documented matrix. No capability flags on entities in v1; introspection can be added later without breaking anyone.
- **Lookup tables at launch**: universal species/natures/moves as global statics; per-game items for *every* loadable generation (read-tier users still want item names). The `types` and `locations` tables sketched in [#7](https://github.com/EthanThatOneKid/pkhex-wasm/issues/7) are deferred beyond v1 — the launch list is [#10](https://github.com/EthanThatOneKid/pkhex-wasm/issues/10)'s decision.
- **Deferred, re-evaluated after v1 (no promised date)**: Gen 1–2 editing; LGPE/PLA stat editing. All mutators — including `setShiny` — throw on read-only tiers; there are no partial exceptions.
