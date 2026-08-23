/**
 * pkhex-wasm public entry point.
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
export * from "./gen/types.ts";
export { SaveParseError, UnsupportedTierError, UnsupportedOperationError } from "./gen/errors.ts";
export { initPKHex, PKHexImpl } from "./pkhex.ts";
