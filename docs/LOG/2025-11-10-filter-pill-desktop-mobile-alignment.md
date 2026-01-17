---
title: Filter pill — unified Topics/Type ghost control (single-select)
layout: note
---

# Entry 010: Filter pill — unified Topics/Type ghost control (2025-11-10)

## Context

This entry records the alignment of the ghost-style filter control used on:

- `/writing` — "Topics"
- `/projects` — "Type"

Initial work brought both pages onto a shared soft pill + ghost panel pattern.
Subsequent refinements (this session) made the behavior and visuals even more
precise:

- Filters should feel like calm option selectors, not additive toggles.
- The dropdown arrow, label, and padding should align pixel-perfect between
  Writing and Projects.
- No noisy “1 item selected” UI; the pill copy remains quiet and static.

This log supersedes older notes that described additive OR behavior or dynamic
count labels for these controls.

---

## 1. Writing Topics — Single-select ghost filter

Files:

- `_layouts/writing.html`
- `_sass/_writing.scss`
- `docs/TECHNICAL/filter-system.md` (Writing filter section)

### Behavior

- Topic chips are now single-select:

  - Clicking a topic:
    - Activates only that topic.
    - Shows only entries whose `data-tag-slugs` include that topic.
  - Clicking the same active topic again:
    - Clears all selections.
    - Returns to “all topics” (no filters applied).
  - No additive stacking of multiple topics.

- Count/“Filtered” label removed:

  - `span[data-filter-count]` exists structurally but is always hidden.
  - The pill label text remains the static `Topics`.
  - `.has-filters` is not used for visual state; the pill stays quiet.

### Implementation (summary)

Key JS fragment in [`_layouts/writing.html`](./../../_layouts/writing.html):

- Each `.chip-soft[data-filter-chip]`:

  - On click:
    - If already active → clear all chips.
    - Else → deactivate all, activate only the clicked chip.
    - Calls `update()`.

- `update()`:

  - Reads active topic slug (0 or 1 due to single-select logic).
  - When none selected:
    - All `.writing2-entry` elements are visible.
  - When one selected:
    - Entries are visible only if their `data-tag-slugs` contain that slug.
  - Count UI remains hidden; label resets to default.

### Visuals

From [`_sass/_writing.scss`](./../../_sass/_writing.scss):

- `.toggle-pill-soft`:

  - `display: inline-flex;`
  - `align-items: center;`
  - `justify-content: space-between;`
  - `padding: 0.24rem 0.7rem 0.24rem 0.5rem;`
  - `width: 70%; max-width: 260px;`
  - Arrow pinned to right edge via `space-between`.

Result: calm pill, static label, right-aligned arrow, with single-select chips.

---

## 2. Projects Type — Mirrored single-select behavior

Files:

- `_layouts/projects.html`
- `_sass/_projects.scss`
- `docs/TECHNICAL/filter-system.md` (Projects filter section)

### Behavior

The `/projects` Type filter is now brought into parity with Writing:

- Type chips are single-select:

  - Clicking a type:
    - Activates only that type.
    - Shows only `.project-entry` elements whose `data-tag-slugs` contain it.
  - Clicking the same active type again:
    - Clears all filters and shows all projects.

- No count or “Filtered” label:

  - `span[data-filter-count]` is present but visually hidden.
  - The pill label remains the static `Type`.
  - No “1 type selected” or `Filtered` state.

- Visibility rules:

  - Zero active types → all projects visible.
  - One active type → show projects whose `data-tag-slugs` include that type.

### Implementation (summary)

Inline JS in [`_layouts/projects.html`](./../../_layouts/projects.html):

- Mirrors Writing’s helper:

  - Chips use the same single-select toggle logic as Topics.
  - `update()` applies filter based on a single active `data-topic` or none.

- Progressive enhancement remains:

  - Without JS, all entries render; no critical content hidden.

### Visuals

From [`_sass/_projects.scss`](./../../_sass/_projects.scss):

- `.projects-page .toggle-pill-soft`:

  - `display: inline-flex;`
  - `align-items: center;`
  - `justify-content: space-between;`
  - `padding: 0.24rem 0.7rem 0.24rem 0.5rem;`
  - `width: 70%; max-width: 260px;`
  - Matches Writing pill exactly for:

    - Left text inset.
    - Arrow x-position.
    - Vertical rhythm.

- `.projects-page .toggle-count`:

  - `display: none;` — count UI fully suppressed.

Result: Topics and Type pills are pixel-aligned and behaviorally aligned.

---

## 3. Writing list — Divider removal

To reinforce the “stream” feel on `/writing` and differentiate from the more
structured `/projects` grid:

- `_sass/_writing.scss`:

  - `.writing2-entry` no longer renders the subtle bottom border between entries.
  - Entries stack with tight vertical rhythm and no hard separators.

Projects retain their dividers and card spacing, preserving the
Multiplicity (Writing) vs Singularity (Projects) philosophy.

---

## 4. Documentation alignment

These decisions are now the source of truth and are reflected in:

- [`docs/TECHNICAL/filter-system.md`](./../TECHNICAL/filter-system.md)

  - Writing + Projects sections describe:

    - Single-select chips.
    - Tap-to-clear behavior.
    - Static pill labels.
    - Hidden count elements.
    - Shared ghost pill geometry.

- This log (`2025-11-10-filter-pill-desktop-mobile-alignment.md`) replaces any
  earlier references to additive OR filters or visible selected-count UI for
  the current `/writing` and `/projects` implementations.

---

## 5. Rationale (concise)

- Keeps filters feeling like gentle lenses, not complex UI.
- Reduces cognitive load (one active topic/type at a time).
- Maintains calm, minimal surface:

  - No flashing counts.
  - No heavy dropdown chrome.

- Ensures pixel-level alignment between Writing and Projects pills so the system
  feels intentional and trustworthy.
