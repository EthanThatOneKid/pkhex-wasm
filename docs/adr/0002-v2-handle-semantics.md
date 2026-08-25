# ADR 0002: v2 Handle Semantics and Lifecycle

Date: 2026-08-25 · Status: Accepted · Decided in [Define v2 snapshot semantics and lifecycle](https://github.com/EthanThatOneKid/pkhex-wasm/issues/32)

## Context

The v1 binding registers fresh entity handles on every accessor call (`GameBoxMonHandles` / `GamePartyMonHandles`): each `box()` call returns new JS objects, though they behave as live views — field reads hit wasm state at call time, setters flush into the save immediately, and `saveBytes` serializes whatever was applied. The entity/game registries are unbounded; only `Close(game)` exists (cascading to its entities).

The v2 projection multiplies both sides of this problem: ~200 members per entity make consumers hold and pass references, and bags/dex/daycare materialize many more entities per save. The ticket asked four questions — snapshot identity, staleness, write timing, registry bounds — plus narrowing safety for the per-format interfaces.

## Decision

**Stable handles.** One projected JS object exists per stored-entity coordinate — `(save, box, slot)` or `(save, party slot)` — created on first access and returned on every later access. Two reads of box 0 slot 0 yield the same object. The cache is keyed by slot coordinates; invalidation becomes relevant only when storage-rearrangement operations land (utility follow-up effort, out of scope).

**Handles are always live.** Every field read reflects current state at read time; there are no built-in point-in-time copies in the surface. Consumers needing a frozen value use shallow spread (`{ ...mon }`) — documented as the snapshot idiom, not an API. A `.snapshot()` method may be added additively later without breaking anything.

**Writes are immediate and synchronous.** Every setter applies completely before it returns, in call order; `saveBytes(game)` serializes exactly what has been applied. There is no commit/flush/buffer stage. Wire-format batching inside the Binding layer stays free to optimize transport, provided observable semantics remain immediate-and-ordered.

**Explicit close, documented leak otherwise.** Entity handles gain `close()`; game handles keep theirs and continue cascading to every entity they registered. Dropping references without closing leaks wasm-side entries until process exit — the documented v1 trade-off stands, now with a deterministic escape hatch. `FinalizationRegistry` auto-cleanup is rejected: GC timing must not own cross-boundary lifetimes.

**Format interfaces never mutate.** Core never changes a PKM's concrete format class in place — conversions (`ConvertToPK4()` and siblings) produce new instances, and cross-context insertion goes through adaptation that creates new entities. Within a loaded save nothing on the surface, including species writes, alters the format family. Invariant: a projected view's format interface is fixed by the save's EntityContext at load and remains valid for the handle's life; any future transfer feature returns new handles rather than reshaping existing views.

## Consequences

- Stable identity makes `WeakMap` attachment, reference passing, and identity-based dedupe sound; it also means consumers can observe each other's writes through shared handles — intended.
- The slot-coordinate cache needs care in the Binding rebuild: two coordinates pointing at the same underlying PKM instance (box vs party copies in some formats) must decide aliasing explicitly when those features arrive; today every registered coordinate is its own handle, matching v1.
- Immediate-write semantics forbid the Binding from deferring or reordering setter effects across calls; batched transport must preserve per-call ordering and error timing (a throwing setter leaves earlier setters applied).
- `close()`d handles throw the standard unknown-handle error on later use; double-close is a no-op. Tests for all three behaviors belong to the Binding rebuild.
