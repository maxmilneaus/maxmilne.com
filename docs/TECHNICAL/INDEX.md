# Technical Index

Current technical map for the Astro implementation.

Last updated: 2026-03-14

## Quick reference

| Topic | File | What it covers |
| --- | --- | --- |
| Architecture overview | `docs/TECHNICAL/INDEX.md` | Current source of truth |
| Repo cleanup log | `docs/LOG/2026-03-14-astro-cleanup-and-docs-reset.md` | Why the repo is Astro-first and what was retired |
| Filter behavior | `docs/TECHNICAL/filter-system.md` | Writing and project filtering |
| Motion visuals | `docs/TECHNICAL/motion-visuals.md` | Generated note visuals |
| Footnote previews | `docs/LOG/2026-01-28-footnote-hover-preview.md` | Hover and focus tooltip behavior |
| Design intent | `docs/VISION.md` | Why the site feels the way it does |
| Visual language | `docs/STYLE_GUIDE.md` | Active palette, typography, spacing, and UI patterns |

## Active architecture

The site is a static Astro app.

- Astro routes live in `src/pages/`
- Markdown content collections live in `src/content/`
- Shared chrome lives in `src/layouts/` and `src/components/`
- Styles live in `src/styles/`
- Lightweight client-side behavior lives in `src/scripts/`
- Published media lives in `public/assets/`
- Static passthrough files live in `public/`
- `studiobrunswick/` is a preserved static subsite

Anything that still talks about `_notes`, `_projects`, `_layouts`, `_plugins`, `_site`, Ruby, or Jekyll belongs to the old implementation unless explicitly marked as historical.

## Route map

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/about/` | `src/pages/about.md` |
| `/now/` | `src/pages/now.md` |
| `/cv/` | `src/pages/cv.md` |
| `/booking/` | `src/pages/booking.md` |
| `/topics/` | `src/pages/topics.md` |
| `/the-hidden-track/` | `src/pages/the-hidden-track.md` |
| `/writing/` | `src/pages/writing/index.astro` |
| `/projects/` | `src/pages/projects/index.astro` |
| `/:slug/` | `src/pages/[...slug].astro` |
| `/projects/:slug/` | `src/pages/projects/[slug].astro` |

## Content model

Collections are defined in `src/content/config.ts`.

Notes:
- Folder: `src/content/notes/`
- Fields: `title`, `date`, `tags`, `excerpt`, `permalink`, `motionTheme`
- Route handler: `src/pages/[...slug].astro`

Projects:
- Folder: `src/content/projects/`
- Fields: `title`, `year`, `description`, `order`, `tags`
- Route handler: `src/pages/projects/[slug].astro`

## Shared layout layer

- `src/layouts/BaseLayout.astro` sets metadata, canonical URL, nav, footer, and global styles
- `src/layouts/PageLayout.astro` wraps content-style pages
- `src/site.ts` contains site-level metadata
- `src/components/Enhancements.astro` mounts progressive enhancements

## Styling system

The Sass entrypoint is `src/styles/main.scss`.

Key partials:
- `src/styles/_style.scss` base layout, typography, variables, components
- `src/styles/_projects.scss` projects list and filter visuals
- `src/styles/_writing.scss` writing list and filter visuals
- `src/styles/_photo-essay.scss` photo essay presentation
- `src/styles/_animations.scss` motion accents
- `src/styles/_code.scss` code block styling
- `src/styles/_normalize.scss` baseline resets

There are also two legacy photo-essay partials kept as references but not imported by the main stylesheet:
- `src/styles/_photo-essay-flow.scss`
- `src/styles/_photo-essay-sequence.scss`

## Interactive behavior

The site uses minimal inline JavaScript and a couple of small helper scripts.

- Writing filters: `src/pages/writing/index.astro`
- Project filters: `src/pages/projects/index.astro`
- Mobile nav toggle: `src/components/Nav.astro`
- Reading progress bar: `src/scripts/reading-progress.js`
- Footnote hover previews: `src/scripts/footnote-preview.js`

These behaviors are progressive enhancements. The core content still renders without them.

## Assets and static files

- `public/assets/` holds media referenced by notes, projects, and page content
- `public/` is for files Astro should copy through unchanged
- `studiobrunswick/` is exposed as `/studiobrunswick/`

## Build and deploy

Local development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

Production deployment:
- Host: Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Canonical site URL: `https://maxmilne.com` via `astro.config.mjs`

## Motion visuals

Motion visual generation is handled by:

- Script: `scripts/generate-motion-visuals.mjs`
- Docs: `docs/TECHNICAL/motion-visuals.md`

## Working rules

- Treat the Astro source tree as truth
- Do not edit `dist/`
- Treat `docs/Archive/` as historical only
- Treat `*.edtz` files as editor temp artifacts
- Read `docs/LOG/2026-03-14-astro-cleanup-and-docs-reset.md` before following older implementation notes
- Older `docs/LOG/` entries may describe the migration era; verify against current source before acting
