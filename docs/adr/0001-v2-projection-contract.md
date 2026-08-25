# ADR 0001: v2 Projection Contract

Date: 2026-08-25 · Status: Accepted · Decided in [Lock the v2 projection contract](https://github.com/EthanThatOneKid/pkhex-wasm/issues/31)

## Context

The v2 effort ([map](https://github.com/EthanThatOneKid/pkhex-wasm/issues/30)) replaces the curated Handle surface with a mechanical projection of PKHeX.Core — shapes, types, and methods copied systematically from C# source (Roslyn scans Core → ts-morph emits). Every downstream ticket inherits whatever rules this contract locks, and the surface it produces edits real save files: silent mis-mappings corrupt saves rather than crash.

The [surface inventory](https://github.com/EthanThatOneKid/pkhex-wasm/blob/research/core-surface-inventory/docs/research/core-surface-inventory.md) (research branch) found the hazards any naive copy would hit: derived properties (`CurrentLevel` ⇄ EXP, `IsShiny` never stored), true 64-bit fields (`Tracker ulong`), `DateOnly?`/`TimeOnly?` members, C# enums, hostile names (`Move1_PP`, `Stat_HPCurrent`), Span-based buffers, and ~40 virtual no-op stubs on older formats.

## Decision

**Type mapping**

| C# | TypeScript |
| --- | --- |
| `byte` `sbyte` `short` `ushort` `int` `uint` | `number` |
| `long` `ulong` (true 64-bit, e.g. `Tracker`, `JunkData`) | `bigint` |
| `float` `double` | `number` |
| `bool` / `string` | `boolean` / `string` |
| `byte[]`, `Span<byte>`, `ReadOnlySpan<byte>`, `Memory<byte>` | `Uint8Array` (copied at the boundary) |
| Non-byte spans and arrays (`ReadOnlySpan<ushort>`, `ushort[]`, `int[]`) | readonly `number[]` snapshots |
| Reference collections (`IList<T>`, `IReadOnlyList<T>` of class types) | readonly array snapshots of projected views |
| `DateOnly?` / `TimeOnly?` | ISO strings (`"2023-04-05"`, `"HH:mm:ss"`) or `null` |
| C# enums | generated string-literal unions; name↔value tables live in the metadata (see below) |
| Nullable references `T?` | `T \| null` (never `undefined`) |

**String encodings.** Projected members expose JS `string`; Core's per-generation encodings (Gen1/2 single-byte tables, Gen3–5 UTF-16 variant tables, Gen6+ Unicode) stay an internal concern of the wasm side. Raw trash-byte access projects as a sibling `Uint8Array` field where Core exposes it — string get/set plus trash bytes, never raw-only.

**Computed members are read-only.** The reflector marks every derived/computed member `computed: true` (getter recomputes or the value is never stored: `CurrentLevel`, `IsShiny`, pre-Gen6 `Nature`, ribbon/mark counts). The projection emits them as read-only fields; mutation flows only through designated mutators (`setLevel`-style methods, PID-family setters). This rule is the projection's safety story — without it, property-shaped writes to derived fields produce bad eggs.

**Naming transform.** Segmented rule over underscores/digits/acronyms, applied at emit time:

```
PascalCase segments split on case boundaries, underscores, and digit runs;
first segment lowercased including acronym runs.
  Move1_PP        -> move1Pp
  Stat_HPCurrent  -> statHpCurrent
  OT_Name         -> otName
  IV_HP           -> ivHp
  TID16           -> tid16
  GetRibbon       -> getRibbon
```

Hostile stragglers go in an explicit override table beside today's `mappings.ts`; edited only in contract PRs; drift-gated by CI.

**Metadata carries raw facts only.** `runtime-meta.json` v2 stores untransformed C# facts, sufficient for emission and gating without ever re-parsing C#:

```
{ "$schemaVersion": 2,
  enums:   { FullyQualifiedName: [ {name, value}, ... ] },
  classes: { FullyQualifiedName: {
    baseChain: [...], entityContext?, 
    members: [ { csName, kind: property|field|method,
                 csType, access: get|getSet|method,
                 computed: bool, declaredBy, docs } ] } } }
```

Enum name↔value tables are part of these raw facts — captured at scan time so the emit-side union generation needs nothing beyond the JSON. Transforms (casing, type mapping) live entirely in `tools/apigen`, so naming iteration never requires rescanning C#. Completeness signal: the scan accounts for every public member it visited; the inverted drift gate fails CI when an emitted artifact references a member absent from the metadata, or when a Core member is dropped from the scan.

**Doc carry-over.** XML `<summary>` becomes JSDoc verbatim with `<param>`/`<returns>` converted to `@param`/`@returns`. Nothing else is synthesized; format-availability annotations belong to the deferred tier-encoding work, not doc carry-over.

**Tier checks stay out of scope here.** Per-member availability/tier encoding remains fog on the map until the snapshot-semantics ticket lands; this contract only fixes how members are *shaped*.

## Consequences

- Every projected artifact is deterministic given (Core source, metadata schema, transform): the inverted drift gate can fail CI on any unmapped Core member.
- `bigint` leaks into consumers' code for a handful of u64 fields — accepted cost of byte-exact fidelity.
- Enum unions freeze closed sets at generation time; a Core enum gaining a value changes the metadata on rescan, and the drift gate regenerates the union rather than silently widening.
- Computed-member classification is a reflector responsibility: misclassifying a stored field as computed (or vice versa) is the contract's main failure mode and deserves targeted tests when the reflector extension lands.
