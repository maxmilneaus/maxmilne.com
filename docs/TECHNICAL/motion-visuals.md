---
title: Motion Visuals
---

# Motion visuals for writing notes

This project generates a subtle, looping motion visual for each note in `src/content/notes/*.md`.
Each note gets a deterministic seed (derived from slug or title/date), so its visual stays stable
across runs unless the seed inputs change.

## How it works

- `scripts/generate-motion-visuals.mjs` reads the notes, parses frontmatter + body, and derives a
  seed per note.
- Frames are rendered to a temporary directory using `@napi-rs/canvas`.
- A 6s seamless loop (VP9 WebM) is encoded with ffmpeg and written to
  `public/generated/writing/<slug>.webm`.
- The first frame is saved as a poster image at `public/generated/writing/<slug>.png`.
- Motion is designed to be barely perceptible: calm flow-field lines, drifting particles, and
  stable grain (no flicker).

## Regenerating

Run the generator from the repo root:

```bash
npm run generate:motion
```

Optional arguments:

- `--limit 2` to render just a couple notes
- `--only <slug>` to render a single note

The script expects ffmpeg at `/opt/homebrew/bin/ffmpeg`. If ffmpeg is missing, it will print a
warning and skip generation without failing the build.
