# ADR 0002: v2 Projection Contract

Date: 2026-08-25 Â· Status: Accepted Â· Decided in [Lock the v2 projection contract](https://github.com/EthanThatOneKid/pkhex-wasm/issues/31)

## Context

The v2 effort ([map](https://github.com/EthanThatOneKid/pkhex-wasm/issues/30)) replaces the curated Handle surface with a mechanical projection of PKHeX.Core â€” shapes, types, and methods copied systematically from C# source (Roslyn scans Core â†’ ts-morph emits). Every downstream ticket inherits whatever rules this contract locks, and the surface it produces edits real save files: silent mis-mappings corrupt saves rather than crash.

The [surface inventory](https://github.com/EthanThatOneKid/pkhex-wasm/blob/research/core-surface-inventory/docs/research/core-surface-inventory.md) (research branch) found the hazards any naive copy would hit: derived properties (`CurrentLevel` â‡„ EXP, `IsShiny` never stored), true 64-bit fields (`Tracker ulong`), `DateOnly?`/`TimeOnly?` members, C# enums, hostile names (`Move1_PP`, `Stat_HPCurrent`), Span-based buffers, and ~40 virtual no-op stubs on older formats.

## Decision

**Type mapping**

| C# | TypeScript |
| --- | --- |
| `byte` `sbyte` `short` `ushort` `int` `uint` | `number` |
| `long` `ulong` (true 64-bit, e.g. `Tracker`, `JunkData`) | `bigint` |
| `bool` / `string` | `boolean` / `string` |
| `T[]`, `IList<T>`, `IReadOnlyList<T>` | readonly array snapshots |
| `Span<byte>` / `byte[]` buffers | `Uint8Array` (copied at the boundary) |
| `DateOnly?` / `TimeOnly?` | ISO strings (`"2023-04-05"`, `"HH:mm:ss"`) or `null` |
| C# enums | generated string-literal unions; the generator owns nameâ†”value tables |
| nullable references `T?` | `T \| null` (never `undefined`) |

**Computed members are read-only.** The reflector marks every derived/computed member `computed: true` (getter recomputes or the value is never stored: `CurrentLevel`, `IsShiny`, pre-Gen6 `Nature`, ribbon/mark counts). The projection emits them as read-only fields; mutation flows only through designated mutators (`setLevel`-style methods, PID-family setters). This rule is the projection's safety story â€” without it, property-shaped writes to derived fields produce bad eggs.

**Naming transform.** Segmented rule over underscores/digits/acronyms, applied at emit time:

```
PascalCase segments split on case boundaries, underscores, and digit runs;
first segment lowercased including acronym runs.
  Move1_PP        â†’ move1Pp
  Stat_HPCurrent  â†’ statHpCurrent
  IV_HP           â†’ ivHp
  TID16           â†’ tid16
  GetRibbon       â†’ getRibbon
```

Hostile stragglers go in an explicit override table beside today's `mappings.ts`; edited only in contract PRs; drift-gated by CI.

**Metadata carries raw facts only.** `runtime-meta.json` v2 stores untransformed C# facts per member â€” name, kind (property/field/method), type, access (get/set/both), docs, declaring class, `computed` flag. The casing/type transforms live entirely in `tools/apigen`, so naming iteration never requires rescanning C#.

**Doc carry-over** *(settled by convention under the accepted principles)*. XML `<summary>` becomes JSDoc verbatim with `<param>`/`<returns>` converted to `@param`/`@returns`; the generator appends a format-availability line derived from the declaring-class hierarchy.

**Tier checks stay out of scope here.** Per-member availability/tier encoding remains fog on the map until the snapshot-semantics ticket lands; this contract only fixes how members are *shaped*.

## Consequences

- Every projected artifact is deterministic given (Core source, metadata schema, transform): the inverted drift gate can fail CI on any unmapped Core member.
- `bigint` leaks into consumers' code for a handful of u64 fields â€” accepted cost of byte-exact fidelity.
- Enum unions freeze closed sets at generation time; a Core enum gaining a value regenerates the union via the drift gate rather than silently widening.
- Computed-member classification is a reflector responsibility: misclassifying a stored field as computed (or vice versa) is the contract's main failure mode and deserves targeted tests when the reflector extension lands.
