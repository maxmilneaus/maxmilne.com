---
title: Filter pill — unified Topics/Type ghost control
layout: note
---

# Entry 010: Filter pill — unified Topics/Type ghost control (2025-11-10)

## Context

This entry records the final alignment of the ghost-style filter control used on:

- `/writing` — "Topics"
- `/projects` — "Type"

The goal was to:

1. Apply the same soft, ghost-filter aesthetic to both pages.
2. Ensure mobile and desktop present a consistent, intentional pill:
   - Arrow anchored at the end of the pill.
   - Slightly wide, asymmetric bubble (not full-width).
3. Maintain clear tap targets on mobile without heavy UI on larger screens.
4. Keep implementation aligned with `docs/README.md` and `docs/TECHNICAL/filter-system.md`.

## What Changed

### 1. Shared ghost pill geometry

Files:

- `_sass/_writing.scss`
- `_sass/_projects.scss`
- `_layouts/writing.html`
- `_layouts/projects.html`

The toggle pill (`.toggle-pill-soft`) is now treated as a shared component across both layouts.

Key properties (applied consistently):

- `display: inline-flex;`
- `align-items: center;`
- `justify-content: space-between;`
  - Ensures:
    - Label + optional count sit to the left.
    - Arrow glyph sits at the far right edge of the pill.
- `gap: 0.5rem;`
- `padding`:
  - Writing:
    - `padding: 0.24rem 0.7rem 0.24rem 0.5rem;`
  - Projects:
    - `padding-top: 0.24rem;`
    - `padding-bottom: 0.24rem;`
    - `padding-right: 0.7rem;`
- `border-radius: 999px;`
- `border: 1px solid rgba(74, 69, 63, 0.65);`
- `background: transparent;`
- `color: var(--color-meta);`
- `font-size: 0.95rem;`
- `letter-spacing: 0.06em;`
- `cursor: pointer;`
- Smooth transitions for border, color, background.

Width logic (both pages):

- `width: 70%;`
- `max-width: 260px;`

This width rule is intentionally applied across viewport sizes so:

- On mobile:
  - Pill fills a comfortable portion of the text column (thumb-friendly).
- On tablet/desktop:
  - Pill remains slightly wide and asymmetric (never edge-to-edge), reading as a deliberate control rather than generic text.

### 2. Arrow position fixed at bubble end

Previously:

- On some breakpoints, the arrow sat near the label, especially on desktop.

Now:

- Both `/writing` and `/projects` pills use `justify-content: space-between;` on `.toggle-pill-soft`.
- Result:
  - Arrow is consistently pinned to the rightmost interior edge of the pill.
  - The visual matches the desirable mobile behavior at all viewport sizes.
  - Maintains a clean, directional affordance.

### 3. Compact bubble for desktop (while preserving mobile feel)

We refined padding to make the pill feel slightly shorter and more precise, without compromising touch targets:

- Vertical padding reduced from `0.26rem` to `0.24rem`:
  - Just enough to tighten the silhouette on larger screens.
- Horizontal padding adjusted:
  - Slightly reduced right padding (`0.7rem`) maintains the asymmetric look without feeling heavy.
- Width + arrow alignment stay consistent across breakpoints:
  - Mobile keeps the strong, easy-tap pill.
  - Desktop sees the same proportioned pill, just visually neater.

No separate desktop-only media query is required; the system-wide sizing already produces the intended feel inside the 42rem content column.

### 4. Alignment with README and Filter System docs

These changes are consistent with the principles in `docs/README.md`:

- One clear job per page:
  - `/writing` uses Topics to filter ideas.
  - `/projects` uses Type to filter finished work.
- Shared interaction language:
  - Both use the same ghost pill control and OR-based tag filtering.
- Minimal, coherent UI:
  - No heavy dropdown chrome.
  - Calm, narrow controls that invite interaction without dominating the layout.

And consistent with `docs/TECHNICAL/filter-system.md`:

- Both filters:
  - Use `data-tag-slugs` on entries.
  - Use chip-style buttons (`data-topic` / `data-filter-chip`) inside a single pill-triggered ghost panel.
  - Rely on small vanilla JS helpers scoped via data attributes.
- This entry supplements those docs as the decision log for the visual/behavioral refinements.

## Summary

- Topics (Writing) and Type (Projects) now share:
  - A unified ghost-style pill.
  - Arrow pinned to the end of the bubble at all viewport sizes.
  - A slightly wide, asymmetric width that:
    - Feels intentional on desktop.
    - Remains comfortably tappable on mobile.
- The implementation matches the system and intent described in `docs/README.md` and the filter technical docs, and is recorded here to prevent future regressions or re-introduction of the older dropdown/checkbox UI.