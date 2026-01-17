# Technical Implementation Guide

**Overview of how the website works, file structure, and implementation details**

**Last updated:** 2025-11-07

---

## Quick Reference

| Topic | File | Description |
|-------|------|-------------|
| File organization | file-structure.md | Where everything lives, what each folder does |
| Build process | build-system.md | How Jekyll compiles, plugin execution order |
| Filter interactions | filter-system.md | How project/writing filters work (JavaScript + data attributes) — updated 2025-11-09 |
| Photo essay layout | LOG/2025-11-10-photo-essay-film-strip-layout.md | Authoring model and film strip behavior for `layout: photo-essay` (canonical reference) |
| Recommendations | recommendations-algorithm.md | Tag-based similarity using Jaccard index |
| Plugins | plugin-architecture.md | Custom Ruby plugins for tags and recommendations |

*Note: Individual technical docs will be created incrementally as needed*

---

## File Structure Overview

```
Website/
├── _notes/              # Writing/articles (Jekyll collection)
├── _projects/           # Project portfolio entries (Jekyll collection)
├── _sass/               # SCSS stylesheets
│   ├── _style.scss      # Main styles (927 lines)
│   ├── _projects.scss   # Project page filters (236 lines)
│   ├── _writing.scss   # Writing page filters (180 lines)
│   ├── _animations.scss # Footer animation
│   ├── _code.scss       # Code block syntax highlighting
│   └── _normalize.scss  # CSS reset
├── _layouts/            # Jekyll page templates
├── _includes/           # Reusable template components
├── _plugins/            # Custom Ruby plugins
│   └── tag_based_recommendations.rb
├── _config.yml          # Jekyll configuration
├── assets/              # Images, fonts, compiled CSS
├── docs/                # This documentation (you are here)
└── _site/               # Generated static files (git-ignored)
```

---

## Technologies

### Core Stack
- **Jekyll** (4.x) - Static site generator
- **Sass/SCSS** - CSS preprocessing with variables and nesting
- **Liquid** - Templating language for dynamic content
- **Markdown** - Content authoring format
- **Ruby** - Plugin language

### JavaScript
- Vanilla JavaScript (no frameworks)
- Minimal, progressive enhancement approach
- Used for:
  - Project category filtering
  - Writing topic filtering
  - Mobile menu toggle

### Build Process
1. Jekyll reads `_config.yml`
2. Processes Ruby plugins (tag generation, recommendations)
3. Compiles SCSS to CSS
4. Renders Markdown + Liquid templates to HTML
5. Outputs static site to `_site/`

---

## Key Implementation Details

### Factor-Based Spacing System

**Implementation:** `_sass/_style.scss` (CSS custom properties)

All spacing uses mathematical relationships based on 0.25rem base unit:

```scss
:root {
  --space-xs: 0.25rem;    /* 1x base */
  --space-sm: 0.5rem;     /* 2x base */
  --space-md: 1rem;       /* 4x base */
  --space-lg: 1.75rem;    /* 7x base */
  --space-xl: 3rem;       /* 12x base */
}
```

Harmonic proportions: 1:2:4:7:12

**Why:** Changes to spacing scale proportionally across entire site. No arbitrary values.

---

### Color System

**Implementation:** `_sass/_style.scss` (CSS custom properties)

All colors use CSS variables for consistency:

```scss
:root {
  --color-deep: #141210;       /* Background */
  --color-cream: #e8ddd4;      /* Primary text */
  --color-meta: #9c958c;       /* Metadata/labels */
  --color-accent-hover: #93c5fd; /* Interactive states */
  /* ... etc */
}
```

**Why:** Single source of truth. Theme changes update entire site systematically.

---

### Project Filters

**Implementation:** `_layouts/projects.html` (filter logic) + `_sass/_projects.scss` (visual styles)

**How it works:**
1. Build step adds `data-tag-slugs` attribute to every `.project-entry` using the project's tags (e.g., `data-tag-slugs="art business"`).
2. Filter buttons expose their slug through `data-filter="art"` and register a vanilla JS click handler.
3. `applyFilter(slug)` toggles `.is-hidden` on each entry (display: none) unless the slug is present or the `all` filter is selected.
4. After every filter change (and on initial load) `markFirstVisible()` finds the first non-hidden entry, removes any previous helper, and applies `.is-first-visible` so the CSS can zero the top padding.

**Why the helper classes matter:** The list uses `padding: var(--space-md) 0` for consistent rhythm, but the first and last visible entries need their padding/borders removed so the list hugs the filter bar above and the footer below. `.project-entry.is-first-visible { padding-top: 0; }` and `.project-entry.is-last-visible { border-bottom: none; padding-bottom: 0; }` mirror the old `:first-child`/`:last-child` rules but keep working when filters hide siblings.

**Active state:** 2px border-bottom on the selected filter.

**Location:** Projects page (`/projects/`)

*Detailed documentation: See filter-system.md (to be created)*

---

### Writing Filters

**Implementation:** `_layouts/writing.html` + `_sass/_writing.scss`

**How it works (2025-11 refresh):**
1. A two-column grid keeps the dedicated `All` button in its own column while the comma-separated topic sentence (`.writing2-topic-list`) occupies the second column, ensuring wraps align under the first topic.
2. `data-tag-slugs` on each `.writing2-entry` mirrors the button slugs generated with Liquid `slugify`.
3. Vanilla JS toggles `.is-active` / `aria-pressed` on `.writing2-topic-trigger` buttons and applies `.is-hidden` to entries that lack the slug.
4. The dividing dot now lives on `.writing2-topic-all::after`, so the separator never inherits the active underline (only the `.topic-name` span does).

**Location:** Writing page (`/writing/`)

*More detail: `docs/TECHNICAL/filter-system.md`*

---

### Recommendations Algorithm

**Implementation:** `_plugins/tag_based_recommendations.rb`

**How it works:**
1. Calculates tag similarity using Jaccard index
2. Formula: `intersection(tags) / union(tags)`
3. Recommends 3-5 most similar articles
4. Configurable in `_config.yml`:
   - `max_recommendations: 5`
   - `similarity_threshold: 0.1`

**Where shown:** Bottom of individual article pages ("You might also enjoy")

**Why:** Algorithmic curation reduces decision fatigue vs showing full article list

*Detailed documentation: See recommendations-algorithm.md (to be created)*

---

### Tag Page Generation

**Implementation:** `_plugins/tag_generator.rb` (if exists) or manual pages

**Structure:**
- URL pattern: `/tags/[topic-name]/`
- Template: `tag` layout
- Lists all articles with that tag
- Breadcrumb heading: "Topics / [Tag Name]"

**Features:**
- Pluralization handling
- Clean URL structure
- SEO-friendly

*Detailed documentation: See plugin-architecture.md (to be created)*

---

### Component Implementation

#### Section Labels
**Class:** `.section-label`
**Location:** Projects and Writing pages
**Styling:** Meta gray, 1rem size, not clickable (`pointer-events: none`)
**Purpose:** Non-interactive filter group label

#### Filter Buttons
**Classes:** `.project-filter`, `.writing-filter`
**Styling:** Transparent background, 2px border-bottom on active, blue hover
**Pattern:** Rams-inspired minimal UI with underline indicator

#### Actionable Content Boxes
**Location:** Now page "Primary Work" section
**Styling:**
- `background: rgba(147, 197, 253, 0.05)`
- `border-left: 3px solid var(--color-accent-hover)`
- CTA buttons with blue accent
**Purpose:** Visual distinction for items requiring user action

---

## Build & Deployment

### Local Development

```bash
# Install dependencies (first time)
bundle install

# Start development server
bundle exec jekyll serve

# With live reload
bundle exec jekyll serve --livereload

# Build without serving
bundle exec jekyll build
```

**Output:** Static files in `_site/` directory

### Production Build

```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build
```

**Optimization:** Minified CSS, optimized assets

*Detailed documentation: See build-system.md (to be created)*

---

## Component Inheritance Pattern

**Implementation:** `_sass/_style.scss`

Base classes provide consistent behavior:

```scss
.label {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-meta);
  letter-spacing: 0.03em;
}

.section-label {
  @extend .label;
  /* Additional specific styling */
}
```

**Why:** Single source of truth for shared patterns. Changes propagate systematically.

---

## Responsive Behavior

### Breakpoints

| Width | Changes |
|-------|---------|
| <600px | Padding adjusts to `4vw` |
| <768px | Mobile menu (hamburger icon) |
| >820px | Font size increases to `1.05rem`, line-height to `1.75` |

### Mobile Menu
**Trigger:** <768px screen width
**Pattern:** Hamburger icon → slide-down menu
**Animation:** CSS transforms

---

## CSS Architecture

### File Organization
- **_style.scss** - Main styles, base elements, universal patterns
- **_projects.scss** - Project-specific filters and layout
- **_writing.scss** - Writing page filters and layout
- **_animations.scss** - Footer Goldsworthy fragments animation
- **_code.scss** - Syntax highlighting for code blocks
- **_normalize.scss** - CSS reset for browser consistency

### Naming Conventions
- **BEM-inspired** - `.component-element--modifier` pattern
- **Semantic** - Names describe purpose, not appearance
- **Systematic** - Related components share prefix (`.project-*`, `.writing-*`)

---

## Plugin Architecture

### Tag-Based Recommendations

**File:** `_plugins/tag_based_recommendations.rb`

**Purpose:** Generate "You might also enjoy" recommendations based on tag similarity

**Algorithm:** Jaccard similarity index

**Configuration:** `_config.yml`
```yaml
max_recommendations: 5
similarity_threshold: 0.1
```

**Output:** Liquid variable `{{ page.recommendations }}` available in templates

*Detailed documentation: See plugin-architecture.md and recommendations-algorithm.md (to be created)*

---

## Common Implementation Patterns

### Universal Spacing
```scss
main {
  margin: calc(var(--space-xl) * 1.25) 0 var(--space-xl) 0;
}
```
Creates 3.75rem top margin universally across all page types.

### Divider System
```scss
hr {
  margin: var(--section-spacing) 0;
  background: var(--color-divider);
}
```
One variable controls all dividers site-wide.

### Link System
All links use consistent hover transition to `var(--color-accent-hover)` (blue) with 200ms ease.

---

## Next Steps

**For detailed implementation:**
1. Create individual technical docs as needed:
   - file-structure.md (comprehensive file organization)
   - build-system.md (Jekyll build process details)
   - filter-system.md (filter implementation with code examples)
   - recommendations-algorithm.md (algorithm deep dive)
   - plugin-architecture.md (plugin development guide)

2. Each document should be self-contained
3. Include code examples and file references
4. Keep implementation details separate from reasoning (reasoning goes in LOG/)

---

**For design philosophy:** See VISION.md

**For visual specifications:** See STYLE_GUIDE.md

**For decision history:** See LOG/

**Back to main docs:** See ../README.md

---

## LOG Naming Convention

When documenting decisions in LOG/:
- **Format:** `YYYY-MM-DD-descriptive-title.md`
- **Example:** `2025-11-07-homepage-minimal-approach.md`
- **Multiple same day:** Add suffix `-01`, `-02` (e.g., `2025-11-07-01-first-decision.md`)
- **Why date-only:** Sorts chronologically, human-readable, follows ADR standard
