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
        <span class="article-date">{{ note.created_at | date: "%Y · %m" }}</span>
        <span class="article-title">{{ note.title }}</span>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>
