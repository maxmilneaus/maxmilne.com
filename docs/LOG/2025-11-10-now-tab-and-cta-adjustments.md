# 2025-11-10 – Now Page Tab and CTA Adjustments

## Context

The Now page (`/now`) presents current primary work and explorations. Initial implementation used:

- Page background: `var(--color-deep) #141210`
- Now cards: `var(--color-charcoal)` with a hover state that lightened/darkened inconsistently
- CTA buttons inside the cards with a subtle tinted background

User intent (aligned with VISION and STYLE_GUIDE):

- The “tab” (now-card) should read as a distinct panel against the page background.
- The CTA should sit inside that panel with clear but gentle emphasis.
- Hover states should be subtle, directional, and not violate the attention/comfort principles.

## Decision

1. Adjust the now-card background and hover to create clear, gentle contrast with the page background.
2. Restore the CTA’s subtle internal emphasis consistent with documented action box patterns.

## Implementation

### Now Card (Tab) Background

- Base:
  - Selector: `.now-card`
  - File: `_sass/_style.scss`
  - Value: `background: #181512;`
- Rationale:
  - Slightly lighter than `var(--color-deep) #141210`.
  - Reads as a soft panel above the background.
  - Darker and calmer than the original `var(--color-charcoal) #201d1a`, better matching the evolved palette.

### Now Card Hover

- Selector: `.now-card:hover`
- File: `_sass/_style.scss`
- Value: `background: #151310;`
- Rationale:
  - Subtle darkening from `#181512`.
  - Stays above (not darker than) the base page background.
  - Provides feedback without “popping” or breaking Mys/Lagom tone.

### CTA Button Inside Now Card

- Selector: `.now-card-cta`
- File: `_sass/_style.scss`
- Value: `background: rgba(147, 197, 253, 0.05);`
- Other properties:
  - `border-left: 3px solid var(--color-accent-hover);`
  - Text remains cream.
- Rationale:
  - Restores the light, blue-tinted emphasis block pattern.
  - Keeps CTA visually distinct inside the darker tab.
  - Aligns with STYLE_GUIDE “Actionable Content Boxes” guidance.

## Reasoning

- Maintains single-job clarity for the Now page:
  - Tabs = primary work modules.
  - CTA = clear but gentle invitation.
- Uses small, systematic tonal shifts instead of introducing new arbitrary values.
- Keeps hover behavior consistent with the attention economy principles:
  - Hover is informative, not demanding.
  - No state is darker than the global background in a way that inverts hierarchy.

## Consequences

- Improved visual separation between page background, now-card blocks, and CTAs.
- Reduced ambiguity about what is clickable:
  - Entire card subtly responds on hover.
  - CTA retains clear, familiar styling.
- Change localized to Now page components; other pages unaffected.

## Related

- STYLE_GUIDE: Colors & Actionable Content Boxes
- VISION: Now page as hybrid “current work + explorations” with clear but soft CTAs
- LOG:
  - 2025-11-10-writing-filter-ghost-panel-update.md
  - 2025-11-10-projects-filter-ghost-panel-update.md