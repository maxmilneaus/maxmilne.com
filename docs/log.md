---
title: Log
layout: note
---

## Jekyll Setup Issues - 2025-07-07

**Problem**: Terminal crashes when running `jekyll serve` or `bundle exec jekyll serve`

**Root Cause**: Ruby version incompatibility
- System was using Ruby 2.6.10 (macOS default)
- Jekyll 4.4 requires Ruby >= 3.0
- rbenv was installed but not properly activated in shell

**Solution Steps**:
1. Install rbenv: `brew install rbenv`
2. Install Ruby 3.2.2: `rbenv install 3.2.2`
3. Set global Ruby version: `rbenv global 3.2.2`
4. **Critical**: Activate rbenv in shell:
   ```bash
   echo 'eval "$(rbenv init -)"' >> ~/.zshrc
   source ~/.zshrc
   # OR restart terminal completely
   ```
5. Verify Ruby version: `ruby -v` (should show 3.2.2)
6. Install gems: `bundle install`
7. Run Jekyll: `bundle exec jekyll serve`

**Key Learning**: rbenv must be properly initialized in shell profile for Ruby version switching to work.

## CSS Alignment Issue Fix - 2025-08-30

**Problem**: Page alignment inconsistency between `/about` and `/now` pages

**Root Cause**: CSS inheritance issue in `_sass/_style.scss`
- Blanket rule `ul { @extend .article-list; }` was applying grid layout styling to ALL `<ul>` elements site-wide
- This caused unintended grid styling (`display: grid`, `grid-template-columns: auto auto 1fr`) on any page with lists
- `/about` page had a `<ul>` list that got grid treatment, creating preferred alignment
- `/now` page had no `<ul>`, so used standard paragraph styling without grid layout

**Solution**:
Made CSS rule more specific to target only intended lists:
```scss
/* Changed from blanket rule affecting all ul elements */
ul { @extend .article-list; }

/* To specific rule targeting only writing section lists */
.writing-section ul { @extend .article-list; }
```

**Impact**: Prevents unintended grid styling from affecting lists across the site while maintaining proper article list formatting where intended.

**Technical Details**: The `.article-list` class includes grid styling meant for article listings, not general content lists. The fix ensures this styling only applies to appropriate contexts.

## Obsidian Embeds + Two-up Layout - 2025-08-30

Summary: Implemented robust Obsidian image embed conversion and added authoring-friendly two-up portrait layout that renders in Obsidian and Jekyll.

- Plugin: `_plugins/obsidian_image_embeds.rb`
  - Converts `![[...]]` to `<img ...>` with:
    - width/height: `200` or `320x200`
    - alt: free text or `alt=...`
    - classes: `class=...`
    - alignment: `left|center|right` or `align=...` → `align-*` classes
    - title: `title=...`
  - URL handling: improved percent-encoding for spaces and special chars.
  - HTML safety: escapes `src`, `alt`, `title` attributes.
  - Base URL: always prefixes with `site.baseurl` and leading `/` to avoid relative-path 404s.

- Styles: `styles.scss`
  - `img.align-left/right/center` helpers for float/centering.
  - `.two-up` CSS grid for side-by-side portraits; responsive stack on small screens.
  - `.two-up.equal` uses `aspect-ratio: 3/4` + `object-fit: cover` for matched heights/cropping.

- Authoring Pattern (kept simple for Obsidian):
  - Use an HTML wrapper that previews in Obsidian and converts in Jekyll:
    - `<div class="two-up"> ![[left.jpg]] ![[right.jpg]] </div>`
    - Optional: `<div class="two-up equal"> ... </div>`
  - Removed fenced-block (```two-up) support to avoid confusion in Obsidian where code fences render as code.

- Docs: `docs/TECHNICAL_GUIDE.md`
  - Documented embed modifiers, alignment, and the two-up workflow with examples.

- Verification:
  - Built and inspected `_site` output; verified converted `<img>` tags and attributes.
  - Used Playwright to check pages (`/about`, `/projects/studio-brunswick/`, `/projects/max-milne-photography/`), confirming:
    - Absolute asset paths under `/assets/...`
    - Width/alt present where specified
    - Two-up grid renders correctly when using the div wrapper

Notes:
- Added an optional Obsidian CSS snippet for Preview parity. Copy `docs/obsidian-two-up.css` to your vault as `.obsidian/snippets/two-up.css`, then enable it in Settings → Appearance → CSS snippets.

## Image Embeds — Final polish and cheatsheet - 2025-08-30

Outcome: Standardized image options, added Page‑plus (wider than text column), kept Full‑bleed optional, and published a clean cheatsheet with one‑line “mega” snippets. Also added support for `loading=` override and ensured code fences show raw snippets.

- Plugin updates (`_plugins/obsidian_image_embeds.rb`):
  - New token: `page|page+|page-plus|container` → adds `page-plus` class (wider than text column).
  - Optional tokens preserved: `full|fullwidth|full-bleed` → `full-bleed` class.
  - Removed: “wide-crop/cinematic” variant to avoid confusion.
  - New modifier: `loading=eager|lazy` (or tokens `eager|lazy`) — default remains `lazy`.
  - Shield fenced code blocks so `![[...]]` inside ```code fences are not converted.

- Styles (`styles.scss` + `_sass/_style.scss`):
  - `img.page-plus`: width `min(80vw, 72rem)`, centered; ignores global `max-height` cap for correct aspect.
  - `pre` blocks: allow long one‑line snippets to wrap (`pre-wrap`, `overflow-wrap:anywhere`).

- Cheatsheet (`_notes/Image Embeds Cheatsheet.md`):
  - Rewritten with three “mega” snippets: Standard, Page‑plus, Two‑up (with `equal`).
  - Each section shows the copy line and a rendered example.

- Docs (`docs/TECHNICAL_GUIDE.md`):
  - Updated modifier list and examples (Page‑plus added, wide‑crop removed).

Usage quick refs:
- Standard: `![[path|alt=...|320x200|right|class=...|title=...|loading=eager]]`
- Page‑plus: `![[path|page|alt=...|class=...|title=...|loading=eager]]`
- Two‑up: `<div class="two-up equal"> ![[left|alt=...]] ![[right|alt=...]] </div>` (remove `equal` for natural heights)

## Projects — Title/Year Spacing + Date Size + Empty Status Fix - 2025-08-30

Outcome: Standardized spacing and typography for individual project pages and removed a stray UI artifact.

- Spacing: Added two line-breaks worth of space between the project title and the year across all project pages.
  - CSS: `.project-meta { margin: calc(2 * 1em * var(--line-height)) 0 var(--space-lg) 0; }`
  - Rationale: Ensures clear visual separation and consistent rhythm site‑wide.

- Date size (detail pages only): Increased project year size for better readability under the title.
  - CSS: `.project-meta .project-year { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; }`
  - Scope: Only applies on individual project pages; project listing keeps its own smaller year styling.

- Empty status pill: Removed the small grey bubble when no `status` is set.
  - Template: `_layouts/project.html` now renders `.project-status` only when `page.status` exists.

- Notes date sizing (consistency): Slightly increased the `time` element under note titles to improve hierarchy.
  - CSS: `time { font-size: 1.1rem; margin: var(--space-xs) 0 var(--space-lg); letter-spacing: -0.01em; }`

Verification: Reloaded `/projects/max-milne-photography/` locally; confirmed increased gap, larger year text, and no empty status bubble. Project index unaffected.

## Video Embeds — Simplified to raw iframes - 2025-08-31

Decision: Removed the experimental video embed plugin and CSS helpers. Standardized on pasting raw YouTube/Vimeo iframes directly in notes. This renders in Obsidian and on the site without extra processing.

- Why: Fewer moving parts; Obsidian shows iframes in Reading/Live Preview; Jekyll outputs them unchanged.
- Recommended patterns:
  - YouTube (privacy-friendly): `https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&start=65`
  - Vimeo with Do Not Track: `https://player.vimeo.com/video/VIDEO_ID?dnt=1`
  - Add `title`, `loading="lazy"`, `referrerpolicy="strict-origin-when-cross-origin"`, and `allowfullscreen`.
- Responsive option: Use a simple inline wrapper with a 16:9 padding box when needed.

No changes required to the existing image embed plugin; it only transforms `![[...]]` and won’t touch raw `<iframe>` HTML.

## Audio Embeds — Obsidian `![[...]]` to HTML5 audio - 2025-08-31

Added `_plugins/obsidian_audio_embeds.rb` to convert `![[file.mp3]]`-style embeds into `<audio controls preload="metadata">` with a proper `<source type=...>` and a download fallback link.

- Defaults: assumes `assets/` when no folder is provided (place audio under `assets/` or use a full path).
- Modifiers: `title=...`, `preload=auto|metadata|none`, flags `autoplay|loop|muted|controls`, `class=...`.
- Image plugin now explicitly skips audio/video targets so it doesn't try to render them as images.

## Audio Embeds — Verified after server restart - 2025-08-31

Observed: On first load, the page showed `<img src="/assets/Breath.mp3" alt="Breath">` instead of an audio player.

Diagnosis: The running Jekyll server had not picked up the new audio plugin yet (and the image plugin hot-reload left old behavior in memory). A quick Playwright check of `/projects/long-story-short-radio-national-abc/` confirmed there were 0 `<audio>` elements and 2 `<img>`s with `src="/assets/Breath.mp3"`.

Fix: Restarted `bundle exec jekyll serve`. After restart, `![[Breath.mp3]]` renders as `<audio controls preload="metadata">` with proper `<source>` and a fallback link. Confirmed manually on the same page.

Notes:
- Place audio files under `assets/` (or a non-underscored folder) so Jekyll publishes them.
- Short form `![[Breath.mp3]]` resolves to `assets/Breath.mp3`; explicit `![[assets/Breath.mp3]]` is also fine.

## Projects — Date protocol + alignment - 2025-09-01

Outcome: Clean author-controlled date display on the Projects index and baseline-aligned year/title on the same line-height.

- Removed hardcoded long dash in listing template
  - Template: `_layouts/projects.html` no longer appends `—` after `{{ project.year }}`.
  - Rationale: Author controls punctuation and spacing directly in front matter.
  - Agreed: Dash protocol is user‑driven and rendered verbatim; we discussed and confirmed this approach.

- Date authoring protocol (front matter `year` value)
  - `2025 -` → started that year and ongoing
  - `2015 - 2020` → spanned those years
  - `2017` → started and finished that year

- Visual alignment (Projects index)
  - CSS: `_sass/_projects.scss` sets `.project-year { font-size: 1rem; line-height: 1; padding-top: 0; }`
  - Effect: Year and project title share the same baseline/line-height; no visual drop.

- Spacing between date and titles (Projects index)
  - Decision: Use grid column gap for clean, system-aligned spacing (Option A)
  - CSS: `.project-entry { row-gap: var(--space-sm); column-gap: var(--space-lg); }`
  - Rationale: Factor-based, minimal, preserves mobile single-column behavior.

- Notes
  - Underline rendering for links will be reviewed separately.
  - No automatic dash normalization is applied; en dash vs hyphen is author choice.

## Navigation + Assets + Projects Spacing - 2025-09-25

Summary: Small UX refinements — added Projects to top navigation, improved spacing on the Projects index, and simplified image paths for assets subfolders.

- Nav: Added a “Projects” item to the main menu linking to `/projects/`.
  - File: `_includes/nav.html`

- Projects page breathing room: Increased space around the heading and above the list only on the Projects index.
  - Files: `_layouts/projects.html` (wrapper `section.projects-page`), `_sass/_projects.scss`
  - Styles:
    - `.projects-page { padding-top: calc(var(--section-spacing) * 0.75); }`
    - `.projects-page > article { margin-bottom: var(--section-spacing); }`

- Assets subfolders (image embeds): You can now place images in any subfolder under `assets/` and reference them with a shorthand path relative to `assets/`.
  - Examples:
    - `![[Studio Brunswick/hero.jpg]]` → `/assets/Studio%20Brunswick/hero.jpg`
    - `![[projects/voice/cover.jpg]]` → `/assets/projects/voice/cover.jpg`
    - `![[assets/projects/voice/cover.jpg]]` still works unchanged
  - Change: `_plugins/obsidian_image_embeds.rb` — if a path includes a folder but doesn’t start with `assets/` or `/`, it’s resolved under `assets/`.
  - Notes: Spaces are percent‑encoded; subfolders may be freely organized.

Wide images standard (recap):
- Use `page-plus` for wider-than-text images (comfortable max width, centered).
- Use `full-bleed` for true edge-to-edge images across the viewport.
  - Implemented in `styles.scss` via `img.page-plus` and `img.full-bleed`.

## ASCII Petals — Style Guide + Palette - 2025-09-01

Outcome: Added a dedicated style guide page for ASCII animations with two color/presentation pairs, and simplified framing rules to match the site’s quiet aesthetic.

- New reference page: `docs/animations/ascii-petals-style-guide.html`
- Pairs included:
  - Plain — Cream: no frame/paper; bright cream/white glyphs on site background
  - Noir — Framed Cream: deep charcoal paper with 1px border; cream/white glyphs
  - Plain — Blue: no frame/paper; blue glyphs (`#3b82f6`→`#93c5fd` pulse)
  - Indigo — Framed Blue: indigo paper with 1px border; blue glyphs
- Simplifications (consistency with style system):
  - Removed all drop shadows, vignettes, and grain overlays
  - Framed variants now use only background color and a 1px border
  - Honors prefers-reduced-motion (static render)

Use: Treat the page as the canonical animation color palette and presentation reference moving forward.

## Legacy Studio Brunswick site — static integration - 2025-09-26

Outcome: Integrated a static copy of the 2020 Studio Brunswick Squarespace site under `studiobrunswick/` and restored its original typography feel.

- Placement: A standalone folder `studiobrunswick/` at repo root (copied verbatim by Jekyll). Do not use underscored folders.
- Typography: Added `studiobrunswick/overrides.css` to load Futura PT via Typekit URLs and normalize weights:
  - Body: 300
  - `.sqs-block-content h2`: 300
  - `.sqs-block-content h3`: 400
  - Footer contact line `#footerBlocksTop h2`: 300; its `<strong>` label: 600
  - `strong/b`: 500
- Wiring: Injected `<link rel="stylesheet" href="/studiobrunswick/overrides.css">` before `</head>` on all legacy pages so styles apply site‑wide.
- Icons: Added fallback sprite `assets/ui-icons.svg` to satisfy `<use xlink:href="/assets/ui-icons.svg#...">` references.
- Cleanup: Removed the temporary `studiobrunswick/Old/` folder.
- Notes: Squarespace analytics endpoints referenced by the legacy HTML may 404 locally; harmless and can be ignored or stripped if desired.

## Project Detail Descriptions - 2025-09-26

Outcome: Project detail pages now surface their short description directly under the title to reinforce context before the body copy.

- Template: `_layouts/project.html`
  - Renders `page.description` beneath the `<h1>` when present.
- Styles: `_sass/_projects.scss`
  - Added `.project-description-inline` using warm gray, 1.05rem size, and system spacing.
- Impact: Every project that already defines `description` (used on the index) now shows the same line on its detail page; no front matter changes required.
