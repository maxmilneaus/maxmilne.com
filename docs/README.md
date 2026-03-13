# Website Docs

Current documentation entry point for Max Milne's Astro website.

- Live site: `https://maxmilne.com`
- Production host: Netlify
- Source repo: `maxmilneaus/maxmilne.com`
- Current stack: Astro 5, Markdown content collections, Sass, small vanilla JS enhancements

## Start here

Read in this order:

1. This file
2. `VISION.md`
3. `TECHNICAL/INDEX.md`
4. `STYLE_GUIDE.md`
5. Relevant recent entries in `LOG/`

Only open `Archive/` when you are doing historical archaeology. It contains Jekyll-era material and should not be treated as current implementation guidance.

## Quick local workflow

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run build
npm run preview
npm run generate:motion
```

## Repo mental model

The active app lives under `src/`.

- `src/pages/` defines routes
- `src/content/notes/` holds writing entries
- `src/content/projects/` holds project entries
- `src/layouts/` wraps pages
- `src/components/` contains reusable UI pieces
- `src/styles/` contains the site-wide Sass system
- `public/assets/` contains published media
- `public/` is passthrough static content
- `studiobrunswick/` is a preserved legacy static microsite

Supporting but non-runtime folders:
- `Drafts/` for working notes
- `_templates/` for authoring templates
- `skills/` plus the hidden agent config folders for local AI workflows

This repository used to be Jekyll. That is no longer the runtime. If a doc mentions `_notes`, `_projects`, `_layouts`, `_plugins`, or `bundle exec jekyll`, treat it as historical unless a current source file proves otherwise.

## Current routes

- `/` homepage
- `/about/`
- `/now/`
- `/cv/`
- `/booking/`
- `/writing/`
- `/projects/`
- `/:slug/` individual notes
- `/projects/:slug/` individual projects
- `/studiobrunswick/` legacy static subsite

## Current docs map

- `VISION.md` design intent, tone, and page jobs
- `STYLE_GUIDE.md` palette, type, spacing, component feel
- `TECHNICAL/INDEX.md` current architecture, file map, and implementation notes
- `TECHNICAL/filter-system.md` current writing/projects filter behavior
- `TECHNICAL/motion-visuals.md` generated note visuals
- `LOG/` decision history and implementation notes

## Common tasks

Add a writing entry:
- Create a Markdown file in `src/content/notes/`
- Follow the schema in `src/content/config.ts`
- It will appear on `/writing/` and get its own route automatically

Add a project:
- Create a Markdown file in `src/content/projects/`
- Use `title`, `year`, `description`, `order`, and `tags` as needed
- It will appear on `/projects/` and get its own detail page automatically

Edit a standalone page:
- Update the matching file in `src/pages/`

Adjust visuals:
- Edit `src/styles/main.scss` or the relevant partial in `src/styles/`
- Cross-check `STYLE_GUIDE.md` if you are shifting the visual language

Modify filters:
- Edit `src/pages/writing/index.astro` or `src/pages/projects/index.astro`
- Match behavior changes with `src/styles/_writing.scss` or `src/styles/_projects.scss`

## Notes for AI agents

- Source of truth is the Astro app, not build output
- `dist/` is disposable
- `*.edtz` files are editor temp artifacts
- `LOG/` is useful for intent, but older entries may reference pre-migration paths
- Prefer current source files over narrative docs if they disagree

Last updated: 2026-03-14
