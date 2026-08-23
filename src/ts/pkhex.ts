import { Game, InitOptions, LookupTable, MoveInfo, NatureInfo, PKHex, SpeciesInfo } from "./gen/types.ts";
import { notImplemented } from "./gen/errors.ts";

/**
 * Synchronous API root created by {@link initPKHex}.
 *
 * Owns the wasm runtime instance; every operation here is synchronous
 * after the one-time async init.
 *
 * @generated-skeleton — bodies are seams; implementation sessions replace them.
 */
export class PKHexImpl implements PKHex {
    /** Global species table (national dex). */
    get species(): LookupTable<SpeciesInfo> {
        throw notImplemented("build-time JSON hydrated at init");
    }

    /** Global nature table. */
    get natures(): LookupTable<NatureInfo> {
        throw notImplemented("build-time JSON hydrated at init");
    }

    /** Global move table. */
    get moves(): LookupTable<MoveInfo> {
        throw notImplemented("build-time JSON hydrated at init");
    }

    /**
     * Parse a complete save-file buffer into an editable {@link Game}.
     *
     * The input is defensively copied; callers retain ownership of `saveBytes`.
     *
     * @param saveBytes one complete logical save buffer (up to ~4.4 MB; Switch-era main/backup/poke_trade files must be assembled by the caller)
     * @throws {SaveParseError} when the bytes match no supported format
     */
    load(saveBytes: Uint8Array): Game {
        throw notImplemented("copy-in buffer → SaveUtil.GetSaveFile");
    }

    /** Serialize a game back to a fresh save-file byte array. Every call returns a new `Uint8Array`; nothing aliases prior exports. */
    saveBytes(game: Game): Uint8Array {
        throw notImplemented("SaveFile.Write() → fresh byte[] marshaled out");
    }
}

/**
 * Initialize the wasm runtime exactly once; every subsequent operation on the returned root is synchronous.
 *
 * Wires the wasm runtime, registers Managed crypto providers, and hydrates
 * the Lookup tables before returning the synchronous root.
 *
 * @param options runtime bootstrap options
 * @generated-skeleton — bodies are seams; implementation sessions replace them.
 */
export async function initPKHex(options?: InitOptions): Promise<PKHex> {
  void options;
  throw notImplemented(
    "initPKHex: fetch _framework assets, boot runtime, register RuntimeCryptographyProvider.Aes/.Md5, hydrate Lookup tables",
  );
}
