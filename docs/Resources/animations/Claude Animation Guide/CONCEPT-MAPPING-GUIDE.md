# Concept → Visual Animation Mapping System
## A generative style guide for creating animations from concepts

---

## How to Use This Guide

1. **Identify the core concept** from your text
2. **Map to a visual pattern** using the table below
3. **Apply the parameter constraints** from The Way of Code
4. **Generate the animation** with those specific values

---

## Core Concept Categories & Visual Mappings

### 1. TIME & EROSION
**When the concept involves:** passage of time, wear, patina, accumulated use, generations

**Visual Pattern:**
- Structure: Horizontal layers (representing stair steps, sediment, accumulation)
- Emphasis: Center density higher (where wear occurs)
- Motion: Vertical wave, very slow (±2% over 15s+)

**Parameters:**
```javascript
{
  pattern: 'horizontal_layers',
  emphasis: 'center',
  characters: ['.', '·', ':', '∶', '|', '‖'], // gradual density
  motion: {
    type: 'vertical_wave',
    amplitude: '2%',
    duration: '15s',
    easing: 'ease-in-out'
  },
  colors: {
    primary: '#333333', // stone/charcoal
    background: '#F0EEE6' // cream
  }
}
```

**Keywords that trigger this pattern:**
- "worn", "erosion", "generations", "slowly", "time", "patina", "use over time", "staircase"

---

### 2. CONNECTION & WEAVING
**When the concept involves:** relationships, threads, crossing paths, function + beauty, mending

**Visual Pattern:**
- Structure: Multiple sinusoidal paths intersecting
- Emphasis: Intersection points
- Motion: Different phase offsets per thread (±3% over 12s)

**Parameters:**
```javascript
{
  pattern: 'weaving_threads',
  thread_count: 3,
  characters: ['/', '\\', '|', '—', '~', '╱', '╲'], // directional
  motion: {
    type: 'sinusoidal_paths',
    phase_offset: [0, 'π*2/3', 'π*4/3'],
    amplitude: '3%',
    duration: '12s',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  },
  colors: {
    threads: ['#e8a76e', '#93c5fd', '#8b8680'], // warm, cool, neutral
    background: '#F0EEE6'
  }
}
```

**Keywords that trigger this pattern:**
- "weave", "thread", "connection", "crossing", "paths", "mend", "repair", "intertwine", "together"

---

### 3. PRACTICE & ACCUMULATION
**When the concept involves:** meditation, sustained practice, ripples, building capacity, repetition

**Visual Pattern:**
- Structure: Concentric ripples from center
- Emphasis: Multiple frequency layers
- Motion: Expanding waves outward (±2% over 10-12s)

**Parameters:**
```javascript
{
  pattern: 'ripples',
  center: 'true',
  characters: ['·', ':', '∴', '⋮', '○', '◦'], // density increases
  motion: {
    type: 'expanding_waves',
    frequencies: [0.25, 0.4, 0.6], // multiple ripple frequencies
    amplitude: '2%',
    duration: '12s',
    easing: 'ease-in-out'
  },
  colors: {
    primary: '#333333',
    background: '#F0EEE6'
  },
  fade: 'radial_from_center' // fade toward edges
}
```

**Keywords that trigger this pattern:**
- "practice", "meditation", "ripples", "capacity", "sustained", "repetition", "building", "accumulation", "layers"

---

### 4. EMERGENCE & TRANSFORMATION
**When the concept involves:** growth from difficulty, lotus from mud, clarity from density, becoming

**Visual Pattern:**
- Structure: Vertical gradient (dense bottom → sparse top)
- Emphasis: Bottom-to-top transition
- Motion: Subtle upward drift (±1.5% over 14s)

**Parameters:**
```javascript
{
  pattern: 'vertical_gradient',
  direction: 'bottom_to_top',
  characters: ['▓', '▒', '░', '∙', '·', '˙'], // dense to sparse
  motion: {
    type: 'upward_drift',
    amplitude: '1.5%',
    duration: '14s',
    easing: 'ease-in-out'
  },
  colors: {
    primary: '#333333',
    background: '#F0EEE6'
  },
  gradient: {
    start_density: 1.0, // bottom (mud)
    end_density: 0.2    // top (lotus)
  }
}
```

**Keywords that trigger this pattern:**
- "emerge", "lotus", "mud", "grow", "transform", "clarity", "difficult", "foundation", "become", "rise"

---

### 5. CONTINUITY & SUSTAINED FLOW
**When the concept involves:** ongoing practice, never stopping, flow, years, the long view

**Visual Pattern:**
- Structure: Continuous spiral or flowing path
- Emphasis: Path never breaks
- Motion: Constant rotation/evolution (±2% over 18-20s)

**Parameters:**
```javascript
{
  pattern: 'continuous_path',
  path_type: 'spiral',
  characters: ['~', '≈', '∼', '⁓', '∿', '〰'], // flow characters
  motion: {
    type: 'continuous_rotation',
    amplitude: '2%',
    duration: '20s',
    easing: 'linear', // never stops
    direction: 'infinite'
  },
  colors: {
    primary: '#333333',
    background: '#F0EEE6'
  },
  fade: {
    type: 'breathing',
    cycle: 'along_path' // pulsing along the path
  }
}
```

**Keywords that trigger this pattern:**
- "continuous", "sustained", "years", "never stops", "flow", "ongoing", "long view", "practice across time", "space"

---

## The Way of Code Constraints (Always Apply)

```javascript
const CONSTRAINTS = {
  motion: {
    drift_range: '1-5%',       // Never exceed 5%
    duration_range: '8-20s',   // Slow, patient
    pulse_scale: '0.98-1.02',  // Subtle breathing
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' // Smooth
  },
  
  colors: {
    palette: 'muted',          // No bright, loud colors
    contrast: 'low-moderate',  // Gentle on the eyes
    background: ['#F0EEE6', '#FDFCF9'], // Cream/off-white
    foreground: ['#1a1816', '#333333']  // Charcoal/dark
  },
  
  fade: {
    duration: '0.8-1.5s',
    delay: '0.2-0.5s',
    stagger: '0.1-0.4s' // between elements
  },
  
  accessibility: {
    prefers_reduced_motion: true, // Always respect
    static_fallback: true          // Show static frame
  }
}
```

---

## Example: Generating from Your Text

### Input Text:
> "I enjoy function and public utility. The weave between practical and beauty. A stone staircase with slowly rounded edges, curved by generations of feet stepping into a library."

### Analysis:
1. **Primary concept:** TIME & EROSION (stone staircase, generations, curved by use)
2. **Secondary concept:** CONNECTION (weave between practical and beauty)
3. **Tertiary concept:** ACCUMULATION (stepping, repeated action)

### Recommended Pattern:
**Pattern 1 (Primary):** TIME & EROSION
- Horizontal layers representing steps
- Center erosion where feet fall
- Very slow vertical wave motion

**With influence from:**
- CONNECTION: Add subtle secondary threading element
- ACCUMULATION: Hint of layered density

### Generated Parameters:
```javascript
{
  name: "Stone Staircase",
  pattern: 'horizontal_layers_with_threading',
  
  primary: {
    type: 'erosion',
    characters: ['.', '·', ':', '∶', '|', '‖'],
    center_emphasis: 0.8, // strong center wear
    motion: {
      type: 'vertical_wave',
      amplitude: '2%',
      duration: '15s'
    }
  },
  
  secondary: {
    type: 'subtle_threads',
    characters: ['~', '—'],
    density: 0.15, // very subtle
    colors: ['#8b8680'] // neutral thread
  },
  
  colors: {
    primary: '#333333',
    background: '#F0EEE6'
  }
}
```

---

## Prompt Template for LLM

When generating a new animation, use this template:

```
Given this concept:
"[INSERT CONCEPT TEXT]"

1. Identify the core concept category:
   - TIME & EROSION
   - CONNECTION & WEAVING
   - PRACTICE & ACCUMULATION
   - EMERGENCE & TRANSFORMATION
   - CONTINUITY & FLOW

2. Apply the corresponding visual pattern parameters

3. Respect The Way of Code constraints:
   - Motion: 1-5% drift, 8-20s duration
   - Colors: muted palette, cream background
   - Easing: cubic-bezier(0.4, 0.0, 0.2, 1)
   - Accessibility: prefers-reduced-motion support

4. Generate:
   - HTML canvas element
   - JavaScript animation code
   - CSS with proper scene structure

5. Output should include:
   - Scene header with number, title, description
   - Canvas with specified dimensions
   - Animation loop with proper timing
   - Concept mapping note for reference
```

---

## Quick Reference Chart

| Concept Keywords | Pattern | Motion Type | Duration | Characters |
|------------------|---------|-------------|----------|------------|
| worn, erosion, time, generations | Horizontal layers | Vertical wave | 15s+ | . · : ∶ \| ‖ |
| weave, thread, connect, mend | Weaving paths | Sinusoidal | 12s | / \\ ~ ╱ ╲ |
| practice, meditation, ripples | Center ripples | Expanding waves | 10-12s | · : ∴ ○ ◦ |
| emerge, lotus, mud, transform | Vertical gradient | Upward drift | 14s | ▓ ▒ ░ ∙ · |
| continuous, sustained, years | Spiral flow | Rotation | 18-20s | ~ ≈ ∼ ⁓ ∿ |

---

## Combination Rules

When concepts overlap, blend patterns:

1. **Primary pattern** = dominant visual structure (60-70%)
2. **Secondary pattern** = subtle influence (20-30%)
3. **Tertiary pattern** = hint or accent (10%)

**Example:**
- Primary: EROSION (horizontal layers)
- Secondary: CONNECTION (add thin thread)
- Result: Layered steps with a subtle weaving thread through them

---

## Next Steps

1. Test the refined system (`refined-system.html`)
2. Create variations by tweaking parameters
3. Build a parameter editor UI for live tweaking
4. Generate new concepts using the mapping table
5. Document successful parameter combinations

---

**Remember:** The goal is **restraint, subtlety, and coherence**. Every animation should feel like it emerged naturally from the concept, not imposed upon it.
