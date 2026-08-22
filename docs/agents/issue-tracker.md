# Issue tracker

Issues for this repo live in **GitHub Issues** on `EthanThatOneKid/pkhex-wasm`, managed via the `gh` CLI.

## Wayfinding operations

- **Map**: a single issue labelled `wayfinder:map` — the canonical artifact of a wayfinding effort.
- **Tickets**: child issues of the map, created as GitHub sub-issues (GraphQL `addSubIssue`) and labelled `wayfinder:<type>` — one of `research`, `prototype`, `grilling`, `task`.
- **Blocking**: GitHub's native issue relationships (`blocked by` / `blocks`, GraphQL). A ticket is unblocked when every ticket blocking it is closed. The frontier is open + unblocked + unassigned children.
- **Claiming**: assign the ticket to yourself before working it; an open unassigned ticket is unclaimed.
- **Resolution**: post the answer as a resolution comment, close the ticket, then append a one-line gist + link to the map's "Decisions so far".
- **Frontier query**: open child issues of the map that are unassigned and have no open blockers.

## Conventions

- Refer to issues by name (title) in anything a human reads; ids/URLs ride inside links, never replace names.
- Research findings are committed to throwaway `research/<name>` branches and linked from their ticket as assets.
