---
title: Image Embeds Cheatsheet
---

Clean, copy‑ready mega snippets for each image type. Paste the line, then tweak path/alt/size/alignment/classes/title/loading in place.

## Standard (single image)

Mega (all options):
```text
![[Website/assets/Max_Profile.png|alt=Meaningful alt text|320x200|right|class=rounded shadow|title=Optional title|loading=eager]]
```
Rendered:
![[Website/assets/Max_Profile.png|alt=Meaningful alt text|320x200|right|class=rounded shadow|title=Optional title|loading=eager]]

Max version:
![[Website/assets/Max_Profile.png|alt=text|centre|class=rounded shadow|title=name|loading=lazy]]



---

## Page‑plus (wider than text column)

Mega (token form; you can also use `class=page-plus`):
```text
![[Website/assets/Max_Profile.png|page|alt=Wider than text|class=page+|title=Optional title|loading=lazy]]
```
Rendered:
![[Website/assets/Max_Profile.png|class=page-plus|alt=Wider than text|title=Optional title|loading=lazy]]

---

## Two‑Up (side‑by‑side)

Mega (one line; remove `equal` for natural heights):
```html
<div class="two-up equal"> ![[Website/assets/Max_Profile.png|alt=Left alt|loading=eager]] ![[Website/assets/Max_Profile.png|alt=Right alt|loading=eager]] </div>
```
Rendered:
<div class="two-up equal">
  ![[Website/assets/Max_Profile.png|alt=Left alt|loading=eager]]
  ![[Website/assets/Max_Profile.png|alt=Right alt|loading=eager]]
</div>

---

### Options Reference
- width: `900`
- size: `320x200`
- alt: `alt=...` (or first free‑form token)
- align: `left|center|right` or `align=left|center|right`
- classes: `class=rounded shadow|page-plus|full-bleed`
- title: `title=...`
- loading: `loading=eager|lazy` (or plain `eager|lazy` token)
- Page‑plus token: `page|page+|page-plus|container` (same as `class=page-plus`)
