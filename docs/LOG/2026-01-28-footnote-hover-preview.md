# Footnote Hover Preview

**Date:** 2026-01-28

## What

Added footnote hover previews to note pages. When hovering or focusing a footnote reference (superscript number), a tooltip appears showing the footnote content without requiring the reader to scroll down.

## Why

Keeps readers in flow. Jumping to footnotes breaks concentration — this lets someone quickly glance at a citation or aside without losing their place.

Aligns with **omtanke** (thinking around others) and **built inheritance** principles: small, invisible improvements that serve future readers.

## Implementation

- Script: `src/scripts/footnote-preview.js`
- Loaded via: `src/components/Enhancements.astro`
- Activates on elements with `data-footnote-previews` attribute
- Matches Astro/remark footnote format (`#user-content-fn-*`)

## Visual treatment

- Tooltip: soft border, charcoal background, cream text
- **Titles** (italic text like book/film names): subtle blue accent (`#93c5fd`)
- **Links**: muted gray with understated underline
- **Author names**: default cream text

This formatting lets readers quickly scan what's a title vs. what's an author.

## Accessibility

- Respects `prefers-reduced-motion` (no transition animation)
- Works with keyboard focus, not just mouse hover
- Tooltip positioned to stay within viewport

## Status

Working in Chrome and Safari. Tested on `/formless-practice-permission-to-play/` which has multiple footnotes with citations.
