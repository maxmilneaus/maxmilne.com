---
# Title used on the photo essay page and listings. Replace before publishing.
title: "Photo Essay Title"
# Uses the dedicated photo essay layout.
layout: photo-essay
# Publish date in YYYY-MM-DD format. Update when you publish.
date: 2025-11-10
tags:
  - photo-essay
  - stills
# One-line summary for listings and previews. Keep concise and descriptive.
excerpt: "One-line summary for listings and previews."
---

<!--
Intro narrative:
All paragraphs BEFORE the first image render as the intro block (.photo-essay-intro)
above the film strip. Keep this section tight: 1–3 short paragraphs.
-->

This opening sets context for the photo essay. Write a short introduction here before your first image, inviting the reader into the story, place, or sequence they are about to see.

Optional: Add a second paragraph to deepen the context, mention collaborators, or note how to read the sequence without over-explaining the images to follow.



<!--
Film strip sequence:
The film strip (.photo-strip#photoStrip) is built from the FIRST to the LAST image
block below. Any Markdown content placed between these images (short captions,
titles, or brief notes) will appear inside the strip sequence.
Update the paths, filenames, and alt text to match your assets.
-->

<!--
For assistant / LLM generating this page:

Contract:
- Input:
  - A single folder path under /assets/... containing the sequence images.
    Example: /assets/Gallery/Studio-Brunswick/
- Output:
  - Replace ONLY the placeholder image lines between:
      <!-- BEGIN FILM STRIP IMAGES --> and <!-- END FILM STRIP IMAGES -->
    with a sequence of Markdown image lines of the form:

      ![Short descriptive alt text](/assets/.../filename.jpg)

Rules:
- Use one Markdown image per line.
- Order images by filename (or by a curated order if explicitly specified in the prompt).
- Use absolute paths from the site root, starting with /assets/.
- Derive human-readable alt text from each filename:
  - Remove extensions and underscores/hyphens.
  - Use clear language, optionally including subject, location, or context if known.
- Do NOT add extra headings, divs, or HTML wrappers for each frame.
- Do NOT insert images before the intro paragraphs or after the closing narrative.
- Do NOT modify the intro (above) or the closing narrative (below) unless explicitly instructed.
- Only write images between the BEGIN/END FILM STRIP IMAGES markers.

Example (for /assets/Gallery/Studio-Brunswick/):
- ![Studio Brunswick entrance at dusk](/assets/Gallery/Studio-Brunswick/studio-entrance-dusk.jpg)
- ![Artist preparing canvas in Studio Brunswick](/assets/Gallery/Studio-Brunswick/artist-preparing-canvas.jpg)
- ![Studio Brunswick exhibition with visitors](/assets/Gallery/Studio-Brunswick/exhibition-visitors.jpg)

This comment block is safe to leave in place or delete; it does not render on the page.
-->

<!-- BEGIN FILM STRIP IMAGES -->
![Frame 1 placeholder alt text](/assets/Gallery/example-1.jpg)

![Frame 2 placeholder alt text](/assets/Gallery/example-2.jpg)

![Frame 3 placeholder alt text](/assets/Gallery/example-3.jpg)
<!-- END FILM STRIP IMAGES -->



<!--
Closing narrative:
Any paragraphs AFTER the final image are rendered below the strip
as the closing narrative (.photo-essay-closing).
Use this space for reflection, notes on process, acknowledgements, or credits.
-->

Use this closing space to reflect briefly on the work, articulate what lingers after the sequence, or share a final thought that grounds the viewer back in the wider context.

Optionally, include credits for collaborators, locations, or funding, and any links for further reading or related projects.