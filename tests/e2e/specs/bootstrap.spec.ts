import { expect } from "@playwright/test";
import { callApi, loadFixtureBytes, test } from "../helpers.ts";

test.describe("bootstrap", () => {
  test("initPKHex returns the synchronous root with hydrated lookup tables", async ({ api }) => {
    const result = await callApi(api, `(PKHex) => ({
      speciesSize: PKHex.species.size,
      naturesSize: PKHex.natures.size,
      movesSize: PKHex.moves.size,
      pikachu: PKHex.species.get(25)?.name ?? null,
      thunderbolt: PKHex.moves.get(85)?.name ?? null,
      adamant: PKHex.natures.get(3)?.name ?? null,
    })`);
    expect(result).toMatchObject({
      ok: true,
      value: {
        // Universal tables are total: core reference ids resolve everywhere.
        pikachu: "Pikachu",
        thunderbolt: "Thunderbolt",
        adamant: "Adamant",
      },
    });
  });

  test("managed crypto is live before any parse path can run", async ({ api }) => {
    // Spec bootstrap step 2: Initialize() registers the managed providers
    // before the root is handed out. BDSP (Gen8b) walks the whole-save MD5
    // seam on its very first Load — the native provider would throw under
    // wasmbrowser, so a clean first parse proves the ordering held.
    const bytes = Array.from(loadFixtureBytes("blank-Gen8b.bin"));
    const result = await callApi(
      api,
      `(PKHex, bytes) => {
        const game = PKHex.load(new Uint8Array(bytes));
        return { generation: game.generation, mons: game.box(0).length };
      }`,
      bytes,
    );
    expect(result).toMatchObject({ ok: true, value: { generation: "Gen8b" } });
  });
});
