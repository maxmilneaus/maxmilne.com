---
title: Style Guide
layout: note
---

# Design System Visual Reference

*A systematic approach to cozy, contemplative design*

**Last updated:** 2025-11-07

---

## Color Palette

### Base Colors
| Usage | Color | Hex |
|-------|-------|-----|
| Background | Deep | #141210 |
| Secondary backgrounds | Charcoal | #201d1a |
| Borders, subtle elements | Graphite | #2d2926 |
| Base divider color | Stone | #4a453f |
| Primary text | Cream | #e8ddd4 |
| Secondary text | Warm Gray | #c7beb5 |
| Labels, metadata | Meta | #9c958c |

### Interactive
| Usage | Color | Hex |
|-------|-------|-----|
| Hover states | Accent Hover | #93c5fd |
| Accent elements | Accent Subtle | #3b82f6 |

### System Colors
| Usage | Value |
|-------|-------|
| Dividers (all) | rgba(74, 69, 63, 0.6) |

---

## Typography

### Font Sizes
| Element | Size | Pixels |
|---------|------|--------|
| h1 | 2rem | 32px |
| h2 | 1.65rem | 26.4px |
| h3 | 1.35rem | 21.6px |
| Body | 1rem | 16px |
| Body (screens >820px) | 1.05rem | 16.8px |

### Line Heights
| Element | Line Height |
|---------|-------------|
| Body text | 1.7 |
| h1 | 1.15 |
| h2-h6 | 1.25 |

### Font Weight
- Normal: 400
- Emphasis/Strong: 600

---

## Spacing System

### Factor-Based Scale
All spacing derives from 0.25rem base unit, creating harmonic proportions (1:2:4:7:12):

| Variable | Value | Base Units |
|----------|-------|------------|
| --space-xs | 0.25rem | 1 |
| --space-sm | 0.5rem | 2 |
| --space-md | 1rem | 4 |
| --space-lg | 1.75rem | 7 |
| --space-xl | 3rem | 12 |

### Section Spacing
- Section margin: 3rem (--space-xl)
- Content spacing: 1rem (--space-md)
- Main element top margin: 3.75rem (calc(var(--space-xl) * 1.25))
- Main element bottom margin: 3rem (--space-xl)

---

## Components

### Project Filters
- **Style:** Transparent background, 2px border-bottom on active
- **Default color:** var(--color-meta) (meta gray)
- **Hover/Active color:** var(--color-accent-hover) (blue)
- **Letter-spacing:** 0.02em (tight, refined)

### Project List Year Column
- **Grid:** 100px year column + flexible content column keeps rhythm with writing list pattern.
- **Typography:** `font-variant-numeric: tabular-nums` (with `font-feature-settings: "tnum" 1`) so all dates and dashes share a common start.
- **Alignment:** Year text stays baseline-aligned with titles; dashes are typed alongside the year in content for ranges.
- **Hierarchy:** Meta gray (#9c958c) and 1rem size keeps the column supportive, not dominant.

### Writing & Projects Ghost Filter Pills

Shared visual language for:

- `/writing` — `Topics`
- `/projects` — `Type`

Pill:

- One quiet pill per page.
- Static label:
  - `Topics` on Writing.
  - `Type` on Projects.
- Geometry:
  - `display: inline-flex;`
  - `align-items: center;`
  - `justify-content: space-between;` (label left, arrow pinned right)
  - `padding: 0.24rem 0.7rem 0.24rem 0.5rem;`
  - `width: 70%; max-width: 260px;` within the 42rem content column.
  - `border-radius: 999px;`
  - Subtle 1px stone/graphite border, transparent background.
- Color:
  - Text uses `var(--color-meta)`.
  - Hover: gentle shift only (no heavy fill).

Chips:

- Lowercase labels, subtle borders, quiet hover.
- Single-select:
  - Exactly one chip active at a time.
  - Clicking the active chip again clears back to “all”.
- No visible count:
  - Any internal count element stays hidden.
  - No “Filtered” / “N selected” label states.

List treatments:

- Writing:
  - No horizontal dividers between entries (reads as a continuous stream).
- Projects:
  - Retains dividers and generous spacing (reads as structured, finished work).

### Actionable Content Boxes
- **Background:** rgba(147, 197, 253, 0.05) (subtle blue tint)
- **Left border:** 3px solid var(--color-accent-hover)
- **Padding:** 1rem (var(--space-md))
- **Use for:** Primary work items that require user action

### CTA Buttons
- **Background:** var(--color-charcoal)
- **Text color:** var(--color-accent-hover)
- **Border:** 1px solid var(--color-accent-subtle)
- **Padding:** 0.5rem 1.75rem (var(--space-sm) var(--space-lg))
- **Transition:** 200ms ease

### Links
- **Default color:** var(--color-stone) (subtle)
- **Underline:** Text decoration with matching color
- **Underline offset:** 0.2em
- **Hover color:** var(--color-accent-hover) (blue)
- **External links:** ↗ arrow, italic styling

### Section Labels
- **Font size:** 1rem
- **Font weight:** 400 (normal)
- **Color:** var(--color-meta)
- **Letter-spacing:** 0.03em
- **Margin-bottom:** 1rem (var(--space-md))

### Tag Page Titles
- **Font size:** 2rem
- **Font weight:** 400 (slimmer)
- **Tag name color:** var(--color-cream)
- **"Topics" link color:** var(--color-meta)
- **Link hover:** var(--color-accent-hover)

### Footer Animation
- **Container:** .stove-signature
- **Text align:** left
- **Animation:** natural-breath 8s infinite
- **Margin:** 3rem 0 1rem 0

### Article Lists
- **Grid:** 3 columns (Date | Separator | Title)
- **Gap:** 0.25rem (quarter-unit)
- **Alignment:** baseline

---

## Responsive Behavior

### Breakpoints
| Screen Size | Changes |
|------------|---------|
| <600px | Padding adjusted to 4vw |
| >820px | Body font-size increases to 1.05rem, line-height to 1.75 |

### Mobile Menu
- Hamburger icon at <768px
- Slide-down menu with transform animations

---

## Design Principles

**Mys:** Cozy contentment - candlelight warmth, intimate conversations, thoughtful reflection.

**Lagom:** Just the right amount - not too much, not too little.

**Kaizen:** Continuous subtle improvements that enhance without overwhelming.

**Systems Thinking:** Every design decision creates relationships. Changes are universal, factor-based, and mathematically consistent.

**Viola/Rams + Systems:** Atmospheric mood (Viola) + honest function (Rams) + mathematical relationships (Systems).

For design philosophy, strategy, and reasoning: see **VISION.md**

For implementation details: see **TECHNICAL/INDEX.md**

For decision history: see **LOG/** folder (chronological entries)
