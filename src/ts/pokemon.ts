import type { LookupRef, MoveSlot, Pokemon, StatBlock } from "./gen/types.ts";
import type { PkHexApiExports } from "./pkhex.ts";
import { displayToWire, wireToDisplay } from "./game.ts";

/**
 * Write-through Handle over one Pokémon entity inside a loaded save.
 *
 * Reads resolve through the wasm Binding immediately; mutators apply only
 * within the edit tier and are guarded before reaching Core. Tier guards
 * (edit vs read-only) land with the tier-enforcement work.
 */
export class PokemonHandle implements Pokemon {
  readonly #api: PkHexApiExports;
  readonly #handle: number;

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
    this.#api.MonSetNickname(this.#handle, nickname);
  }

  setLevel(level: number): void {
    // Spec: values outside 1..100 clamp.
    const clamped = Math.min(100, Math.max(1, Math.round(level)));
    this.#api.MonSetLevel(this.#handle, clamped);
  }

  setMoves(moveIds: readonly [number, number, number, number]): void {
    this.#api.MonSetMoves(this.#handle, Int32Array.from(moveIds));
  }

  setNature(natureId: number): void {
    // Tier guard + mint-aware write path land with tier enforcement; the wasm
    // side currently routes through Core's CommonEdits.SetNature.
    this.#api.MonSetNature(this.#handle, natureId);
  }

  setShiny(shiny: boolean): void {
    this.#api.MonSetShiny(this.#handle, shiny);
  }

  setIVs(partial: Partial<StatBlock>): void {
    this.#api.MonSetIVs(this.#handle, Int32Array.from(mergeInto(this.ivs, partial)));
  }

  setEVs(partial: Partial<StatBlock>): void {
    this.#api.MonSetEVs(this.#handle, Int32Array.from(mergeInto(this.evs, partial)));
  }
}

type TrainerRefShape = Pokemon["owner"];

function mergeInto(current: Readonly<StatBlock>, partial: Partial<StatBlock>): number[] {
  const merged = { ...current, ...partial };
  return displayToWire(merged as StatBlock);
}
