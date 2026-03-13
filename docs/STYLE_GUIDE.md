# Style Guide

Current visual reference for the live Astro site.

Last updated: 2026-03-14

Source of truth:
- `src/styles/_style.scss`
- `src/styles/_writing.scss`
- `src/styles/_projects.scss`
- `src/styles/_photo-essay.scss`

If this file disagrees with the Sass, update this file to match the code.

## Core direction

The site is warm, quiet, and editorial.

- Mood: contemplative, intimate, low-gloss
- Structure: simple, readable, functional
- Method: token-based spacing and color variables reused across pages

Useful shorthand:
- warm darkness
- literary typography
- restrained emphasis
- small, respectful motion

## Palette

Defined in `src/styles/_style.scss`.

### Base colors

| Token | Hex | Use |
| --- | --- | --- |
| `--color-deep` | `#141210` | page background |
| `--color-charcoal` | `#201d1a` | panels, dark surfaces |
| `--color-graphite` | `#2d2926` | subtle edges |
| `--color-stone` | `#4a453f` | borders, dividers, subdued links |
| `--color-cream` | `#e8ddd4` | primary text |
| `--color-warm-gray` | `#c7beb5` | secondary text |
| `--color-meta` | `#9c958c` | metadata, labels, quieter copy |

### Accent colors

| Token | Hex | Use |
| --- | --- | --- |
| `--color-accent-hover` | `#E8B84D` | hover state, highlighted links, active moments |
| `--color-accent-subtle` | `#5A7A5E` | borders, quiet emphasis, outlines |
| `--color-accent-primary` | `#D4A045` | stronger amber accent |
| `--color-accent-secondary` | `#fca5a5` | occasional secondary accent |

### Color rules

- The site is not blue-led anymore. The active accent language is amber and sage.
- Cream should carry the main reading load.
- Meta text should stay soft and legible, not faded into the background.
- Borders should usually land in the stone/graphite range rather than bright accent colors.

## Typography

### Font stack

| Token | Family | Use |
| --- | --- | --- |
| `--font-primary` | `IBM Plex Sans` | body copy, UI text |
| `--font-heading` | `EB Garamond` | headings |
| `--font-mono` | `Roboto Mono` | code and technical text |

### Type rhythm

| Element | Size | Notes |
| --- | --- | --- |
| body | `1rem` | `1.05rem` from `820px` and up |
| `h1` | `2rem` | homepage intro can push larger |
| `h2` | `1.65rem` | major section heading |
| `h3` | `1.35rem` | softer hierarchy, warm gray |
| `h4` | `1.15rem` | supportive heading |

### Weight and feel

- Body text is light and readable, with `font-weight: 300`
- Primary heading weights sit around `400` to `500`
- UI labels and links should feel calm, not shouty
- Heading serif + body sans pairing is intentional and should be preserved

## Spacing system

Base spacing tokens:

| Token | Value |
| --- | --- |
| `--space-xs` | `0.25rem` |
| `--space-sm` | `0.5rem` |
| `--space-md` | `1rem` |
| `--space-lg` | `1.75rem` |
| `--space-xl` | `3rem` |

Layout constants:

- `--max-width: 42rem`
- `--section-spacing: var(--space-xl)`
- `--section-content-spacing: var(--space-md)`

Rules:

- Stay on the spacing tokens unless there is a clear layout reason not to.
- Keep text content within the reading column unless a visual treatment deliberately breaks out.
- Use generous vertical rhythm; avoid compressed stacks of unrelated content.

## Page patterns

### Homepage

- Intro is simple and direct
- Circular profile image at `80px`
- Primary text sits close to the top with minimal chrome
- Supporting links read as part of the sentence, not as button clutter

### Writing page

- Intro paragraph in meta color
- A single quiet ghost pill controls topic filters
- Filter chips are subtle, lowercase-feeling, and should not look like app UI
- List should stay highly scannable

### Projects page

- Mirrors writing page rhythm where possible
- Projects use a two-column pattern: year + content
- Year column uses tabular numerals for alignment
- Projects retain dividers and more structure than the writing list

### Notes and longform pages

- Reading experience comes first
- Embedded media should use helpers like `.align-left`, `.align-right`, `.full-bleed`, `.page-plus`, and `.two-up` only when they improve the reading flow
- Photo essay styling belongs in `src/styles/_photo-essay.scss`

## Components

### Links

- Default links should feel classic and understated
- Hover state should shift toward the amber accent
- Underlines are preferred over heavy fills for inline text links

### Labels

- Labels use meta color
- `1rem` sizing
- Slight letter spacing
- They act as orientation, not decoration

### Ghost filter pill

Shared language across writing and projects:

- transparent background
- rounded full pill
- stone border
- meta text by default
- amber/cream shift on hover or active
- expanded panel stays visually light with minimal chrome

### Chips

- Small, quiet, lightly bordered
- Should never dominate the page
- State change comes through border/text/background nuance rather than loud fills

### CTA surfaces

- Use sparingly
- Dark surface with restrained accent border
- Should feel invited, not marketed

## Motion and interaction

- Motion is secondary to reading comfort
- Small transitions around hover, panel expansion, and nav interaction are enough
- Respect `prefers-reduced-motion`
- Progressive enhancement is preferred over JS-heavy interaction

Examples in current implementation:
- mobile nav toggle
- writing/project filter panels
- reading progress bar
- footnote previews

## Responsive behavior

- Body padding reduces on smaller screens
- Writing and projects filters should stay readable and easy to tap
- Breakout image treatments collapse back to the text column on mobile
- Two-up image grids stack on small screens

## Implementation notes

- Main stylesheet entrypoint: `src/styles/main.scss`
- Legacy photo-essay variants exist on disk for reference, but are not imported
- If you change tokens, update both this file and any docs that describe the visual system

## Guardrails

- Do not reintroduce Jekyll-era assumptions into current docs
- Do not describe obsolete blue-accent styling as current
- Prefer the live Sass over old narrative docs when there is any mismatch
