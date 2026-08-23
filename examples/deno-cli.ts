/**
 * pkhex-wasm usage example — print a save file's party to the terminal.
 *
 * ```sh
 * deno run -A examples/deno-cli.ts <path-to-save>
 * ```
 *
 * The script is fully typed against the locked v1 surface (`src/ts`) and
 * typechecks today. It runs end-to-end once the binding seams are
 * implemented; until then it exits with a descriptive "not implemented"
 * error naming the exact wasm seam that is still missing.
 */

import { SaveParseError, initPKHex } from "../src/ts/index.ts";

const path = Deno.args[0];
if (!path) {
  console.error("usage: deno run -A examples/deno-cli.ts <path-to-save>");
  console.error(
    "(Switch-era games store main/backup/poke_trade files separately — assemble them into one buffer first)",
  );
  Deno.exit(2);
}

try {
  const saveBytes = Deno.readFileSync(path);

  // Pre-packaging dev flow: point PKHEX_WASM_BASE_URL at a published
  // `_framework/` directory (after tools/normalize-publish.mjs).
  const baseUrl = Deno.env.get("PKHEX_WASM_BASE_URL");

  // One-time async init; everything after this line is synchronous.
  const PKHex = await initPKHex(baseUrl ? { wasmBaseUrl: baseUrl } : undefined);
  const game = PKHex.load(saveBytes);

  console.log(`${game.trainer.name}'s party (${game.generation})`);
  for (const mon of game.party()) {
    const tableName = PKHex.species.get(mon.species.id)?.name;
    const species = mon.species.name || tableName || `#${mon.species.id}`;
    const nickname = mon.nickname || species || `#${mon.species.id}`;
    const shiny = mon.isShiny ? " \u2605" : "";
    console.log(`  ${nickname} \u2014 ${species} \u00b7 Lv ${mon.level}${shiny}`);
  }
} catch (error) {
  if (error instanceof SaveParseError) {
    console.error(`not a recognizable Pok\u00e9mon save file: ${path}`);
    Deno.exit(1);
  }
  throw error;
}
