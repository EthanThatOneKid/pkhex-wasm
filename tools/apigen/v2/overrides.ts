/**
 * Explicit member-name overrides for the v2 projection (ADR 0001): the
 * mechanical segmented transform produces awkward names for a handful of
 * Core members; this table wins over the algorithm.
 *
 * Governance: edit only in contract PRs; the drift gate keeps emissions and
 * this table in lockstep. Keyed by raw C# member name.
 */
export const MEMBER_NAME_OVERRIDES: Record<string, string> = {
  // "IVs"/"EVs" mechanically render as "iVs"/"eVs" (acronym + trailing
  // lowercase fragment); consumers expect the plain lowercase forms.
  IVs: "ivs",
  EVs: "evs",
};
