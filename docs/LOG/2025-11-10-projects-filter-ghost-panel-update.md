---
title: Projects filter — ghost panel alignment with Writing
layout: note
---

# Entry 009: Projects filter — ghost panel alignment with Writing (2025-11-10)

## Context

Following the ghost-style filter refinement on `/writing` (see `2025-11-10-writing-filter-ghost-panel-update.md`), the `/projects` index still used a heavier dropdown/checkbox filter UI that:

- Visually diverged from the softer Writing pattern.
- Repeated a more "mechanical" control surface that no longer matched the updated aesthetic system.
- Introduced extra chrome (panel borders, checkboxes, select/clear-all controls) that worked functionally but felt over-specified compared to the rest of the page.

The intent for this change: bring `/projects` into visual and behavioral alignment with the Writing ghost filter, while preserving the conceptual distinction:

- `/writing` = Topics (ideas, explorations)
- `/projects` = Type (finished work categories)

## What We Implemented

### 1. Ghost-style "Type" filter on /projects

Files:

- `_layouts/projects.html`
- `_sass/_projects.scss`
- `docs/TECHNICAL/filter-system.md` (implicitly aligned; see Filter System docs)

Key markup changes in `_layouts/projects.html`:

1. Collect project tags as before:

   - `tag_collection` built from `site.projects` tags.
   - Tags sorted and de-duplicated in Liquid.

2. Replace the old checkbox dropdown with a ghost filter block modeled on the Writing implementation:

   - When `tag_collection` has entries:

     ```html
     <section class="projects-topics projects-topics-ghost" aria-label="Filter projects by type">
       <div class="ghost-filter-block" data-filter-root>
         <div class="panel-header-soft">
           <button class="toggle-pill-soft" type="button" data-filter-toggle aria-expanded="false">
             <span class="toggle-label" data-label-default="Type">Type</span>
             <span class="toggle-count" data-filter-count style="display:none;"></span>
             <span class="toggle-arrow">▼</span>
           </button>
           <div class="panel-actions-soft" data-filter-clear-container style="display:none;">
             <button class="action-soft" type="button" data-filter-clear>Clear</button>
           </div>
         </div>

         <div class="panel-soft" data-filter-panel>
           <div class="panel-inner-soft" data-filter-panel-inner>
             <div class="topics-row-soft">
               {% for tag in tag_collection %}
                 {% assign tag_slug = tag | slugify %}
                 <button class="chip-soft" type="button"
                         data-topic="{{ tag_slug }}"
                         data-filter-chip
                         aria-pressed="false">
                   {{ tag }}
                 </button>
               {% endfor %}
             </div>
           </div>
         </div>

         <div class="projects-meta" data-filter-meta></div>
       </div>
     </section>
     ```

   - When there are no tags, we render a blank `.projects-meta` placeholder for consistency.

3. Keep the project list structure the same:

   - `sorted_projects` ordering preserved.
   - Each `.project-entry` continues to emit `data-tag-slugs` with space-delimited slugs.
   - Layout remains: `year` column + `title` + `description`.

### 2. Lightweight ghost filter script for /projects

The prior dropdown/checkbox script in `_layouts/projects.html` has been replaced with a scoped helper mirroring the Writing ghost filter behavior:

Core behavior:

- Scope:
  - `root = document.querySelector('[data-filter-root]')`
  - Bails early if absent.

- Elements:
  - `toggle` (`[data-filter-toggle]`)
  - `panel` (`[data-filter-panel]`)
  - `panelInner` (`[data-filter-panel-inner]`)
  - `chips` (`[data-filter-chip]`)
  - `clearBtn` (`[data-filter-clear]`)
  - `clearContainer` (`[data-filter-clear-container]`)
  - `countEl` (`[data-filter-count]`)
  - `labelEl` (span with `data-label-default="Type"`)
  - `meta` (`[data-filter-meta]`)
  - `entries` = all `.project-entry` under `[data-filter-list]` (shared model with Writing)

- Interactions:
  - Toggle pill:
    - Click toggles `.is-expanded` on both pill and `panel-soft`.
    - Updates `aria-expanded`.
    - Shows/hides `clearContainer` alongside expanded state (kept minimal in default view).
  - Chips:
    - Click toggles `.is-active` + `aria-pressed`.
    - Uses additive OR logic across selected types.
  - Clear:
    - Clears all chip states.
    - Resets back to "all projects shown".
    - Leaves the panel open for immediate re-selection.

- `update()` logic:
  - Collects active types from `data-topic` on active chips.
  - None selected:
    - All projects visible.
    - Count hidden.
    - Label reverted to `Type`.
    - Pill loses `.has-filters`.
  - One or more selected:
    - Each `.project-entry` reads `data-tag-slugs` and stays visible if any slug matches the active set.
    - Non-matching entries receive `.is-hidden`.
    - Count shown as:
      - `1 type` / `N types`.
    - Label text becomes `Filtered`.
    - Pill gets `.has-filters`.
  - Meta:
    - Intentionally blank (`meta.textContent = ''`) to keep UI calm.
  - Called once on load to ensure consistent initial state.

Semantics:

- No "All" pill: "All" is implicitly represented by zero selections (same as Writing).
- OR logic across types, shared with Writing’s topic semantics.
- Progressive enhancement:
  - Without JS, all projects render; no critical content hidden.

### 3. Sass alignment with Writing ghost filter

In `_sass/_projects.scss`:

- Removed legacy dropdown + checkbox styles:
  - `.projects-filter-group`, `.projects-filter-toggle`, `.projects-filter-panel`, `.projects-filter-list`, and their responsive rules.
- Added a scoped ghost filter visual system, mirroring `_sass/_writing.scss` but constrained to the projects context:

Key selectors:

- `.projects-topics` / `.projects-topics-ghost`
  - Provide subtle vertical rhythm under the intro.
- `.projects-page .ghost-filter-block`
- `.projects-page .panel-header-soft`
- `.projects-page .toggle-pill-soft`
- `.projects-page .toggle-label`
- `.projects-page .toggle-count`
- `.projects-page .toggle-arrow`
- `.projects-page .panel-soft`
- `.projects-page .panel-inner-soft`
- `.projects-page .panel-actions-soft`
- `.projects-page .action-soft`
- `.projects-page .topics-row-soft`
- `.projects-page .chip-soft`
- `.projects-meta`

Design characteristics:

- Uses the same soft pill, chip, and arrow treatments as Writing:
  - Rounded pills
  - Subtle borders
  - Calm dark/cream palette
  - Accent blue (`var(--color-accent-hover)`) for active/count states
- Scoped under `.projects-page` to avoid bleeding styles into Writing or other layouts.
- Maintains the existing `.project-entry` grid, color hierarchy, and spacing tokens.
- Filters hide projects using `.project-entry.is-hidden { display: none; }`.

Mobile:

- Adjusts ghost padding.
- Makes the pill full-width with balanced label/arrow alignment, mirroring Writing.

## Rationale

1. System Consistency

- `/writing` and `/projects` now share:
  - The same ghost-style filter control language.
  - The same data-tag-slug model.
  - The same minimal, additive OR filtering semantics.
- The label difference encodes meaning:
  - `Topics` on Writing.
  - `Type` on Projects.
- This preserves the Multiplicity vs Singularity philosophy:
  - Writing = exploratory, topic lenses.
  - Projects = distilled bodies of work, grouped by type.

2. Reduced UI Weight

- Removed:
  - Checkbox list.
  - Explicit select-all / clear-all within a heavy dropdown.
- Replaced with:
  - A single, quiet pill.
  - Lightweight chips only visible on intentional interaction.
- Default view:
  - H1
  - Projects intro copy
  - Type pill (collapsed)
  - Projects list

3. Implementation Alignment

- Uses the same vanilla JS pattern as Writing:
  - Self-contained IIFE.
  - Data-attribute driven.
  - No external dependencies.
- Keeps `docs/TECHNICAL/filter-system.md` model intact:
  - Tag slugs via Liquid.
  - Client-side filtering via `data-tag-slugs` + data attributes.

## Impact

- Visitors experience a unified, low-noise filter pattern across `/writing` and `/projects`.
- Projects retain their distinct grid and descriptive layout while gaining a softer interaction surface.
- The log and technical docs now accurately reflect the November 10, 2025 filter state for both sections.
