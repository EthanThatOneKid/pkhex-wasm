import type { Game, ItemInfo, LookupTable, Pokemon, StatBlock, TrainerInfo } from "./gen/types.ts";
import type { PkHexApiExports } from "./pkhex.ts";
import { PokemonHandle } from "./pokemon.ts";

/** Hydrated by the Lookup-table pipeline; per-game item tables ship empty until then. */
const EMPTY_ITEMS = (): LookupTable<ItemInfo> => ({
  size: 0,
  get: () => undefined,
  all: () => [],
});

/** Wire order of stat arrays across the Binding: [HP, Atk, Def, Spe, SpA, SpD]. */
export const WIRE_ORDER = [0, 1, 2, 3, 4, 5] as const;

export function displayToWire(display: StatBlock): number[] {
  return [
    display.health,
    display.attack,
    display.defense,
    display.speed,
    display.specialAttack,
    display.specialDefense,
  ];
}

export function wireToDisplay(wire: ArrayLike<number>): StatBlock {
  return {
    health: wire[0],
    attack: wire[1],
    defense: wire[2],
    speed: wire[3],
    specialAttack: wire[4],
    specialDefense: wire[5],
  };
}

/**
 * Write-through Handle over one parsed save file.
 *
 * Snapshot accessors (`box`, `party`) materialize entity Handles on demand.
 */
export class GameHandle implements Game {
  readonly #api: PkHexApiExports;
  readonly #handle: number;

  constructor(handle: number, api: PkHexApiExports) {
    this.#api = api;
    this.#handle = handle;
  }

  /** Numeric wasm-side handle (internal plumbing for the root's saveBytes). */
  static handleOf(game: Game): number {
    return (game as GameHandle).#handle;
  }

  get trainer(): TrainerInfo {
    return {
      name: this.#api.GameTrainerName(this.#handle),
      id: {
        tid: this.#api.GameTrainerId(this.#handle),
        sid: this.#api.GameTrainerSecretId(this.#handle),
      },
      gender: this.#api.GameTrainerGender(this.#handle) as TrainerInfo["gender"],
    };
  }

  get boxCount(): number {
    return this.#api.GameBoxCount(this.#handle);
  }

  box(index: number): Pokemon[] {
    if (!Number.isInteger(index) || index < 0 || index >= this.boxCount) {
      throw new RangeError(`box index ${index} outside [0, ${this.boxCount})`);
    }
    const handles = this.#api.GameBoxMonHandles(this.#handle, index);
    return Array.from(handles, (id) => new PokemonHandle(id, this.#api));
  }

  party(): Pokemon[] {
    const handles = this.#api.GamePartyMonHandles(this.#handle);
    return Array.from(handles, (id) => new PokemonHandle(id, this.#api));
  }

  get generation(): string {
    return this.#api.GameGeneration(this.#handle);
  }

  readonly items: LookupTable<ItemInfo> = EMPTY_ITEMS();
}
