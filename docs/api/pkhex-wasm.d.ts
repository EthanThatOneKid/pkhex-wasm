/**
 * pkhex-wasm — PKHeX.Core Pokémon save editing, compiled to WebAssembly.
 *
 * Load a real save file in the browser, inspect and edit box/party Pokémon,
 * and export valid save bytes back out. Synchronous operations after a
 * one-time async init; no Blazor anywhere.
 *
 * ### Supported generations (v1)
 *
 * | Tier | Generations |
 * | --- | --- |
 * | Edit (all mutators apply) | Gen 3, 4, 5, 6, 7, SwSh, BDSP, SV, Legends Z-A |
 * | Read-only (mutators throw) | Gen 1, 2, LGPE, PLA |
 *
 * Natures do not exist before Gen 3 and are written mint-aware on modern
 * formats. See each mutator's `@throws` for tier behavior.
 *
 * @module
 */

/** Six-stat block shared by IVs, EVs, and computed stats. */
export interface StatBlock {
  /** HP stat / individual value / effort value. */
  health: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

/** A reference into a global lookup table: numeric id plus display name. */
export interface LookupRef {
  id: number;
  name: string;
}

/** One of an entity's four move slots. */
export interface MoveSlot {
  move: LookupRef;
  /** Current power points remaining for this slot. */
  pp: number;
}

/** Original-trainer attribution carried on every entity. */
export interface TrainerRef {
  name: string;
  /** Trainer ID pair (`tid` visible in game; `sid` hidden secret id). */
  id: { tid: number; sid: number };
  gender: 'male' | 'female' | 'unspecified';
}

/** Read-only trainer information exposed by a save. */
export interface TrainerInfo extends TrainerRef {
  money?: number;
}

/**
 * Immutable build-time-generated lookup table over universal reference data
 * (species, natures, moves).
 */
export interface LookupTable<T> {
  /** Number of entries. */
  readonly size: number;
  get(id: number): T | undefined;
  all(): readonly T[];
}

/** Species entry in the global species table. */
export interface SpeciesInfo extends LookupRef {
  /** National Pokédex number; identical to {@link LookupRef.id}. */
  readonly nationalDex: number;
  readonly types: readonly string[];
  readonly baseStats: StatBlock;
}

/** Nature entry in the global nature table. */
export interface NatureInfo extends LookupRef {
  readonly statMultipliers: { attack: number; defense: number; speed: number; specialAttack: number; specialDefense: number };
}

/** Move entry in the global move table. */
export interface MoveInfo extends LookupRef {
  readonly type: string;
  readonly power: number | null;
  readonly accuracy: number | null;
  readonly pp: number;
}

/** Item entry in a per-game item table. */
export interface ItemInfo extends LookupRef {
  readonly description?: string;
}

/**
 * Options for the one-time asynchronous initialization of the wasm runtime.
 */
export interface InitOptions {
  /**
   * Base URL the runtime fetches its `_framework` assets from.
   * Defaults to the package's own bundled runtime directory.
   */
  wasmBaseUrl?: string;
}

/**
 * A loaded save file. All accessors return snapshots; entity handles write
 * through to the underlying save, and changes are reflected on the next
 * {@link PKHex.saveBytes} call.
 */
export interface Game {
  /** Read-only trainer data (name and ID are readable in v1; not editable). */
  readonly trainer: TrainerInfo;

  /** Number of storage boxes this save format provides (e.g. 14 in Gen 3). */
  readonly boxCount: number;

  /**
   * Snapshot of one storage box. Slot order matches the game's own ordering;
   * empty slots are absent from the array.
   *
   * @param index zero-based box index, `< boxCount`
   * @throws {RangeError} when `index` is outside `[0, boxCount)`
   */
  box(index: number): Pokemon[];

  /** Snapshot of the party (up to six entities). */
  party(): Pokemon[];

  /** Per-game item lookup table (game-dependent data stays version-scoped). */
  readonly items: LookupTable<ItemInfo>;

  /** Generation context of the loaded save, e.g. `"Gen1"`, `"Gen8b"`. */
  readonly generation: string;
}

/**
 * A single Pokémon entity. Reads are always available; mutators apply only
 * within the edit tier (Gen 3–7, SwSh, BDSP, SV, Legends Z-A) and throw
 * descriptive errors elsewhere.
 */
export interface Pokemon {
  /** Species reference (national dex id + display name). Read-only in v1. */
  readonly species: LookupRef;

  readonly nickname: string;
  readonly level: number;
  readonly isShiny: boolean;
  readonly gender: 'male' | 'female' | 'genderless';

  /** Individual values. Gen 1–2 caps at 15 with special-defense aliasing special. */
  readonly ivs: Readonly<StatBlock>;
  /** Effort values (legacy scales on Gen 1–2; absent systems on LGPE/PLA reads). */
  readonly evs: Readonly<StatBlock>;
  /** Computed battle stats derived from species/level/IVs/EVs/nature. */
  readonly stats: Readonly<StatBlock>;

  /** Four move slots; empty slots carry move id `0`. */
  readonly moves: readonly MoveSlot[];

  /**
   * Current nature. `null` on Gen 1–2 entities, where the concept does not
   * exist.
   */
  readonly nature: LookupRef | null;

  /** Original-trainer attribution. */
  readonly owner: TrainerRef;

  /**
   * Rename this entity.
   *
   * @throws {UnsupportedTierError} on read-only-tier saves
   * @throws {RangeError} when exceeding the generation's nickname length or charset limits
   */
  setNickname(nickname: string): void;

  /**
   * Set the level; experience is adjusted accordingly.
   *
   * @throws {UnsupportedTierError} on read-only-tier saves
   * @throws {RangeError} when outside `1..100`
   */
  setLevel(level: number): void;

  /**
   * Overwrite all four move slots (ids in the global move table; `0` clears).
   *
   * @throws {UnsupportedTierError} on read-only-tier saves
   * @throws {RangeError} when an id is unknown to this generation's movepool
   */
  setMoves(moveIds: readonly [number, number, number, number]): void;

  /**
   * Set the nature (mint-aware on Gen 8+ formats).
   *
   * @throws {UnsupportedOperationError} on Gen 1–2 (natures do not exist)
   * @throws {UnsupportedTierError} on other read-only-tier saves
   */
  setNature(natureId: number): void;

  /**
   * Force shiny on or off (PID manipulation on Gen 3+; DV pattern on Gen 1–2
   * where only enabling is supported).
   *
   * @throws {UnsupportedTierError} on read-only-tier saves
   */
  setShiny(shiny: boolean): void;

  /**
   * Merge individual values; omitted stats keep their current value.
   * Values clamp per generation (31 standard, 15 on Gen 1–2).
   *
   * @throws {UnsupportedTierError} on read-only-tier saves
   */
  setIVs(partial: Partial<StatBlock>): void;

  /**
   * Merge effort values; omitted stats keep their current value.
   * Caps follow the generation (252/510 standard; legacy scale on Gen 1–2).
   *
   * @throws {UnsupportedTierError} on read-only-tier saves
   */
  setEVs(partial: Partial<StatBlock>): void;
}

/** The initialized API root. Every operation here is synchronous. */
export interface PKHex {
  /**
   * Parse a complete save-file buffer into an editable {@link Game}.
   * The input is defensively copied; callers retain ownership of `saveBytes`.
   *
   * @param saveBytes one complete logical save buffer (up to ~4.4 MB;
   * Switch-era main/backup/poke_trade files must be assembled by the caller)
   * @throws {SaveParseError} when the bytes match no supported format
   */
  load(saveBytes: Uint8Array): Game;

  /**
   * Serialize a game back to a fresh save-file byte array. Every call returns
   * a new `Uint8Array`; nothing aliases prior exports.
   */
  saveBytes(game: Game): Uint8Array;

  /** Global species table (national dex). */
  readonly species: LookupTable<SpeciesInfo>;
  /** Global nature table. */
  readonly natures: LookupTable<NatureInfo>;
  /** Global move table. */
  readonly moves: LookupTable<MoveInfo>;
}

/** Thrown by {@link PKHex.load} for unrecognized or corrupt buffers. */
export declare class SaveParseError extends Error {}

/**
 * Thrown when a mutator is called on a read-only-tier generation
 * (Gen 1–2, LGPE, PLA). The message names the unsupported operation.
 */
export declare class UnsupportedTierError extends Error {}

/**
 * Thrown when an operation has no meaning for the entity's generation
 * (e.g. setting natures before Gen 3).
 */
export declare class UnsupportedOperationError extends Error {}

/**
 * Initialize the wasm runtime exactly once; every subsequent operation on the
 * returned root is synchronous.
 *
 * @example
 * ```ts
 * import { initPKHex } from 'pkhex-wasm';
 *
 * const PKHex = await initPKHex();
 * const game = PKHex.load(saveBytes);
 * game.box(0)[0].setNickname('Sparky');
 * const out = PKHex.saveBytes(game);
 * ```
 */
export declare function initPKHex(options?: InitOptions): Promise<PKHex>;
