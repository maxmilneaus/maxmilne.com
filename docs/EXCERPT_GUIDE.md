# Writing Excerpts Guide

## Overview

The writing section displays brief excerpts below each post title to help visitors assess relevance without clicking into every post. This reduces decision fatigue and improves content discoverability.

## How It Works

### Automatic Excerpt Generation

The system automatically generates excerpts using Jekyll's built-in excerpt functionality:

```liquid
{% if note.excerpt %}
  {% assign excerpt_text = note.excerpt | strip_html | truncatewords: 30, "..." %}
  <div class="article-excerpt">{{ excerpt_text }}</div>
{% endif %}
```

**Default behavior:**
- Jekyll automatically extracts the first paragraph of your post as the excerpt
- The excerpt is limited to 30 words
- HTML tags are stripped
- Ellipsis ("...") is added if truncated

### Custom Excerpts (Recommended)

For better control, add a custom `excerpt` to your post's front matter:

```markdown
---
title: Your Post Title
layout: note
tags:
  - tag1
  - tag2
date: 2025-11-05
excerpt: "A concise, compelling summary of your post in 25-30 words that helps readers decide if they want to read more."
---

Your post content begins here...
```

## Writing Good Excerpts

### Best Practices

1. **Be Specific** - Describe what the post actually covers
   - ✓ "Exploring how local LLMs can preserve client privacy in therapeutic work"
   - ✗ "Some thoughts on technology and therapy"

2. **Front-Load Value** - Put the most important words first
   - ✓ "Social Meditation uses spoken noting to build relational awareness through..."
   - ✗ "Recently, I've been exploring a practice called Social Meditation which..."

3. **Match Your Voice** - Keep the tone consistent with your writing
   - Your excerpts should feel like natural extensions of your posts
   - Maintain authenticity without overselling

4. **Optimal Length** - Aim for 20-30 words
   - Short enough to scan quickly
   - Long enough to convey substance
   - The system truncates at 30 words regardless

### Examples from the Site

**Good excerpt:**
```markdown
excerpt: "My creative practice centers on working emergently within constraints—trusting what wants to emerge when I show up consistently to the work."
```
Why it works: Specific, actionable, gives clear sense of approach

**Needs improvement:**
```markdown
excerpt: "Coming soon."
```
Why it doesn't work: No information, no value, creates dead end

## Technical Implementation

### File Structure

**Layout file:** `_layouts/writing.html`
- Loops through `site.notes`
- Extracts excerpt for each note
- Displays with proper markup

**Styling:** `_sass/_writing2.scss`
- `.article-excerpt` class
- Aligned with title column on desktop
- Full-width on mobile
- Uses `--color-meta` for subtle hierarchy

### Styling Details

```scss
.article-excerpt {
  color: var(--color-meta);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: var(--space-xs);
  padding-left: calc(5.5rem + var(--space-md)); // Aligns with title
}

@media (max-width: 600px) {
  .article-excerpt {
    padding-left: 0;
    margin-top: var(--space-sm);
  }
}
```

## Adding Excerpts to Existing Posts

### Quick Update Process

1. Open the note file (e.g., `_notes/Your Post.md`)
2. Add excerpt to front matter:
   ```markdown
   ---
   title: Your Post Title
   excerpt: "Your 20-30 word summary here"
   ---
   ```
3. Save and rebuild site

### Bulk Update Checklist

For updating multiple posts at once:

- [ ] List all notes that need excerpts
- [ ] Read first paragraph of each
- [ ] Extract or write compelling 25-30 word summary
- [ ] Add to front matter
- [ ] Test locally to ensure proper display
- [ ] Commit changes

## Design Philosophy

**Why excerpts improve attention economy:**

1. **Reduces Clicks** - Visitors can assess relevance before clicking
2. **Improves Scannability** - Quick overview of available content
3. **Maintains Flow** - Doesn't disrupt the clean list layout
4. **Respects Time** - Helps readers find what they actually want
5. **Feels Intelligent** - Site appears curated and thoughtful

**Balance maintained:**
- Excerpts don't dominate the page
- Still scannable by title alone if desired
- Color hierarchy keeps focus on titles
- Mobile layout adapts gracefully

## Troubleshooting

### Excerpt not appearing?
- Check that front matter includes `excerpt: "..."`
- Verify excerpt is not empty
- Rebuild Jekyll site (`bundle exec jekyll serve`)

### Excerpt too long?
- System automatically truncates at 30 words
- Write custom excerpt under 30 words for clean appearance

### Styling issues?
- Check `_sass/_writing2.scss` for `.article-excerpt` class
- Verify proper spacing variables are defined
- Test mobile responsive behavior

## Future Enhancements

Possible improvements to consider:

- [ ] Add excerpt length guidelines to new post templates
- [ ] Create excerpt template for common post types
- [ ] A/B test 25 vs 30 word limit for optimal scannability
- [ ] Add excerpt to RSS feed for better discoverability
- [ ] Consider showing excerpt on hover vs. always visible

---

**Last Updated:** November 5, 2025
**Pattern Type:** Content Discovery / Attention Economy
**Related:** STYLE_GUIDE.md, TECHNICAL_GUIDE.md
