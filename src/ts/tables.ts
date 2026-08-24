import type { ItemInfo, LookupTable, MoveInfo, NatureInfo, SpeciesInfo } from "./gen/types.ts";

import speciesData from "./gen/data/species.json" with { type: "json" };
import naturesData from "./gen/data/natures.json" with { type: "json" };
import movesData from "./gen/data/moves.json" with { type: "json" };
import itemsGen1 from "./gen/data/items-Gen1.json" with { type: "json" };
import itemsGen2 from "./gen/data/items-Gen2.json" with { type: "json" };
import itemsGen3 from "./gen/data/items-Gen3.json" with { type: "json" };
import itemsGen4 from "./gen/data/items-Gen4.json" with { type: "json" };
import itemsGen5 from "./gen/data/items-Gen5.json" with { type: "json" };
import itemsGen6 from "./gen/data/items-Gen6.json" with { type: "json" };
import itemsGen7 from "./gen/data/items-Gen7.json" with { type: "json" };
import itemsGen7b from "./gen/data/items-Gen7b.json" with { type: "json" };
import itemsGen8 from "./gen/data/items-Gen8.json" with { type: "json" };
import itemsGen8a from "./gen/data/items-Gen8a.json" with { type: "json" };
import itemsGen8b from "./gen/data/items-Gen8b.json" with { type: "json" };
import itemsGen9 from "./gen/data/items-Gen9.json" with { type: "json" };
import itemsGen9a from "./gen/data/items-Gen9a.json" with { type: "json" };

/**
 * Build-time-generated Lookup tables (ticket #23), emitted by
 * `tools/tablegen` from PKHeX.Core's own data and hydrated here at module
 * load - before `initPKHex()` can hand out a root, so every table read is
 * synchronous and total.
 *
 * Measured bundle impact (2026-08-24): 420.2 KB raw / 87.4 KB gz across the
 * 16 JSON files - re-measure after regeneration with a gzip pass over
 * src/ts/gen/data.
 */
export const speciesTable = makeTable<SpeciesInfo>(speciesData);
export const naturesTable = makeTable<NatureInfo>(naturesData);
export const movesTable = makeTable<MoveInfo>(movesData);

const itemTables: Record<string, LookupTable<ItemInfo>> = {
  Gen1: makeTable(itemsGen1),
  Gen2: makeTable(itemsGen2),
  Gen3: makeTable(itemsGen3),
  Gen4: makeTable(itemsGen4),
  Gen5: makeTable(itemsGen5),
  Gen6: makeTable(itemsGen6),
  Gen7: makeTable(itemsGen7),
  Gen7b: makeTable(itemsGen7b),
  Gen8: makeTable(itemsGen8),
  Gen8a: makeTable(itemsGen8a),
  Gen8b: makeTable(itemsGen8b),
  Gen9: makeTable(itemsGen9),
  Gen9a: makeTable(itemsGen9a),
};

/** Per-game item table for one generation context; empty when unknown. */
export function itemsForGeneration(generation: string): LookupTable<ItemInfo> {
  return itemTables[generation] ?? emptyItemTable;
}

function makeTable<T extends { id: number }>(entries: readonly T[]): LookupTable<T> {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return {
    size: entries.length,
    get: (id) => byId.get(id),
    all: () => entries,
  };
}

const EMPTY_ITEMS: readonly ItemInfo[] = [];

const emptyItemTable: LookupTable<ItemInfo> = {
  size: 0,
  get: () => undefined,
  all: () => EMPTY_ITEMS,
};
