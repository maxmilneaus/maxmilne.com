## Entry 006: Projects year column drifted when numbers changed width (2025-11-07)

**Context:**
- The `/projects` list uses a fixed 100px column for `.project-year`, but proportional numerals in Inter make “1” narrower than “8”.
- Year ranges written as `2025 -` vs `2014 - 2020` therefore pushed the hyphen left/right, making the column jitter when scanning.
- Filters now feel precise, so the wobbly date column stood out as the misaligned element.

**Decision:**
Force the year column to render with tabular lining figures via `font-variant-numeric: tabular-nums` (and explicit `font-feature-settings: "tnum" 1` fallback) in `_sass/_projects.scss`.

**Reasoning:**
- Tabular figures guarantee every digit occupies identical width, so the dash starts from the same x-position regardless of digits.
- Adding the feature at the component layer keeps typography tokens centralized in Sass instead of sprinkling inline spans through Markdown.
- Browser support is broad and degrades gracefully (worst case: old behavior returns).

**Consequences:**
+ Visual rhythm of the projects grid matches the type-driven system outlined in `docs/STYLE_GUIDE.md`.
+ Reading ranges is faster; the mind no longer compensates for shifting columns.
± Slightly different kerning for numbers elsewhere, but scope is narrowed to `.project-year`, so headlines and meta copy stay untouched.

**Related:** `_sass/_projects.scss`, `_site/styles.css`, `docs/STYLE_GUIDE.md`
