# Filter System

Current filter behavior for the Astro implementation.

## Overview

The site has two single-select filter interfaces:

| Page | Source | Styles | Filter label |
| --- | --- | --- | --- |
| `/writing/` | `src/pages/writing/index.astro` | `src/styles/_writing.scss` | `Filter by topics` |
| `/projects/` | `src/pages/projects/index.astro` | `src/styles/_projects.scss` | `Type` |

Both use the same core pattern:

1. Build a unique tag list from the relevant Astro collection
2. Render each chip with a slugified `data-topic`
3. Render each entry with a space-separated `data-tag-slugs`
4. Let one chip be active at a time
5. Hide non-matching entries with `.is-hidden`
6. Give newly re-shown entries a short `.is-revealing` transition

## Shared DOM hooks

- Root: `[data-filter-root]`
- Toggle: `[data-filter-toggle]`
- Panel: `[data-filter-panel]`
- Chips: `[data-filter-chip]`
- List container: `[data-filter-list]`

## Shared behavior

The interaction is deliberately light:

- Single-select only
- Clicking the active chip clears the filter
- No URL params
- No persisted state
- No visible count in the pill, even though the hooks are present

This keeps the lists feeling editorial rather than app-like.

## Writing page

Source: `src/pages/writing/index.astro`

Notes:
- Tags are read from the `notes` content collection
- Entries use `.writing2-entry`
- Photo essays get a `◐` indicator when a note has a photo-related tag
- The filter UI also includes a small static key for the photo essay marker

Relevant styling:
- `.writing2-page`
- `.writing2-topics`
- `.writing2-key`
- `.writing2-entry`
- `.article-indicator-photo`

## Projects page

Source: `src/pages/projects/index.astro`

Notes:
- Tags are read from the `projects` content collection
- Entries use `.project-entry`
- Each entry renders year, title, and description

Relevant styling:
- `.projects-page`
- `.projects-topics`
- `.project-entry`
- `.project-year`
- `.project-description`

## Shared visual primitives

Both filters use the same ghost-panel components:

- `.ghost-filter-block`
- `.toggle-pill-soft`
- `.panel-soft`
- `.panel-inner-soft`
- `.topics-row-soft`
- `.chip-soft`

## Change checklist

When editing filter behavior:

1. Update the route file
2. Update the matching Sass partial
3. Run `npm run build`
4. Check open, close, select, clear, and mobile behavior manually
