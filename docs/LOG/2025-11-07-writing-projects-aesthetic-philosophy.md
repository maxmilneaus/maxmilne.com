# Writing vs Projects: Aesthetic Philosophy & Design Vision

**Date:** 2025-11-07
**Status:** Design exploration (not yet implemented)
**Context:** Deep conversation exploring the conceptual and visual distinction between Writing and Projects sections

---

## The Core Question

How can the aesthetic of Writing and Projects pages work better together while signaling different content states? Not just organization, but unconscious visual communication - like how different camera lenses (35mm vs 85mm) communicate different perspectives and purposes.

---

## Key Insight: "What's Cooking" vs "Boiled Down"

### The Fundamental Distinction

**Writing (including Photo Essays)**
- Things still frying in the pan
- What's cooking in Max's head
- Single ideas, thoughts, visual explorations
- In-process, first-person, conversational, storytelling perspective
- Gives visitors "a taste of what's cooking" - shows evolution of ideas
- Builds credibility by showing thinking, not just outcomes
- Content types: Articles, poems, photo essays, visual notebooks

**Projects**
- Things that have been boiled down, reduced, finished
- Completed works presented to public (exhibitions, distributions, formal offerings)
- Third-person, authoritative, case study presentation
- Shows range, capacity, professional work (Max Milne Photography, Studio Brunswick, etc.)

---

## Visual Metaphors for Design Consistency

### Writing/Photo Essays
- **Contact sheets** - Many frames visible, scanning
- **Film strips unrolling** - Horizontal exploration
- **Conversations** - Getting to know someone
- **Notebook pages** - The 1/20 that survived the recycling bin
- **Photojournalism** - Documenting what's being noticed, 35mm perspective
- **Visual characteristic:** Multiplicity, density, flow

### Projects
- **Exhibition prints** - Singular focus, framed and hung
- **Gallery wall** - Each work gets its moment
- **Long-term relationships** - vs conversations
- **Portrait lens** - Composed, considered, complete, 85mm perspective
- **Visual characteristic:** Singularity, spacious, bounded

---

## The "Museum of Self" Insight

**Deep realization during conversation:**
This site is a museum of self - ensuring photographer-Max, artist-Max, therapist-Max, and contemplative-Max all coexist without any disappearing. It keeps possibilities alive.

**Grief work:** Max noted difficulty "reconciling the death of me as a photographer and as an artist" and wanting to ensure those aspects don't get forgotten by self or world. The site architecture is about integration, not abandonment.

**Permission structure:** Writing provides permission to be in-process publicly while Projects maintains authority. Both are polished and intentional, but signal different states of "completeness" through subtle visual cues.

---

## Design Principle: Multiplicity vs Singularity

Research insight from architecture: "When a design is in flux, a photorealistic rendering signals completion and that design changes are no longer possible. Whereas, a non-photorealistic rendering suggests a sense of flux." (Jim Kessler)

**Applied to the site:** The level of visual "finish" signals status. Not about polish (both polished), but about unconscious cues of completeness.

### Visual Signifiers Table

| Design Element | Writing Page | Projects Page |
|----------------|-------------|---------------|
| **Density** | Tight vertical rhythm, more entries visible | Spacious, generous breathing room |
| **Entry Padding** | `0.35rem 0` (minimal) | `var(--space-md) 0` (comfortable) |
| **Borders** | None (seamless flow) | `1px solid var(--color-divider)` between entries |
| **Column Layout** | Date + Title (horizontal flex) | Year + Title + Description (grid) |
| **Column Gap** | `var(--space-md)` | `calc(var(--space-lg) * 1.25)` (wider gutter) |
| **Typography** | Simple, functional | Editorial with underlines |
| **Link Treatment** | Clean underline or fade | Decorative underline (0.06em thick, 0.12em offset) |
| **Hover Behavior** | Fade to 70% opacity | Background lift (rgba(255,255,255,0.02)) |
| **Time Markers** | Inline dates (YYYY · MM) | Year separators (fixed 100px column) |
| **Description** | None on index page | Always present (0.97rem, line-height 1.45) |
| **Filter Style** | Comma-separated, collapsible | Pill-style buttons, all visible |
| **Visual Feel** | Scanning, flow, stream-like | Browsing, discrete, card-like |

---

## Proposed Implementation Ideas

### 1. Content Type Indicators (Writing Page)

Visual key at top of Writing page:
- `~` (tilde/line) = Writing (text-based entry)
- `•` (dot) = Photo essay entry

**Design decisions:**
- Typographic marks preferred over emojis (too tacky) or squares (too many edges)
- Color: `var(--color-meta)` (subtle, not dominant)
- Minimal spacing after indicator
- All entries remain chronological regardless of type

### 2. Filter UI Enhancement (Writing Page)

**Default state:**
`[Key]  •  [Filter by topics ↓]`

**Expanded state:**
All topics drop down elegantly (no "more →" indicator)

**Behavior:**
- Smooth dropdown animation
- Stays within page padding (doesn't break layout)
- "Snakes back up" when collapsed
- Shows ALL topic options when expanded (like current topics page)

### 3. Photo Essay Detail Template

**Film strip metaphor:**
- Images break beyond text container boundaries
- Horizontal scroll or click-through navigation
- Title and intro/closing text stay within standard padding
- Creates "unrolling film" visual effect

**Standard Writing detail pages:**
- Single column, text-focused
- Generated icon/visual element per entry (system TBD - needs prompt template)
- First-person, conversational tone
- Optional single header image

### 4. Photography Integration

**Max Milne Photography work → Projects section**
- These were formal public offerings (exhibitions, client work)
- Could have "photography" filter tag on Projects page

**Exploratory photo series → Photo Essays in Writing**
- India series, nighttime Melbourne, visual notebooks
- These are visual explorations, "here's what I was seeing/noticing"

**Content evolution path (nice-to-have):**
- When note/writing becomes project: "This conversation became [Project Name]"
- Shows visible evolution from cooking → boiled down

---

## Philosophical Foundations

### Integration, Not Separation
Past work (Max Milne Photography), current work (Talk. Art. Therapy.), and emerging explorations all live together without hierarchy.

### Attention Economy
Maintain simple navigation (two main sections: Writing, Projects) while allowing content complexity within each section through filtering and templating.

### Lagom Principle
Each page has exactly what it needs - not too much, not too little. The distinction should be subtle but effective.

### Systems Thinking
Changes should be universal, factor-based. A single design decision (like spacing ratio) should ripple through consistently.

---

## What Makes This Different from Current State

**Currently:** Writing and Projects look quite different, but the conceptual "why" isn't articulated or systematically applied.

**Proposed:** Same visual polish across both, but deliberate signifiers (density, borders, spacing, indicators) that unconsciously communicate "contact sheet" vs "exhibition print."

**Currently:** No accommodation for photo essays or visual content in Writing section.

**Proposed:** Mixed content types (writing + photo essays) with visual indicators and template variations based on content type.

**Currently:** Filters always visible on Writing page (or hidden with "more →").

**Proposed:** Collapsible filter system that drops down elegantly, reducing visual noise while maintaining full functionality.

---

## Next Steps (Not Yet Scheduled)

1. Choose specific visual indicator treatment (finalize tilde/dot styling)
2. Prototype photo essay template with real content
3. Build collapsible filter UI
4. Create icon generation system prompt/workflow
5. Implement and test with real content
6. **Only after implementation:** Update VISION.md and STYLE_GUIDE.md with finalized approach

---

## Quotes & Analogies for Future Reference

**On lens metaphors:**
"35mm is like photojournalism. 50mm is like the eye. 85mm is a portrait lens. Different styles and aesthetics communicate something unconscious to the visual mind."

**On cooking analogy:**
"Writing is like little things you chuck in the fry pan, you're still frying it. Projects are those things that have been boiled down."

**On the site's purpose:**
"A museum to my older self. So they don't get forgotten by myself and the world."

**On credibility:**
"Writing shows what I'm thinking, creates credibility towards what I'm doing in the larger projects."

**On the core tension:**
"Does thinking out loud increase credibility? Or does showing messy exploration undermine authority needed for therapy work?"

**Resolution:** Design a system that lets Max be both exploratory (Writing) and authoritative (Projects) without contradiction.

---

**For implementation tracking:** See separate project document
**For current implemented state:** See VISION.md and STYLE_GUIDE.md
