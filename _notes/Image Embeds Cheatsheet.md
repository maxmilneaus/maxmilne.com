---
title: Image Embeds Cheatsheet
---

This page shows working examples (rendered) with the exact code above each one for easy copy/paste.

## Two‑Up (Equalized)

```html
<div class="two-up equal">
  ![[Website/assets/Max Milne - Canberra-1.jpg|alt=Left]]
  ![[Website/assets/Max Milne - Canberra-2.jpg|alt=Right]]
</div>
```

<div class="two-up equal">
  ![[Website/assets/Max Milne - Canberra-1.jpg|alt=Left]]
  ![[Website/assets/Max Milne - Canberra-2.jpg|alt=Right]]
</div>

---

## Two‑Up (Standard)

```html
<div class="two-up">
  ![[Website/assets/Max Milne - Canberra-1.jpg|alt=Left]]
  ![[Website/assets/Max Milne - Canberra-2.jpg|alt=Right]]
</div>
```

<div class="two-up">
  ![[Website/assets/Max Milne - Canberra-1.jpg|alt=Left]]
  ![[Website/assets/Max Milne - Canberra-2.jpg|alt=Right]]
</div>

---

## Single Image Examples

Width only (900px)
```text
![[Website/assets/Max_Profile.png|900]]
```
![[Website/assets/Max_Profile.png|900]]

Size (640x480)
```text
![[Website/assets/Max_Profile.png|640x480]]
```
![[Website/assets/Max_Profile.png|640x480]]

Alt text (free form)
```text
![[Website/assets/Max_Profile.png|My Alt Text]]
```
![[Website/assets/Max_Profile.png|Man by the water leaning on a rock]]

Alt text (explicit)
```text
![[Website/assets/Max_Profile.png|alt=My Alt Text]]
```
![[Website/assets/Max_Profile.png|alt=My Alt Text]]

Align left + width
```text
![[Website/assets/Max_Profile.png|left|200]]
```
![[Website/assets/Max_Profile.png|left|200]]

Align center + title
```text
![[Website/assets/Max_Profile.png|center|title=Portrait]]
```
![[Website/assets/Max_Profile.png|center|title=Portrait]]

Align right + classes
```text
![[Website/assets/Max_Profile.png|right|class=rounded shadow]]
```
![[Website/assets/Max_Profile.png|right|class=rounded shadow]]

Full combo
```text
![[Website/assets/Max_Profile.png|My Alt|320x200|right|class=rounded shadow|title=A cat]]
```
![[Website/assets/Max_Profile.png|My Alt|320x200|right|class=rounded shadow|title=A cat]]

Page‑wide (wider than text column)
```text
![[Website/assets/Max Milne Photography Portraits.jpg|class=page-wide|alt=Page-wide]]
```
![[Website/assets/Max Milne Photography Portraits.jpg|class=page-wide|alt=Page-wide]]

Wide cropped (cinematic)
```text
![[Website/assets/Max Milne Photography Portraits.jpg|class=wide-crop|alt=Cinematic crop]]
```
![[Website/assets/Max Milne Photography Portraits.jpg|class=wide-crop|alt=Cinematic crop]]

---

Notes
- Inside two‑up, skip width modifiers; the grid sizes images responsively.
- Use meaningful alt text for accessibility and better captions.
- Alignment keywords (`left|center|right` or `align=...`) apply to single images; two‑up uses the grid.
