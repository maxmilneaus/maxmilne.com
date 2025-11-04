---
layout: page
title: Home
id: home
permalink: /
---
{% assign latest_note = site.notes | sort: "created_at_timestamp" | reverse | first %}

<section class="home-intro">
  <h1>Max Milne</h1>
  <p>I support people and organisations at the intersection of counselling, meditation, therapy, and technology. This space will soon share more about my current collaborations, how I work, and ways to connect.</p>
  <p>&nbsp;</p>
</section>

{% if latest_note %}
<hr class="section-divider">
<div class="latest-section">
  <a href="{{ site.baseurl }}{{ latest_note.url }}" class="latest-label internal-link">Latest writing</a>
  <a href="{{ site.baseurl }}{{ latest_note.url }}" class="latest-title-link internal-link">
    <h2 class="latest-title">{{ latest_note.title }}</h2>
  </a>
  {% assign latest_display_date = latest_note.created_at | default: latest_note.date | default: latest_note.last_modified_at %}
  <div class="latest-meta">
    <span class="latest-date">{{ latest_display_date | date: "%B %d, %Y" }}</span>
  </div>
  {% assign content_text = latest_note.content | strip_html | strip_newlines | truncate: 160 %}
  <p class="latest-preview">{{ content_text }} <a href="{{ site.baseurl }}{{ latest_note.url }}" class="read-more internal-link">Keep reading →</a></p>
</div>
<p class="home-writing-link"><a class="internal-link" href="{{ site.baseurl }}/writing/">Browse all writing →</a></p>
{% endif %}
