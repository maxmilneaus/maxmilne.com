# Astro Cleanup And Docs Reset

**Date:** 2026-03-14

## What

Aligned the repository around the live Astro site and removed the remaining Jekyll-era runtime clutter.

Also rewrote the main onboarding docs so a human or AI can quickly identify:

- what the live stack is
- what folders matter
- where to edit routes, content, styles, and assets
- what is current versus historical

## Why

The repo had drifted into a confusing mixed state:

- the production site was already Astro
- the domain was being served by Netlify
- old Jekyll files and assumptions still existed in docs and repo structure
- some docs still described outdated visual language and implementation paths

That mismatch made onboarding slower and created unnecessary ambiguity.

## Decisions

### Runtime truth

The active website is:

- Astro
- built with `npm run build`
- deployed to Netlify
- published from `dist`

Current source-of-truth paths:

- `src/` for app code
- `public/` for static passthrough assets
- `public/assets/` for published media
- `docs/` for current documentation

### Historical material

Jekyll-era and migration-era material should now be treated as historical unless current source files prove otherwise.

- `docs/Archive/` is for archaeology only
- old references to `_notes`, `_projects`, `_layouts`, `_plugins`, `_site`, Ruby gems, or GitHub Pages Jekyll deployment are not current runtime guidance

### Docs reset

The main docs were rewritten to reflect the current state:

- `README.md`
- `docs/README.md`
- `docs/TECHNICAL/INDEX.md`
- `docs/STYLE_GUIDE.md`

## Structural outcome

The simplified repo shape is now:

- `src/` application routes, content, components, layouts, styles, scripts
- `public/` static public files
- `docs/` current project documentation
- `scripts/` repository scripts
- `studiobrunswick/` preserved legacy subsite

Supporting but non-runtime folders can remain if they serve local workflow, but they should not be mistaken for website source.

## Follow-up notes

- Build verification passed with `npm run build`
- Remaining technical debt: Sass `@import` deprecation warnings in `src/styles/main.scss`
- Future documentation changes should prefer current source files over older narrative notes

## Status

The repo now matches the live deployment model much more closely and is substantially easier to onboard into.
