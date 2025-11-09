## Entry 007: Writing filter keeps All aligned but underline behaved strangely (2025-11-09)

**Context:**
- The new inline writing filters (added earlier today) still rendered the divider bullet via `.writing2-topic-stream::before`, so the underline from the active button ran beneath the dot when "All" was selected.
- Because "All" shared the same flex row as the topic sentence, wraps could break underneath the label instead of lining up under the first topic.
- Documentation still described the dot-as-pseudo-element approach, which risked future regressions.

**Decision:**
Restructure the Sass so the topic row is a two-column grid: column one holds the `All` button, column two holds the comma-separated topics. Attach the divider dot to `.writing2-topic-all::after` and scope the underline to `.topic-name` so only the selectable word receives the highlight. Update `docs/TECHNICAL/INDEX.md`, `docs/TECHNICAL/filter-system.md`, and `docs/STYLE_GUIDE.md` to explain the new behavior.

**Reasoning:**
- Matching the projects filter alignment (label + dot + rest) creates system-level consistency visitors notice subconsciously.
- Pushing the dot onto the button keeps the spacer from inheriting text decoration when `All` is active.
- Underlines limited to `.topic-name` makes the highlight feel intentional and keeps punctuation neutral, reinforcing that commas are structural, not interactive.
- Keeping docs accurate prevents future contributors (or LLMs) from resurrecting the pseudo-element approach.

**Consequences:**
+ Wraps now begin exactly where the first topic text starts, making the "All ·" label feel like a heading rather than part of the sentence.
+ The underline never touches the dot divider, so the selected topic is the only emphasized element.
+ Documentation across Technical + Style references the correct structure, reducing onboarding friction.

**Related:** `_sass/_writing.scss`, `_layouts/writing.html`, docs updates listed above.
