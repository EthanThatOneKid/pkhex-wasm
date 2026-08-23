/**
 * Shared structural types for the generator's inputs. The API model itself
 * lives in model.ts; this module exists so validators can stay decoupled.
 */

export interface InterfaceModel {
  name: string;
  typeParams?: string[];
  extends?: string[];
  doc?: string[];
  members: readonly {
    kind: "prop" | "method";
    name: string;
    /** Present on props; referenced-interface names drive path expansion. */
    type?: string;
  }[];
}

export interface RuntimeMetaMethod {
  name: string;
  returns: string;
  params: { name: string; type: string }[];
  doc?: string | null;
  throws: { error: string; clause: string }[];
  file: string;
}

export interface RuntimeMetaLike {
  source: string;
  generatedAt: string;
  methodCount: number;
  methods: RuntimeMetaMethod[];
}
