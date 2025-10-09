---
layout: page
title: Writing
id: writing
permalink: /writing
---

<div class="writing-section">
  <ul>
    {% assign recent_notes = site.notes | sort: "created_at_timestamp" | reverse %}
    {% for note in recent_notes %}
    <li>
      <a class="internal-link" href="{{ site.baseurl }}{{ note.url }}">
        {% assign display_date = note.created_at | default: note.date | default: note.last_modified_at %}
        <span class="article-date">{{ display_date | date: "%Y · %m" }}</span>
        <span class="article-title">{{ note.title }}</span>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>
