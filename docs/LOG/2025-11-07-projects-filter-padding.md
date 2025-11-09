## Entry 004: Projects filter keeps extra top padding (2025-11-07)

**Context:**
- Projects list applied `padding: var(--space-md) 0` to every `.project-entry` and only removed the top padding using the `:first-child` selector.
- When a visitor chose a filter (e.g., “Art”), hidden entries above the first visible project broke that assumption, leaving a visible gap before the list.
- Goal: preserve Lagom principle (no excess space) while keeping the filter system simple and resilient.

**Decision:**
Add a runtime helper that identifies the first visible project after every filter change and applies a `.is-first-visible` class so CSS can remove the extra top padding even when earlier siblings are hidden.

**Reasoning:**
- Pure CSS selectors cannot target “first visible” elements when JavaScript toggles `.is-hidden` on siblings.
- The helper class keeps styling declarative (`.project-entry.is-first-visible { padding-top: 0; }`) and avoids hardcoding padding into JavaScript.
- The update stays within the existing vanilla JS filter script and matches the system-thinking requirement: one change ripples consistently through the layout.

**Consequences:**
+ Filters now maintain identical vertical rhythm regardless of which category is active.
+ Implementation lives alongside existing filter logic in `_layouts/projects.html` and the SCSS token system in `_sass/_projects.scss`, so future contributors see everything in the expected places.
+ Adds a tiny bit of JS bookkeeping (`markFirstVisible()`), but it runs in O(n) over the already-rendered list and only after user interaction, so performance impact is negligible.

**Related:** `_layouts/projects.html`, `_sass/_projects.scss`, docs/TECHNICAL/INDEX.md (Project Filters section)
