# Max Milne Website

Personal website for Max Milne, built with Astro and deployed to Netlify.

- Production: `https://maxmilne.com`
- Source repo: `https://github.com/maxmilneaus/maxmilne.com`
- Hosting: Netlify
- Stack: Astro 5, TypeScript, Markdown content collections, Sass

This repository used to be a Jekyll site. The live site is now Astro. Anything under `docs/Archive/` should be treated as historical reference only.

## Quick start

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run generate:motion
```

## What lives where

- `src/pages/` route files
- `src/content/notes/` writing entries
- `src/content/projects/` project entries
- `src/layouts/` shared page shells
- `src/components/` nav, footer, enhancements, motion hero
- `src/styles/` Sass partials and the global stylesheet entrypoint
- `src/scripts/` lightweight client-side enhancements
- `public/assets/` published media files
- `public/` passthrough static files
- `studiobrunswick/` preserved legacy static subsite
- `docs/` current project docs

Supporting but non-runtime folders:

- `Drafts/` working notes and unfinished content
- `_templates/` authoring templates for new content
- `skills/` and `skills-lock.json` local AI workflow helpers
- `.*agent*`, `.claude/`, `.roo/`, `.vibe/`, etc. local assistant config, not website source

## Where to edit

- Homepage: `src/pages/index.astro`
- Standalone pages like About, Now, CV, Booking: `src/pages/*.md`
- Writing index and filters: `src/pages/writing/index.astro`
- Projects index and filters: `src/pages/projects/index.astro`
- Shared chrome and metadata: `src/layouts/BaseLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`, `src/site.ts`
- Visual system: `src/styles/main.scss` plus the partials in `src/styles/`

## Content model

Notes live in `src/content/notes/` and use the schema in `src/content/config.ts`:

- `title`
- `date`
- `tags`
- `excerpt`
- `permalink`
- `motionTheme`

Projects live in `src/content/projects/` and use:

- `title`
- `year`
- `description`
- `order`
- `tags`

## Deployment

Netlify is the production host.

- Build command: `npm run build`
- Publish directory: `dist`

`astro.config.mjs` sets the canonical site URL to `https://maxmilne.com`.

## AI onboarding

Read in this order:

1. `docs/README.md`
2. `docs/TECHNICAL/INDEX.md`
3. `docs/STYLE_GUIDE.md`
4. `docs/LOG/2026-03-14-astro-cleanup-and-docs-reset.md`
5. The specific route, layout, or content file you plan to change

Assume:

- The Astro app under `src/` is the source of truth
- `dist/` is disposable build output
- `docs/Archive/` is historical, not current guidance
- `*.edtz` files are editor temp artifacts, not canonical content
