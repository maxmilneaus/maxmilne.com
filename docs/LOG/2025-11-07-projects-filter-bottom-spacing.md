## Entry 005: Projects filter leaves extra space at the end (2025-11-07)

**Context:**
- `.project-entry` applies bottom padding and a divider so each card stays legible.
- CSS previously relied on `:last-child` to remove that padding/border from the final project.
- When filters hid the last DOM nodes, the new "last" visible entry still carried the spacing, leaving an awkward gap before the footer (see Performance filter screenshot, Nov 7).

**Decision:**
Extend the filter script to track both the first and last visible entries after every filter toggle, adding `.is-first-visible` and `.is-last-visible` helper classes so SCSS can zero the top/bottom spacing regardless of which cards remain.

**Reasoning:**
- Vanilla CSS can’t express “last visible” once JS toggles `.is-hidden`.
- A single pass over the existing `entries` array keeps the implementation simple, declarative, and aligned with the systems-thinking approach.
- Reusing the helper-class pattern avoids inline styles and keeps spacing tokens centralized in `_sass/_projects.scss`.

**Consequences:**
+ No more extra gutter beneath short filtered lists—the list now ends exactly where it should.
+ `.project-entry.is-last-visible` also removes the divider line, keeping the visual hierarchy consistent with the unfiltered state.
+ Script remains lightweight (O(n) over already-rendered nodes) and still progressive-enhancement friendly.

**Related:** `_layouts/projects.html`, `_sass/_projects.scss`, docs/TECHNICAL/INDEX.md (Project Filters)
