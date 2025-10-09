---
title: Style Vision — Rhythm, Media Intent, Topic Trails
owner: max
status: proposal
updated: 2025-08-31
---

# Style Vision (Prototype Summary)

Purpose: distill the high‑level design moves demonstrated in the style prototype page (`/style-prototype/`) so another LLM or contributor can review and iterate without touching production pages.

## Goals

- Invisible interface: content feels human and effortless; UI recedes.
- Iterative craft: small, reversible steps; no sweeping rewrites.
- Consistency: one rhythm system; one media system; one link language.

## Three Big Moves

1) Rhythm System (Bold rhythm, quiet density)
- One measure: keep reading width at ~60–70ch.
- Vertical cadence: shared spacing scale (xs → xl) applied site‑wide.
- Type hierarchy: H1/H2/H3 + body + meta; reduce heavy bold; slightly tightened tracking for headings.
- Meta voice: dates, breadcrumbs, captions in “meta gray”; body in cream; meta never competes with content.

2) Intentional Media Widths (Three widths rule)
- Inline (default): media sits inside the text column; used sparingly, near its reference.
- Page‑plus (primary): wider than text to give a key image emphasis; single‑line caption beneath.
- Full‑bleed (rare): edge‑to‑edge used as a transitional anchor between sections.
- Aspect discipline: prefer 16:9 landscape, 3:4 portraits, 1:1 thumbs to avoid ratio soup.

3) Topic Trails (Light guidance, no heavy nav)
- Breadcrumbs: “Topics / {Tag or Section}” near H1, small and subdued.
- Continue with…: a short set (2–3) of curated or tag‑based links at page end.
- Links: single underline style and one hover color; external links get ↗ consistently.

## Authoring Patterns (today)

- Local images: use Obsidian embeds with modifiers → plugin emits `<img>`
  - Page‑plus: `![[path|page]]` or `![[path|page-plus]]`
  - Full‑bleed: `![[path|full]]` or `![[path|full-bleed]]`
- External images: use Markdown `![]()` or HTML `<img>` (add `class="page-plus"` or `full-bleed` if needed).
- Video: paste raw YouTube/Vimeo iframes (privacy‑friendly URLs) per Technical Guide.
- Audio: `![[file.mp3|title=...]]` converts to HTML5 `<audio>` automatically.

## Implementation Sketch (incremental)

CSS (already present or trivial additions)
- Images: `img.page-plus` and `img.full-bleed` classes exist in `styles.scss`.
- Add optional wrappers for captions using `<figure><img/><figcaption/></figure>` with minimal defaults.
- Keep spacing tokens consistent across headings, lists, media, captions.

Templates
- Breadcrumbs: ensure small “Topics / …” near the H1 on project/note layouts.
- “Continue with…”: add an include that renders 2–3 links (curated front matter or tag‑based fallback).

Behavior
- Respect existing design tokens (colors, spacing) and keep typography weight modest.
- Limit motion: one easing, two durations (120ms fast, 240ms calm) for hover/focus/expand only.

## Current Support (as of this doc)

- Image embeds: Obsidian plugin maps tokens to classes (page‑plus, full‑bleed). CSS for these is live.
- Video: raw iframes recommended; Technical Guide documents privacy‑friendly snippets.
- Audio: Obsidian `![[…mp3]]` converted to `<audio>` via plugin; restart Jekyll when adding plugins.

## Rollout Plan (safe, reversible)

1. Stabilize spacing rhythm in `styles.scss` (no layout changes; just unify gaps).
2. Add “Continue with…” include and wire into `project.html` (visible but low risk).
3. Normalize breadcrumbs style across notes/projects (small, meta‑tone).
4. Optional: enable figure captions where present; otherwise no visual change.

## Acceptance Criteria

- All media renders in one of three sizes with predictable spacing.
- Breadcrumbs present, subtle, and consistent across layouts.
- End‑of‑page trails appear and never feel spammy (≤3 links, clear labels).
- No regressions to existing note/project content.

## Non‑Goals

- No typography overhaul (keep current fonts and base sizes).
- No JS‑heavy components; prefer pure CSS for layout and motion.

## Open Questions

- Curated vs. automatic “Continue with…”: do we prefer manual selection (front matter) or tag‑based suggestions (auto)?
- Should external images support a shorthand for page‑plus/full‑bleed (via a helper include), or keep HTML class usage?

## Reference

- Prototype page: `/style-prototype/` (inline styles; isolated from site CSS)
- Technical Guide: Video and Audio embed sections for authoring details
