---
title: Technical Guide
layout: note
---

# Max Milne Website Technical Guide
*Implementation, configuration, and development documentation*

**Last updated:** June 11, 2025  
**Jekyll version:** Latest  
**Current setup:** Static site with collections

## Table of Contents
1. [Templates System](#templates-system)
2. [Front Matter Specifications](#front-matter-specifications)
3. [Collections & Layouts](#collections--layouts)
4. [Tag System](#tag-system)
5. [Development Workflow](#development-workflow)
6. [Plugin Configurations](#plugin-configurations)
7. [Obsidian to Jekyll Sync](#obsidian-to-jekyll-sync)

---

## Templates System

### Overview
The website uses a streamlined template approach for consistent content creation. Templates are stored in `_templates/` and provide starting points for different content types.

### Available Templates

#### Web Project Template (`_templates/Web Project.md`)
```yaml
---
title: "{{title}}"
year: 2008 - 2024
description: "{{Description}}"
order: 1
tags:
---
Usage: For project portfolio entries
Collection: _projects/
Layout: project.html
Key fields:

title: Project name
year: Time period (can be range or single year)
description: Brief project summary
order: Display order (lower numbers first)
tags: Array of relevant tags
Web Note Template (_templates/Web Note.md)

YAML
---
title: "{{title}}"
layout: note
id: "{{note}}"
permalink: /{{note}}
---
Usage: For blog posts, notes, and general content
Collection: _notes/
Layout: note.html
Key fields:

title: Note/post title
layout: Always note
id: Unique identifier
permalink: Custom URL path
Template Philosophy

Minimal but complete: Only essential fields included
No publishing controls: Jekyll handles all content as published by default
Consistent structure: Predictable front matter across content types
Flexible content: Templates provide structure, not restrictions
Front Matter Specifications
Required Fields by Content Type

Projects (_projects/)

title (string): Required
year (string/number): Required for chronological sorting
description (string): Required for project listing page
order (number): Required for manual sorting

Year display protocol (author-controlled, used verbatim):
- Ongoing: `YYYY -`
- Range: `YYYY - YYYY`
- Single year: `YYYY`
Notes:
- Templates do not append punctuation (no auto dash). Enter exactly what you want shown.
- Hyphen vs en dash choice is up to author; no normalization is applied.
Notes (_notes/)

title (string): Required
layout (string): Should be "note"
Optional Fields

tags (array): For categorization
id (string): Custom identifier
permalink (string): Custom URL structure
created_at | created | date_created (date): Original creation date for chronology
  - Format: `YYYY-MM-DD` or full datetime `YYYY-MM-DD HH:MM`
  - If omitted, the site infers creation from front matter `date`, file birth time, or modified time.
Front Matter Best Practices

Use boolean values (true/false) not strings ("true"/"false")
Quote titles with special characters
Use consistent date formatting: YYYY-MM-DD
Keep arrays properly formatted: [item1, item2]
Collections & Layouts
Jekyll Collections Configuration

YAML
collections:
  notes:
    output: true
    permalink: /:slug
  projects:
    output: true
    permalink: /projects/:name/
Layout Hierarchy

_layouts/default.html: Base layout with navigation and footer
_layouts/note.html: Extends default, adds backlinks and metadata
_layouts/page.html: Extends default, minimal page layout
_layouts/project.html: Extends default, project-specific metadata
_layouts/projects.html: Projects listing page
Layout Dependencies

All layouts extend default.html
note.html expects page.title and page.last_modified_at
project.html expects page.title, page.year, page.status
projects.html sorts by order then year; uses `page.year` verbatim (no appended dash)
Projects listing styling:
- Year/title baseline alignment via `.project-year { line-height: 1; padding-top: 0; font-size: 1rem; }`
tag.html expects page.tag and uses Jekyll collection filtering

---

## Tag System

### Overview
The website implements a fully automated tag system that generates individual pages for every unique tag found in notes. This system follows Steph Ango's design patterns for topics navigation.

### Tag Implementation Architecture

#### 1. Tag Collection (`_pages/index.md`)
```liquid
{% comment %} Manual tag aggregation since site.tags doesn't work with collections {% endcomment %}
{% assign all_tags_array = "" | split: "" %}
{% for note in site.notes %}
  {% if note.tags %}
    {% for tag in note.tags %}
      {% unless all_tags_array contains tag %}
        {% assign all_tags_array = all_tags_array | push: tag %}
      {% endunless %}
    {% endfor %}
  {% endif %}
{% endfor %}
```
**Technical Note:** Jekyll's `site.tags` doesn't work with custom collections, requiring manual tag aggregation.

#### 2. Automatic Page Generation (`_plugins/tag_generator.rb`)
```ruby
class TagPage < Jekyll::Page
  def initialize(site, base, tag)
    @site = site
    @base = base
    @dir = "tags/#{tag.downcase.gsub(/\s+/, '-')}"
    @name = 'index.html'
    
    self.process(@name)
    self.read_yaml(File.join(base, '_layouts'), 'tag.html')
    self.data['tag'] = tag
    self.data['title'] = tag
  end
end
```
**Features:**
- Generates clean URLs: `/tags/design/`, `/tags/development/`
- Automatic slug creation from tag names
- Uses `tag.html` layout template

#### 3. Tag Page Template (`_layouts/tag.html`)
```liquid
{% assign tagged_notes = site.notes | where_exp: "note", "note.tags contains page.tag" | sort: "created_at_timestamp" | reverse %}
{% assign note_count = tagged_notes.size %}

<h1 class="tag-page-title">
  <a href="{{ site.baseurl }}/#topics" class="internal-link">Topics</a> / {{ page.tag | capitalize }}
</h1>

<p class="tag-meta">{{ note_count }} entr{% if note_count == 1 %}y{% else %}ies{% endif %} about this topic</p>
```
**Features:**
- Automatic capitalization of tag names
- Smart pluralization for entry counts
- Steph Ango inspired breadcrumb navigation
- Chronological listing of tagged notes by creation date

### Tag Styling System

#### Breadcrumb Navigation
```scss
.tag-page-title {
  font-size: 2rem;
  font-weight: var(--font-weight-normal);  /* Slimmer typography */
  color: var(--color-cream);              /* Tag name in cream */
  
  a {
    color: var(--color-meta);             /* "Topics" link in meta gray */
    text-decoration: none;
  }
}
```
**Design Features:**
- Different colors for hierarchy: "Topics" (meta gray) vs tag name (cream)
- Slimmer font weight following Steph Ango patterns
- Systematic spacing using design system variables

#### Topic Links on Homepage
```scss
.topic-link {
  display: inline-block;
  background: var(--color-charcoal);
  border: 1px solid var(--color-graphite);
  border-radius: var(--border-radius);
  padding: var(--space-xs) var(--space-sm);
  
  &:hover {
    background: var(--color-graphite);
    border-color: var(--color-accent-subtle);
    transform: translateY(-1px);
  }
}
```

### Adding Tags to Content

#### Front Matter Format
```yaml
---
title: "Note Title"
layout: note
tags: [design, process, creativity]
---
```

#### Template Integration
The `_templates/Web Note.md` template includes:
```yaml
tags: []
```
This ensures all new notes can participate in the tag system.

### Automatic Features

1. **Auto-Generation**: New tags automatically get pages without manual intervention
2. **Clean URLs**: Systematic slug generation handles spaces and special characters
3. **Smart Counting**: Proper pluralization for "1 entry" vs "2 entries"
4. **Link Behavior**: Internal navigation preserves same-page browsing
5. **Responsive Design**: Follows established design system patterns

### Technical Benefits

- **Scalable**: Handles unlimited tag growth automatically
- **Consistent**: Uses design system spacing and colors
- **Maintainable**: Single source of truth for tag page generation
- **SEO-Friendly**: Clean URLs and proper meta tags
- **User-Friendly**: Intuitive navigation following established patterns
## Development Workflow

### Jekyll Setup Requirements

**Ruby Version**: Jekyll 4.4 requires Ruby >= 3.0

**Common Issue**: macOS ships with Ruby 2.6.10, which is incompatible with Jekyll 4.4. This causes terminal crashes when running `jekyll serve`.

**Solution**:
1. Install rbenv: `brew install rbenv`
2. Install Ruby 3.2.2+: `rbenv install 3.2.2`
3. Set global version: `rbenv global 3.2.2`
4. **Critical**: Activate rbenv in shell:
   ```bash
   echo 'eval "$(rbenv init -)"' >> ~/.zshrc
   source ~/.zshrc
   # OR completely restart terminal
   ```
5. Verify: `ruby -v` should show 3.2.2+
6. Install gems: `bundle install`
7. Run Jekyll: `bundle exec jekyll serve`

**Key Point**: rbenv must be properly initialized in shell profile for Ruby version switching to work.

### Adding New Content

Projects:

Copy _templates/Web Project.md
Save to _projects/project-name.md
Update front matter fields
Add content below front matter
Notes:

Copy _templates/Web Note.md
Save to _notes/note-name.md
Update front matter fields
Add content below front matter
File Organization

_templates/          # Template files (not built)
_projects/           # Project portfolio items
_notes/              # Blog posts, notes, articles
_pages/              # Static pages (about, now, etc.)
_layouts/            # Jekyll layout templates
_includes/           # Reusable template components
_sass/               # Stylesheet partials
Build Process

Jekyll processes collections (_notes, _projects)
Applies appropriate layouts based on front matter
Generates static HTML files
Applies SCSS compilation
Outputs to _site/
Plugin Configurations
open_external_links_in_new_tab.rb

This plugin automatically adds target="_blank" to any <a> tag to make it open in a new browser tab.

Logic: It purposefully ignores any link that has the class internal-link, footnote, or reversefootnote.

Modification (June 11, 2025): The plugin was modified to add more exceptions. The CSS selector was updated to also ignore links with the classes .latest-label, .latest-title-link, and .read-more. This was done to prevent links in the "Latest" section on the homepage from incorrectly opening in a new tab.

bidirectional_links_generator.rb

This plugin is responsible for two key features:

It finds all Roam-style [[wiki-links]] within your notes and converts them into standard HTML <a class="internal-link"> tags.
It processes all notes to find which notes link to others, generating the backlinks data used on the note.html layout. It also generates the _includes/notes_graph.json file used to render the interactive graph visualization.

tag_based_recommendations.rb

Lightweight, algorithmic "You might also enjoy" based on shared tags (no embeddings).

- Method: Jaccard similarity on tags between notes
- Config: `_config.yml` → `recommendations` with `enabled` (default true), `max_recommendations` (default 5), `similarity_threshold` (default 0.1)
- Per-note opt-out: add `exclude_from_recommendations: true` in front matter
- Display: `_layouts/note.html` renders the list; similarity scores are not shown
Change Log

September 3, 2025

Recommendations Simplification: Removed embeddings system and config. Kept fast, tag-based recommendations only.
- Added `recommendations` config block in `_config.yml`; removed old `embeddings_recommendations`
- Simplified layout to hide similarity scores and rely solely on tag matches

Linked Mentions Fix: Improved wiki-link rendering inside excerpts
- Changed linked mentions to derive preview from processed content instead of precomputed excerpt
- Prevents raw `[[Double Brackets]]` from appearing in Linked mentions

Build Robustness: Ignored editor temp files
- Added `*.edtz` to `.gitignore` and `_config.yml` `exclude`
- Removed stray `.edtz` files to fix invalid UTF-8 read errors during build

August 30, 2025

CSS Alignment Fix: Resolved page layout inconsistency between `/about` and `/now` pages
- Fixed blanket CSS rule `ul { @extend .article-list; }` that was applying grid layout to all `<ul>` elements
- Made rule more specific: `.writing-section ul { @extend .article-list; }`
- Prevents unintended grid styling on general content lists while preserving article list formatting
- Resolves alignment differences caused by CSS inheritance issues

June 13, 2025
Tag System: Implemented fully automated tag system with Steph Ango inspired design
- Added automatic tag page generation via `tag_generator.rb` plugin
- Created `tag.html` layout template with smart pluralization
- Implemented manual tag collection for homepage topics section
- Added capitalization and differential color styling for breadcrumbs
- Updated templates to include tag support

June 11, 2025

Plugin Fix: Modified the open_external_links_in_new_tab.rb plugin to correctly handle internal links in the "Latest" section.
Documentation: Added new "Plugin Configurations" section to the technical guide.
Templates System: Streamlined Web Project and Web Note templates.
Front Matter: Removed complex publishing controls, simplified to essential fields.
Documentation: Created technical guide to complement existing style guide.
Future Enhancements
[x] Document plugin configurations
[x] Implement automated tag system
[ ] Add automated testing for front matter validation
[ ] Implement template validation scripts
[ ] Add development environment setup documentation
[ ] Add tag analytics and usage tracking
---

## Obsidian to Jekyll Sync

### Overview
This section details the robust one-way synchronization process from an Obsidian vault to the Jekyll website, ensuring content is always up-to-date while maintaining vault privacy. The sync uses `rsync` and `launchd` for efficient, near real-time updates.

### Why This Approach?
- **Reliability**: Avoids issues with symbolic links and iCloud, working seamlessly with Obsidian and Jekyll.
- **Real-time Updates**: Event-driven triggers (within 1-2 seconds of changes) or interval-based sync (every 2 minutes).
- **Privacy**: Your Obsidian vault remains completely private.
- **One-way Flow**: All changes flow exclusively from Obsidian to Jekyll. **Never edit files directly in Jekyll; changes will be overwritten.**

### Key Components

#### 1. Sync Script (`sync_to_jekyll.sh`)
This script uses `rsync` to transfer files from the Obsidian vault to the Jekyll project. It includes a lock mechanism to prevent multiple sync instances from running concurrently.

```bash
#!/bin/bash
LOCK_FILE="/tmp/sync_to_jekyll.lock"

if [ -e "$LOCK_FILE" ]; then
    echo "Sync skipped: Previous instance still running at $(date)" >> /tmp/sync_to_jekyll.log
    exit 0
fi

touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

SOURCE="/Users/maxmilne/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/"
DESTINATION="/Volumes/aWork Drive/1. Projects/Website/"

echo "Starting smart sync at $(date)" >> /tmp/sync_to_jekyll.log
rsync -avu \
    --exclude='.obsidian/' \
    --exclude='*.canvas' \
    --exclude='*.excalidraw' \
    --exclude='*.trash' \
    "$SOURCE" "$DESTINATION" >> /tmp/sync_to_jekyll.log 2>> /tmp/sync_to_jekyll_error.log
echo "Sync completed at $(date)" >> /tmp/sync_to_jekyll.log
```

**Script Details:**
- **`LOCK_FILE`**: Ensures only one instance of the script runs at a time.
- **`SOURCE`**: Path to your Obsidian vault's target folder.
- **`DESTINATION`**: Path to your Jekyll project root.
- **`rsync -avu`**:
    - `-a`: Archive mode (preserves permissions, ownership, timestamps, etc.).
    - `-v`: Verbose output.
    - `-u`: Skips files that are newer on the destination.
- **Exclusions**: Prevents Obsidian-specific files and temporary files from being synced.
- **Logging**: Outputs sync activity to `/tmp/sync_to_jekyll.log` and errors to `/tmp/sync_to_jekyll_error.log`.

#### 2. Launchd Service (`com.maxmilne.synctojekyll.plist`)
This `launchd` plist file configures the macOS system to run the `sync_to_jekyll.sh` script automatically.

**Option A: Event-Driven Sync (Recommended for real-time updates)**
Triggers within 1-2 seconds of changes in your Obsidian vault.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.maxmilne.synctojekyll</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Volumes/aWork Drive/1. Projects/Website/sync_to_jekyll.sh</string>
    </array>
    <key>WatchPaths</key>
    <array>
        <string>/Users/maxmilne/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault/Website/</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/sync_to_jekyll.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/sync_to_jekyll_error.log</string>
</dict>
</plist>
```

**Option B: Interval-Based Sync (Every 2 minutes)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.maxmilne.synctojekyll</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/maxmilne/scripts/sync_to_jekyll.sh</string>
    </array>
    <key>StartInterval</key>
    <integer>120</integer>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/sync_to_jekyll.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/sync_to_jekyll_error.log</string>
</dict>
</plist>
```

## Obsidian Image Embeds

Use Obsidian-style image embeds in notes and pages; the site plugin converts them into HTML `<img>` at build time.

- Supported: `![[file.jpg]]`, `![[file.jpg|200]]`, `![[file.jpg|640x480]]`, `![[sub/folder/file.jpg]]`
- Modifiers after the first `|` (multiple allowed, order flexible):
  - width/height: `200` or `320x200`
  - alt text: free text or `alt=My Alt`
  - classes: `class=rounded shadow`
  - alignment: `left`, `right`, `center` or `align=center` (adds `align-*` class)
  - title: `title=A title`
  - full-bleed: `full`, `fullwidth`, or `full-bleed` (adds `full-bleed` class)
  - page-plus: `page`, `page+`, `page-plus`, or `container` (adds `page-plus` class)
- Defaults: without a folder, images resolve under `assets/`; spaces and common characters are URL-encoded; `alt` falls back to the filename; `loading="lazy"` is added.

Examples:

```text
![[Portrait Studio Brunswick.jpg|900]]
![[Website/assets/Max_Profile.png|My portrait|right|class=rounded|title=Portrait]]
![[photos/session-01/shot-12.jpg|320x200|alt=Hero crop|class=shadow]]
![[assets/landscape.jpg|full|alt=Edge-to-edge banner]]
![[assets/landscape.jpg|page|alt=Comfortable wider-than-text]]
```

### Wide Images Standard

- Wider-than-text: use `page-plus` → `![[assets/landscape.jpg|page|alt=...]]`
  - Renders centered, width `min(80vw, 72rem)`, with a tall-image cap.
- Full-width/edge-to-edge: use `full-bleed` → `![[assets/landscape.jpg|full|alt=...]]`
  - Renders at `100vw` with viewport bleed margins.
- Tokens can be combined with size, alt, and classes.

CSS lives in `styles.scss` (`img.page-plus`, `img.full-bleed`).

### Asset folders and shorthand paths

- Place images anywhere under `assets/` (nested subfolders allowed, spaces OK).
- If your embed path includes a folder but doesn’t start with `assets/` or `/`, it is treated as relative to `assets/`.
  - `![[Studio Brunswick/hero.jpg]]` → `/assets/Studio%20Brunswick/hero.jpg`
  - `![[projects/voice/cover.jpg]]` → `/assets/projects/voice/cover.jpg`
  - `![[assets/projects/voice/cover.jpg]]` also works (explicit form)
- If no folder is provided at all, the file resolves as `/assets/<filename>`.

This keeps vault authoring tidy while allowing simple, readable paths.

### Two-up Portraits (real background)

To place two portrait images side-by-side with the page’s real background (not composited), wrap two embeds in a container div. Obsidian supports HTML blocks; Jekyll preserves them.

```html
<div class="two-up">
  ![[assets/portrait-left.jpg|alt=Left portrait]]
  ![[assets/portrait-right.jpg|alt=Right portrait]]
  <!-- Optional captions can go here as text; remove if not needed. -->
  <!-- <p>Caption for left</p><p>Caption for right</p> -->
  <!-- Avoid extra blank lines inside the container to prevent unwanted <p> wrappers. -->
</div>
```

- Responsive: stacks to one column on small screens.
- Gutter: `1rem` gap; adjust via CSS if desired.
- Equalized crop: add `equal` to crop both panels to a consistent portrait ratio while matching heights.

```html
<div class="two-up equal">
  ![[assets/portrait-left.jpg|alt=Left]]
  ![[assets/portrait-right.jpg|alt=Right]]
</div>
```

The `equal` variant uses `aspect-ratio: 3/4` and `object-fit: cover`.

### Obsidian Preview Snippet (optional)

To see the same layout inside Obsidian Preview, enable a small CSS snippet in your vault:

- File path in your vault: `.obsidian/snippets/two-up.css`
- Suggested contents are provided in this repo at: `docs/obsidian-two-up.css`

Steps:
- Copy `docs/obsidian-two-up.css` to your Obsidian vault root as `.obsidian/snippets/two-up.css` (the `.obsidian` folder sits at the vault root, not inside `Website/`).
- In Obsidian: Settings → Appearance → CSS snippets → toggle on “two-up”. If you don't see it, click “Reload snippets”.
- Ensure you’re viewing in Reading view or Live Preview; the snippet targets `.markdown-rendered` content.

This snippet renders:
- `.two-up` as a responsive two-column grid (stacks on small screens)
- `.two-up.equal` with consistent portrait ratio using `aspect-ratio: 3/4` + `object-fit: cover`
- Single-image alignment helpers: `img.align-left|align-center|align-right`

## Video Embeds (Raw iframes)

Embed YouTube or Vimeo by pasting their iframe directly into notes. Obsidian renders iframes in Reading/Live Preview, and Jekyll outputs them unchanged.

- YouTube (privacy-friendly):
  `<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&start=65" title="Talk title" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

- Vimeo (Do Not Track):
  `<iframe src="https://player.vimeo.com/video/VIDEO_ID?dnt=1" title="Reel title" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowfullscreen></iframe>`

- Optional responsive wrapper (16:9):
  `<div style="position:relative;padding-top:56.25%;height:0;overflow:hidden;"><iframe src="…" title="…" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="position:absolute;inset:0;border:0;width:100%;height:100%;"></iframe></div>`

Notes:
- Use `title` for accessibility.
- Prefer `loading="lazy"` and the strict referrer policy.
- Raw iframes are not modified by the image embed plugin.

## Audio Embeds

Use Obsidian-style embeds for local audio files; the site plugin converts them into HTML5 `<audio>` at build time.

- Supported: `![[file.mp3]]`, `![[assets/audio/clip.m4a|title=Interview|preload=metadata]]`, `![[recording.ogg|autoplay|loop]]`
- Defaults: If no folder is provided, paths resolve under `assets/` (place audio files in `assets/` or reference their folder explicitly).
- Modifiers after the first `|` (order flexible):
  - title: `title=My Title`
  - preload: `preload=auto|metadata|none` (default: `metadata`)
  - flags: `autoplay`, `loop`, `muted`, `controls` (controls on by default)
  - classes: `class=compact` (optional wrapper styling in the future)

Examples:

```text
![[Breath.mp3|title=Breath — ABC RN]]
![[assets/audio/interview.m4a|preload=metadata|title=Interview]]
![[field-recording.ogg|autoplay|loop|title=Ambient]]
```

Service pages (e.g., ABC, Apple, Spotify) typically don’t provide universal iframe embeds. If an official “Embed” is offered, paste that iframe as-is. Otherwise, download or locate the direct media URL and use the audio embed above.

### Troubleshooting

#### Audio/Video Player Issues
- Player not showing: Restart Jekyll after adding or changing plugins (`Ctrl+C` then `bundle exec jekyll serve`).
- File location: Ensure the audio file lives in a published folder (e.g., `assets/`), not under an underscored folder like `_notes/`.
- Short form paths: `![[Breath.mp3]]` resolves to `assets/Breath.mp3`. Use `![[assets/Breath.mp3]]` for an explicit path.
- Title text: Use `title=...` to set the player's `title` attribute; free text after `|` does not set title unless you write `title=`.

#### Jekyll Build Errors

**Error: `undefined method '[]' for nil:NilClass`**

This error typically occurs when the `jekyll-last-modified-at` plugin cannot get git timestamps for files.

**Common Causes:**
1. **Git repository corruption** - Missing git objects prevent git commands from returning valid data
2. **Bundler version mismatch** - Old vendor/bundle with different bundler version

**Diagnosis:**
```bash
# Check git health
git fsck --full

# Look for "missing blob/tree/commit" errors (bad)
# "dangling blob/commit" warnings are harmless
```

**Solutions:**

For git corruption:
```bash
# Option 1: Restore .git from backup
mv .git .git.backup
cp -r /path/to/backup/.git ./

# Option 2: Fresh git init (loses history)
rm -rf .git
git init
git add .
git commit -m "Fresh start"
```

For bundler mismatch:
```bash
# Clean and reinstall gems
rm -rf vendor/bundle
bundle install
```

**Prevention:**
- Regularly backup the `.git` folder (Carbon Copy Cloner does this by default)
- Use `git fsck` periodically to catch corruption early
- Keep bundler version consistent across environments

### Obsidian-friendly authoring

Use an HTML wrapper that previews correctly in Obsidian and converts in Jekyll:

```html
<div class="two-up">
  ![[assets/portrait-left.jpg|alt=Left]]
  ![[assets/portrait-right.jpg|alt=Right]]
</div>
```

For matched heights/crop, add `equal`:

```html
<div class="two-up equal">
  ![[assets/portrait-left.jpg]]
  ![[assets/portrait-right.jpg]]
</div>
```

**Launchd Configuration Details:**
- **`Label`**: Unique identifier for the launchd service.
- **`ProgramArguments`**: Specifies the path to the sync script.
- **`WatchPaths` (Event-Driven)**: Monitors the Obsidian vault directory for changes and triggers the script.
- **`StartInterval` (Interval-Based)**: Runs the script every 120 seconds (2 minutes).
- **`RunAtLoad`**: Executes the script once when the service is loaded.
- **`StandardOutPath` / `StandardErrorPath`**: Redirects script output and errors to log files.

### Setup and Management

#### Initial Synchronization
1. **Make script executable**: `chmod +x sync_to_jekyll.sh`
2. **Run setup script**: `chmod +x setup_obsidian_sync.sh && ./setup_obsidian_sync.sh` (This script performs the first sync and configures `.gitignore`).

#### Loading and Starting the Service
```zsh
# Unload old service (if any)
launchctl unload ~/Library/LaunchAgents/com.maxmilne.synctojekyll.plist

# Load new service
launchctl load ~/Library/LaunchAgents/com.maxmilne.synctojekyll.plist

# Start the service (for interval-based sync, or to trigger initial event-driven sync)
launchctl start com.maxmilne.synctojekyll
```

#### Verification
- **Monitor logs**: `tail -f /tmp/sync_to_jekyll.log`
- **Check for errors**: `cat /tmp/sync_to_jekyll_error.log`

#### Maintenance
- **Stop sync**: `launchctl unload ~/Library/LaunchAgents/com.maxmilne.synctojekyll.plist`
- **Adjust frequency (interval-based)**: Edit `StartInterval` value (seconds) in the plist.
  - **View logs**: Check `/tmp/sync_to_jekyll*.log` files.

---

## Legacy Static Sites

You can host legacy sites (e.g., exported Squarespace) as a static subfolder and link to them from project pages. Jekyll copies non‑underscored folders verbatim without applying layouts.

Recommended structure
- Place the legacy site at repo root under a short folder, e.g., `studiobrunswick/`.
- Ensure `studiobrunswick/index.html` exists. Keep asset references relative or absolute as in the export.

Typography alignment (optional but recommended)
- Add `studiobrunswick/overrides.css` and link it in every legacy page’s head:
  `<link rel="stylesheet" href="/studiobrunswick/overrides.css">`
- The stylesheet loads Futura PT via Typekit and normalizes weights to match the 2020 look:
  - Body: 300
  - `.sqs-block-content h2`: 300
  - `.sqs-block-content h3`: 400
  - Footer contact line `#footerBlocksTop h2`: 300; its `<strong>` label: 600
  - `strong/b`: 500

UI icons
- Legacy markup references `/assets/ui-icons.svg#…`. A minimal sprite is provided at `assets/ui-icons.svg` to remove 404s.

Analytics/script 404s
- Squarespace telemetry endpoints (e.g., `/api/census/...`) don’t exist locally. They may 404 in logs; safe to ignore or remove related scripts from the legacy HTML if noise is a concern.

Linking from a project page
- Use a clear external‑style CTA that opens in a new tab:
  `<a href="{{ site.baseurl }}/studiobrunswick/" target="_blank" rel="noopener">Browse the 2020 site ↗</a>`


### Current Status and Improvements
- **Script Functionality**: Verified working through manual execution.
- **Lock Mechanism**: Prevents overlapping sync operations.

**Areas for Improvement:**
1. **Launchd Troubleshooting**: Resolve "Input/output error" during service reload; investigate alternative service managers.
2. **Performance Optimization**: Add `rsync` progress reporting; implement incremental sync for large files.
3. **Error Handling**: Add email/SMS notifications for failures; implement retry mechanism for transient errors.
4. **Monitoring**: Add health check endpoint; implement log rotation.
5. **Security**: Encrypt sensitive paths in configuration; add checksum verification.

---

## Animation Presentation & Palette

### Overview
Animations (e.g., ASCII Petals) can be presented in consistent, site-aligned frames using simple wrapper variants that set CSS custom properties. The canonical reference lives at:

- `docs/animations/ascii-petals-style-guide.html`

This page documents the approved color palettes and presentation treatments. All variants share the same animation algorithm; only glyph color and framing differ.

### Current Variants (Pairs)

- Plain — Cream: No frame or paper; bright cream/white glyphs rendered directly on the site background.
- Noir — Framed Cream: Deep charcoal paper with a 1px border; cream/white glyphs.
- Plain — Blue: No frame or paper; blue glyphs (pulse between `#3b82f6` and `#93c5fd`).
- Indigo — Framed Blue: Indigo paper with a 1px border; blue glyphs.

### Technical Notes

- CSS variables (scoped per wrapper):
  - `--paper`: canvas background fill (use `transparent` for “Plain” variants)
  - `--accent` / `--accent2`: glyph color stops used by the pulsing blend
- Accessibility: Respects `prefers-reduced-motion: reduce` by rendering a static frame.
- Simplicity: Framed variants use only background color plus a 1px border; no shadows or texture overlays to keep with the site’s quiet aesthetic.

### Future Extraction

For sitewide reuse, extract wrappers into a partial (e.g., `_sass/_ascii.scss`) and define classes such as:

```
.ascii-plain-cream   { --paper: transparent; --accent: #fff;     --accent2: #e8ddd4; }
.ascii-noir-cream    { --paper: #151311;   --accent: #fff;     --accent2: #e8ddd4; border:1px solid var(--color-graphite); background: var(--color-charcoal); }
.ascii-plain-blue    { --paper: transparent; --accent: #3b82f6; --accent2: #93c5fd; }
.ascii-indigo-blue   { --paper: #0f1218;   --accent: #3b82f6; --accent2: #93c5fd; border:1px solid #151821; background: #0f1115; }
```

Then wrap canvases in a container element using the chosen class. The renderer reads colors from the wrapper via CSS variables.
September 4, 2025

Creation-Date Ordering: Notes now sort by creation date across the site.
- New plugin `_plugins/created_at_generator.rb` sets `created_at` and `created_at_timestamp`
- Precedence: front matter `created_at`/`created`/`date_created` → front matter `date` → file birth time → file modified time
- Home and tag pages now sort by `created_at_timestamp`; displayed dates use `created_at`

September 25, 2025

Projects Page Spacing: Added breathing room unique to the Projects index.
- Wrapper: `_layouts/projects.html` → `<section class="projects-page">`
- Styles: `_sass/_projects.scss`
  - `.projects-page { padding-top: calc(var(--section-spacing) * 0.75); }`
  - `.projects-page > article { margin-bottom: var(--section-spacing); }`

Navigation: Added “Projects” to the top menu.
- File: `_includes/nav.html`

Assets Shorthand: Simplified embeds for subfolders under `assets/`.
- Plugin: `_plugins/obsidian_image_embeds.rb`
- Behavior: foldered paths not starting with `assets/` or `/` resolve under `/assets/…`

September 26, 2025

Legacy Static Site Integration: Added support guidance and styles for hosting an old Squarespace site under `studiobrunswick/`.
- See “Legacy Static Sites” below.

Project Detail Descriptions: Project pages surface their short description under the title.
- Template: `_layouts/project.html` renders `page.description` after `<h1>` when present.
- Styles: `_sass/_projects.scss` keeps `.project-description-inline` in the Dieter Rams secondary tone (`var(--color-meta)` / #9c958c), 1.05rem, system spacing.

Project Page Cream Background: Individual project pages use a light palette.
- Defaults: `_config.yml` assigns `body_class: project-page` for `_projects/**`.
- Layout: `_layouts/default.html` sets `<body class="{{ page.body_class }}">` to enable page-specific styling.
- Styles: `_sass/_projects.scss` defines `body.project-page` overrides (cream background, dark typography, adjusted hover/border colors).

Projects Index Tag Filter: `/projects/` supports client-side filtering by tags.
- Template: `_layouts/projects.html` builds unique tag buttons, annotates entries with `data-tag-slugs`, and includes a small JS toggle.
- Styles: `_sass/_projects.scss` adds `.project-filters`, `.project-filter`, and `.project-entry.is-hidden` (with light/dark variants for cream detail pages).

November 1, 2025

**Dieter Rams Metadata Palette**: Unified project metadata colors for clear visual hierarchy.

**Implementation:**
- File: `_sass/_projects.scss`
- Changed 5 color declarations from mixed values to systematic `var(--color-meta)`
- Affected classes:
  - `.project-description` - Previously `var(--color-cream)`, now `var(--color-meta)`
  - `.project-description-inline` - Previously `var(--color-stone)`, now `var(--color-meta)`
  - `.project-year` - Previously `var(--color-warm-gray)`, now `var(--color-meta)`
  - `.project-year-inline` - Previously `var(--color-warm-gray)`, now `var(--color-meta)`
  - `.project-meta` - Previously `var(--color-warm-gray)`, now `var(--color-meta)`

**Design Rationale:**
- Creates clear typographic hierarchy: project titles (cream) vs. supporting details (meta gray)
- Follows Dieter Rams principle: "As little design as possible"
- Eliminates color inconsistency between related metadata elements
- Maintains readability while establishing clear information architecture

**Color Reference:**
- `--color-meta: #9c958c` - Warm gray metadata tone for labels, dates, and descriptions
- `--color-cream: #e8ddd4` - Reserved for primary content (titles)

## Design Consistency Refinement - November 1, 2025

**Comprehensive design review and standardization** to ensure visual consistency and coherent refinement across all pages.

**Changes Made:**

1. **Fixed Divider Color Opacity** (`_sass/_style.scss`)
   - Changed `--color-divider: var(--color-stone)` to `rgba(74, 69, 63, 0.6)`
   - Matches documented design system with systematic 0.6 opacity
   - Affects all HR elements, footer borders, and dividers site-wide

2. **Fixed "You Might Also Enjoy" Link Colors** (`_sass/_style.scss`)
   - Added `.you-might-enjoy` component styles
   - Recommendation links now use standard meta gray with blue hover
   - Matches all other link colors for consistency

3. **Fixed Heading Hierarchy** (`_notes/Social Meditation...md`)
   - Converted 3 mid-document H1s to H2s for proper semantic structure
   - Ensures valid HTML heading outline (only one H1 per page)
   - Improves accessibility and document semantics

4. **Removed Unused Cream Background CSS** (`_sass/_projects.scss`)
   - Deleted all `body.project-page` rules (67+ lines)
   - Kept dark background theme per user preference
   - Cleaned up unused code for easier maintenance

5. **Replaced Magic Numbers with Variables** (`_sass/_projects.scss`)
   - `.projects-list margin-top: 1rem` → `var(--space-md)`
   - `.project-entry padding: 1rem 0` → `var(--space-md) 0`
   - Ensures all spacing derives from systematic scale

6. **Documented Bold/Strong Text** (`docs/STYLE_GUIDE.md`)
   - Added new section explaining bold text usage
   - Guidelines for category labels in structured content
   - Clarifies distinction from heading hierarchy

**Verification:**
- All changes reviewed visually
- No breaking changes to existing layouts
- Typography hierarchy verified across all page types
- Color system now fully aligned with documentation

---

## Backup and Disaster Recovery

### Backup Strategy

**What to Backup:**
- The entire project folder (including hidden files)
- Carbon Copy Cloner automatically includes `.git` folder
- All content, configuration, plugins, and git history are preserved

**What Gets Backed Up:**
- ✅ All content files (`_notes/`, `_pages/`, `_projects/`)
- ✅ `.git` folder (critical for last-modified dates)
- ✅ Configuration files (`_config.yml`, `Gemfile`, `Gemfile.lock`)
- ✅ Custom code (`_plugins/`, `_layouts/`, `_includes/`, `_sass/`)
- ✅ Project-specific settings (`.claude/settings.local.json`)

**What Doesn't Get Backed Up:**
- ❌ Claude Code conversation history (stored globally in `~/.claude/`)
- ❌ Generated output (`_site/` - can be rebuilt)
- ❌ Installed gems (`vendor/bundle/` - can be reinstalled)

### Restoring from Backup

**To Restore on Same Machine:**
1. Copy backup folder to desired location
2. Navigate to folder: `cd /path/to/restored/Website`
3. Reinstall gems: `bundle install`
4. Start Jekyll: `bundle exec jekyll serve`

**To Restore on Different Machine:**
1. Install Ruby 3.2.2 (via rbenv):
   ```bash
   brew install rbenv
   rbenv install 3.2.2
   rbenv global 3.2.2
   eval "$(rbenv init -)"
   ```
2. Copy backup folder to machine
3. Navigate to folder and run: `bundle install`
4. Start Jekyll: `bundle exec jekyll serve`

**Important Notes:**
- Backups are fully functional - no additional configuration needed
- Git remote connections preserved but require authentication on new machines
- Claude Code conversation history is tied to original folder path
- To resume conversations in restored copy, they must be at same absolute path

### Claude Code Conversation History

**Storage Location:**
- Conversations stored in: `~/.claude/`
- Path-specific: linked to absolute folder path
- Universal: contains history for ALL projects

**Implications:**
- Restoring to different path = no conversation history
- Restoring to same path = conversation history available
- For disaster recovery: code/content backup is what matters
- Can always start new conversations in any copy

### Verification Checklist

After restoring from backup, verify:
- [ ] Git works: `git log --oneline`
- [ ] Git is healthy: `git fsck --full` (only dangling objects OK)
- [ ] Jekyll builds: `bundle exec jekyll build`
- [ ] Server starts: `bundle exec jekyll serve --livereload`
- [ ] Can access site at http://localhost:4000

---

## Repository Maintenance

### Regular Cleanup

**Dead Wood Removal** (November 1, 2025):
Performed comprehensive cleanup of unused files and temporary artifacts:

**Files Removed:**
- Debug/development scripts (3 files): `analyze_copilot_structure.py`, `debug_copilot.rb`
- Recovery documentation (2 files): `RECOVERY_PLAN.md`, `JEKYLL_FIX_README.md` (issues resolved)
- Sync configuration (1 file): `com.maxmilne.obsidian-sync.plist` (sync agent not active)
- All `.DS_Store` files (12 files - macOS Finder metadata)
- All `.edtz` backup files (49 files - editor temporary backups)
- All `.unison.tmp` files (4 files - orphaned sync temps)
- Duplicate sync heartbeat: `.sync_heartbeat 2`
- Test files: `unison_test_file.md`, old backup `sync_to_jekyll.sh.bak_20250613223739`
- Empty shell scripts (4 files): `run_jekyll.sh`, `start.sh`, `sync_to_jekyll.sh`, `safe_sync_obsidian_to_jekyll.sh`
- Empty draft test files (3 files): `Hello world.md`, `It is really working.md`, `yes.md`
- Generated `_site/` directory (~24 MB - regenerates on build)

**Total Impact:**
- ~173 files removed
- ~25+ MB freed
- Significantly reduced repository clutter

**Configuration Updates:**
- Created comprehensive `.gitignore` to prevent temp files from returning
- Patterns added: `.DS_Store`, `*.edtz`, `*.unison.tmp`, `*.bak`, `_site/`, `.bundle/`, `vendor/bundle/`, IDE files

**Best Practices:**
- Perform periodic cleanup of temp files (`.DS_Store`, editor backups)
- Remove resolved documentation after archiving important information
- Verify sync agents before retaining configuration files
- Always regenerate `_site/` - never commit build output
- Keep `.gitignore` updated with common temp file patterns
