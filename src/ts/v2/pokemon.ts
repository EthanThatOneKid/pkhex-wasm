/**
 * V2 write-through handle over one Pokémon entity.
 *
 * Every read routes through the generic accessor (GetMember).
 * Every write routes through SetMember with tier enforcement on the C# side.
 *
 * @module
 */

import type { V2ApiExports } from "./api.ts";

/**
 * Error re-thrown by the C# binding, tagged with sentinel prefixes.
 * The mono-wasm boundary delivers only the exception message text.
 */
function mapGuardError(cause: unknown): never {
  const raw = cause instanceof Error ? cause.message : String(cause);
  if (raw.startsWith("UnsupportedTierError:")) {
    throw new Error(`UnsupportedTierError: ${raw.slice("UnsupportedTierError:".length).trim()}`);
  }
  if (raw.startsWith("UnsupportedOperationError:")) {
    throw new Error(`UnsupportedOperationError: ${raw.slice("UnsupportedOperationError:".length).trim()}`);
  }
  if (raw.startsWith("RangeError:")) {
    throw new RangeError(raw.slice("RangeError:".length).trim());
  }
  throw cause instanceof Error ? cause : new Error(raw);
}

export class V2PokemonHandle {
  readonly #api: V2ApiExports;
  readonly #handle: number;

  constructor(handle: number, api: V2ApiExports) {
    this.#api = api;
    this.#handle = handle;
  }

  /** Raw wasm-side handle (internal plumbing). */
  get handle(): number {
    return this.#handle;
  }

  #read<T>(memberId: string): T {
    return this.#api.GetMember(this.#handle, memberId) as T;
  }

  #write(memberId: string, value: unknown): void {
    try {
      this.#api.SetMember(this.#handle, memberId, value);
    } catch (cause) {
      mapGuardError(cause);
    }
  }

  // ---- reads -------------------------------------------------------------

  get species(): number { return this.#read("Species"); }
  get nickname(): string { return this.#read("Nickname"); }
  get currentLevel(): number { return this.#read("CurrentLevel"); }
  get ability(): number { return this.#read("Ability"); }
  get abilityNumber(): number { return this.#read("AbilityNumber"); }
  get ball(): number { return this.#read("Ball"); }
  get nature(): number { return this.#read("Nature"); }
  get gender(): number { return this.#read("Gender"); }
  get isShiny(): boolean { return this.#read("IsShiny"); }
  get exp(): number { return this.#read("EXP"); }
  get characteristic(): number { return this.#read("Characteristic"); }
  get currentFriendship(): number { return this.#read("CurrentFriendship"); }
  get currentHandler(): number { return this.#read("CurrentHandler"); }
  get context(): number { return this.#read("Context"); }
  get checksumValid(): boolean { return this.#read("ChecksumValid"); }

  get evHp(): number { return this.#read("EV_HP"); }
  get evAtk(): number { return this.#read("EV_ATK"); }
  get evDef(): number { return this.#read("EV_DEF"); }
  get evSpe(): number { return this.#read("EV_SPE"); }
  get evSpa(): number { return this.#read("EV_SPA"); }
  get evSpd(): number { return this.#read("EV_SPD"); }

  get ivHp(): number { return this.#read("IV_HP"); }
  get ivAtk(): number { return this.#read("IV_ATK"); }
  get ivDef(): number { return this.#read("IV_DEF"); }
  get ivSpe(): number { return this.#read("IV_SPE"); }
  get ivSpa(): number { return this.#read("IV_SPA"); }
  get ivSpd(): number { return this.#read("IV_SPD"); }

  get move1(): number { return this.#read("Move1"); }
  get move2(): number { return this.#read("Move2"); }
  get move3(): number { return this.#read("Move3"); }
  get move4(): number { return this.#read("Move4"); }
  get move1PP(): number { return this.#read("Move1_PP"); }
  get move2PP(): number { return this.#read("Move2_PP"); }
  get move3PP(): number { return this.#read("Move3_PP"); }
  get move4PP(): number { return this.#read("Move4_PP"); }

  get ot(): string { return this.#read("OriginalTrainerName"); }
  get tid(): number { return this.#read("TID16"); }
  get sid(): number { return this.#read("SID16"); }
  get otGender(): number { return this.#read("OriginalTrainerGender"); }

  // ---- writes (delegated to C# tier enforcement) -------------------------

  setSpecies(value: number): void { this.#write("Species", value); }
  setNickname(value: string): void { this.#write("Nickname", value); }
  setCurrentLevel(value: number): void { this.#write("CurrentLevel", value); }
  setAbility(value: number): void { this.#write("Ability", value); }
  setAbilityNumber(value: number): void { this.#write("AbilityNumber", value); }
  setBall(value: number): void { this.#write("Ball", value); }
  setExp(value: number): void { this.#write("EXP", value); }
  setCurrentFriendship(value: number): void { this.#write("CurrentFriendship", value); }
  setCurrentHandler(value: number): void { this.#write("CurrentHandler", value); }

  setEvHp(value: number): void { this.#write("EV_HP", value); }
  setEvAtk(value: number): void { this.#write("EV_ATK", value); }
  setEvDef(value: number): void { this.#write("EV_DEF", value); }
  setEvSpe(value: number): void { this.#write("EV_SPE", value); }
  setEvSpa(value: number): void { this.#write("EV_SPA", value); }
  setEvSpd(value: number): void { this.#write("EV_SPD", value); }

  setMove1(value: number): void { this.#write("Move1", value); }
  setMove2(value: number): void { this.#write("Move2", value); }
  setMove3(value: number): void { this.#write("Move3", value); }
  setMove4(value: number): void { this.#write("Move4", value); }
}
