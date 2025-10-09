---
layout: page
title: Home
id: home
permalink: /
---
{% assign latest_note = site.notes | sort: "created_at_timestamp" | reverse | first %}
{% if latest_note %}
  {% assign content_text = latest_note.content | strip_html | strip_newlines | truncate: 120 %}

  <div class="latest-section">
    <a href="{{ site.baseurl }}{{ latest_note.url }}" class="latest-label internal-link">Latest</a>
    <a href="{{ site.baseurl }}{{ latest_note.url }}" class="latest-title-link internal-link">
      <h2 class="latest-title">{{ latest_note.title }}</h2>
    </a>
    {% assign latest_display_date = latest_note.created_at | default: latest_note.date | default: latest_note.last_modified_at %}
    <div class="latest-meta">
      <span class="latest-date">{{ latest_display_date | date: "%B %d, %Y" }}</span>
    </div>
    <p class="latest-preview">{{ content_text }} <a href="{{ site.baseurl }}{{ latest_note.url }}" class="read-more internal-link">Keep reading →</a></p>
  </div>
  <hr>
{% endif %}
<a href="{{ site.baseurl }}/topics" class="section-label internal-link" id="topics">Topics</a>
<div class="topics-section">
  {% comment %}
  Build tags collection manually from notes collection
  {% endcomment %}
  {% assign all_tags_array = "" | split: "" %}
  {% for note in site.notes %}
    {% if note.tags %}
      {% for tag in note.tags %}
        {% assign all_tags_array = all_tags_array | push: tag %}
      {% endfor %}
    {% endif %}
  {% endfor %}
  
  {% assign unique_tags = all_tags_array | sort | uniq %}
  
  <ul class="topics-list">
    {% for tag in unique_tags %}
      {% assign tag_count = 0 %}
      {% for note in site.notes %}
        {% if note.tags contains tag %}
          {% assign tag_count = tag_count | plus: 1 %}
        {% endif %}
      {% endfor %}
      {% assign tag_slug = tag | slugify %}
      <li class="topic-item">
        <a href="{{ site.baseurl }}/tags/{{ tag_slug }}/" class="topic-link">
          <span class="topic-name">{{ tag }}</span>
        </a>
      </li>
    {% endfor %}
  </ul>
</div>

<hr class="section-divider">

<a href="{{ site.baseurl }}/" class="section-label internal-link" id="writing">Writing</a>
<div class="writing-section">
  <ul>
    {% assign recent_notes = site.notes | sort: "created_at_timestamp" | reverse %}
    {% for note in recent_notes limit: 10 %}
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
