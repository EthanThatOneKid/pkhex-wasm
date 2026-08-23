/**
 * Normalize a published PKHexWasm.Wasm output directory so every asset is
 * reachable under its canonical (unhashed) name.
 *
 * The .NET publish pipeline fingerprints assets and rewrites index.html with
 * an import map; consumers that don't run a browser (Deno CLI) and static
 * hosts without rewrite rules need stable names instead. Idempotent.
 *
 *   deno run -A tools/normalize-publish.mjs <path-to-publish-root>
 */

const root = Deno.args[0]?.replace(/[\\/]+$/, "");
if (!root) {
  console.error("usage: deno run -A tools/normalize-publish.mjs <publish-root>");
  Deno.exit(2);
}

const info = async (path) => {
  try {
    return await Deno.stat(path);
  } catch {
    return undefined;
  }
};

const fw = `${root}/wwwroot/_framework`;
const src = await info(fw)
  ? fw
  : await info(`${root}/_framework`)
  ? `${root}/_framework`
  : null;
if (!src) {
  console.error(`no _framework directory under ${root}`);
  Deno.exit(1);
}

/** Find the single non-compressed file matching `<prefix>.<hash>.<ext>`. */
function findHashed(prefix, ext) {
  const canonical = `${prefix}.${ext}`;
  const reserved = new Set(["native", "runtime"]); // segments of other canonical assets
  const re = new RegExp(`^${prefix}\\.[a-z0-9]+\\.${ext}$`, "i");
  const match = [...Deno.readDirSync(src)]
    .filter((e) => {
      if (!e.isFile || !re.test(e.name) || e.name === canonical) return false;
      const segment = e.name.slice(prefix.length + 1, e.name.length - ext.length - 1);
      return !reserved.has(segment.toLowerCase());
    })
    .map((e) => e.name)
    .sort();
  if (match.length === 0) throw new Error(`missing asset: ${prefix}.<hash>.${ext}`);
  if (match.length > 1) throw new Error(`ambiguous assets for ${prefix}: ${match.join(", ")}`);
  return match[0];
}

const aliases = [
  ["dotnet", "js"],
  ["dotnet.native", "js"],
  ["dotnet.runtime", "js"],
];

let created = 0;
for (const [prefix, ext] of aliases) {
  const hashed = findHashed(prefix, ext);
  const canonical = `${prefix}.${ext}`;
  if (hashed !== canonical) {
    await Deno.copyFile(`${src}/${hashed}`, `${src}/${canonical}`);
    created++;
  }
}

// top-level entry module (main.<hash>.js → main.js), when publishing the app root
const wwwroot = `${root}/wwwroot`;
if (await info(wwwroot)) {
  for (const entry of [...Deno.readDirSync(wwwroot)]) {
    const m = /^main\.[a-z0-9]+\.js$/i.exec(entry.name);
    if (entry.isFile && m) {
      await Deno.copyFile(`${wwwroot}/${entry.name}`, `${wwwroot}/main.js`);
      created++;
    }
  }
}

console.log(`normalize: ${created} alias(es) ensured under ${src.replace(/\\/g, "/")}`);
