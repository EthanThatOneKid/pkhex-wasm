// Verifies the PACKAGED artifact (artifacts/pkg-dist/package) boots in a real
// browser with zero configuration: dynamic import of the shipped index.js,
// default wasmBaseUrl resolution against ./wasm/_framework/, table hydration,
// and a BDSP parse (managed-crypto seam). Run after build-package.mjs.
//
//   node verify-package.mjs [fixturePath]

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { chromium } from "@playwright/test";

const packageDir = resolve("../..", "artifacts", "pkg-dist", "package");
const fixture =
  process.argv[2] ??
  resolve("../..", "artifacts", "test-fixtures", "blank-Gen8b.bin");

for (const required of [join(packageDir, "index.js"), fixture]) {
  if (!existsSync(required)) {
    console.error(`missing ${required} — run build-package.mjs / gen:fixtures first`);
    process.exit(1);
  }
}

const PORT = 4191;
const server = spawn(process.execPath, ["serve.mjs", "--root", packageDir, "--port", String(PORT), "--plain"], {
  stdio: "ignore",
});

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  // Establish a real origin first: module imports from about:blank fail CORS.
  await page.goto(`http://127.0.0.1:${PORT}/`);
  const result = await page.evaluate(
    async ({ base, bytes }) => {
      const { initPKHex } = await import(`${base}index.js`);
      const PKHex = await initPKHex(); // zero config: default ./wasm/_framework/
      const game = PKHex.load(new Uint8Array(bytes));
      const mon = game.box(0)[0];
      return {
        species: mon.species.name,
        level: mon.level,
        generation: game.generation,
        tables: PKHex.species.size > 0 && PKHex.moves.size > 0,
        exportBytes: PKHex.saveBytes(game).length,
      };
    },
    { base: `http://127.0.0.1:${PORT}/`, bytes: Array.from(readFileSync(fixture)) },
  );

  const ok =
    result.species === "Pikachu" &&
    result.level === 5 &&
    result.generation === "Gen8b" &&
    result.tables &&
    result.exportBytes > 0;
  console.log(`packaged artifact probe: ${JSON.stringify(result)}`);
  if (!ok) {
    console.error("PACKAGE VERIFICATION FAILED");
    process.exitCode = 1;
  } else {
    console.log("PACKAGE VERIFICATION PASSED");
  }
} catch (err) {
  console.error(`PACKAGE VERIFICATION FAILED: ${err?.message ?? err}`);
  process.exitCode = 1;
} finally {
  await browser.close();
  server.kill();
}
