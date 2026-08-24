import type { Game, InitOptions, LookupTable, PKHex } from "./gen/types.ts";
import { SaveParseError } from "./gen/errors.ts";
import { GameHandle } from "./game.ts";
/**
 * Minimal structural view of the wasm-side static exports. The full surface
 * is described in src/PKHexWasm/PKHexApi.cs; when the reflection mechanism
 * (#14 phase 1) lands, this interface becomes generated.
 */
export interface PkHexApiExports {
  Initialize(): string;
  GetApiVersion(): string;
  Load(saveBytes: Uint8Array): number;
  SaveBytes(game: number): Uint8Array;
  GenerateDemoSave(trainerName: string): Uint8Array;

  GameTrainerName(game: number): string;
  GameTrainerId(game: number): number;
  GameTrainerSecretId(game: number): number;
  GameTrainerGender(game: number): string;
  GameMoney(game: number): number;
  GameBoxCount(game: number): number;
  GameGeneration(game: number): string;
  GameBoxMonHandles(game: number, boxIndex: number): Int32Array;
  GamePartyMonHandles(game: number): Int32Array;

  MonSpecies(mon: number): number;
  MonNickname(mon: number): string;
  MonLevel(mon: number): number;
  MonIsShiny(mon: number): boolean;
  MonGender(mon: number): string;
  MonNatureId(mon: number): number;
  MonOwnerName(mon: number): string;
  MonOwnerId(mon: number): number;
  MonOwnerSecretId(mon: number): number;
  MonOwnerGender(mon: number): string;
  MonIVs(mon: number): Int32Array;
  MonEVs(mon: number): Int32Array;
  MonStats(mon: number): Int32Array;
  MonMoveSlots(mon: number): Int32Array;

  MonSetNickname(mon: number, nickname: string): void;
  MonSetLevel(mon: number, level: number): void;
  MonSetMoves(mon: number, moveIds: Int32Array): void;
  MonSetNature(mon: number, natureId: number): void;
  MonSetShiny(mon: number, shiny: boolean): void;
  MonSetIVs(mon: number, ivs: Int32Array): void;
  MonSetEVs(mon: number, evs: Int32Array): void;
}

interface DotnetRuntime {
  getConfig(): { mainAssemblyName: string };
  getAssemblyExports(name: string): Promise<Record<string, unknown>>;
}

let cachedRootPromise: Promise<PKHex> | null = null;

function emptyTable<T>(): LookupTable<T> {
  return {
    size: 0,
    get: () => undefined,
    all: () => [],
  };
}

/** Hydrated by the Lookup-table pipeline; universal tables ship empty until then. */
const EMPTY_SPECIES = emptyTable<import("./gen/types.ts").SpeciesInfo>();
const EMPTY_NATURES = emptyTable<import("./gen/types.ts").NatureInfo>();
const EMPTY_MOVES = emptyTable<import("./gen/types.ts").MoveInfo>();

/** Dynamic import() needs a real URL scheme — convert bare filesystem paths. */
function toModuleUrlBase(base: string): string {
  // A single leading letter + colon is a Windows drive, not a scheme.
  const isDrivePath = /^[a-z]:[\\/]/i.test(base);
  const hasScheme = /^[a-z][a-z0-9+.-]+:/i.test(base) && !isDrivePath;
  if (hasScheme) return base;
  return `file://${base.replace(/\\/g, "/").replace(/^\/(?=[A-Za-z]:)/, "")}`;
}

/**
 * Initialize the wasm runtime exactly once; every subsequent operation on the
 * returned root is synchronous.
 *
 * Bootstraps the wasm runtime and returns the synchronous root. Managed-crypto
 * provider registration and Lookup-table hydration land with their respective
 * work; Gen 1-6 paths never touch them (zero cost when unused).
 *
 * @param options runtime bootstrap options
 */
export async function initPKHex(options?: InitOptions): Promise<PKHex> {
  cachedRootPromise ??= createRoot(options);
  return cachedRootPromise;
}

async function createRoot(options?: InitOptions): Promise<PKHex> {
  const rawBase = options?.wasmBaseUrl ??
    new URL("./wasm/_framework/", import.meta.url).href.replace(/\\/g, "/");
  const normalized = (() => {
    const withSlash = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
    return toModuleUrlBase(withSlash);
  })();

  let mod: { dotnet: { create(): Promise<DotnetRuntime> } };
  try {
    mod = await import(`${normalized}dotnet.js`);
  } catch (cause) {
    throw new Error(
      `pkhex-wasm: unable to load the wasm runtime from ${normalized}dotnet.js — ${
        cause instanceof Error ? cause.message : cause
      }`,
    );
  }

  const runtime = await mod.dotnet.create();
  const config = runtime.getConfig();
  const allExports = (await runtime.getAssemblyExports(config.mainAssemblyName)) as {
    PKHexWasm?: { Wasm?: { PkHexExports?: PkHexApiExports } };
  } & Record<string, unknown>;

  // The [JSExport] facade lives in the app assembly under namespace PKHexWasm.Wasm.
  const api = allExports.PKHexWasm?.Wasm?.PkHexExports;
  if (!api) {
    throw new Error("pkhex-wasm: PKHexWasm.Wasm.PkHexExports not found in the loaded runtime");
  }

  // Bootstrap step 2 (spec): Managed crypto registers before the root is
  // returned, so no parse path can run against platform-default providers.
  api.Initialize();

  return new PKHexImpl(api);
}

export class PKHexImpl implements PKHex {
  readonly #api: PkHexApiExports;

  constructor(api: PkHexApiExports) {
    this.#api = api;
  }

  load(saveBytes: Uint8Array): Game {
    try {
      const handle = this.#api.Load(saveBytes);
      return new GameHandle(handle, this.#api);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : String(cause);
      // Only format-recognition failures map to SaveParseError; anything else
      // is a genuine defect and must surface as itself.
      if (/unrecognized save file/i.test(message)) throw new SaveParseError(message);
      throw cause instanceof Error ? cause : new Error(String(cause));
    }
  }

  saveBytes(game: Game): Uint8Array {
    return this.#api.SaveBytes(GameHandle.handleOf(game));
  }

  readonly species = EMPTY_SPECIES;
  readonly natures = EMPTY_NATURES;
  readonly moves = EMPTY_MOVES;
}
