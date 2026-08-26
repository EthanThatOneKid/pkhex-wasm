/**
 * V2 write-through handle over one parsed save file.
 *
 * Snapshot accessors (box, party) materialise V2PokemonHandles on demand.
 *
 * @module
 */

import type { V2ApiExports } from "./api.ts";
import { V2PokemonHandle } from "./pokemon.ts";

export class V2GameHandle {
  readonly #api: V2ApiExports;
  readonly #handle: number;

  constructor(handle: number, api: V2ApiExports) {
    this.#api = api;
    this.#handle = handle;
  }

  /** Raw wasm-side handle. */
  get handle(): number {
    return this.#handle;
  }

  #read<T>(memberId: string): T {
    return this.#api.GetMember(this.#handle, memberId) as T;
  }

  #write(memberId: string, value: unknown): void {
    this.#api.SetMember(this.#handle, memberId, value);
  }

  // ---- reads -------------------------------------------------------------

  get ot(): string { return this.#read("OT"); }
  get tid(): number { return this.#read("TID16"); }
  get sid(): number { return this.#read("SID16"); }
  get gender(): number { return this.#read("Gender"); }
  get boxCount(): number { return this.#read("BoxCount"); }
  get boxSlotCount(): number { return this.#read("BoxSlotCount"); }
  get context(): number { return this.#read("Context"); }
  get money(): number { return this.#read("Money"); }
  get checksumsValid(): boolean { return this.#read("ChecksumsValid"); }
  get extension(): string { return this.#read("Extension"); }
  get caughtCount(): number { return this.#read("CaughtCount"); }
  get hasBox(): boolean { return this.#read("HasBox"); }
  get hasParty(): boolean { return this.#read("HasParty"); }
  get currentBox(): number { return this.#read("CurrentBox"); }

  // ---- writes -----------------------------------------------------------

  setGender(value: number): void { this.#write("Gender", value); }
  setCurrentBox(value: number): void { this.#write("CurrentBox", value); }

  // ---- snapshots --------------------------------------------------------

  /** Box contents as V2PokemonHandles; empty slots absent. */
  box(index: number): V2PokemonHandle[] {
    if (!Number.isInteger(index) || index < 0 || index >= this.boxCount) {
      throw new RangeError(`box index ${index} outside [0, ${this.boxCount})`);
    }
    const handles = this.#api.GetBoxMonHandlesV2(this.#handle, index);
    return Array.from(handles, (id) => new V2PokemonHandle(id, this.#api));
  }

  /** Party as V2PokemonHandles; empty slots absent. */
  party(): V2PokemonHandle[] {
    const handles = this.#api.GetPartyMonHandlesV2(this.#handle);
    return Array.from(handles, (id) => new V2PokemonHandle(id, this.#api));
  }

  /** Serialise the save back to bytes. */
  saveBytes(): Uint8Array {
    return this.#api.SaveBytesV2(this.#handle);
  }

  /** Release this game handle and all entity handles. */
  close(): void {
    this.#api.CloseV2(this.#handle);
  }
}
