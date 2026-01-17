---
title: Photo essay — film strip layout implementation
layout: note
---

# Entry 011: Photo essay film strip layout (2025-11-10)

Status: canonical reference for current implementation.

This log documents the implemented photo essay "film strip" layout used by
`layout: photo-essay` (for example: `_notes/Test Photo Essay - Studio Brunswick.md`).

It describes the source of truth for how authoring, layout partitioning, and gallery
behavior work as of 2025-11-10.

---

## 1. Authoring model

Applies to any note with:

```yaml
layout: photo-essay
```

Example: `_notes/Test Photo Essay - Studio Brunswick.md`.

### 1.1 Front matter

Use only the standard fields:

- `title` — page title.
- `layout: photo-essay`
- `date` — rendered as `Month YYYY`.
- `tags` — used by writing/projects/tag systems.
- `excerpt` — where needed by listings.

Do NOT use `intro` or `closing` front matter for this layout. Narrative is authored
entirely in the Markdown body.

### 1.2 Body structure

Write a single continuous Markdown body. The layout infers sections based on where
images appear:

- Intro narrative:
  - All paragraphs (and other non-image blocks) that appear before the first image.
- Film strip:
  - A contiguous run starting from the first image-containing block through the
    last image-containing block.
  - Includes:
    - All images in that range (standard Markdown images or Obsidian-style embeds
      once rendered to `<img>`).
    - Any narrative tiles/blocks that sit between those images (e.g. `.photo-strip-text`
      or paragraphs that you intentionally position inline with the strip).
- Closing narrative:
  - All paragraphs (and other non-image blocks) that appear after the final image.

Guiding rules:

- Author normally as:
  - Intro paragraphs
  - A sequence of images (optionally with inline narrative tiles between them)
  - Closing paragraphs
- Do not rely on special gallery syntax or custom front matter to define the strip.
- No Jekyll gallery plugin is used; everything is implemented via
  `_layouts/photo-essay.html` and `_sass/_photo-essay.scss`.

---

## 2. Layout structure and partitioning

Source: [`_layouts/photo-essay.html`](../_layouts/photo-essay.html)

High-level structure:

- `article.photo-essay`
  - `.photo-essay-header`
    - `<h1>` (title)
    - `<time>` from `page.date` (if present)
    - `.photo-essay-intro` — rendered intro narrative (if any)
  - `.photo-strip-container`
    - `.photo-strip#photoStrip`
      - rendered film strip content (images + inline narrative tiles)
  - `.photo-essay-closing` — rendered closing narrative (if any)
  - `.photo-lightbox#photoLightbox`
    - fullscreen overlay for strip images (prev/next arrows, close button)

### 2.1 Partitioning algorithm

Implementation summary (see layout source for exact Liquid):

1. Start from `{{ content }}` rendered to HTML.
2. Split into `blocks` by closing paragraph tags:
   - `blocks = content | split: '</p>'`
3. First pass:
   - Scan all blocks and record `last_image_index`:
     - last index where `block` (after trimming) contains `<img `.
4. Second pass:
   - If `last_image_index == -1`:
     - No images:
       - `intro_html = content`
       - `strip_html = ''`
       - `closing_html = ''`
   - Else:
     - Iterate blocks again:
       - Ignore empty blocks.
       - For indices `<= last_image_index`:
         - Before the first image:
           - Non-image blocks → appended to `intro_html`.
           - First image block encountered:
             - Switch state to `strip`.
             - Append this and subsequent blocks up to `last_image_index`
               to `strip_html` (including any inline narrative tiles).
         - For indices `> last_image_index`:
           - Append to `closing_html`.
5. Render:
   - If `intro_html` present:
     - Wrap in `<div class="photo-essay-intro">...</div>` above the strip.
   - Always render film strip container:
     - `<div class="photo-strip-container"><div class="photo-strip" id="photoStrip">{{ strip_html }}</div></div>`
   - If `closing_html` present:
     - Wrap in `<div class="photo-essay-closing">...</div>` below the strip.

Notes:

- Only proper Liquid comments are used (`{%- comment -%} ... {%- endcomment -%}`).
  There are no `{# ... #}`-style comments leaking into output HTML.
- The partitioning is deterministic: intro and closing are purely positional
  relative to first/last images.
- This document is the canonical description of that behavior.

Javascript (inline in this layout):

- Collects all images inside `#photoStrip`.
- Assigns `data-index` to each.
- Handles:
  - Click-to-open lightbox.
  - Prev/next arrows inside lightbox.
  - Esc / ArrowLeft / ArrowRight keyboard support.
  - When lightbox is closed:
    - Left/right arrow keys scroll the horizontal strip smoothly by a fixed amount.
- Hides scroll hint after the user scrolls horizontally.

---

## 3. Gallery behavior (lightbox and scope)

The gallery/lightbox is intentionally scoped only to the film strip.

- Image source:
  - The JavaScript selects images strictly inside `#photoStrip`.
  - Each image in the strip receives a `data-index` used for navigation.
- Lightbox:
  - Overlay element: `.photo-lightbox#photoLightbox`.
  - When a strip image is clicked:
    - Opens the lightbox.
    - Uses either `data-full-src` (if present) or the image `src`.
    - Supports prev/next arrows and keyboard navigation.
- Navigation:
  - While lightbox is open:
    - `ArrowLeft` / `ArrowRight` cycle images.
    - `Esc` closes the lightbox.
    - On mobile, tapping the image can advance.
  - While lightbox is closed:
    - `ArrowLeft` / `ArrowRight` scroll the strip horizontally
      between frames using scroll-snap.

Critical constraints:

- Only images contained within `#photoStrip` participate in the gallery.
- Any images that might appear in intro or closing narrative (outside `#photoStrip`)
  are ignored by the lightbox logic.
- Narrative tiles within the strip (e.g. `.photo-strip-text`) do not become slides
  unless they intentionally contain an `<img>`.

For detailed CSS behavior (including strip alignment, frame styling, and lightbox
visuals), see `_sass/_photo-essay.scss`.

---

## 4. Visual behavior (film strip)

Source: [`_sass/_photo-essay.scss`](../_sass/_photo-essay.scss)

High-level behavior:

- `.photo-strip-container`
  - Full-bleed band:
    - `width: 100vw;`
    - `margin-left: calc(-50vw + 50%);`
  - Vertical padding tuned separately for desktop/mobile.

- `.photo-strip`
  - `display: flex;`
  - Horizontal scrolling:
    - `overflow-x: auto;`
    - `overflow-y: hidden;`
    - `scroll-snap-type: x mandatory;`
    - `scroll-behavior: smooth;`
    - `-webkit-overflow-scrolling: touch;`
  - Alignment:
    - `align-items: center;`
    - `overscroll-behavior-x: contain;`
  - Scrollbar hidden visually (keeps behavior).
  - Padding/gap:
    - Desktop: `padding: 0 2rem; gap: var(--space-md);`
    - Mobile: `padding: 0 var(--space-lg); gap: var(--space-lg);`

### 3.1 Frames (markdown wrappers)

To normalize how markdown renders:

- `.photo-strip p` and `.photo-strip figure`:
  - `margin: 0; padding: 0;`
  - `display: flex;`
  - `align-items: center; justify-content: center;`
  - `flex-shrink: 0;`
  - `scroll-snap-align: center;`

This makes each markdown-generated block a consistent "frame" in the film strip.

For dedicated narrative frames we can optionally use:

- `.photo-strip-text`
  - Styled as an inline italicized text tile.
  - Currently available but not yet used in the test essay.

### 3.2 Images

- `.photo-strip img`:

  - Base:
    - `display: block;`
    - `flex-shrink: 0;`
    - `object-fit: contain;`
    - `cursor: zoom-in;`
    - `background: var(--color-deep);`
    - `margin: var(--space-sm);`
    - Soft box shadow + border radius.
    - `scroll-snap-align: center;`

  - Desktop:
    - `height: 600px;`
    - `max-width: 900px;`
  - Mobile:
    - `height: 260px;`
    - `max-width: 90vw;`

Outcome:

- All images share a fixed band height → no overlapping.
- Landscapes and portraits both appear as framed tiles in a continuous strip.

### 3.3 First/last alignment

Current implementation:

- Uses `::before` and `::after` spacers on `.photo-strip` (desktop only) to pad the
  start and end of the strip.
- Goal: visually center the first frame like the opening cell of a film roll, and
  prevent the last frame from feeling cut off.
- This is intentionally simple and may be refined further (e.g. measuring the actual
  first image width in JS).

This centering behavior is part of the current implementation and may be refined,
but any changes MUST be reflected here.

---

## 5. Lightbox behavior

Overlay: `.photo-lightbox` in [`_sass/_photo-essay.scss`](../_sass/_photo-essay.scss:214)

Key properties:

- Fullscreen fixed overlay, dark translucent background.
- Initially:
  - `display: none;`
  - `opacity: 0;`
- `.photo-lightbox.is-active`:
  - `display: flex;`
  - `opacity: 1;`
  - Smooth fade via `transition: opacity 220ms ease-out;`
- Centered content via `.photo-lightbox-inner`.

Image animation:

- `.photo-lightbox img`:
  - `max-width: 100%; max-height: 100%;`
  - `object-fit: contain;`
  - Subtle entrance:
    - Base: `opacity: 0; transform: scale(0.985);`
    - Transitions on opacity and transform (220ms).
- `.photo-lightbox.is-active img`:
  - `opacity: 1; transform: scale(1);`

Navigation:

- Click strip image → open corresponding frame.
- Arrows:
  - `.photo-lightbox-arrow--prev` / `--next` cycle through images.
- Keyboard:
  - In lightbox:
    - `Esc` closes.
    - Left/right arrows move prev/next.
- On mobile:
  - Image itself is tappable to advance (when lightbox is open).

---

## 6. Implementation notes and future refinements

Key implementation notes:

- Partitioning:
  - Intro / strip / closing are derived from `{{ content }}` only, based on image
    positions. Front matter `intro`/`closing` is not used.
- Scope:
  - Gallery behavior is fully local to this layout and `_sass/_photo-essay.scss`.
  - No third-party gallery plugin is involved.
- Comments:
  - Only proper Liquid comments are used in `_layouts/photo-essay.html`.
  - No `{# ... #}` comment syntax is present, preventing accidental HTML leakage.

When revisiting this system:

- Update this LOG entry first to keep it as the single source of truth.
- Keep TECHNICAL docs minimal and point them back here for full behavior.

---

## 5. Things deliberately NOT done (yet)

Documented to prevent drift:

- No third-party Jekyll gallery plugin.
  - All behavior is custom and transparent in this repo.
- No nested front matter DSL for images.
  - Images are authored directly in markdown body as standard image syntax
    (or via the existing Obsidian embed pipeline).
- No complex autoplay or auto-scroll.
  - User controls pacing via scroll/keys; aligns with "contemplative" design goals.
- First-image perfect centering is not yet computed via JS.
  - Current approach uses CSS spacers; future iteration may:
    - Measure the first frame width.
    - Scroll so its center aligns exactly to viewport center on load.

---

## 6. Future refinement notes

When we revisit:

1. First frame centering (film leader metaphor)
   - Replace heuristic `::before` width with a one-time JS measurement.
   - Ensure behavior is robust for:
     - Different image sizes/aspect ratios.
     - Very wide/very narrow viewports.

2. Inline narrative frames
   - Decide on recommended pattern:
     - either `.photo-strip-text` blocks
     - or explicit figure/caption styling within `.photo-strip`.

3. Multiple essays
   - Confirm that the layout generalizes cleanly to other notes with:
     - mixed portrait/landscape images,
     - occasional narrative tiles,
     - and different intro/closing structures.

This log is the canonical reference for the photo-essay film strip implementation
as of 2025-11-10. Update here first when the system changes.