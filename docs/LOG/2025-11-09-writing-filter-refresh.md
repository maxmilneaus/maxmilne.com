# Writing Filters: Inline Topic Stream Refresh

**Date:** 2025-11-09
**Status:** Implemented
**Context:** Writing page filters felt disconnected from the `/topics` page and still used the old pill/toggle UI from Projects.

---

## Summary

- Rebuilt the writing filter markup so “all” stands alone, followed by a comma-separated list of topics controlled by the same buttons used on `/topics`.
- Moved the styles into `_sass/_writing.scss` (the `_writing2.scss` fork is now redundant) and wired the JS to `.writing2-topic-trigger` so only the active topic gets the blue underline.
- Documented the system in `docs/TECHNICAL/filter-system.md` and added a standalone prototype page (`docs/Design Ideas/writing-filter-variations.html`) for future explorations.

## Why

- The projects-style pill bar implied a single “mode” of filters across the site and made Writing feel too similar to Projects, contradicting the Multiplicity vs. Singularity principle captured on 2025-11-07.
- Inline topics visually signal that Writing is a ledger of essays; the bullet separator keeps the mental model “All • (your current lens)”.
- Dropping the “more →” toggle reduces friction—every topic remains visible, just like `/topics`.

## What Changed

1. `_layouts/writing.html`: new topic row markup + simplified JS (buttons now share `.writing2-topic-trigger`).
2. `_sass/_writing.scss`: inline flex layout, bullet added via `::before`, hover/active state refinements, mobile stack tweak.
3. `docs/TECHNICAL/filter-system.md`: first pass at centralising filter documentation.

## Follow-ups

- Consider wiring the prototype variants into a Storybook-style gallery if we need to user-test different densities.
- Keep an eye on the Playwright harness—it refused to open `_site/writing/index.html` due to a Chromium lock; retry before shipping to production.
