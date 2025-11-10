---
title: Writing filter — ghost panel refinement
layout: note
---

# Entry 008: Writing filter — ghost panel refinement (2025-11-10)

## Context

The `/writing` page previously documented and experimented with multiple inline filter patterns, including:

- Projects-style pill bar
- Inline "All · topics" stream
- Early dropdown/expanding prototypes in `docs/Design Ideas/`

As of this update, the live implementation adopts the softer "ghost" inline pattern with a collapsible topics panel. Documentation in `docs/TECHNICAL/filter-system.md` and the design prototypes has been updated; this log entry records the final decision.

---

## What We Implemented

### 1. Ghost header + collapsible topics

Location:

- Layout: `_layouts/writing.html`
- Styles: `_sass/_writing.scss`
- Docs: `docs/TECHNICAL/filter-system.md` (Writing filter section)

Key structure:

- A subtle ghost band under the “Writing” intro:

  - `section.writing2-topics-ghost`
  - `div.ghost-filter-block[data-filter-root]`

- Header row:

  - `button.toggle-pill-soft[data-filter-toggle]`
    - Label: `Topics` via `data-label-default`
    - Count element: `span[data-filter-count]` (hidden until filters are active)
    - Arrow glyph

  - `div.panel-actions-soft[data-filter-clear-container]`
    - Contains one `Clear` button: `button.action-soft[data-filter-clear]`
    - Hidden by default (`display:none`)

- Collapsible panel:

  - `div.panel-soft[data-filter-panel]`
    - `div.panel-inner-soft[data-filter-panel-inner]`
      - `div.topics-row-soft` with `button.chip-soft[data-filter-chip][data-topic]` for each tag

- Entries:

  - `.writing2-entry` rows in `.writing2-list[data-filter-list]`
  - Each entry carries `data-tag-slugs="space-delimited-slugs"`.

---

## Interaction Rules

### Topics toggle

- Click toggles `.is-expanded` on `panel-soft` and the toggle button.
- `aria-expanded` kept in sync.
- When expanding:
  - `data-filter-clear-container` is shown (`display:flex`).
- When collapsing:
  - `data-filter-clear-container` is hidden.
- Result:
  - Default state is extremely calm: only the Topics pill is visible.
  - The Clear control only appears once the panel is in use.

### Chips

- Each `.chip-soft`:

  - Toggles `is-active` and `aria-pressed` on click.
  - Feels like a simple text chip, no heavy chrome.

### Filtering logic

- Uses additive OR semantics:

  - Collect all active topics from `data-topic` on active chips.
  - For each `.writing2-entry`, read `data-tag-slugs` and split to topics.
  - Entry is visible if:
    - No topics are selected (default), OR
    - At least one of its tag slugs matches the active set.

- Applied by toggling `.is-hidden` on entries.

### Clear button

- Visible only when panel is expanded.
- On click:

  - Clears all chip active states.
  - Resets `aria-pressed` flags.
  - Calls `update()` to return to "all entries".
  - Leaves the panel open; user can immediately choose a new combination.

---

## Design Rationale

1. Softer, more native

   - Respects the existing dark, quiet theme.
   - No heavy blocks in the collapsed state.
   - Ghost treatment (subtle borders, slight gradient) only appears when looking closely or expanding.

2. Visual cleanliness

   - Default view shows:
     - H1
     - Topics pill
     - List of entries
   - Clear is hidden until relevant to avoid unnecessary cognitive load.

3. Additive filtering with clear semantics

   - No "All" pill; "all" is implicitly represented by zero selections.
   - Users can:
     - Open Topics
     - Choose 1–N topics (OR logic)
     - Use Clear to reset.

4. System alignment

   - Uses the same `data-tag-slugs` model as projects.
   - Keeps logic in one small vanilla JS helper.
   - Technical details live in `docs/TECHNICAL/filter-system.md`; this log captures the "why".

---

## Files Touched (for traceability)

- `_layouts/writing.html`
  - Replaced older inline-topic-row experiment with ghost block + collapsible panel.
  - Added minimal JS for:
    - Panel toggle
    - Clear visibility
    - Chip-based OR filtering.

- `_sass/_writing.scss`
  - Added `.writing2-topics-ghost`, `.ghost-filter-block`, `.toggle-pill-soft`, `.panel-soft`, `.panel-inner-soft`, `.panel-header-soft`, `.panel-actions-soft`, `.chip-soft`, etc.
  - Ensured aesthetics match site system (colors, spacing, typography).

- `docs/TECHNICAL/filter-system.md`
  - Updated Writing filter section to match this implementation:
    - Data attributes
    - Collapse behavior
    - Clear visibility rules
    - OR logic description.

---

## Decision Summary

- Adopt the ghost-style, collapsible topics filter for `/writing`.
- Default state: Topics pill only; no persistent Clear.
- Expanded state: Topics + Clear on one row; chips in a soft panel underneath.
- Keep behavior minimal, legible, and fully documented for future iterations.
