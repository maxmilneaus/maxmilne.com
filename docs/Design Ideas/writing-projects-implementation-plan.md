# Writing vs Projects: Implementation Plan

**Created:** 2025-11-07
**Status:** Planning phase
**Reference:** See `docs/LOG/2025-11-07-writing-projects-aesthetic-philosophy.md` for full design philosophy

---

## Overview

This document breaks down the Writing vs Projects aesthetic refinement into discrete sub-projects that can be tackled independently. Each sub-project has clear objectives, file locations, and success criteria.

**Core goal:** Implement subtle visual signifiers that communicate "what's cooking" (Writing) vs "boiled down" (Projects) through multiplicity vs singularity design patterns.

---

## Sub-Project 1: Content Type Indicators on Writing Page

### Objective
Add visual indicators to Writing index page showing content type (writing vs photo essay) with collapsible topic filter.

### Files to Modify
- `_layouts/writing.html` - Add visual key and content type indicators
- `_sass/_writing.scss` - Style indicators and key
- `_pages/writing.md` - Update front matter if needed

### Implementation Details

**Visual Key (top of page):**
```
[~] Writing  [•] Photo Essay    [Filter by topics ↓]
```

**Entry format:**
```
~ 2025 · 03    The stone stairs of practice
• 2025 · 02    Night wandering, Melbourne
~ 2025 · 01    On grief and gardening
```

**Specifications:**
- Indicator character: `~` for writing, `•` for photo essay
- Color: `var(--color-meta)`
- Spacing: Small gap after indicator (0.5rem)
- Key appears above entry list, styled with meta color
- Minimal, unobtrusive treatment

### Success Criteria
- [ ] Visual key visible at top of Writing page
- [ ] Each entry shows appropriate indicator
- [ ] Indicators don't dominate visual hierarchy
- [ ] Maintains chronological ordering
- [ ] Works on mobile breakpoints

### Estimated Effort
2-3 hours

---

## Sub-Project 2: Collapsible Topic Filter UI

### Objective
Make topic filters collapsible to reduce visual noise, showing all options when expanded (no "more →" truncation).

### Files to Modify
- `_layouts/writing.html` - Update filter HTML structure
- `_sass/_writing.scss` - Add dropdown animation styles
- Existing JavaScript filter code - Add collapse/expand behavior

### Implementation Details

**Default state:**
```
[Filter by topics ↓]
```

**Expanded state:**
```
[Filter by topics ↑]

all • attention • counselling • creativity • grief • groups • meditation •
presence • suffering • technology • therapy
```

**Specifications:**
- Smooth dropdown animation (200ms ease)
- Stays within page padding (doesn't break layout)
- "Snakes back up" when collapsed
- Arrow changes direction (↓ collapsed, ↑ expanded)
- All topics visible when expanded (remove "more →" logic)
- Filters remain inline, comma-separated
- Maintains existing filter functionality

### Success Criteria
- [ ] Filter button toggles expand/collapse
- [ ] Smooth animation in both directions
- [ ] All topics visible when expanded
- [ ] Layout stays within page boundaries
- [ ] Filter functionality still works
- [ ] Mobile-friendly behavior

### Estimated Effort
3-4 hours

---

## Sub-Project 3: Photo Essay Detail Template

### Objective
Create new layout template for photo essay entries with film strip/horizontal scroll metaphor.

### Files to Create/Modify
- `_layouts/photo-essay.html` - New template for photo essays
- `_sass/_photo-essay.scss` - Styles for photo essay layout
- Front matter in photo essay markdown files - Add `layout: photo-essay`

### Implementation Details

**Layout structure:**
```
[Title within padding]
[Optional intro text within padding]
[Image strip breaking container - horizontal scroll]
[Optional closing text within padding]
```

**Specifications:**
- Title and text content respect standard page padding
- Images break beyond text container boundaries
- Horizontal scroll or click-through navigation (choose one approach)
- Images sized to fill viewport height or consistent dimensions
- "Film strip unrolling" visual effect
- Maintains site color scheme and typography
- First-person, conversational tone in text sections

**Technical approach options:**
1. CSS `overflow-x: scroll` with horizontal flex container
2. JavaScript carousel/slider (click/arrow navigation)
3. Hybrid: scroll on desktop, swipe on mobile

### Success Criteria
- [ ] New layout template created
- [ ] Images extend beyond text container visually
- [ ] Navigation method implemented (scroll or click)
- [ ] Text sections maintain standard padding
- [ ] Responsive on mobile devices
- [ ] Tested with sample photo series

### Estimated Effort
5-6 hours (including testing)

---

## Sub-Project 4: Writing Icon Generation System

### Objective
Create system for generating unique icons or visual elements for text-based writing entries.

### Files to Create
- `docs/Resources/icon-generation-prompt.md` - Prompt template for generating icons
- Icon files or generation workflow documentation

### Implementation Details

**Approach options to explore:**
1. AI-generated abstract icons based on title/content
2. Programmatic SVG generation with consistent style
3. Color field/gradient system based on topic tags
4. Manual icon creation workflow with consistent aesthetic

**Specifications:**
- Subtle, not dominant
- Consistent with site color palette
- Scalable system (works for future entries)
- Low-maintenance workflow
- Optional single header image for writing entries

### Success Criteria
- [ ] Prompt template or workflow documented
- [ ] Test icons created for 3-5 entries
- [ ] Integration method decided (header, inline, etc.)
- [ ] Maintainable for future content

### Estimated Effort
4-5 hours (research and testing)

### Status
**Lower priority** - Can be implemented after core visual distinctions are in place.

---

## Sub-Project 5: Visual Polish Pass

### Objective
Ensure Writing and Projects pages have consistent polish while maintaining distinct "multiplicity vs singularity" signifiers.

### Files to Review/Refine
- `_sass/_writing.scss` - Density, spacing, hover states
- `_sass/_projects.scss` - Spacing, borders, editorial feel
- Both layout files - Consistency check

### Implementation Details

**Writing page refinements:**
- Confirm tight vertical rhythm (0.35rem padding)
- Ensure seamless flow (no borders)
- Test hover fade (70% opacity)
- Verify scannable density

**Projects page refinements:**
- Confirm generous spacing (var(--space-md) padding)
- Maintain clear borders between entries
- Test hover background lift
- Verify editorial, spacious feel

**Both pages:**
- Polish level identical
- Unconscious signifiers work as intended
- Mobile behavior consistent
- Color palette adherence

### Success Criteria
- [ ] Side-by-side comparison confirms distinct feel
- [ ] Both pages feel equally polished
- [ ] Density difference noticeable but not jarring
- [ ] Hover states appropriate to context
- [ ] No visual bugs or inconsistencies

### Estimated Effort
2-3 hours

---

## Sub-Project 6: Projects Photography Filter

### Objective
Add photography filter/tag to Projects page for Max Milne Photography work.

### Files to Modify
- Project markdown files - Add `photography` tag
- `_layouts/projects.html` - Ensure filter includes photography
- Front matter for Max Milne Photography projects

### Implementation Details

**Projects to tag:**
- Max Milne Photography (various years)
- Any other photography-focused professional work

**Filter button:**
- Add "Photography" to existing filter set
- Capitalized, pill-style (matches existing)
- Maintains existing filter JavaScript

### Success Criteria
- [ ] Photography filter button appears
- [ ] Correct projects show when filtered
- [ ] Maintains existing filter behavior
- [ ] All Max Milne Photography projects tagged

### Estimated Effort
1-2 hours

---

## Implementation Order Recommendation

### Phase 1: Foundation (Start Here)
1. **Sub-Project 1** - Content type indicators
2. **Sub-Project 2** - Collapsible filters
3. **Sub-Project 6** - Photography filter (quick win)

**Rationale:** Establishes basic visual distinctions without major template work. Can see immediate results.

### Phase 2: Template Work
4. **Sub-Project 3** - Photo essay template (requires test content)
5. **Sub-Project 5** - Visual polish pass

**Rationale:** Template work requires more testing. Polish pass happens after major changes are in place.

### Phase 3: Enhancement (Optional)
6. **Sub-Project 4** - Icon generation system

**Rationale:** Nice-to-have, not essential for core distinction. Can be added later.

---

## Testing Checklist (All Sub-Projects)

After each implementation:
- [ ] Desktop view (>1200px)
- [ ] Tablet view (768px-1200px)
- [ ] Mobile view (<768px)
- [ ] Hover states work appropriately
- [ ] JavaScript filtering still functional
- [ ] No console errors
- [ ] Build completes without warnings
- [ ] Deployed version matches local

---

## Documentation Update Trigger

**When all sub-projects are complete:**
1. Update `docs/VISION.md` with implemented Writing vs Projects philosophy
2. Update `docs/STYLE_GUIDE.md` with finalized visual distinction specifications
3. Create final log entry documenting implementation results
4. Archive this planning document to `docs/Archive/`

---

## Notes & Decisions Log

*Add notes here as implementation progresses*

**Date** | **Decision** | **Rationale**
---------|-------------|-------------
2025-11-07 | Use typographic marks (~ and •) for indicators | More elegant than emojis or icons, fits site aesthetic
2025-11-07 | All topics visible when filter expanded | Better UX than "more →" truncation, respects attention economy
2025-11-07 | Photo essays live in Writing section, not separate | Maintains two-section navigation simplicity

---

## Open Questions

- [ ] Photo essay scroll direction preference? (Horizontal continuous vs click-through)
- [ ] Icon generation approach? (AI vs programmatic vs manual)
- [ ] Evolution path implementation? ("This note became X" - nice-to-have or core feature?)

---

**Related Documents:**
- Design philosophy: `docs/LOG/2025-11-07-writing-projects-aesthetic-philosophy.md`
- Current vision: `docs/VISION.md`
- Current style guide: `docs/STYLE_GUIDE.md`
