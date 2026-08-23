import type { LookupRef, MoveSlot, Pokemon, StatBlock } from "./gen/types.ts";
import type { PkHexApiExports } from "./pkhex.ts";
import { UnsupportedOperationError, UnsupportedTierError } from "./gen/errors.ts";
import { displayToWire, wireToDisplay } from "./game.ts";

/**
 * Rethrows wasm-side guard failures as the locked JS error classes.
 *
 * The mono-wasm boundary delivers only the exception message text, so the
 * wasm facade composes stable sentinel prefixes into guard messages; this
 * strips the tag and rethrows typed. Anything untagged surfaces as itself.
 */
function mapGuardError(cause: unknown): never {
  const raw = cause instanceof Error ? cause.message : String(cause);
  if (raw.startsWith("UnsupportedTierError:")) {
    throw new UnsupportedTierError(raw.slice("UnsupportedTierError:".length).trim());
  }
  if (raw.startsWith("UnsupportedOperationError:")) {
    throw new UnsupportedOperationError(raw.slice("UnsupportedOperationError:".length).trim());
  }
  if (raw.startsWith("RangeError:")) {
    throw new RangeError(raw.slice("RangeError:".length).trim());
  }
  throw cause instanceof Error ? cause : new Error(raw);
}

/**
 * Write-through Handle over one Pokémon entity inside a loaded save.
 *
 * Reads resolve through the wasm Binding immediately; mutators write through
 * instantly and are visible to the next export. Mutators apply only within
 * the edit tier (Gen 3-7, SwSh, BDSP, SV, Legends Z-A) and throw
 * {@link UnsupportedTierError} on read-only tiers (Gen 1-2, LGPE, PLA).
 */
export class PokemonHandle implements Pokemon {
  readonly #api: PkHexApiExports;
  readonly #handle: number;

  /** Runs one wasm mutator, rethrowing guard failures as locked JS errors. */
  #mutate(apply: () => void): void {
    try {
      apply();
    } catch (cause) {
      mapGuardError(cause);
    }
  }

  constructor(handle: number, api: PkHexApiExports) {
    this.#api = api;
    this.#handle = handle;
  }

  get species(): LookupRef {
    // Species display names resolve through the global table once hydrated;
    // until then the numeric id is the honest answer.
    return { id: this.#api.MonSpecies(this.#handle), name: "" };
  }

  get nickname(): string {
    return this.#api.MonNickname(this.#handle);
  }

  get level(): number {
    return this.#api.MonLevel(this.#handle);
  }

  get isShiny(): boolean {
    return this.#api.MonIsShiny(this.#handle);
  }

  get gender(): "male" | "female" | "genderless" {
    return this.#api.MonGender(this.#handle) as "male" | "female" | "genderless";
  }

  get ivs(): Readonly<StatBlock> {
    return wireToDisplay(this.#api.MonIVs(this.#handle));
  }

  get evs(): Readonly<StatBlock> {
    return wireToDisplay(this.#api.MonEVs(this.#handle));
  }

  get stats(): Readonly<StatBlock> {
    return wireToDisplay(this.#api.MonStats(this.#handle));
  }

  get moves(): readonly MoveSlot[] {
    const flat = this.#api.MonMoveSlots(this.#handle);
    const slots: MoveSlot[] = [];
    for (let i = 0; i < 4; i++) {
      slots.push({
        move: { id: flat[i * 2], name: "" },
        pp: flat[i * 2 + 1],
      });
    }
    return slots;
  }

  /** Nature reference, or `null` before Gen 3 (concept absent). */
  get nature(): LookupRef | null {
    const id = this.#api.MonNatureId(this.#handle);
    return id < 0 ? null : { id, name: "" };
  }

  get owner(): TrainerRefShape {
    return {
      name: this.#api.MonOwnerName(this.#handle),
      id: {
        tid: this.#api.MonOwnerId(this.#handle),
        sid: this.#api.MonOwnerSecretId(this.#handle),
      },
      gender: this.#api.MonOwnerGender(this.#handle) as TrainerRefShape["gender"],
    };
  }

  setNickname(nickname: string): void {
    this.#mutate(() => this.#api.MonSetNickname(this.#handle, nickname));
  }

  setLevel(level: number): void {
    // Spec: values outside 1..100 clamp.
    const clamped = Math.min(100, Math.max(1, Math.round(level)));
    this.#mutate(() => this.#api.MonSetLevel(this.#handle, clamped));
  }

  setMoves(moveIds: readonly [number, number, number, number]): void {
    this.#mutate(() => this.#api.MonSetMoves(this.#handle, Int32Array.from(moveIds)));
  }

  setNature(natureId: number): void {
    // Mint-aware wasm-side: nature and stat alignment are written together,
    // so Gen 8+ formats derive stats from the new nature immediately.
    this.#mutate(() => this.#api.MonSetNature(this.#handle, natureId));
  }

  setShiny(shiny: boolean): void {
    this.#mutate(() => this.#api.MonSetShiny(this.#handle, shiny));
  }

  setIVs(partial: Partial<StatBlock>): void {
    this.#mutate(() => this.#api.MonSetIVs(this.#handle, Int32Array.from(mergeInto(this.ivs, partial))));
  }

  setEVs(partial: Partial<StatBlock>): void {
    this.#mutate(() => this.#api.MonSetEVs(this.#handle, Int32Array.from(mergeInto(this.evs, partial))));
  }
}

type TrainerRefShape = Pokemon["owner"];

function mergeInto(current: Readonly<StatBlock>, partial: Partial<StatBlock>): number[] {
  const merged = { ...current, ...partial };
  return displayToWire(merged as StatBlock);
}
