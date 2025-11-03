---
title: Style Guide
layout: note
---

# Max Milne Website Design System
*A systematic approach to cozy, contemplative design*

**Last updated:** June 11, 2025  
**Design Philosophy:** Systems thinking with mathematical relationships  
**Current theme:** Viola/Rams with Factor-Based Architecture

---

## 1. Design Philosophy & Systems Thinking

### Core Principles

**Mys (Swedish):** That feeling of cozy contentment - candlelight warmth, intimate conversations, thoughtful reflection.

**Lagom (Swedish):** Just the right amount - not too much, not too little.

**Kaizen:** Continuous subtle improvements that enhance without overwhelming.

**Systems Thinking:** Every design decision creates relationships. Changes should be universal, factor-based, and mathematically consistent.

### Aesthetic: "Viola/Rams + Systems"

**Viola (The Mood):** Atmospheric and contemplative, achieved through warm, dark backgrounds and clean blue accents.

**Rams (The Structure):** Functional and honest. Every element is purposeful, with clear typographic hierarchy over decoration.

**Systems (The Method):** Factor-based spacing, universal color variables, and mathematical relationships that scale consistently.

---

## 2. Systems Architecture

### Factor-Based Spacing System

Our spacing system uses **mathematical relationships** rather than arbitrary values:

```scss
/* Systematic spacing scale */
--space-xs: 0.25rem;    /* Base unit */
--space-sm: 0.5rem;     /* 2x base */
--space-md: 1rem;       /* 4x base */
--space-lg: 1.75rem;    /* 7x base */
--space-xl: 3rem;       /* 12x base */

/* Section rhythm variables */
--section-spacing: var(--space-xl);
--section-content-spacing: var(--space-md);
```

**Mathematical relationships:**
- All spacing derives from `0.25rem` base unit
- Creates harmonic proportions: 1:2:4:7:12
- Section rhythm uses semantic variables for global consistency
- Enables systematic scaling across all elements

### Universal Spacing Rules

**Content Container Spacing:**
```scss
main {
  margin: calc(var(--space-xl) * 1.25) 0 var(--space-xl) 0;
}
/* Creates 3.75rem top margin universally across all page types */
```

**Horizontal Rules (HR) System:**
```scss
hr {
  margin: var(--section-spacing) 0;
  background: var(--color-divider);
}
/* Creates 3rem top and bottom for consistent visual rhythm */
```

### Section Dividers

A dedicated class for horizontal rules used as section dividers, ensuring consistent spacing and visual rhythm between major content blocks.

```scss
.section-divider {
  @extend hr;
  margin-top: 0; /* Removes top margin to prevent double spacing with preceding section */
  margin-bottom: var(--section-spacing); /* Consistent spacing after the divider */
}
```

**Design Principles:**
- **Visual Rhythm:** Creates clear separation between sections while maintaining consistent vertical spacing.
- **Reusability:** A single class for all section dividers, promoting consistency and ease of maintenance.
- **Systematic Spacing:** Utilizes `--section-spacing` for predictable layout.

**Systems Benefits:**
- ✅ **Universal consistency** - One rule affects all pages
- ✅ **Mathematical harmony** - 2:3 proportional relationships
- ✅ **Maintenance simplicity** - Change factors, not individual values
- ✅ **Visual rhythm** - Predictable spacing relationships

---

## 3. Color Architecture

### Primary Palette with Systematic Variables

```scss
/* Base Colors */
--color-deep: #141210;              /* Background */
--color-charcoal: #201d1a;          /* Secondary backgrounds */
--color-graphite: #2d2926;          /* Borders, subtle elements */
--color-stone: #4a453f;             /* Base divider color */
--color-cream: #e8ddd4;             /* Primary text */
--color-warm-gray: #c7beb5;         /* Secondary text */
--color-meta: #9c958c;              /* Label text, metadata */

/* Interactive */
--color-accent-hover: #93c5fd;      /* All hover states */
--color-accent-subtle: #3b82f6;     /* Accent elements */

/* System Colors - Mathematical Relationships */
--color-divider: rgba(74, 69, 63, 0.6); /* Stone + systematic 0.6 opacity */
```

### Universal Divider System

**One variable controls ALL content dividers:**

```scss
/* Applied consistently to: */
hr { background: var(--color-divider); }
footer { border-top: 1px solid var(--color-divider); }
.backlink-box { border-left: 2px solid var(--color-divider); }
```

**Systems Benefits:**
- ✅ **Single source of truth** for divider appearance
- ✅ **Consistent visual weight** across all dividers
- ✅ **Easy theme changes** - modify one variable
- ✅ **No scattered opacity values**

---

## 4. Typography System

### Emphasis and Strong Text

**Bold/Strong Text Usage:**

Bold text (`<strong>` or `**text**` in markdown) is used for emphasis within body content, typically in lists where category labels need visual distinction:

```markdown
**Awards:** Received X award for Y
```

**Design Principles:**
- Use bold sparingly - primarily for category labels in structured content
- Standard weight (600) through `<strong>` element
- Emphasizes within content flow, not creating hierarchy level
- Reserved for inline emphasis, not section headings

### Hierarchical Scale with Mathematical Relationships

```scss
/* Font Hierarchy */
h1 { font-size: 2rem; }           /* 32px - Primary heading */
h2 { font-size: 1.65rem; }        /* 26.4px - Section heading */
h3 { font-size: 1.35rem; }        /* 21.6px - Subsection */
body { font-size: 1rem; }         /* 16px base */

/* Systematic Line Heights */
--line-height: 1.7;               /* Body text optimized for reading */
h1 { line-height: 1.15; }         /* Tighter for impact */
h2-h6 { line-height: 1.25; }      /* Balanced for hierarchy */
```

### Spacing Relationships

```scss
/* Factor-based margins */
h2 { margin-top: calc(var(--space-xl) * 1.25); }  /* 3.75rem section breaks */
h3 { margin-top: var(--space-xl); }               /* 3rem subsection breaks */
p { margin: var(--space-md) 0 var(--space-lg) 0; } /* 1rem - 1.75rem rhythm */
```

---

## 5. Component Architecture

### Latest Section - Factor-Based Design

```scss
.latest-section {
  margin: 0 0 calc(var(--space-xl) * 1.5) 0;  /* 4.5rem bottom spacing */
}
```

**Structure with systematic spacing:**
- **Label:** `var(--space-md)` bottom margin (1rem)
- **Title:** `var(--space-xs)` bottom margin (0.25rem) 
- **Meta:** `var(--space-sm)` bottom margin (0.5rem)
- **Preview:** `var(--space-md)` bottom margin (1rem)

### Refined Component System - Systematic Inheritance

**Base classes for consistent behavior:**

```scss
/* Base section class - all front page sections inherit this spacing */
.section {
  margin: 0 0 var(--section-spacing) 0;
}

/* Base label class - for all section headers */
.label {
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  color: var(--color-meta);
  letter-spacing: 0.03em;
  margin-bottom: var(--section-content-spacing);
  text-decoration: none !important;
  display: block;
}
```

**Component inheritance pattern:**
```scss
.latest-section { @extend .section; }
.topics-section { @extend .section; }
.latest-label { @extend .label; }
.section-label { @extend .label; }
```

**Front Page Section Headers - Standard Format:**
```html
<div class="section-label" id="section-name">Section Name</div>
```

**Design Benefits:**
- Single source of truth for spacing and styling
- Changes to base classes affect all components systematically
- Reduces CSS duplication and maintenance overhead
- Maintains visual consistency automatically

### Section Headers - Universal Pattern

```scss
.section-label {
  font-size: 1rem;                          /* Consistent across all sections */
  font-weight: var(--font-weight-normal);   /* 400 weight */
  color: var(--color-meta);                 /* Systematic hierarchy color */
  letter-spacing: 0.03em;                   /* Refined spacing */
  margin-bottom: var(--space-md);           /* 1rem breathing room */
}
```

### Navigation Breadcrumb

The breadcrumb navigation has been added to the main navigation bar for individual note pages, providing clear hierarchical context.

```scss
.nav-breadcrumb-separator {
  color: var(--color-warm-gray);            /* Separator color */
  margin: 0 var(--space-xs);                /* Small spacing around separator */
}

.nav-breadcrumb-item {
  color: var(--color-meta);                 /* Category link color, same as section labels */
  text-decoration: none;                    /* No underline by default */
  
  &:hover {
    color: var(--color-accent-hover);       /* Consistent hover color */
    text-decoration: underline;             /* Underline on hover for clarity */
    text-underline-offset: 0.2em;
  }
}
```

**Structure:** `Max Milne / Writing` (or relevant category)
- "Max Milne" links to the homepage.
- "Writing" (or category) links to the top of the index page.
- The current note title is implicitly understood as the page title and is not part of the clickable breadcrumb.

### Footer Animation and Caption Alignment

The footer animation and its accompanying caption are now aligned to the left, providing a consistent visual flow with the rest of the page content.

```scss
/* _sass/_style.scss */
.stove-signature {
  text-align: left; /* Aligns the caption and the animation container */
  margin: var(--space-xl) 0 var(--space-md) 0;
}

/* _sass/_animations.scss */
.goldsworthy-fragments {
  /* Removed 'margin: 0 auto;' to allow left alignment */
  position: relative;
  width: 80px;
  height: 60px;
  animation: natural-breath 8s ease-in-out infinite;
}
```

**Design Principles:**
- **Consistency:** Aligns with the overall left-aligned content flow of the site.
- **Clarity:** Ensures the caption is easily readable and associated with the animation.
- **Systematic Spacing:** Continues to use `var(--space-xl)` and `var(--space-md)` for vertical rhythm.

**Design Principles:**
- **Clarity:** Provides immediate context of the note's position within the site hierarchy.
- **Consistency:** Uses existing color variables (`--color-meta`, `--color-warm-gray`, `--color-accent-hover`) and spacing (`--space-xs`).
- **Interaction:** Follows established link hover patterns.

### Article Lists - Grid System

```scss
ul a {
  display: grid;
  grid-template-columns: auto auto 1fr;     /* Date | Separator | Title */
  gap: 0.25rem;                             /* Quarter-unit spacing */
  align-items: baseline;
}
```

### Projects Components

#### Dieter Rams Color Hierarchy
The projects section follows a systematic color hierarchy inspired by Dieter Rams' design principles - functional, honest, and unobtrusive.

```scss
/* Primary content (titles) */
.project-title a {
  color: var(--color-cream);              /* Primary hierarchy - draws the eye */
}

/* Secondary content (metadata, descriptions, dates) */
.project-description,
.project-description-inline,
.project-year,
.project-year-inline,
.project-meta {
  color: var(--color-meta);               /* Secondary hierarchy - readable but supportive */
}
```

**Design Principles:**
- **Clear Hierarchy:** Project titles stand out in cream, while supporting details recede into the warm gray metadata tone
- **Consistent System:** All secondary information shares the same color for visual coherence
- **Dieter Rams Influence:** "As little design as possible" - typography and hierarchy over decoration
- **Readability:** The `--color-meta` tone (#9c958c) maintains legibility while establishing clear information architecture

**Applied To:**
- `.project-description` - Short project summaries on listing pages
- `.project-description-inline` - Descriptions shown under project titles on detail pages
- `.project-year` - Date ranges on listing pages
- `.project-year-inline` - Dates in grid layout
- `.project-meta` - Metadata container for dates and status

#### Filter Tabs (Minimal Rams Approach)

The project filter tabs follow the "as little design as possible" principle with underline indicators for selection.

```scss
.project-filter {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-meta);               /* Gray by default */
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  letter-spacing: 0.02em;                 /* Tight, refined spacing */
  text-transform: capitalize;
  transition: color 200ms ease, border-color 200ms ease;

  &:hover {
    color: var(--color-accent-hover);     /* Muted blue on hover */
    border-bottom-color: var(--color-accent-hover);
  }

  &.is-active {
    color: var(--color-accent-hover);     /* Muted blue when selected */
    border-bottom-color: var(--color-accent-hover);
  }
}
```

**Filter Label Styling:**
```scss
.projects-filter-group .section-label {
  color: var(--color-meta);               /* Non-interactive meta gray */
  pointer-events: none;                   /* Cannot be clicked */
  margin-bottom: var(--space-md);         /* 1rem space to buttons */
}
```

**Design Principles:**
- **Minimal UI:** No borders or backgrounds - only text and underline indicator
- **Clear Affordance:** 2px bottom border appears on hover and selection
- **Color Differentiation:** Static "Filter" label stays meta gray, interactive buttons change to muted blue
- **Muted Palette:** Uses `--color-accent-hover` (#93c5fd) not electric blue for softer appearance
- **Systematic Spacing:** Reduced letter-spacing (0.02em) creates tighter, more refined feel
- **Rams Principle:** Pure function without decoration

**Interaction Pattern:**
- Default: Meta gray text, no underline (subtle invitation)
- Hover: Muted blue text + underline (indicates interactivity)
- Active: Muted blue text + underline (maintains consistency with hover)
- Label: Always meta gray (non-interactive, descriptive only)

### Tag System Components

#### Topic Links (Homepage)
```scss
.topic-link {
  display: inline-block;
  background: var(--color-charcoal);
  border: 1px solid var(--color-graphite);
  border-radius: var(--border-radius);
  padding: var(--space-xs) var(--space-sm);  /* Factor-based padding */
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-graphite);
    border-color: var(--color-accent-subtle);
    transform: translateY(-1px);             /* Subtle elevation */
  }
}
```

#### Tag Page Navigation (Steph Ango Pattern)
```scss
.tag-page-title {
  font-size: 2rem;
  font-weight: var(--font-weight-normal);    /* Slimmer typography */
  margin-bottom: var(--space-sm);            /* Systematic spacing */
  color: var(--color-cream);                 /* Tag name in cream */
  
  a {
    color: var(--color-meta);                /* "Topics" link in meta gray */
    text-decoration: none;
    
    &:hover {
      color: var(--color-accent-hover);      /* Consistent hover state */
    }
  }
}

.tag-meta {
  color: var(--color-meta);
  font-size: 1rem;
  margin-bottom: var(--space-xl);            /* Section spacing consistency */
}
```

**Tag Design Principles:**
- **Color Hierarchy:** "Topics" (meta gray) vs tag name (cream) for clear navigation
- **Typography:** Slimmer font weight following Steph Ango patterns
- **Spacing:** Factor-based margins using systematic variables
- **Interaction:** Subtle hover states with consistent accent colors

---

## 6. Systems Guidelines for Future Development

### Making Systematic Design Decisions

**✅ DO: Use Factor-Based Thinking**
```scss
/* Good - uses mathematical relationship */
margin: calc(var(--space-xl) * 1.5) 0;

/* Good - derives from base spacing */
padding: var(--space-md) var(--space-lg);

/* Good - systematic tag page spacing */
.tag-page-title { margin-bottom: var(--space-sm); }
.tag-meta { margin-bottom: var(--space-xl); }
```

**❌ DON'T: Use Arbitrary Values**
```scss
/* Bad - magic number with no system relationship */
margin: 47px 0;

/* Bad - inline styles that can't be systematically updated */
style="margin-top: 2.3rem;"

/* Bad - inconsistent tag styling */
.tag-title { margin-bottom: 0.3rem; }
```

### Adding New Components

**1. Spacing:** Use existing `--space-*` variables or create factors of them
**2. Colors:** Use existing palette or add systematic variables to `:root`
**3. Typography:** Follow established hierarchy relationships
**4. Dividers:** Always use `var(--color-divider)` for consistency
**5. Navigation:** Use color hierarchy patterns (meta gray for secondary, cream for primary)
**6. Interactive Elements:** Follow hover state patterns with `var(--color-accent-hover)`

### Scaling the System

**Factor Adjustments:**
```scss
/* To increase all HR spacing proportionally: */
hr { margin: calc(var(--space-xl) * 1.2) 0 calc(var(--space-xl) * 1.8) 0; }
/* Maintains 2:3 ratio while scaling up */
```

**Color System Extensions:**
```scss
/* Add new systematic colors following the pattern: */
--color-success: rgba(34, 197, 94, 0.8);   /* Green with systematic opacity */
--color-warning: rgba(251, 191, 36, 0.8);  /* Yellow with systematic opacity */
```

---

## 7. Link System

### Universal Link Behavior

**All links share consistent styling:**

```scss
a {
  color: var(--color-stone);                     /* Subtle default color */
  text-decoration: underline;
  text-decoration-color: var(--color-stone);     /* Matching underline */
  text-underline-offset: 0.2em;                 /* Systematic offset */
  transition: color 200ms ease, text-decoration-color 200ms ease;
}

a:hover {
  color: var(--color-accent-hover);              /* Blue hover */
  text-decoration-color: var(--color-accent-hover); /* Matching underline */
}
```

**Special Case: Latest Note Title Hover**
The latest note title heading has a unique hover behavior where only the text color changes (without underline change) to maintain visual hierarchy:

```scss
.latest-title-link:hover .latest-title {
  color: var(--color-accent-hover);
}
```

**External Link Differentiation:**
- ↗ arrow indicator with `--color-warm-gray`
- Italic styling to distinguish from internal links
- No underline on arrow icon

---

## 8. Implementation Patterns

### Universal Rules Over Specific Overrides

**✅ Systematic Approach:**
```scss
/* One rule affects all content containers */
main { margin: calc(var(--space-xl) * 1.25) 0 var(--space-xl) 0; }
```

**❌ Individual Overrides:**
```html
<!-- Avoid scattered inline styles -->
<article style="margin-top: 3.75rem;">
<div style="margin-top: 60px;">
```

### CSS Custom Properties for Systematic Control

**✅ Variables for Mathematical Relationships:**
```scss
:root {
  --section-spacing-factor: 1.25;           /* Factor for section spacing */
  --divider-opacity: 0.6;                   /* Systematic divider opacity */
}

.latest-section {
  margin-top: calc(var(--space-xl) * var(--section-spacing-factor));
}
```

---

## 9. Responsive Behavior

### Systematic Breakpoints

```scss
/* Mobile-first with systematic scaling */
@media (max-width: 600px) {
  body { padding: var(--space-lg) 4vw; }     /* Scales down systematically */
}

@media (min-width: 820px) {
  body { 
    font-size: 1.05rem;                     /* 5% increase */
    line-height: 1.75;                      /* Proportional line-height */
  }
}
```

---

## 10. Quality Assurance Checklist

### Before Making Changes

- [ ] Does this use existing spacing variables or create systematic factors?
- [ ] Are colors drawn from the established palette?
- [ ] Do spacing relationships maintain mathematical harmony?
- [ ] Can this change be made universally rather than specifically?
- [ ] Does this improve the system or just solve an isolated problem?

### After Implementation

- [ ] Do all similar elements now behave consistently?
- [ ] Are there new arbitrary values that should be systematized?
- [ ] Can this pattern be documented for future reuse?
- [ ] Does the change scale properly across breakpoints?

---

This design system creates **mathematical harmony** through factor-based relationships while maintaining the cozy, contemplative aesthetic. Every spacing decision derives from systematic thinking rather than visual approximation.

**Key Philosophy:** *Changes should improve the entire system, not just individual components.*

### Tag System Integration

The tag system demonstrates systematic design principles:

**Automated Generation:** Jekyll plugin creates consistent page structure
**Color Hierarchy:** Breadcrumb navigation uses differential colors for clarity
**Typography Scale:** Follows established font weight and size relationships
**Spacing Rhythm:** All margins use systematic `--space-*` variables
**Interaction Patterns:** Hover states follow established accent color system

**Technical Implementation:**
- Template-driven tag pages ensure visual consistency
- Manual tag collection handles Jekyll collection limitations
- Smart pluralization maintains professional content presentation
- Clean URL structure follows SEO best practices

---

## 11. Animation Palette & Presentation

Purpose: Establish consistent, quiet presentations for animated ASCII pieces that harmonize with the site’s warm, dark aesthetic.

Reference
- Canonical examples and approved palettes live in `docs/animations/ascii-petals-style-guide.html`.

Approved Variants (Pairs)
- Plain — Cream: no frame or paper; bright cream/white glyphs on the site background.
- Noir — Framed Cream: deep charcoal “paper” with a 1px border; cream/white glyphs.
- Plain — Blue: no frame or paper; blue glyphs.
- Indigo — Framed Blue: indigo “paper” with a 1px border; blue glyphs.

System Rules
- No shadows or vignettes: framed variants use only background color + 1px border to match the site’s quiet aesthetic.
- Colors via CSS variables on the wrapper:
  - `--paper`: canvas background (use `transparent` for Plain variants)
  - `--accent`, `--accent2`: glyph color stops for the pulsing blend
- Accessibility: animations honor `prefers-reduced-motion: reduce` (render a static frame).

Color Tokens
- Cream pair: `--accent: #ffffff`, `--accent2: #e8ddd4`
- Blue pair: `--accent: #3b82f6`, `--accent2: #93c5fd`
- Papers: `#151311` (Noir), `#0f1218` (Indigo), or `transparent` (Plain variants)

Usage Pattern
Wrap the canvas in a container that defines the palette via CSS variables. The renderer reads colors from the closest wrapper.

```html
<section class="ascii ascii-noir-cream"
  style="--paper:#151311; --accent:#ffffff; --accent2:#e8ddd4; border:1px solid var(--color-graphite); background: var(--color-charcoal);">
  <canvas width="920" height="920"></canvas>
  <!-- animation script reads --paper/--accent/--accent2 from this wrapper -->
  <!-- no shadows; only simple background + 1px border for framed variants -->
  <!-- use transparent paper for Plain variants -->
</section>
```

Future Extraction
- Extract these into `_sass/_ascii.scss` as reusable classes (e.g., `.ascii-plain-cream`, `.ascii-noir-cream`, `.ascii-plain-blue`, `.ascii-indigo-blue`) to standardize usage across pages.
