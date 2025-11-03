---
title: Projects Filter Concepts
layout: page
permalink: /projects/filter-prototypes/
---

<style>
  .projects-filter-prototypes {
    --color-charcoal-rgb: 32, 29, 26;
    --color-graphite-rgb: 45, 41, 38;
    --color-accent-subtle-rgb: 59, 130, 246;
    --color-accent-hover-rgb: 147, 197, 253;
  }

  .projects-filter-prototypes .prototype {
    margin-bottom: calc(var(--section-spacing) * 0.75);
  }

  .projects-filter-prototypes .prototype + .prototype {
    border-top: 1px solid var(--color-divider);
    padding-top: calc(var(--section-spacing) * 0.5);
  }

  .projects-filter-prototypes .project-filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin: var(--space-md) 0 var(--space-lg);
  }

  .projects-filter-prototypes .project-filter {
    border: 1px solid var(--color-graphite);
    background: transparent;
    color: var(--color-cream);
    padding: 0.35rem 0.75rem;
    border-radius: var(--border-radius);
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 200ms ease, color 200ms ease, border-color 200ms ease;
  }

  .projects-filter-prototypes .project-filter:hover {
    border-color: var(--color-accent-subtle);
    color: var(--color-accent-hover);
  }

  .projects-filter-prototypes .project-filter.is-active {
    background: var(--color-accent-subtle);
    color: var(--color-deep);
    border-color: var(--color-accent-subtle);
  }

  .projects-filter-prototypes .project-list {
    display: grid;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
  }

  .projects-filter-prototypes .project-list .project-entry {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-md);
    align-items: baseline;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--border-radius);
    background: rgba(var(--color-charcoal-rgb), 0.45);
  }

  .projects-filter-prototypes .project-list .project-entry.is-hidden {
    display: none;
  }

  .projects-filter-prototypes .project-year {
    font-size: 0.95rem;
    color: var(--color-meta);
  }

  .projects-filter-prototypes .project-title {
    margin: 0;
    font-size: 1.05rem;
  }

  .projects-filter-prototypes .project-description {
    margin: var(--space-xs) 0 0;
    color: var(--color-warm-gray);
    font-size: 0.95rem;
  }

  /* Variation A — Segmented Pill Bar */
  .projects-filter-prototypes .project-filters--segmented {
    background: rgba(var(--color-charcoal-rgb), 0.65);
    border: 1px solid var(--color-graphite);
    border-radius: calc(var(--border-radius) * 1.5);
    padding: var(--space-xs);
    gap: var(--space-xs);
  }

  .projects-filter-prototypes .project-filters--segmented .project-filter {
    flex: 1 0 auto;
    border: none;
    background: transparent;
    padding: var(--space-xs) var(--space-md);
    border-radius: calc(var(--border-radius) * 1.25);
  }

  .projects-filter-prototypes .project-filters--segmented .project-filter:hover {
    background: rgba(var(--color-accent-subtle-rgb), 0.08);
    color: var(--color-accent-hover);
  }

  .projects-filter-prototypes .project-filters--segmented .project-filter.is-active {
    background: linear-gradient(
      135deg,
      rgba(var(--color-accent-subtle-rgb), 0.35),
      rgba(var(--color-accent-hover-rgb), 0.15)
    );
    color: var(--color-deep);
  }

  /* Variation B — Baseline Underline Tabs */
  .projects-filter-prototypes .project-filters--underline {
    border-bottom: 1px solid var(--color-graphite);
    gap: var(--space-md);
    padding-bottom: var(--space-xs);
  }

  .projects-filter-prototypes .project-filters--underline .project-filter {
    border: none;
    background: transparent;
    color: var(--color-meta);
    padding: 0;
    font-size: 1rem;
    letter-spacing: 0.03em;
    text-transform: none;
    position: relative;
  }

  .projects-filter-prototypes .project-filters--underline .project-filter:hover {
    color: var(--color-accent-hover);
  }

  .projects-filter-prototypes .project-filters--underline .project-filter.is-active {
    color: var(--color-cream);
  }

  .projects-filter-prototypes .project-filters--underline .project-filter.is-active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(-1 * var(--space-xs));
    height: 2px;
    background: var(--color-cream);
  }

  /* Variation C — Ledger Stack */
  .projects-filter-prototypes .project-filters--stacked {
    flex-direction: column;
    gap: var(--space-xs);
    padding-left: var(--space-sm);
    border-left: 2px solid var(--color-divider);
  }

  .projects-filter-prototypes .project-filters--stacked .project-filter {
    border: none;
    background: transparent;
    color: var(--color-warm-gray);
    padding: var(--space-xs) 0;
    justify-content: flex-start;
    text-transform: none;
    font-size: 0.95rem;
    letter-spacing: 0.02em;
    position: relative;
  }

  .projects-filter-prototypes .project-filters--stacked .project-filter::before {
    content: "•";
    color: transparent;
    margin-right: var(--space-sm);
    transition: color 200ms ease;
  }

  .projects-filter-prototypes .project-filters--stacked .project-filter:hover {
    color: var(--color-cream);
  }

  .projects-filter-prototypes .project-filters--stacked .project-filter.is-active {
    background: rgba(var(--color-charcoal-rgb), 0.6);
    color: var(--color-cream);
  }

  .projects-filter-prototypes .project-filters--stacked .project-filter.is-active::before {
    color: var(--color-accent-subtle);
  }

  @media (max-width: 720px) {
    .projects-filter-prototypes .project-filters--stacked {
      border-left: none;
      border-top: 1px solid var(--color-divider);
      padding-left: 0;
      padding-top: var(--space-sm);
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  /* Variation D — Accent Capsule Strip */
  .projects-filter-prototypes .project-filters--capsule {
    background: linear-gradient(
      180deg,
      rgba(var(--color-charcoal-rgb), 0.9),
      rgba(var(--color-graphite-rgb), 0.9)
    );
    border: 1px solid rgba(var(--color-graphite-rgb), 0.8);
    border-radius: calc(var(--border-radius) * 2);
    padding: var(--space-xs) var(--space-sm);
    gap: var(--space-sm);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(6px);
  }

  .projects-filter-prototypes .project-filters--capsule .project-filter {
    border: none;
    background: rgba(0, 0, 0, 0.2);
    color: var(--color-cream);
    padding: var(--space-xs) var(--space-md);
    border-radius: calc(var(--border-radius) * 1.75);
    letter-spacing: 0.1em;
  }

  .projects-filter-prototypes .project-filters--capsule .project-filter:hover {
    background: rgba(var(--color-accent-subtle-rgb), 0.2);
    color: var(--color-accent-hover);
  }

  .projects-filter-prototypes .project-filters--capsule .project-filter.is-active {
    background: var(--color-accent-subtle);
    color: var(--color-deep);
    box-shadow: 0 2px 6px rgba(var(--color-accent-subtle-rgb), 0.25);
  }

  .projects-filter-prototypes .project-legend {
    font-size: 0.9rem;
    color: var(--color-meta);
    margin-bottom: var(--space-sm);
  }
</style>

{% raw %}
<script>
  document.addEventListener('DOMContentLoaded', function () {
    var containers = Array.prototype.slice.call(
      document.querySelectorAll('.projects-filter-prototypes .prototype')
    );

    containers.forEach(function (prototype) {
      var filterContainer = prototype.querySelector('[data-project-filter]');
      if (!filterContainer) return;

      var buttons = Array.prototype.slice.call(
        filterContainer.querySelectorAll('.project-filter')
      );
      var entries = Array.prototype.slice.call(
        prototype.querySelectorAll('[data-tag-slugs]')
      );

      function applyFilter(slug) {
        entries.forEach(function (entry) {
          var tags = (entry.dataset.tagSlugs || '').split(' ').filter(Boolean);
          if (slug === 'all' || tags.indexOf(slug) !== -1) {
            entry.classList.remove('is-hidden');
          } else {
            entry.classList.add('is-hidden');
          }
        });
      }

      filterContainer.addEventListener('click', function (event) {
        var button = event.target.closest('.project-filter');
        if (!button) return;

        buttons.forEach(function (btn) {
          btn.classList.remove('is-active');
        });
        button.classList.add('is-active');

        applyFilter(button.getAttribute('data-filter'));
      });
    });
  });
</script>
{% endraw %}

<article class="projects-filter-prototypes">
  <h1>Projects Filter Variations</h1>
  <p class="project-legend">
    Each block below mirrors the real Projects filter logic with sample data. Use your running Jekyll server to interact and decide which treatment feels right.
  </p>

  {% assign sample_projects = site.projects | slice: 0, 6 %}
  {% if sample_projects == empty %}
    {% assign sample_projects = site.projects %}
  {% endif %}

  {% capture demo_html %}
  {% for project in sample_projects %}
    {% assign tag_slugs_array = "" | split: "" %}
    {% if project.tags %}
      {% for tag in project.tags %}
        {% assign tag_slug = tag | slugify %}
        {% assign tag_slugs_array = tag_slugs_array | push: tag_slug %}
      {% endfor %}
    {% endif %}
    {% assign tag_slugs_attr = tag_slugs_array | join: ' ' %}
    <div class="project-entry" data-tag-slugs="{{ tag_slugs_attr }}">
      <div class="project-year">{{ project.year }}</div>
      <div>
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>
      </div>
    </div>
  {% endfor %}
  {% endcapture %}

  {% capture demo_filters %}
    {% assign demo_tag_collection = "" | split: "" %}
    {% for project in sample_projects %}
      {% if project.tags %}
        {% for tag in project.tags %}
          {% unless demo_tag_collection contains tag %}
            {% assign demo_tag_collection = demo_tag_collection | push: tag %}
          {% endunless %}
        {% endfor %}
      {% endif %}
    {% endfor %}
    {% assign demo_tag_collection = demo_tag_collection | sort %}
    <button class="project-filter is-active" type="button" data-filter="all">All</button>
    {% for tag in demo_tag_collection %}
      {% assign tag_slug = tag | slugify %}
      <button class="project-filter" type="button" data-filter="{{ tag_slug }}">{{ tag }}</button>
    {% endfor %}
  {% endcapture %}

  <section class="prototype">
    <h2>Variation A — Segmented Pill Bar</h2>
    <p>Shared rail with soft accent glow for the active filter.</p>
    <div class="project-filters project-filters--segmented" data-project-filter>
      {{ demo_filters | strip }}
    </div>
    <div class="project-list">
      {{ demo_html | strip }}
    </div>
  </section>

  <section class="prototype">
    <h2>Variation B — Baseline Underline Tabs</h2>
    <p>Editorial tabs with a cream underline anchored to the baseline.</p>
    <div class="project-filters project-filters--underline" data-project-filter>
      {{ demo_filters | strip }}
    </div>
    <div class="project-list">
      {{ demo_html | strip }}
    </div>
  </section>

  <section class="prototype">
    <h2>Variation C — Ledger Stack</h2>
    <p>Vertical ledger with accent bullet, responsive to horizontal pills on small screens.</p>
    <div class="project-filters project-filters--stacked" data-project-filter>
      {{ demo_filters | strip }}
    </div>
    <div class="project-list">
      {{ demo_html | strip }}
    </div>
  </section>

  <section class="prototype">
    <h2>Variation D — Accent Capsule Strip</h2>
    <p>High-contrast capsule strip that echoes the Latest section headline treatment.</p>
    <div class="project-filters project-filters--capsule" data-project-filter>
      {{ demo_filters | strip }}
    </div>
    <div class="project-list">
      {{ demo_html | strip }}
    </div>
  </section>
</article>
