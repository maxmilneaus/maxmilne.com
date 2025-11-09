# Website Documentation

**Max Milne's Personal Website** - Extended CV / artist profile showcasing therapy practice, creative work, and contemplative explorations.

**Live site:** http://127.0.0.1:4000 (local) | [Production URL]

---

## Quick Start (5 Minutes)

### Running Locally

```bash
# Install dependencies (first time only)
bundle install

# Start local server
bundle exec jekyll serve

# Open browser to http://127.0.0.1:4000
```

### Making Changes

1. **Visual updates** (colors, typography, spacing) → Edit values in **STYLE_GUIDE.md**
2. **Understanding strategy** (why pages exist, attention economy) → Read **VISION.md**
3. **Technical changes** (filters, recommendations, build) → See **TECHNICAL/**
4. **Decision context** (why we made specific choices) → Read recent **LOG/** entries

---

## How to Use This Documentation

**Start here:** You are here! Read this first.

**Understand the vision:** → **VISION.md**
- Site purpose and identity
- Design philosophy (Mys, Lagom, Rams - WHY they matter)
- Page intentions (Homepage = action gateway, About = trust building, etc.)
- Attention economy principles

**Maintain visual consistency:** → **STYLE_GUIDE.md**
- Color palette (hex values)
- Typography scale
- Spacing system (factor-based)
- Component appearance patterns
- Quick visual reference only (no reasoning or implementation)

**Make technical changes:** → **TECHNICAL/INDEX.md**
- File structure and organization
- How Jekyll build works
- How filter system works
- How recommendations algorithm works
- Implementation details by topic

**Understand decisions:** → **LOG/**
- Read the 5 most recent entries to get up to speed
- Chronological decision history
- Context, reasoning, and consequences for each choice
- Helps you "think like Max"

---

## LLM Onboarding Path

**Quick Start (15 minutes):**
1. Read this README (3 min)
2. Read VISION.md (7 min)
3. Read last 5 LOG entries (5 min)

**Full Context (30 minutes):**
1. Read this README (3 min)
2. Read VISION.md (7 min)
3. Skim STYLE_GUIDE.md (5 min)
4. Read last 5-10 LOG entries (10 min)
5. Reference TECHNICAL/INDEX.md as needed (5 min each section)

**For Specific Tasks:**
- Visual changes → STYLE_GUIDE.md + TECHNICAL/
- Content strategy → VISION.md + LOG/
- Build/deployment → TECHNICAL/build-system.md
- Filters/interactions → TECHNICAL/filter-system.md
- Understanding reasoning → LOG/ (chronological)

---

## File Structure

```
docs/
├── README.md (you are here - entry point)
├── VISION.md (strategic intent - north star)
├── STYLE_GUIDE.md (visual reference - values only)
├── DOCUMENTATION_RESTRUCTURE_PLAN.md (restructure project plan)
│
├── TECHNICAL/
│   ├── INDEX.md (overview + quick reference)
│   ├── file-structure.md (created as needed)
│   ├── build-system.md (created as needed)
│   ├── filter-system.md (created as needed)
│   ├── recommendations-algorithm.md (created as needed)
│   └── plugin-architecture.md (created as needed)
│
├── LOG/
│   └── YYYY-MM-DD-title.md (chronological decision entries)
│
├── Resources/
│   ├── Scripts/
│   ├── _drafts/
│   ├── animations/
│   └── start.sh
│
└── Archive/
    └── Old documentation versions
```

**LOG naming convention:** `YYYY-MM-DD-descriptive-title.md`
- Date-only format (no timestamps)
- Sorts chronologically automatically
- If multiple entries same day: add -01, -02 suffix

---

## Site Structure

**Pages:**
- `/` - Homepage (action gateway with clear CTAs)
- `/about` - Credentials & philosophy (trust-building)
- `/now` - Current work & explorations (hybrid action/info)
- `/projects` - Portfolio (15 years of creative work)
- `/writing` - Articles with topic filtering
- `/tags/[topic]/` - Tag pages for deep dives

**Key Principle:** Each page has ONE clear job. No page tries to do everything.

---

## Core Technologies

- **Jekyll** - Static site generator
- **Sass** - CSS preprocessing (`_sass/` folder)
- **JavaScript** - Filter interactions (minimal, vanilla JS)
- **Ruby Plugins** - Tag generation, recommendations algorithm

---

## Documentation Principles

### Single Source of Truth
Each fact lives in ONE place only:
- **VISION** = strategic intent and philosophy
- **STYLE_GUIDE** = visual appearance (what it looks like)
- **TECHNICAL** = implementation (how it works)
- **LOG** = decision history (why we chose this)

### LLM Optimization
- Self-contained sections (each doc can be read independently)
- Front-loaded context (important info at the top)
- Consistent structures (easy parsing)
- Document sharding (reduce context window)

### Immutability Gradient
- **VISION** - Changes rarely (north star is stable)
- **STYLE_GUIDE** - Changes occasionally (design evolution)
- **TECHNICAL** - Changes frequently (implementation details)
- **LOG** - Grows continuously (new entries added, old never edited)

---

## Common Tasks

### Add a New Project
1. Create file in `_projects/` folder
2. Add frontmatter (title, year, category, description)
3. Optionally add detail page content
4. Project auto-appears on /projects with filter

### Add a New Article
1. Create file in `_notes/` folder
2. Add frontmatter (title, date, tags)
3. Write content in markdown
4. Article auto-appears on /writing and tag pages
5. Recommendations auto-generated based on tags

### Update Colors
1. Edit values in STYLE_GUIDE.md
2. Update CSS variables in `_sass/_style.scss`
3. Document change in new LOG entry if significant

### Modify Filters
1. Understand current system: TECHNICAL/filter-system.md
2. Edit JavaScript in relevant SCSS file (_projects.scss or _writing.scss)
3. Test functionality
4. Document change in LOG if it's a design decision

---

## Need Help?

**For strategic questions:** Read VISION.md
**For visual questions:** Read STYLE_GUIDE.md
**For technical questions:** See TECHNICAL/
**For context on decisions:** Read LOG/ entries

**Getting started:** This README → VISION.md → last 5 LOG entries

---

**Last updated:** 2025-11-07
