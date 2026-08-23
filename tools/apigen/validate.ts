/**
 * The inverted drift gate: the runtime export list (from tools/reflector)
 * and the explicit mapping table must describe exactly the same member set,
 * and every claimed target must exist on the model surface.
 */

import type { InterfaceModel, RuntimeMetaLike } from "./model-types.ts";
import type { BindingMapping } from "./mappings.ts";

export interface BindingProblem {
  kind: "unmapped-export" | "stale-mapping" | "unknown-target" | "duplicate-mapping";
  detail: string;
}
/** Build the set of valid `<Interface>.<member...>` paths from the model. */
export function surfacePaths(types: readonly InterfaceModel[]): Set<string> {
  const paths = new Set<string>();
  const byName = new Map(types.map((t) => [t.name, t] as const));

  // Effective members include everything inherited through `extends` chains,
  // so targets like TrainerInfo.name (declared on TrainerRef) validate.
  const effectiveMembers = (name: string): InterfaceModel["members"] => {
    const seen = new Set<string>([name]);
    const collected: { kind: "prop" | "method"; name: string; type?: string }[] = [];
    let cursor: InterfaceModel | undefined = byName.get(name);
    while (cursor) {
      collected.push(...cursor.members);
      const next = cursor.extends?.find((p) => !seen.has(p));
      if (!next) break;
      seen.add(next);
      cursor = byName.get(next);
    }
    return collected;
  };

  for (const t of types) {
    for (const m of effectiveMembers(t.name)) {
      const base = `${t.name}.${m.name}`;
      paths.add(base);

      // expand references into other model interfaces one level deep
      // (Pokemon.owner → TrainerRef members; Game.items stays table-typed)
      const referenced = m.kind === "prop" && typeof m.type === "string"
        ? byName.get(m.type.trim())
        : undefined;

      if (referenced) {
        for (const rm of effectiveMembers(referenced.name)) {
          paths.add(`${base}.${rm.name}`);
          if (rm.name === "id") {
            paths.add(`${base}.id.tid`);
            paths.add(`${base}.id.sid`);
          }
        }
      }

      // inline literal objects like `id: { tid: number; sid: number }`
      if (m.kind === "prop" && typeof m.type === "string" && /\btid\b/.test(m.type)) {
        paths.add(`${base}.tid`);
        paths.add(`${base}.sid`);
      }
    }
  }
  return paths;
}

export function validateBinding(
  meta: RuntimeMetaLike,
  mappings: readonly BindingMapping[],
  validTargets: ReadonlySet<string>,
): BindingProblem[] {
  const problems: BindingProblem[] = [];

  const byExport = new Map<string, BindingMapping>();
  for (const m of mappings) {
    if (byExport.has(m.export)) {
      problems.push({ kind: "duplicate-mapping", detail: `duplicate entries for export "${m.export}"` });
    }
    byExport.set(m.export, m);
  }

  // every runtime export must be claimed exactly once
  for (const method of meta.methods) {
    if (!byExport.has(method.name)) {
      problems.push({
        kind: "unmapped-export",
        detail:
          `export "${method.name}" (${method.file}) has no entry in BINDING_MAPPINGS — surface it or mark it "(internal)"`,
      });
    }
  }

  // every mapping must reference a live export and a real surface path
  for (const mapping of mappings) {
    if (!meta.methods.some((m) => m.name === mapping.export)) {
      problems.push({
        kind: "stale-mapping",
        detail: `mapping "${mapping.export}" -> ${mapping.target} references an export that no longer exists`,
      });
      continue;
    }
    if (mapping.target !== "(internal)" && !validTargets.has(mapping.target)) {
      problems.push({
        kind: "unknown-target",
        detail: `mapping "${mapping.export}" targets "${mapping.target}", which is not part of the model surface`,
      });
    }
  }

  return problems;
}
