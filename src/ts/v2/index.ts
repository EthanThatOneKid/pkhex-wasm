/**
 * pkhex-wasm v2 binding layer — generic accessor over projected types.
 *
 * @example
 * ```ts
 * import { initPKHexV2 } from 'pkhex-wasm/v2';
 *
 * const PKHex = await initPKHexV2();
 * const game = PKHex.load(saveBytes);
 * game.box(0)[0].setNickname('Sparky');
 * const out = game.saveBytes();
 * ```
 *
 * @module
 */

export type { V2ApiExports } from "./api.ts";
export { V2GameHandle } from "./game.ts";
export { V2PokemonHandle } from "./pokemon.ts";

import type { V2ApiExports } from "./api.ts";
import { V2GameHandle } from "./game.ts";

export interface V2PKHex {
  /** Load a save buffer and return a v2 game handle. */
  load(saveBytes: Uint8Array): V2GameHandle;
  /** Species lookup table. */
  readonly species: ReadonlyMap<number, { id: number; name: string }>;
  /** Nature lookup table. */
  readonly natures: ReadonlyMap<number, { id: number; name: string }>;
  /** Move lookup table. */
  readonly moves: ReadonlyMap<number, { id: number; name: string }>;
}

let cachedRootPromise: Promise<V2PKHex> | undefined;

/**
 * Bootstrap the v2 binding layer.
 *
 * @param options.wasmBaseUrl  Override the base URL for the wasm assets.
 *                             Defaults to the directory containing the calling script.
 */
export async function initPKHexV2(options?: { wasmBaseUrl?: string }): Promise<V2PKHex> {
  if (cachedRootPromise) return cachedRootPromise;
  cachedRootPromise = createRoot(options);
  return cachedRootPromise;
}

async function createRoot(options?: { wasmBaseUrl?: string }): Promise<V2PKHex> {
  // Dynamic import of the dotnet.js loader — the wasm runtime bootstrap.
  // @ts-ignore — dotnet.js is a wasm SDK artifact, not a typed module.
  const { dotnet } = await import(options?.wasmBaseUrl ? `${options.wasmBaseUrl}/dotnet.js` : "dotnet.js");
  const factory = await dotnet.withDiagnosticTracing(false).create();
  const runtime = factory.getAssemblyExports("PKHexWasm.Wasm");

  // Navigate to the v2 exports shape.
  const api: V2ApiExports = runtime.PkHexWasm.Wasm.PkHexExports as unknown as V2ApiExports;
  api.Initialize();
  api.InitV2();

  // Lookup tables — same as v1 for now.
  const species = new Map<number, { id: number; name: string }>();
  const natures = new Map<number, { id: number; name: string }>();
  const moves = new Map<number, { id: number; name: string }>();

  return {
    load(saveBytes: Uint8Array): V2GameHandle {
      const handle = api.LoadV2(saveBytes);
      return new V2GameHandle(handle, api);
    },
    species,
    natures,
    moves,
  };
}
