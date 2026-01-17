# Filter System

**Purpose:** Document how the topic/type filters work on `/projects` and `/writing` after the November 2025 refresh, including the ghost pill, centered topics, and photo-essay indicator.

**Last updated:** 2025-11-10

---

## Quick Summary

| Page        | Layout file                    | Stylesheet           | Behavior summary                          |
|------------|---------------------------------|----------------------|-------------------------------------------|
| `/projects`| `_layouts/projects.html`        | `_sass/_projects.scss` | Single-select Type filter (ghost pill)   |
| `/writing` | `_layouts/writing.html`         | `_sass/_writing.scss`  | Single-select Topic filter (ghost pill + centered chips) |

Shared principles:

- Filters are:
  - Minimal, text-led, and unobtrusive.
  - Single-select (one active filter at a time; click again to clear).
  - Implemented with vanilla JS and `data-*` attributes.
- No “N selected” label, no count badge in UI.
- The list below is dynamically filtered by tags slugs using CSS class toggles.

---

## Data Attributes

Both Projects and Writing rely on a consistent data model:

- `data-tag-slugs`
  - Added to each entry in the layout loop.
  - Value: space-delimited list of slugified tags.
  - Source of truth for all client-side filtering.

- `data-filter-root`
  - Wrapper around each filter block.
  - Used to scope the JS so it can bail cleanly if the block is missing.

- `data-filter-toggle`
  - The ghost pill button that opens/closes the filter panel.

- `data-filter-panel` / `data-filter-panel-inner`
  - The collapsible container that holds the filter chips.

- `data-filter-chip`
  - Each clickable chip representing a topic/type.
  - Holds `data-topic` (the slugified tag).

---

## `/writing` Filter (Topics)

Implementation:
- Layout: `_layouts/writing.html`
- Styles: `_sass/_writing.scss`
- Role: Filter writing entries by topic and visually mark photo essays.

### Markup structure

Key elements:

- Intro:
  - `<section class="writing2-page">` with `.writing2-intro` for title + intro copy.

- Topics + key:
  - `<section class="writing2-topics writing2-topics-ghost" aria-label="Filter essays by topic">`
  - `<div class="ghost-filter-block" data-filter-root>`

Inside `ghost-filter-block`:

1. Visual key:
   - Shows:
     - `Photo Essay ◐`
   - Uses:
     - `.writing2-key`
     - `.key-label`, `.key-icon.key-icon-photo`

2. Topics pill:
   - Button:
     - `class="toggle-pill-soft"`
     - `data-filter-toggle`
     - Static label: “Filter by topics”
     - Includes arrow icon span.
   - Clicking opens/closes the panel.

3. Chips panel:
   - `div.panel-soft[data-filter-panel]`
   - `div.panel-inner-soft[data-filter-panel-inner]`
   - `div.topics-row-soft`
     - One `button.chip-soft[data-filter-chip data-topic="tag-slug"]` per tag.

4. Meta:
   - `div.writing-meta[data-filter-meta]` kept visually empty.

The entry list:

- `.writing2-list[data-filter-list]`
- Each `.writing2-entry`:
  - Has `data-tag-slugs="space-delimited-slugs"` when tags present.
  - Contains link with:
    - `.article-date` (derived from `created_at`/`date`/`last_modified_at`)
    - `.article-title`
    - Optional photo essay indicator appended:
      - `<span class="article-indicator article-indicator-photo">◐</span>` when detected.

### Photo Essay Indicator (◐)

Detection (in `_layouts/writing.html`):

- For each note:
  - Inspect `note.tags`.
  - If any tag (case-insensitive) contains:
    - `photo`, `photos`, `photography`, or a consistent `photo-essay` style tag:
      - `is_photo_essay = true`.
- If photo essay:
  - `indicator = '◐'`
- Else:
  - `indicator = ''` (no symbol).

Rendering:

- After the title inside `.article-title`:
  - Only if `indicator != ''`, render:
    - `<span class="article-indicator article-indicator-photo">◐</span>`

Impact:

- Standard writing:
  - No icon; treated as default.
- Photo essays:
  - Quiet ◐ next to the title.
- The key at the top explains:
  - Photo Essay ◐

Styling hooks (in `_sass/_writing.scss`):

- `.article-indicator`:
  - Small, inline, meta-colored by default.
- `.article-indicator-photo`:
  - Can be targeted to adjust color (e.g. `var(--color-accent-hover)` or remain `var(--color-meta)`).

Content authoring note:

- To mark a photo essay:
  - Add a photo-related tag:
    - `photography`, `photo-essay`, `photos`, etc.
- See template:
  - `_templates/Writing Entry Template.md` for recommended front matter.

### Topics chips behavior

JS (inline in `_layouts/writing.html`):

- Single-select:
  - Clicking a chip:
    - Activates that chip, deactivates others.
  - Clicking the active chip again:
    - Clears all → shows all entries.
- Filtering:
  - Collect active topics from `data-topic`.
  - For each `.writing2-entry`:
    - Read `data-tag-slugs` → split to array.
    - If no chips selected → show all.
    - Else:
      - Show entries where any `data-topic` matches one of the tag slugs.
    - Hide via `.is-hidden` class; no DOM removal.

No counts / status labels:

- The `data-filter-count` and meta text are retained but visually suppressed:
  - No “Filtered” or “N selected” messaging.
  - Keeps UI minimal.

### Layout + Centering

Key visual rules:

- `.ghost-filter-block`:
  - `max-width: 42rem;`
  - Left-aligned as the primary column (matches intro text width).

- Visual key + Topics pill:
  - Left aligned within this column via `.writing2-key`.

- Centered chips:
  - Only the topic chips row is centered when panel is expanded:
    - `.writing2-topics-ghost .topics-row-soft { justify-content: center; }`
  - This centers the chip line inside the 42rem block without recentering the entire key/pill.

### Vertical spacing (panel open)

- `.panel-soft.is-expanded`:
  - `margin-top: var(--space-sm);`
  - Adds more breathing room above the tags when the panel drops down.
- Result:
  - The expanded tags feel intentional and airy, not cramped against the pill.

---

## `/projects` Filter (Type)

Implementation:
- Layout: `_layouts/projects.html`
- Styles: `_sass/_projects.scss`
- Role: Filter projects by type (tag-driven) with a ghost pill that visually mirrors Writing patterns.

### Markup structure

- Section:
  - `<section class="projects-topics projects-topics-ghost" aria-label="Filter projects by type">`
  - `<div class="ghost-filter-block" data-filter-root>`

- Panel components:
  - Same pattern as writing:
    - `panel-header-soft`
    - `toggle-pill-soft` with label “Type”
    - `panel-soft`
    - `panel-inner-soft`
    - `topics-row-soft`
    - `chip-soft` per tag (here: project types/categories)

- Project list:
  - `.projects-list[data-filter-list]`
  - `.project-entry[data-tag-slugs="..."]` for each project.

### Type filtering behavior

JS (inline in `_layouts/projects.html`):

- Same logic shape as Writing:
  - Single-select chips using `data-topic`.
  - `is-active` / `aria-pressed` toggles.
  - `update()`:
    - Build `activeTypes` from active chips.
    - If none selected:
      - Show all projects.
    - Else:
      - Show only entries where `data-tag-slugs` contains at least one `activeTypes` slug.
- No count or “Filtered” label.

### Layout alignment

- `.projects-page .ghost-filter-block`:
  - `max-width: 42rem;`
  - Left-aligned with intro text.
- `.projects-topics-ghost`:
  - Uses the same ghost/soft panel styling language as Writing:
    - Subtle pill
    - Soft chips
    - No heavy container chrome.

Optional refinements (documented intention):

- The Type pill can be positioned to align visually with Writing’s pill, while still respecting:
  - Left-aligned column.
  - Compact width (not full-bleed).
- Any future right/center alignment adjustments should:
  - Be applied at the `.panel-header-soft` / `.toggle-pill-soft` level only.
  - Leave the 42rem column as the stable anchor.

---

## Implementation Notes

- All logic is inline per layout:
  - Keeps dependencies minimal.
  - Make sure to keep selectors (`data-filter-root`, `[data-filter-chip]`, etc.) consistent if refactoring.

- When adding new tags/types:
  - No JS changes required:
    - Layout loops auto-generate chips and `data-tag-slugs`.
  - Ensure tags are meaningful, stable, and lowercase-friendly.

- Recommended workflow for changes:
  1. Update SCSS (`_sass/_writing.scss` or `_sass/_projects.scss`).
  2. Run `bundle exec jekyll build` or `serve`.
  3. Manually test:
     - Toggle pill open/close.
     - Click chips:
       - Single-select behavior.
       - Click again to clear.
     - Confirm entries hide/show correctly.

For deeper architectural rationale:
- See `docs/VISION.md` for why topic/type filters exist.
- See `docs/STYLE_GUIDE.md` for visual system references.
- See `docs/LOG/` for filter design evolution entries.
