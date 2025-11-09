# Repository Guidelines

## Project Structure & Module Organization
Collections carry most content: `_notes/` for essays, `_pages/` for standalone routes, `_projects/` for portfolio entries. Layouts (`_layouts/`), partials (`_includes/`), and Sass (`_sass/`) drive presentation; ship only compiled assets in `assets/` and never commit `_site/`. Process docs and retros live in `docs/`, with `docs/TECHNICAL_GUIDE.md` remaining the source of truth. Run root-level helper scripts in place so their relative paths resolve.

## Build, Test, and Development Commands
- `bundle exec jekyll serve --livereload` — serve locally at `http://127.0.0.1:4000/`; use `./start_jekyll.sh` when you want rbenv checks.
- `bundle exec jekyll build` — compile to `_site/`; use before deploys to catch front-matter or Liquid errors.
- `npm install` — install Node tooling (Playwright, Puppeteer) for browser smoke checks.
- `npx playwright test` — execute scripted UI checks; add specs under `tests/` when you automate regressions.
- `./diagnose_jekyll.sh` — quick health report when ruby/bundler issues arise; attach output to debugging notes.

## Coding Style & Naming Conventions
Use two-space indentation for YAML, Liquid, and SCSS. Keep front matter lowercase with hyphenated keys (`body_class`) and inline arrays (`tags: [meditation, therapy]`) in `YYYY-MM-DD` chronology. Markdown headings stay sentence case. SCSS modules belong in `_sass/` with the existing BEM-leaning classes (`.project-filter`, `.two-up`). Match JS filenames to their feature (`assets/js/projects-filter.js`). Author Markdown that renders cleanly inside Obsidian Preview—skip custom shortcodes.

## Testing Guidelines
Run `bundle exec jekyll build` before every push; it catches missing includes and invalid front matter. Manually confirm `/projects`, `/about`, and the latest note in the browser when content or navigation changes. If you automate checks, keep Playwright specs near the flows they guard (`tests/projects.spec.ts`) and update snapshots alongside CSS tweaks. Block merges on any reproducible regression, even without formal coverage thresholds.

## Commit & Pull Request Guidelines
Use imperative, scoped commit messages in the pattern `<type>: <summary>` (e.g., `fix: align two-up image grid`). Reference related issues or `docs/log.md` entries when they exist. Pull requests must describe the change, list verification steps (commands run, pages reviewed), and add screenshots or terminal output for UI or build changes. Keep PRs tight; large efforts should point to supporting documentation.

## Obsidian Sync & Content Workflow
Sync scripts assume Obsidian vault paths under `_notes/` and `_pages/`; keep filenames slugified (`social-meditation.md`) to preserve permalinks. Draft in `_drafts/` until front matter is final. When adjusting embed modifiers or two-up layouts, refresh both the markdown note and the snippets in `docs/TECHNICAL_GUIDE.md`.
