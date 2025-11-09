# Animation System — README

A complete parametric animation system for generating concept-based ASCII animations following "The Way of Code" design principles.

---

## 📁 What You Have

### Core System Files

1. **`refined-system.html`** — Production-ready animations
   - 5 complete animations with proper constraints
   - Scene-based structure with CSS variables
   - Accessibility support (prefers-reduced-motion)
   - Concept mapping embedded in code comments

2. **`CONCEPT-MAPPING-GUIDE.md`** — Your visual vocabulary
   - Maps concepts → visual patterns
   - Parameter specifications for each pattern
   - Keywords that trigger each pattern
   - Combination rules for blending patterns

3. **`animation-config.json`** — Parameter library
   - Complete pattern definitions
   - Constraint specifications
   - Scene templates
   - Usage examples with notes

4. **`parameter-editor.html`** — Live tweaking tool
   - Real-time parameter adjustment
   - Visual feedback as you change values
   - Export configurations
   - Pattern switching interface

5. **`staircase-animations-draft.html`** — Original explorations
   - First drafts based on your concept text
   - Reference for early iterations

---

## 🎯 How to Use This System

### 1. Start with Concepts

When you have a concept from your writing (like "stone staircase"), refer to:

**`CONCEPT-MAPPING-GUIDE.md`** → Section: "Core Concept Categories"

Find which category fits:
- **Time & Erosion** → worn, generations, slowly
- **Connection & Weaving** → threads, mending, crossing
- **Practice & Accumulation** → meditation, sustained, ripples
- **Emergence** → lotus, mud, clarity
- **Continuity** → flow, years, never stops

### 2. Look Up Pattern Parameters

Once you know the category, check:

**`animation-config.json`** → `pattern_library` section

Example for "erosion":
```json
{
  "pattern": "horizontal_layers",
  "characters": [".", "·", ":", "∶", "|", "‖"],
  "motion": {
    "amplitude": "2%",
    "duration": "15s",
    "speed": 0.005
  }
}
```

### 3. Experiment with Live Editor

Open **`parameter-editor.html`** in your browser:
- Click a pattern (01-05)
- Adjust sliders for:
  - Speed (how fast it moves)
  - Amplitude (how much it moves)
  - Density (how much is visible)
  - Contrast (how dark/light)
  - Grid Size (resolution)
- See changes in real-time
- Export your settings when happy

### 4. Reference Production Code

When you're ready to implement, check:

**`refined-system.html`** → Find the pattern's render function

Copy the structure and modify with your exported parameters.

---

## 🔄 Workflow Example

Let's say you write:

> "Mending movements, threads weaving through generations"

### Step 1: Identify Concepts
- Primary: **CONNECTION & WEAVING** (threads, weaving)
- Secondary: **TIME & EROSION** (generations)

### Step 2: Check Mapping Guide
**CONCEPT-MAPPING-GUIDE.md** says:
- Use weaving pattern (multiple paths intersecting)
- Add hint of erosion (subtle wear)

### Step 3: Open Config
**animation-config.json** → `pattern_library.weaving`:
```json
{
  "characters": ["/", "\\", "|", "—", "~"],
  "thread_count": 3,
  "colors": ["#e8a76e", "#93c5fd", "#8b8680"]
}
```

### Step 4: Experiment
1. Open **`parameter-editor.html`**
2. Select "02 — Weaving"
3. Adjust:
   - Speed: 0.01 (moderate pace)
   - Density: 0.8 (strong presence)
   - Amplitude: 3% (gentle movement)
4. Export config

### Step 5: Implement
Copy the render function from **`refined-system.html`**, apply your exported parameters.

---

## 📐 The Way of Code Constraints

**Always follow these rules** (defined in `animation-config.json`):

### Motion Rules
```
Drift:     1-5% (never more)
Duration:  8-20s (slow, patient)
Speed:     0.005-0.015 (barely perceptible)
Easing:    cubic-bezier(0.4, 0.0, 0.2, 1)
```

### Color Rules
```
Background:  #F0EEE6 (cream) or #FDFCF9 (off-white)
Foreground:  #333333 (charcoal) or #1a1816 (dark)
Accents:     Muted only (#e8a76e, #93c5fd, #8b8680)
```

### Accessibility Rules
```
✓ Always respect prefers-reduced-motion
✓ Provide static frame fallback
✓ Keep text readable over animations
✓ Avoid rapid flashing or strobing
```

---

## 🎨 Pattern Library Reference

### 01 — Erosion (Time & Worn Steps)
**When to use:** Time, patina, wear, generations  
**Visual:** Horizontal layers with center emphasis  
**Motion:** Vertical wave (±2%, 15s)  
**Chars:** `. · : ∶ | ‖`

### 02 — Weaving (Connection & Threads)
**When to use:** Threads, mending, crossing, connection  
**Visual:** Multiple sinusoidal paths  
**Motion:** Different phases (±3%, 12s)  
**Chars:** `/ \ | — ~ ╱ ╲`

### 03 — Accumulation (Practice & Ripples)
**When to use:** Meditation, sustained practice, building  
**Visual:** Concentric ripples from center  
**Motion:** Expanding waves (±2%, 12s)  
**Chars:** `· : ∴ ⋮ ○ ◦`

### 04 — Emergence (No Mud, No Lotus)
**When to use:** Growth from difficulty, transformation  
**Visual:** Dense bottom → sparse top  
**Motion:** Upward drift (±1.5%, 14s)  
**Chars:** `▓ ▒ ░ ∙ · ˙`

### 05 — Continuity (Sustained Flow)
**When to use:** Ongoing practice, years, the long view  
**Visual:** Continuous spiral path  
**Motion:** Constant rotation (±2%, 20s)  
**Chars:** `~ ≈ ∼ ⁓ ∿ 〰`

---

## 🔧 Customization Guide

### Tweaking Existing Patterns

**To make it slower:**
```javascript
duration: '20s',  // was 15s
speed: 0.003      // was 0.005
```

**To make it more subtle:**
```javascript
amplitude: '1%',   // was 2%
opacity: 0.6       // was 0.8
```

**To increase density:**
```javascript
threshold: 0.15,   // was 0.2 (lower = more visible)
chars: CHARS       // use full character set
```

### Blending Patterns

From **CONCEPT-MAPPING-GUIDE.md**:
- Primary: 60-70%
- Secondary: 20-30%
- Tertiary: 10%

Example:
```javascript
// Primary: Erosion (70%)
const primary = renderErosion(ctx, t, 0.7);

// Secondary: Weaving (30%)
const secondary = renderWeaving(ctx, t, 0.3);
```

---

## 📊 Quick Command Reference

### Open Files
```bash
# View production system
open refined-system.html

# Use parameter editor
open parameter-editor.html

# Read mapping guide
open CONCEPT-MAPPING-GUIDE.md

# Check config
open animation-config.json
```

### Export from Editor
1. Open `parameter-editor.html`
2. Adjust parameters
3. Click "Export Config"
4. Save JSON file
5. Apply values to your code

---

## 💡 Tips & Best Practices

### 1. Start Simple
- Begin with one pattern
- Adjust one parameter at a time
- Save configurations that work

### 2. Respect Constraints
- Never exceed 5% drift
- Keep durations above 8s
- Use muted colors only
- Test with prefers-reduced-motion

### 3. Concept First, Visual Second
- Always start from a concept
- Let the concept guide pattern choice
- Don't force patterns onto concepts

### 4. Document Your Choices
Add notes to your code:
```javascript
// Concept: "Stone staircase curved by generations"
// Pattern: Erosion (time & wear)
// Customization: Extra center emphasis (0.9 vs 0.8)
```

### 5. Test Accessibility
```javascript
// Always include
if (prefersReducedMotion) {
  // Show static frame
  renderOnce();
  return;
}
```

---

## 🚀 Next Steps

### Short Term
1. **Experiment** with `parameter-editor.html`
2. **Choose** 2-3 patterns that resonate
3. **Refine** parameters for your concepts
4. **Export** configurations

### Medium Term
1. **Create** variations on existing patterns
2. **Document** your successful combinations
3. **Build** a personal pattern library
4. **Test** on your actual site

### Long Term
1. **Develop** new pattern categories
2. **Create** transition effects between patterns
3. **Build** an animation generator UI
4. **Share** your visual language system

---

## 📚 File Relationships

```
CONCEPT-MAPPING-GUIDE.md
         ↓
    (defines patterns)
         ↓
animation-config.json
         ↓
    (provides parameters)
         ↓
parameter-editor.html ←→ refined-system.html
         ↓                        ↓
   (experiment)              (production)
         ↓                        ↓
    export config           implement code
```

---

## 🤔 FAQ

**Q: Which file should I edit to change a pattern?**  
A: Don't edit directly. Use `parameter-editor.html` to experiment, export config, then apply to your code.

**Q: Can I combine multiple patterns?**  
A: Yes! See "Combination Rules" in `CONCEPT-MAPPING-GUIDE.md`. Keep primary at 60-70%.

**Q: How do I know which pattern to use?**  
A: Match your concept keywords to the table in `CONCEPT-MAPPING-GUIDE.md` → "Quick Reference Chart"

**Q: What if my concept doesn't fit any pattern?**  
A: Look for the closest match, or blend two patterns. If truly unique, use a pattern as a starting point and customize heavily.

**Q: Can I ignore The Way of Code constraints?**  
A: You can, but you'll lose the subtlety and craft. Constraints create consistency.

---

## 📝 Version History

**v1.0.0** — Initial system
- 5 core patterns
- Complete mapping guide
- Parameter editor
- Production examples

---

## 🎯 Summary

You now have:
1. ✓ A complete pattern library (5 core patterns)
2. ✓ A concept-to-visual mapping system
3. ✓ A live parameter editor
4. ✓ Production-ready code examples
5. ✓ Configuration files for easy modification

**Start here:**
1. Read `CONCEPT-MAPPING-GUIDE.md`
2. Open `parameter-editor.html`
3. Experiment and export
4. Check `refined-system.html` for implementation

---

**Remember:** The goal is restraint, subtlety, and coherence. Every animation should feel like it emerged naturally from the concept.
