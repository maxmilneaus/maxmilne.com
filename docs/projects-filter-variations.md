---
title: Projects Filter Variations
layout: note
---

# Projects Filter Prototypes
*Four alternate treatments for the Projects page filter controls*

**Context:** These options build on the existing factor-based spacing, color architecture, and typography defined in `docs/STYLE_GUIDE.md`. Each variation retains the current markup (`<div class="project-filters">`) and can be activated by adding a modifier class on the parent container. Apply only one variant at a time.

---

## Variation A — Segmented Pill Bar
**Mood:** Calm control bar that echoes analog audio gear.

- **Structure:** Add `project-filters--segmented` to the `.project-filters` wrapper.
- **Behavior:** Active segment uses a subtle glow to suggest selection; inactive pills sit on a shared rail.
- **System alignment:** Uses charcoal rail (`--color-charcoal`) with graphite border and accent hover color.

```html
<div class="project-filters project-filters--segmented" data-project-filter>
  …
</div>
```

```scss
.project-filters--segmented {
  background: rgba(var(--color-charcoal-rgb), 0.65);
  border: 1px solid var(--color-graphite);
  border-radius: calc(var(--border-radius) * 1.5);
  padding: var(--space-xs);
  gap: var(--space-xs);
}

.project-filters--segmented .project-filter {
  flex: 1 0 auto;
  border: none;
  background: transparent;
  color: var(--color-cream);
  padding: var(--space-xs) var(--space-md);
  border-radius: calc(var(--border-radius) * 1.25);

  &:hover {
    background: rgba(var(--color-accent-subtle-rgb), 0.08);
    color: var(--color-accent-hover);
  }

  &.is-active {
    background: linear-gradient(
      135deg,
      rgba(var(--color-accent-subtle-rgb), 0.35),
      rgba(var(--color-accent-hover-rgb), 0.15)
    );
    color: var(--color-deep);
  }
}
```

**Notes:** Requires RGB custom properties for `--color-charcoal` and `--color-accent-subtle`. If they are not defined, add them alongside existing color variables using the same hex values.

---

## Variation B — Baseline Underline Tabs
**Mood:** Editorial navigation with a Steph Ango–inspired underline.

- **Structure:** Add `project-filters--underline`.
- **Behavior:** Filters display as text tabs; active tab shows a cream underline aligned to the text baseline.
- **System alignment:** Respects typography hierarchy (1rem base) and uses meta gray for inactive states.

```html
<div class="project-filters project-filters--underline" data-project-filter>
  …
</div>
```

```scss
.project-filters--underline {
  border-bottom: 1px solid var(--color-graphite);
  gap: var(--space-md);
  padding-bottom: var(--space-xs);
}

.project-filters--underline .project-filter {
  border: none;
  background: transparent;
  color: var(--color-meta);
  padding: 0;
  font-size: 1rem;
  letter-spacing: 0.03em;
  text-transform: none;
  position: relative;

  &:hover {
    color: var(--color-accent-hover);
  }

  &.is-active {
    color: var(--color-cream);
  }

  &.is-active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(-1 * var(--space-xs));
    height: 2px;
    background: var(--color-cream);
  }
}
```

**Notes:** Works best when the filter labels are short (one or two words). Keep the legacy uppercase pills available for mobile via a media query if preferred.

---

## Variation C — Ledger Stack
**Mood:** Minimal, vertical ledger reminiscent of project notebooks.

- **Structure:** Add `project-filters--stacked`.
- **Behavior:** Filters stack vertically on desktop, with a slim leading rule. Selected state shows a cream bullet and fills the background with a muted charcoal.
- **System alignment:** Uses section spacing (`--space-lg`) for breathing room and leverages the divider color variable.

```html
<div class="project-filters project-filters--stacked" data-project-filter>
  …
</div>
```

```scss
.project-filters--stacked {
  flex-direction: column;
  gap: var(--space-xs);
  padding-left: var(--space-sm);
  border-left: 2px solid var(--color-divider);
}

.project-filters--stacked .project-filter {
  border: none;
  background: transparent;
  color: var(--color-warm-gray);
  padding: var(--space-xs) 0;
  justify-content: flex-start;
  text-transform: none;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  position: relative;

  &::before {
    content: "•";
    color: transparent;
    margin-right: var(--space-sm);
    transition: color 200ms ease;
  }

  &:hover {
    color: var(--color-cream);
  }

  &.is-active {
    background: rgba(var(--color-charcoal-rgb), 0.6);
    color: var(--color-cream);

    &::before {
      color: var(--color-accent-subtle);
    }
  }
}

@media (max-width: 720px) {
  .project-filters--stacked {
    border-left: none;
    border-top: 1px solid var(--color-divider);
    padding-left: 0;
    padding-top: var(--space-sm);
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

**Notes:** The responsive fallback preserves discoverability on smaller screens. Adjust the breakpoint to suit your mobile layout.

---

## Variation D — Accent Capsule Strip
**Mood:** High-contrast strip that echoes the Latest section headline treatment.

- **Structure:** Add `project-filters--capsule`.
- **Behavior:** Capsules sit inside a charcoal strip with inset accent glow. Active capsule fills with the accent color and inverts text.
- **System alignment:** Reuses `--space-md` padding and accent hover color; integrates with body cream background on project detail pages.

```html
<div class="project-filters project-filters--capsule" data-project-filter>
  …
</div>
```

```scss
.project-filters--capsule {
  background: linear-gradient(
    180deg,
    rgba(var(--color-charcoal-rgb), 0.9),
    rgba(var(--color-graphite-rgb), 0.9)
  );
  border: 1px solid rgba(var(--color-graphite-rgb), 0.8);
  border-radius: calc(var(--border-radius) * 2);
  padding: var(--space-xs) var(--space-sm);
  gap: var(--space-sm);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.project-filters--capsule .project-filter {
  border: none;
  background: rgba(0, 0, 0, 0.2);
  color: var(--color-cream);
  padding: var(--space-xs) var(--space-md);
  border-radius: calc(var(--border-radius) * 1.75);
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.1em;

  &:hover {
    background: rgba(var(--color-accent-subtle-rgb), 0.2);
    color: var(--color-accent-hover);
  }

  &.is-active {
    background: var(--color-accent-subtle);
    color: var(--color-deep);
    box-shadow: 0 2px 6px rgba(var(--color-accent-subtle-rgb), 0.25);
  }
}
```

**Notes:** The uppercase typography mirrors the current design but tightens letter spacing for a more engineered feel. Consider pairing with a subtle `backdrop-filter: blur(6px)` if the page background is visible beneath the strip.

---

### Implementation Tips
1. Define complementary `--*-rgb` variables alongside existing hex colors to support transparent layers (e.g., `--color-charcoal-rgb: 32, 29, 26;`).
2. Add one modifier class at a time to `.project-filters`. Keep the base styles intact so reverting is instant.
3. Test in both default dark pages and cream project detail pages (`body.project-page`) to ensure contrast and hover states remain accessible.

Pick the variant that best matches the story you want the Projects page to tell. Let me know which direction resonates and I can wire it in fully.
