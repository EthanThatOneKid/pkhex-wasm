/**
 * Explicit member-name overrides for the v2 projection (ADR 0001): the
 * mechanical segmented transform handles every name seen in real metadata
 * so far — the scanner's acronym-merge pass already renders `SetIVs ->
 * setIvs` and `IVs -> ivs` — so this table starts EMPTY.
 *
 * Governance: seed entries only when a genuinely hostile rendering shows up,
 * via contract PRs; keyed by raw C# member name; drift gate keeps emissions
 * and this table in lockstep.
 */
export const MEMBER_NAME_OVERRIDES: Record<string, string> = {};
