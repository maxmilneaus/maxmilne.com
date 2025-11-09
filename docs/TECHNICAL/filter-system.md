# Filter System

**Purpose:** Document how the topic/category filters work on `/projects` and `/writing`, including the current November 2025 refresh that moved the writing filters into the inline “all • topic, topic…” presentation.

**Last updated:** 2025-11-09

---

## Quick Summary

| Page | Layout file | Stylesheet | JS selector | Notes |
|------|-------------|------------|-------------|-------|
| `/projects/` | `_layouts/projects.html` | `_sass/_projects.scss` | `[data-project-filter] .project-filter` | Pill buttons + grid of cards. Includes `.is-first-visible` helper. |
| `/writing/` | `_layouts/writing.html` | `_sass/_writing.scss` | `[data-writing2-filter] .writing2-topic-trigger` | Inline comma list with dedicated “all” button and bullet separator. |

Both pages share the same filtering approach:

1. Build step writes a `data-tag-slugs` attribute on every entry (projects and notes) containing space-delimited, slugified tags.
2. Filter buttons expose their target slug via `data-filter`, with `all` as the catch-all.
3. A tiny vanilla JS helper listens for clicks, toggles `is-active`/`aria-pressed`, and hides entries whose `data-tag-slugs` do not include the active slug.

---

## Data Attributes

| Attribute | Added in | Example | Purpose |
|-----------|----------|---------|---------|
| `data-tag-slugs` | `_layouts/projects.html` and `_layouts/writing.html` loops | `data-tag-slugs="therapy meditation"` | Allows the client-side script to check membership without recomputing slugs. |
| `data-filter` | Filter buttons | `data-filter="meditation"` | Tells the script which slug to match. |
| `data-project-filter` / `data-writing2-filter` | Filter container wrappers | `<div data-writing2-filter>` | Scoped listener target so the script can bail if JS loads on a page without filters. |

Slug source of truth: Liquid `slugify` filter applied during the loop, so both the buttons and the entry attribute use identical tokens.

---

## Writing Filter (2025-11 refresh)

**Markup:** `_layouts/writing.html`

```html
<div class="writing2-topic-row" data-writing2-filter>
  <button class="writing2-topic-trigger writing2-topic-all is-active" data-filter="all" aria-pressed="true">all</button>
  <ul class="topics-list writing2-topic-list writing2-topic-stream">
    {% for tag in tag_collection %}
      <li class="topic-item">
        <button class="topic-link writing2-topic-trigger" data-filter="{{ tag_slug }}" aria-pressed="false">{{ tag }}</button>
      </li>
    {% endfor %}
  </ul>
</div>
```

**Styling:** `_sass/_writing.scss`

- Flex row keeps “all” separated from the comma list.
- `.writing2-topic-stream::before` draws the `•` bullet so wraps begin under the first specific topic instead of under “all”.
- Hover state uses warm gray; only the active topic receives the blue underline (`var(--color-accent-hover)`).
- Mobile breakpoint stacks the row and tucks the bullet closer (`margin-right: 0.4rem`).

**Script fragment:**

```js
var filterContainer = document.querySelector('[data-writing2-filter]');
var buttons = Array.prototype.slice.call(filterContainer.querySelectorAll('.writing2-topic-trigger'));

function setActiveButton(activeButton) {
  buttons.forEach(function (btn) {
    var isActive = btn === activeButton;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function applyFilter(slug) {
  entries.forEach(function (entry) {
    var tags = (entry.dataset.tagSlugs || '').split(' ').filter(Boolean);
    entry.classList.toggle('is-hidden', slug !== 'all' && tags.indexOf(slug) === -1);
  });
}
```

The JS now references `.writing2-topic-trigger` everywhere; the legacy `.writing2-filter` class was removed when we inlined the topics.

**Why the refresh:** The previous filter bar repeated the projects UI (pills + “more →” button) and felt disconnected from `/topics`. The new approach:

1. Mirrors the `/topics` taxonomy (comma-separated text) for continuity.
2. Keeps “all” visually distinct so visitors know the difference between “show everything” vs “narrow down”.
3. Ensures wraps occur under the first topic, reinforcing the mental grouping “All • {selected topic list}”.

---

## Projects Filter (for comparison)

Nothing changed in this round, but for completeness:

- Buttons live inside `.project-filter-group` with `data-project-filter`.
- Each button toggles `.is-active` and `aria-pressed` exactly like the writing filters.
- Helper classes `.is-first-visible` / `.is-last-visible` are recalculated after every filter run so padding/borders collapse properly.
- Styles remain in `_sass/_projects.scss`.

---

## Testing & Maintenance Checklist

1. **After any Sass/layout change** run `bundle exec jekyll build` to regenerate `_site/styles.css`.
2. **Manual QA:** Load `/writing/` and `/projects/`, click every filter, confirm the entry list updates and `aria-pressed` toggles (inspectors should show `true` on the active button).
3. **Regressions to watch:**
   - Missing `data-tag-slugs` attribute (will hide everything because the JS sees empty arrays).
   - Forgetting to slugify new tags in the loop.
   - Removing `.writing2-topic-stream::before` (will break the dot/wrapping relationship).

---

## Related Files

- `_layouts/projects.html`
- `_layouts/writing.html`
- `_sass/_projects.scss`
- `_sass/_writing.scss`
- `docs/Design Ideas/writing-filter-variations.html` (prototype playground)

