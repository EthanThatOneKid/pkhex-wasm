// Packaging pipeline (spec "Packaging & release", ticket #25).
//
//   node tools/package/build-package.mjs [--version 1.2.3]
//
// Produces, under artifacts/pkg-dist/:
//   package/                  staged npm package (docxodus shape)
//     index.js                ESM entry bundling src/ts (initPKHex + tables)
//     index.d.ts              canonical declaration file
//     wasm/_framework/**      entire wasm runtime (+ unfingerprinted dotnet.js)
//     **/*.br                 precompressed brotli siblings
//     complete-source.tar.gz  GPL §3a Corresponding Source (inside the tarball)
//     THIRD-PARTY-NOTICES.md / MODIFICATIONS.md / upstream.json / LICENSE / README.md
//   pkhex-wasm-<version>.tgz  npm tarball (npm pack)
//   complete-source.tar.gz    same kit copy, for release attachment
//
// Fails hard when the first-load gz total exceeds the 8 MB budget.

import { spawnSync } from "node:child_process";
import { brotliCompressSync, gzipSync } from "node:zlib";import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuildBuild } from "esbuild";
import { buildCompleteSource, run, writeUpstreamJson } from "./lib/kit.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const SITE = join(ROOT, "artifacts", "pkg-site");
const DIST = join(ROOT, "artifacts", "pkg-dist");
const STAGE = join(DIST, "package");
const FRAMEWORK = join(STAGE, "wasm", "_framework");
const BUDGET_BYTES = 8 * 1024 * 1024;

const version = (() => {
  const i = process.argv.indexOf("--version");
  return i >= 0 ? process.argv[i + 1] : "0.0.0-dev";
})();

const log = (msg) => console.log(`[package] ${msg}`);

function gitOut(args) {
  const res = spawnSync("git", args, { cwd: ROOT, encoding: "utf-8" });
  if (res.status !== 0) throw new Error(`git ${args.join(" ")} failed`);
  return res.stdout.trim();
}

// ---- 1. fresh publish of the wasm host -------------------------------------

rmSync(SITE, { recursive: true, force: true });
rmSync(DIST, { recursive: true, force: true });
mkdirSync(SITE, { recursive: true });
log(`publishing wasm host…`);
run("dotnet", ["publish", "src/PKHexWasm.Wasm", "-c", "Release", "-o", SITE]);

const publishedFramework = join(SITE, "wwwroot", "_framework");
if (!existsSync(publishedFramework)) {
  throw new Error("published site is missing wwwroot/_framework — host layout changed?");
}

// ---- 2. stage the package ----------------------------------------------------

mkdirSync(FRAMEWORK, { recursive: true });
log("bundling ESM entry…");
// Via the JS API — spawning `node node_modules/esbuild/bin/esbuild` breaks on
// Linux, where the postinstall swaps that shim for the raw ELF binary.
await esbuildBuild({
  entryPoints: [join(ROOT, "src", "ts", "index.ts")],
  bundle: true,
  format: "esm",
  platform: "browser",
  outfile: join(STAGE, "index.js"),
});
cpSync(join(ROOT, "tools", "apigen", "fixtures", "pkhex-wasm.d.ts"), join(STAGE, "index.d.ts"));

log("staging wasm runtime…");
let dotnetEntry = null;
for (const name of readdirSync(publishedFramework)) {
  if (/\.(gz|br)$/.test(name)) continue; // regenerated below
  const src = join(publishedFramework, name);
  if (!statSync(src).isFile()) continue;
  cpSync(src, join(FRAMEWORK, name));
  if (/^dotnet\.[a-z0-9]+\.js$/.test(name)) {
    if (dotnetEntry !== null) {
      throw new Error("multiple fingerprinted dotnet entries in publish output — stale artifacts?");
    }
    dotnetEntry = name;
  }
}
if (!dotnetEntry) throw new Error("no fingerprinted dotnet entry found in _framework");
// initPKHex imports `<base>dotnet.js`; alias it to the fingerprinted entry,
// which carries the embedded boot config and resolves its own siblings.
cpSync(join(FRAMEWORK, dotnetEntry), join(FRAMEWORK, "dotnet.js"));

log("writing brotli siblings…");
brotliTree(STAGE);

// ---- 3. GPL compliance kit ---------------------------------------------------

log("assembling compliance kit…");
writeUpstreamJson(STAGE, {
  everywhere: gitOut(["-C", "external/PKHeX.Everywhere", "rev-parse", "HEAD"]),
  fork: gitOut(["-C", "external/PKHeX.Everywhere/external/PKHeX", "rev-parse", "HEAD"]),
});
for (const file of [
  "THIRD-PARTY-NOTICES.md",
  "MODIFICATIONS.md",
  "LICENSE",
  "NPM-README.md",
]) {
  const dest = file === "NPM-README.md" ? "README.md" : file;
  cpSync(join(ROOT, "tools", "package", "templates", file), join(STAGE, dest));
}

log("building complete-source.tar.gz…");
buildCompleteSource(ROOT, join(STAGE, "complete-source.tar.gz"));
cpSync(join(STAGE, "complete-source.tar.gz"), join(DIST, "complete-source.tar.gz"));

// ---- 4. size gate ------------------------------------------------------------

log("checking first-load gz budget…");
const files = [];
collectFirstLoad(STAGE);
function collectFirstLoad(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) {
      collectFirstLoad(file);
      continue;
    }
    if (name.endsWith(".br") || name.endsWith(".gz")) continue; // alternates, not additive
    if (name === "complete-source.tar.gz") continue; // shipped, not on the load path
    if (name === ".gitignore" || name === "package.json") continue; // packaging metadata
    files.push({ path: file.slice(STAGE.length + 1), bytes: statSync(file).size });
  }
}

let totalGz = 0;
const rows = files.map(({ path, bytes }) => {
  const gz = gzipSync(readFileSync(fileInStage(path)), { level: 9 }).length;
  totalGz += gz;
  return { path, bytes, gz };
});
rows.sort((a, b) => b.gz - a.gz);
for (const row of rows.slice(0, 12)) {
  console.log(
    `  ${row.path}  raw ${(row.bytes / 1024).toFixed(1)} KB  gz ${(row.gz / 1024).toFixed(1)} KB`,
  );
}
console.log(
  `first-load total: ${(totalGz / 1024 / 1024).toFixed(2)} MB gz across ${rows.length} files (budget 8 MB)`,
);
if (totalGz > BUDGET_BYTES) {
  console.error(
    `SIZE GATE FAILED: ${(totalGz / 1024 / 1024).toFixed(2)} MB gz exceeds the ${BUDGET_BYTES / 1024 / 1024} MB budget`,
  );
  process.exit(1);
}

// ---- 5. npm tarball -----------------------------------------------------------

writeFileSync(
  join(STAGE, "package.json"),
  `${JSON.stringify(packageJson(), null, 2)}\n`,
);
run("npm", ["pack", "--pack-destination", DIST], STAGE);

log(`done — artifacts under ${DIST}`);
console.log(`  package/:        ${STAGE}`);
console.log(`  tarball:         pkhex-wasm-${version}.tgz`);
console.log(`  source kit copy: ${join(DIST, "complete-source.tar.gz")}`);

function fileInStage(rel) {
  return join(STAGE, rel);
}

function brotliTree(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) {
      brotliTree(file);
      continue;
    }
    if (name.endsWith(".br") || name.endsWith(".gz")) continue;
    const ext = name.match(/\.[^.]+$/)?.[0] ?? "";
    // Text assets and wasm benefit; already-compressed archives do not.
    if (![".js", ".mjs", ".json", ".html", ".dat", ".wasm"].includes(ext)) continue;
    writeFileSync(`${file}.br`, brotliCompressSync(readFileSync(file)));
  }
}

function packageJson() {
  return {
    name: "pkhex-wasm",
    version,
    description:
      "PKHeX.Core Pokémon save editing compiled to WebAssembly - load, read, edit, and export save files in the browser.",
    license: "GPL-3.0-or-later",
    type: "module",
    main: "./index.js",
    module: "./index.js",
    types: "./index.d.ts",
    exports: {
      ".": {
        types: "./index.d.ts",
        default: "./index.js",
      },
    },
    files: [
      "index.js",
      "index.d.ts",
      "wasm",
      "THIRD-PARTY-NOTICES.md",
      "MODIFICATIONS.md",
      "upstream.json",
      "complete-source.tar.gz",
      "LICENSE",
      "README.md",
    ],
    repository: {
      type: "git",
      url: "git+https://github.com/EthanThatOneKid/pkhex-wasm.git",
    },
    homepage: "https://ethanthatonekid.github.io/pkhex-wasm/",
    bugs: "https://github.com/EthanThatOneKid/pkhex-wasm/issues",
    keywords: ["pokemon", "pkhex", "wasm", "save-editing", "browser"],
    publishConfig: { access: "public" },
  };
}
