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

## Architecture

Locked by the [hosting verdict](https://github.com/EthanThatOneKid/pkhex-wasm/issues/6) and validated end-to-end by the [spike](../../spike/):

- **Wasm host**: bare Mono-wasm (`wasmbrowser` workload). No Blazor anywhere.
- **Binding**: `[JSExport]`-annotated C# surface; JavaScript talks to managed objects directly. The JS-facing model mirrors `PKHeX.Facade`'s object model — entity Handles bound to Core structures, not a reimplementation.
- **Managed crypto**: vendored pure-C# MD5/AES implementations registered into `RuntimeCryptographyProvider` during init; no JavaScript crypto involvement anywhere (see [Crypto requirements](#crypto-requirements)).
- **Transport**: copy-in/copy-out typed arrays across the boundary (see [Data contracts](#data-contracts)).
- **Lifecycle**: GC-reliant on both sides. No `dispose()`, no manual memory management for consumers.

The spike measured ~5.9–6.0 MB gzipped transferred to interactive with PKHeX.Core trimmed into the bundle; that is the packaging budget baseline (see [Packaging & release](#packaging--release)).

## Bootstrap lifecycle

Exactly one asynchronous step exists in the entire API: `initPKHex()`.

1. Fetch and instantiate the `_framework` runtime assets (`options.wasmBaseUrl` overrides the location; default is the package's own bundled runtime directory).
2. Register Managed crypto providers onto `RuntimeCryptographyProvider.Aes` / `.Md5` — strictly **before** any save can be parsed, so BDSP/Gen 7/HOME seams work transparently the first time they are reached.
3. Hydrate the global Lookup tables (species, natures, moves) and prepare per-game table loading.
4. Return the synchronous root.

Every operation on the returned root is synchronous. There is deliberately no second async boundary, no lazy per-generation loading, no worker requirement.

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

The chapter below is generated from `tools/apigen/model.ts` by `deno task gen`. It is normative; edit the model, not this text.

## Public surface

> Generated from `tools/apigen/model.ts` — run `deno task gen`; never edit by hand.
> The same model emits [`docs/api/pkhex-wasm.d.ts`](../api/pkhex-wasm.d.ts),
> the declaration file the live docs site builds from.

### `StatBlock`

Six-stat block shared by IVs, EVs, and computed stats.

| Member | Type | Description |
| --- | --- | --- |
| `health` | `number` | HP stat / individual value / effort value. |
| `attack` | `number` | Attack. |
| `defense` | `number` | Defense. |
| `specialAttack` | `number` | Special attack. |
| `specialDefense` | `number` | Special defense. |
| `speed` | `number` | Speed. |

### `LookupRef`

A reference into a global lookup table: numeric id plus display name.

| Member | Type | Description |
| --- | --- | --- |
| `id` | `number` | Numeric id used by every mutator and table lookup. |
| `name` | `string` | Display name. |

### `MoveSlot`

One of an entity's four move slots.

| Member | Type | Description |
| --- | --- | --- |
| `move` | `LookupRef` | The move in this slot. |
| `pp` | `number` | Current power points remaining for this slot. |

### `TrainerRef`

Original-trainer attribution carried on every entity.

| Member | Type | Description |
| --- | --- | --- |
| `name` | `string` | Trainer name. |
| `id` | `{ tid: number; sid: number }` | Trainer ID pair (`tid` visible in game; `sid` hidden secret id). |
| `gender` | `'male' \| 'female' \| 'unspecified'` | Trainer gender. |

### `TrainerInfo`

Extends: `TrainerRef`

Read-only trainer information exposed by a save.

| Member | Type | Description |
| --- | --- | --- |
| `money?` | `number` | Money held, when the format tracks it. |

### `LookupTable`<T>

Immutable build-time-generated lookup table over universal reference data (species, natures, moves).

| Member | Type | Description |
| --- | --- | --- |
| `size` | `number` | Number of entries. |

#### `get(id: number): T | undefined`

Look up one entry by id.

#### `all(): readonly T[]`

Every entry, ordered by id.

### `SpeciesInfo`

Extends: `LookupRef`

Species entry in the global species table.

| Member | Type | Description |
| --- | --- | --- |
| `nationalDex` | `number` | National Pokédex number; identical to the inherited id. |
| `types` | `readonly string[]` | Type lineup. |
| `baseStats` | `StatBlock` | Base stat spread. |

### `NatureInfo`

Extends: `LookupRef`

Nature entry in the global nature table.

| Member | Type | Description |
| --- | --- | --- |
| `statMultipliers` | `{ attack: number; defense: number; speed: number; specialAttack: number; specialDefense: number }` | Stat multipliers this nature applies (1.0 neutral). |

### `MoveInfo`

Extends: `LookupRef`

Move entry in the global move table.  Carries only what Core itself tracks (type, PP). Base power and accuracy are absent from PKHeX.Core; sourcing them externally is tracked as a post-v1 enhancement.

| Member | Type | Description |
| --- | --- | --- |
| `type` | `string` | Move type. |
| `pp` | `number` | Base power points. |

### `ItemInfo`

Extends: `LookupRef`

Item entry in a per-game item table.

| Member | Type | Description |
| --- | --- | --- |
| `description?` | `string` | Flavor text, when available. |

### `InitOptions`

Options for the one-time asynchronous initialization of the wasm runtime.

| Member | Type | Description |
| --- | --- | --- |
| `wasmBaseUrl?` | `string` | Base URL the runtime fetches its `_framework` assets from. |

### `Game`

A loaded save file. All accessors return snapshots; entity Handles write through to the underlying save, and changes are reflected on the next {@link PKHex.saveBytes} call.

| Member | Type | Description |
| --- | --- | --- |
| `trainer` | `TrainerInfo` | Read-only trainer data (name and ID are readable in v1; not editable). |
| `boxCount` | `number` | Number of storage boxes this save format provides (e.g. 14 in Gen 3). |
| `items` | `LookupTable<ItemInfo>` | Per-game item lookup table (game-dependent data stays version-scoped). |
| `generation` | `string` | Generation context of the loaded save, e.g. `"Gen1"`, `"Gen8b"`. |

#### `box(index: number): Pokemon[]`

Snapshot of one storage box. Slot order matches the game's own ordering; empty slots are absent from the array.

- **`index`** — zero-based box index, `< boxCount`

Throws:

- `RangeError` — when `index` is outside `[0, boxCount)`

#### `party(): Pokemon[]`

Snapshot of the party (up to six entities).

### `Pokemon`

A single Pokémon entity. Reads are always available; mutators apply only within the edit tier (Gen 3–7, SwSh, BDSP, SV, Legends Z-A) and throw descriptive errors elsewhere.

| Member | Type | Description |
| --- | --- | --- |
| `species` | `LookupRef` | Species reference (national dex id + display name). Read-only in v1. |
| `nickname` | `string` | Current nickname. |
| `level` | `number` | Current level. |
| `isShiny` | `boolean` | Shiny state. |
| `gender` | `'male' \| 'female' \| 'genderless'` | Gender. |
| `ivs` | `Readonly<StatBlock>` | Individual values. Gen 1–2 caps at 15 with special-defense aliasing special. |
| `evs` | `Readonly<StatBlock>` | Effort values (legacy scales on Gen 1–2; absent systems on LGPE/PLA reads). |
| `stats` | `Readonly<StatBlock>` | Computed battle stats derived from species/level/IVs/EVs/nature. |
| `moves` | `readonly MoveSlot[]` | Four move slots; empty slots carry move id `0`. |
| `nature` | `LookupRef \| null` | Current nature. `null` on Gen 1–2 entities, where the concept does not exist. |
| `owner` | `TrainerRef` | Original-trainer attribution. |

#### `setNickname(nickname: string): void`

Rename this entity.

Throws:

- `UnsupportedTierError` — on read-only-tier saves
- `RangeError` — when exceeding the generation's nickname length or charset limits

#### `setLevel(level: number): void`

Set the level; experience is adjusted accordingly.

Values outside `1..100` clamp, mirroring the game's own behavior.

Throws:

- `UnsupportedTierError` — on read-only-tier saves

#### `setMoves(moveIds: readonly [number, number, number, number]): void`

Overwrite all four move slots (ids in the global move table; `0` clears).

Throws:

- `UnsupportedTierError` — on read-only-tier saves
- `RangeError` — when an id is unknown to this generation's movepool

#### `setNature(natureId: number): void`

Set the nature (mint-aware on Gen 8+ formats).

Throws:

- `UnsupportedOperationError` — on Gen 1–2 (natures do not exist)
- `UnsupportedTierError` — on other read-only-tier saves

#### `setShiny(shiny: boolean): void`

Force shiny on or off (PID manipulation on Gen 3+).

Read-only tiers — including Gen 1–2, where shiny is DV-derived and the upstream unset path is hazardous — reject before reaching Core.

Throws:

- `UnsupportedTierError` — on read-only-tier saves

#### `setIVs(partial: Partial<StatBlock>): void`

Merge individual values; omitted stats keep their current value.

Values clamp per generation (31 standard, 15 on Gen 1–2).

Throws:

- `UnsupportedTierError` — on read-only-tier saves

#### `setEVs(partial: Partial<StatBlock>): void`

Merge effort values; omitted stats keep their current value.

Caps follow the generation (252/510 standard; legacy scale on Gen 1–2).

Throws:

- `UnsupportedTierError` — on read-only-tier saves

### `PKHex`

The initialized API root. Every operation here is synchronous.

| Member | Type | Description |
| --- | --- | --- |
| `species` | `LookupTable<SpeciesInfo>` | Global species table (national dex). |
| `natures` | `LookupTable<NatureInfo>` | Global nature table. |
| `moves` | `LookupTable<MoveInfo>` | Global move table. |

#### `load(saveBytes: Uint8Array): Game`

Parse a complete save-file buffer into an editable {@link Game}.

The input is defensively copied; callers retain ownership of `saveBytes`.

- **`saveBytes`** — one complete logical save buffer (up to ~4.4 MB; Switch-era main/backup/poke_trade files must be assembled by the caller)

Throws:

- `SaveParseError` — when the bytes match no supported format

#### `saveBytes(game: Game): Uint8Array`

Serialize a game back to a fresh save-file byte array. Every call returns a new `Uint8Array`; nothing aliases prior exports.

### Error classes

- `SaveParseError` — Thrown by {@link PKHex.load} for unrecognized or corrupt buffers.

- `UnsupportedTierError` — Thrown when a mutator is called on a read-only-tier generation (Gen 1–2, LGPE, PLA). The message names the unsupported operation.

- `UnsupportedOperationError` — Thrown when an operation has no meaning for the entity's generation (e.g. setting natures before Gen 3).

### `initPKHex`

```ts
function initPKHex(options?: InitOptions): Promise<PKHex>;
```

Initialize the wasm runtime exactly once; every subsequent operation on the returned root is synchronous.

- **`options`** — runtime bootstrap options

Example:

```ts
import { initPKHex } from 'pkhex-wasm';

const PKHex = await initPKHex();
const game = PKHex.load(saveBytes);
game.box(0)[0].setNickname('Sparky');
const out = PKHex.saveBytes(game);
```

### Runtime binding map

Every `[JSExport]` member of the wasm facade and the surface member it powers.
Generated from `runtime-meta.json` + `mappings.ts`; the drift gate fails
when either side changes without the other.

| Wasm export | Surface | Note |
| --- | --- | --- |
| `Close` | `(internal)` | optional explicit release; GC-reliant contract unchanged |
| `GenerateDemoSave` | `(internal)` | dev/demo helper |
| `GetApiVersion` | `(internal)` | runtime version stamp |
| `GameBoxMonHandles` | `Game.box` | materializes entity handles per non-empty slot |
| `GameBoxCount` | `Game.boxCount` |  |
| `GameGeneration` | `Game.generation` |  |
| `GamePartyMonHandles` | `Game.party` | materializes entity handles per non-empty slot |
| `Load` | `PKHex.load` | defensive copy-in happens wasm-side |
| `SaveBytes` | `PKHex.saveBytes` |  |
| `MonEVs` | `Pokemon.evs` | wire order translated to StatBlock display order |
| `MonGender` | `Pokemon.gender` |  |
| `MonIsShiny` | `Pokemon.isShiny` |  |
| `MonIVs` | `Pokemon.ivs` | wire order translated to StatBlock display order |
| `MonLevel` | `Pokemon.level` |  |
| `MonMoveSlots` | `Pokemon.moves` | flat [id, pp] x4 reshaped into MoveSlot[] |
| `MonNatureId` | `Pokemon.nature` | -1 sentinel maps to null pre-Gen3 |
| `MonNickname` | `Pokemon.nickname` |  |
| `MonOwnerGender` | `Pokemon.owner.gender` |  |
| `MonOwnerSecretId` | `Pokemon.owner.id.sid` |  |
| `MonOwnerId` | `Pokemon.owner.id.tid` |  |
| `MonOwnerName` | `Pokemon.owner.name` |  |
| `MonSetEVs` | `Pokemon.setEVs` | partial merge resolved client-side |
| `MonSetIVs` | `Pokemon.setIVs` | partial merge resolved client-side |
| `MonSetLevel` | `Pokemon.setLevel` | client clamps 1..100 before the call |
| `MonSetMoves` | `Pokemon.setMoves` |  |
| `MonSetNature` | `Pokemon.setNature` | mint-aware: nature + stat alignment written together |
| `MonSetNickname` | `Pokemon.setNickname` | rejects beyond the generation's length cap |
| `MonSetShiny` | `Pokemon.setShiny` |  |
| `MonSpecies` | `Pokemon.species` |  |
| `MonStats` | `Pokemon.stats` |  |
| `GameTrainerGender` | `TrainerInfo.gender` |  |
| `GameTrainerSecretId` | `TrainerInfo.id.sid` |  |
| `GameTrainerId` | `TrainerInfo.id.tid` |  |
| `GameMoney` | `TrainerInfo.money` |  |
| `GameTrainerName` | `TrainerInfo.name` |  |

## Crypto requirements

Locked by [Choose crypto strategy](https://github.com/EthanThatOneKid/pkhex-wasm/issues/8):

- **Strategy: managed in-bundle.** Pure-managed MD5 + AES-128 (ECB & CBC, NoPadding) vendored into the wasm bundle and registered onto `RuntimeCryptographyProvider.Aes` / `.Md5` during `initPKHex()` — before any save parsing, invisible to consumers. Managed crypto only: no JavaScript crypto involvement anywhere, no crypto-js dependency, nothing for consumers to install.
- **The three real seams** this unblocks: BDSP whole-save MD5, MemeCrypto AES-128-ECB-NoPadding, HOME AES-128-CBC-NoPadding. Gen 1–6 paths never touch them (zero cost when unused).
- **Sourcing**: existing MIT/public-domain pure-C# implementations (BouncyCastle-lineage or equivalent), stripped to MD5 + the AES block cipher + the two modes only. Provenance reviewed at adoption; GPLv3 unaffected by MIT-vendored parts.
- **Rejected alternatives**: crypto-js `[JSImport]` bridge (~60 KB gz on every consumer bundle, maintenance-mode dependency, hex-marshaling per call); native WebCrypto (no MD5 in `subtle.digest`, ECB deliberately excluded, CBC is PKCS#7-only against the NoPadding requirement, async-only interface clashes with the sync parse chain, `Atomics.wait`/SharedArrayBuffer sync-ification would force COOP/COEP headers onto every consuming page).
- **Verification bar**: RFC 1321 test vectors (MD5) and NIST SP 800-38A vectors (AES-ECB/AES-CBC) as xUnit cases, round-trip properties, Node-crypto cross-checks via shared constants; upstream MemeCrypto/Home tests stay green untouched.

## Testing requirements

Locked by [Define testing strategy and packaging/CI gates](https://github.com/EthanThatOneKid/pkhex-wasm/issues/11):

- **Fixture saves**: blank-generated primary strategy — a shared test factory builds blank saves per `EntityContext` (the spike/probe pattern). **No real save binaries are ever committed** (legal/privacy gray zone; real-file parsing robustness is upstream Core's own test burden). A gitignored local fixtures directory stays available for development against personal dumps.
- **Assertion layers**: C# xUnit remains the logic seam and hosts the RFC 1321 / NIST SP 800-38A crypto vectors; expected digests ship as constants shared by both layers so the JS suite asserts identical results.
- **Bootstrap assertion**: a dedicated test asserts `initPKHex()` registers the Managed crypto providers *before any parse path can run* (mandated by [#8](https://github.com/EthanThatOneKid/pkhex-wasm/issues/8)).
- **JS-side harness**: playwright-driven E2E against the built static site on ubuntu CI (headless Chromium). Node-loading of `wasmbrowser` output is explicitly avoided; no `wasmconsole` double-build.
- **Generator drift gate**: `deno task gen:check` fails CI when any generated artifact lags its model input.
- **CI matrix**: PR = recursive-submodule checkout → .NET 10 setup → Release build → full `dotnet test` → JS E2E → publish artifact + size-budget check. `main` additionally triggers the docs workflow.

## Packaging & release

Locked by [Define testing strategy and packaging/CI gates](https://github.com/EthanThatOneKid/pkhex-wasm/issues/11), following the [docxodus](https://github.com/EthanThatOneKid/pkhex-wasm/issues/4) and libsidplayfp-wasm patterns:

- **Tarball shape** (docxodus wholesale): ESM-only entry exporting `initPKHex` + Lookup tables, per-entry `.d.ts`, entire wasm runtime under `dist/wasm/_framework`, precompressed brotli siblings.
- **Size budget gate**: hard build failure above **8 MB gz first-load** (spike baseline ~6 MB leaves headroom for tables + compliance kit).
- **GPL compliance kit** (libsidplayfp pattern): `complete-source.tar.gz` shipped *inside the npm tarball* **and** attached to every GitHub release (satisfying GPLv3 §3a), plus `THIRD-PARTY-NOTICES.md`, a `MODIFICATIONS.md` log, and a commit-pinned `upstream.json`.
- **Publishing**: tag `v*` → assemble compliance kit → build → `npm publish --access public` with OIDC trusted publishing (npm ≥ 11 pinned), mirroring docxodus's release workflow.
- **Upstream sync ritual** (manual, owner-owned — upstream has no stable release train to watch mechanically): bump the `PKHeX.Everywhere` submodule → full suite green → changelog note → semver call per the API-surface contract ([#7](https://github.com/EthanThatOneKid/pkhex-wasm/issues/7)): minor if behavior adds, patch if fixes, major if the JS surface breaks. Documented CONTRIBUTING-style.

## Risk register

Known landmines, discovered during research and the empirical probe — every implementation session should re-read this list:

| Risk | Consequence | Mitigation |
| --- | --- | --- |
| Upstream `SetUnshiny` on GB formats can loop forever (`SetPIDGender` reroll against a no-op PID setter) | Hang in consumer code via `setShiny(false)` on Gen 1–2 | All mutators throw on read-only tiers per [#10](https://github.com/EthanThatOneKid/pkhex-wasm/issues/10) — Gen 1–2 never reach Core; hazard recorded as part of why their editing stays deferred |
| `CommonEdits.SetNature` silently no-ops on Gen 8+ formats (mint-derived natures) | Edits that look applied but aren't | Mint-aware write path (Facade `Natures.ChangeAll` semantics) is a hard requirement |
| Blank `SAV3` constructs with an empty data buffer; `Write()` fails until seeded | Fixture-factory round-trips break for Gen 3 only | Factory seeds Gen 3 blanks before any Write; probe code documents the exact quirk |
| IL trim warnings around `EntityConverter` / `EvolutionTree` under NativeAOT-style trimming | Runtime breaks surface late | Trim warnings tracked per upstream bump; spike's trim profile is the baseline |
| .NET 10 wasmbrowser template churn between SDK bumps | Host bootstrap drifts | Spike pins behavior in tests; bump ritual includes full E2E run |
| Four duplicate `PKHeX.Core.wasm` variants observed in intermediate output (only one loads) | Silent bundle-size bloat | Packaging step audits emitted assets against the size gate |

## Documentation pipeline

Live site: <https://ethanthatonekid.github.io/pkhex-wasm/> — regenerated on every push to `main` by the [docs workflow](https://github.com/EthanThatOneKid/pkhex-wasm/issues/12) from [`docs/api/pkhex-wasm.d.ts`](../api/pkhex-wasm.d.ts) (this spec's canonical declaration file). Owner direction: the long-term v1 bindings are a systematically generated Deno 2.x type-safe TypeScript library using [ts-morph](https://ts-morph.com/) structured bindings — exactly what `tools/apigen/` does; when packaging produces generated types from the wasm host, that output supersedes the skeleton and becomes the workflow entry.

## Implementation checklist

Ordered handoff list — each step is one session-sized unit of work:

1. **Repo layout**: promote `src/ts/` (binding package source, bootstrapped by this generator) and a real wasm host library evolving `spike/SpikeLib` beyond demo scope.
2. **Binding layer**: implement the Handle classes against `[JSExport]` services over Core directly (AutoMod excluded from the bundle), honoring [Data contracts](#data-contracts).
3. **Managed crypto**: vendor MIT-lineage MD5/AES-128-ECB/CBC-NoPadding; register at init; land RFC/NIST vector tests + Node cross-checks.
4. **Tier enforcement**: edit/read-only guards ahead of every mutator call; descriptive errors per the matrix.
5. **Lookup-table generator**: build-time table JSON (species/natures/moves universal; items per game family) hydrated at init.
6. **Test factory + E2E**: blank-fixture factory per `EntityContext`; generalize the spike QA scripts into the playwright suite with shared crypto-vector constants.
7. **Packaging pipeline**: docxodus-shaped tarball build, brotli precompression, 8 MB gz budget gate, compliance-kit script (`complete-source.tar.gz`, notices, modifications log, `upstream.json`).
8. **Publish workflow + ritual doc**: tag-triggered OIDC publishing; CONTRIBUTING section for the upstream-sync ritual.
9. **Docs entrypoint swap**: when generated types replace the skeleton, point the docs workflow at the new entry and retire the interim declaration file into generator fixtures.

Each generation-support addition beyond v1 repeats: capability probe → tier assignment → fixture coverage → table generation → docs matrix update.
