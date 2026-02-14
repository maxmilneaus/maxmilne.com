---
title: "The Assumption Box Method: Visual Co-Design with AI"
layout: note
tags:
  - process
  - ai
  - visual
date: 2026-02-09
excerpt: "For me, the whole intention of AI is to help maintain a creative flow. But chat interfaces are linear—endless scrolls of text. For a visual thinker, a text box is a constraint."
---

╭───────────────────────────────────────────────────────────────────────────────╮
│                                                                               │
│                       ◎  Visual Co-design with AI                         │
│                                                                               │
│                     ┌─────────────────────────────┐                           │
│                     │                             │                           │
│                     │      ░░░░░░░░░░░░░░░░       │                           │
│                     │      ░░  A G E N T ░░       │                           │
│                     │      ░░░░░░░┬░░░░░░░░       │                           │
│                     │             │               │                           │
│                     │      ┌──────┴───────┐       │                           │
│                     │      │              │       │                           │
│                     │      │   Y O U      │       │                           │
│                     │      │              │       │                           │
│                     │      └──────────────┘       │                           │
│                     │                             │                           │
│                     └─────────────────────────────┘                           │
│                                                                               │
│     THE METHOD: The Agent builds the structure (░).                          │
│                 It leaves a clean box for Human Intent.                      │
│                                                                               │
╰───────────────────────────────────────────────────────────────────────────────╯

# The Assumption Box Method

For me, the whole intention of AI is to help maintain a creative flow. But chat interfaces are linear—endless scrolls of text. For a visual thinker, a text box is a constraint. I need to see the shape of the idea.

I realised I didn't want to *chat* with my AI agent; I wanted to *whiteboard* with it.

## The Shift: From Chat to Canvas

Instead of asking OpenClaw to "write a plan," I asked it to **draw the workflow**. We used Obsidian Canvas as our shared interface. It mapped out the system visually.

The agent generated a `.canvas` file with nodes, edges, and logic flows. It mapped out the system we were building—an idea capture pipeline—visually.

But here is the breakthrough: **The Assumption Box.**

(We used Axton Liu's Obsidian Visual Skills[^2] to power the generation).

## The Assumption Box

I asked the agent to explicitly identify what it *didn't* know. "Don't guess," I told it. "Draw a box for your assumptions and questions."

It placed bright **Yellow Boxes** on the canvas:
*   *❓ QUESTION: What happens if the Project doesn't exist?*
*   *❓ QUESTION: Do you prefer Title Case filenames?*

This changed the dynamic entirely.

1.  **It drafts the structure (80%).** The agent handles boilerplate, connections, and logic.
2.  **It isolates the decisions (20%).** It flags where intent is required.
3.  **I fill the blanks.** I resolve the assumptions.
4.  **It executes.** The agent finalises the code.
![CleanShot](/assets/CleanShot%202026-02-09%20at%2013.58.52%402x.jpg)


## Visual State (Spatial Memory)

The most helpful part is **state persistence**.

I remember being a teenager and not knowing the name of a track on a CD—but I knew exactly the *position* of where it was on the back of the jewel case. That's spatial memory.

If I haven't filled in a question box, it is visually obvious what needs to be worked on next. I don't hunt for the todo; I see the board.

![CD Back CRT](/assets/images/2026-02-09_assumption-box-method_cd-back-crt.jpg)

## File Over App

This workflow lives in Obsidian because I follow the **File Over App** philosophy [^1].

The idea is simple: data should outlive the tool.
*   The Canvas is just a JSON file.
*   The Agent is a local process (OpenClaw) that reads/writes files.
*   The Output is my notes, in my vault.

There is no "platform" locking this data away. We are co-working in the same workspace. I can edit the file; the agent can edit the file. It is all reversible.

## Co-Design

It’s not just about getting an answer. It’s about prototyping a way of working. By moving the conversation out of the chat window and onto the canvas, we turn "prompt engineering" into "visual co-design."

We aren't just talking. We're building together.

---

[^1]: [Steph Ango, "File over App"](https://stephango.com/file-over-app)
[^2]: [Axton Liu's Obsidian Visual Skills](https://github.com/axtonliu/axton-obsidian-visual-skills)