/**
 * V2 wasm-side static exports — the generic accessor contract.
 *
 * No per-member C# exports: every property read/write routes through
 * GetMember / SetMember by projected member id.
 *
 * @module
 */

/** Shape of the [JSExport] facade the v2 binding consumes. */
export interface V2ApiExports {
  Initialize(): string;
  GetApiVersion(): string;

  /** Initialise the property registry; idempotent. */
  InitV2(): void;

  /** Load a save buffer and return a v2 game handle. */
  LoadV2(saveBytes: Uint8Array): number;
  SaveBytesV2(game: number): Uint8Array;
  CloseV2(game: number): void;

  /** Entity handles for one box (empty slots absent). */
  GetBoxMonHandlesV2(game: number, boxIndex: number): Int32Array;
  /** Party entity handles. */
  GetPartyMonHandlesV2(game: number): Int32Array;

  /** Read any projected member by name. */
  GetMember(handle: number, memberId: string): unknown;
  /** Write any projected member by name. */
  SetMember(handle: number, memberId: string, value: unknown): void;
}
