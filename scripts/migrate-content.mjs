import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const repoRoot = process.cwd();

const SRC_NOTES_DIR = path.join(repoRoot, '_notes');
const SRC_PROJECTS_DIR = path.join(repoRoot, '_projects');
const SRC_PAGES_DIR = path.join(repoRoot, '_pages');

const OUT_NOTES_DIR = path.join(repoRoot, 'src/content/notes');
const OUT_PROJECTS_DIR = path.join(repoRoot, 'src/content/projects');
const OUT_PAGES_DIR = path.join(repoRoot, 'src/pages');

function slugify(input) {
  return String(input)
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ensureLeadingSlash(p) {
  if (!p) return '/';
  return p.startsWith('/') ? p : `/${p}`;
}

function ensureTrailingSlash(p) {
  if (!p) return '/';
  return p.endsWith('/') ? p : `${p}/`;
}

function encodeUrlPath(p) {
  // Keep slashes, encode common filename characters.
  return p
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/');
}

function shieldFences(md) {
  const shields = [];
  const shielded = md.replace(/```[\t ]*([a-zA-Z0-9_-]+)?\n([\s\S]*?)\n```/g, (m) => {
    const token = `__MD_FENCE_SHIELD_${shields.length}__`;
    shields.push(m);
    return token;
  });
  return { shielded, shields };
}

function unshieldFences(md, shields) {
  return md.replace(/__MD_FENCE_SHIELD_(\d+)__/g, (_, n) => shields[Number(n)]);
}

function normalizeAssetPath(raw) {
  let normalized = raw.trim();

  // Normalize any path containing assets/ to start at assets/
  const idx = normalized.toLowerCase().indexOf('assets/');
  if (idx !== -1) {
    normalized = normalized.slice(idx);
    if (normalized.toLowerCase().startsWith('assets/')) normalized = 'assets/' + normalized.slice('assets/'.length);
  }

  // Default to assets/ when no folder is provided
  if (!normalized.includes('/')) {
    normalized = `assets/${normalized}`;
  } else {
    if (normalized.startsWith('/')) {
      normalized = normalized.slice(1);
    }
    if (!normalized.toLowerCase().startsWith('assets/')) {
      // Support shorthand like photos/x.jpg -> assets/photos/x.jpg
      normalized = `assets/${normalized}`;
    }
  }

  return normalized;
}

function parseEmbedModifiers(mod) {
  const result = { width: null, height: null, alt: null, classes: [], title: null, loading: null };
  if (!mod) return result;

  const tokens = mod
    .split('|')
    .map((t) => t.trim())
    .filter(Boolean);

  for (const t of tokens) {
    if (/^\d+x\d+$/i.test(t)) {
      const [w, h] = t.toLowerCase().split('x').map((n) => Number(n));
      result.width = w;
      result.height = h;
      continue;
    }
    if (/^\d+$/.test(t)) {
      result.width = Number(t);
      continue;
    }

    let m;
    if ((m = t.match(/^alt=(.+)$/i))) {
      result.alt = m[1].trim();
      continue;
    }
    if ((m = t.match(/^class=(.+)$/i))) {
      const cls = m[1].trim();
      if (cls) result.classes.push(...cls.split(/\s+/));
      continue;
    }
    if ((m = t.match(/^title=(.+)$/i))) {
      result.title = m[1].trim();
      continue;
    }
    if ((m = t.match(/^(eager|lazy)$/i))) {
      result.loading = m[1].toLowerCase();
      continue;
    }
    if ((m = t.match(/^loading=(eager|lazy)$/i))) {
      result.loading = m[1].toLowerCase();
      continue;
    }
    if ((m = t.match(/^(left|right|center)$/i))) {
      result.classes.push(`align-${m[1].toLowerCase()}`);
      continue;
    }
    if ((m = t.match(/^align=(left|right|center)$/i))) {
      result.classes.push(`align-${m[1].toLowerCase()}`);
      continue;
    }

    // Full-bleed / wide variants
    if (/^(full|full[-_ ]?width|full[-_ ]?bleed)$/i.test(t)) {
      result.classes.push('full-bleed');
      continue;
    }
    if (/^(wide|wide[-_ ]?crop|bleed[-_ ]?crop|hero)$/i.test(t)) {
      result.classes.push('wide-crop');
      continue;
    }
    if (/^(page\+?|page[-_ ]?plus|page[-_ ]?wide|container)$/i.test(t)) {
      result.classes.push('page-plus');
      continue;
    }

    // Fallback: first free-form token becomes alt text
    if (!result.alt) result.alt = t;
  }

  return result;
}

function isAudioPath(p) {
  return /\.(mp3|m4a|aac|flac|ogg|oga|wav)(?:\?|#|$)/i.test(p);
}

function isNonImageTarget(p) {
  const r = p.trim();
  if (/^(youtube|vimeo):/i.test(r)) return true;
  if (/\.(mp3|m4a|aac|flac|ogg|oga|wav|webm|ogv|mp4|m4v|mov)(?:\?|#|$)/i.test(r)) return true;
  if (/^https?:\/\//i.test(r) && /(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)/i.test(r)) return true;
  return false;
}

function mimeTypeForAudio(url) {
  if (/\.(mp3)(?:\?|#|$)/i.test(url)) return 'audio/mpeg';
  if (/\.(m4a|aac)(?:\?|#|$)/i.test(url)) return 'audio/mp4';
  if (/\.(ogg|oga)(?:\?|#|$)/i.test(url)) return 'audio/ogg';
  if (/\.(wav)(?:\?|#|$)/i.test(url)) return 'audio/wav';
  if (/\.(flac)(?:\?|#|$)/i.test(url)) return 'audio/flac';
  return 'audio/mpeg';
}

function convertObsidianEmbeds(md) {
  const { shielded, shields } = shieldFences(md);

  // Audio first
  let processed = shielded.replace(/!\[\[(.+?)(?:\|([^\]]+))?\]\]/g, (full, raw, modRaw = '') => {
    const rawPath = String(raw).trim();
    if (!isAudioPath(rawPath)) return full;

    const assetPath = normalizeAssetPath(rawPath);
    const src = `/${encodeUrlPath(assetPath)}`;

    const opts = { title: null, preload: null, autoplay: false, loop: false, muted: false, controls: true, classes: [] };
    const tokens = String(modRaw)
      .split('|')
      .map((t) => t.trim())
      .filter(Boolean);

    for (const t of tokens) {
      let m;
      if ((m = t.match(/^title=(.+)$/i))) opts.title = m[1].trim();
      else if ((m = t.match(/^preload=(auto|metadata|none)$/i))) opts.preload = m[1].toLowerCase();
      else if ((m = t.match(/^class=(.+)$/i))) opts.classes.push(...m[1].trim().split(/\s+/));
      else if (/^autoplay$/i.test(t)) opts.autoplay = true;
      else if (/^loop$/i.test(t)) opts.loop = true;
      else if (/^muted$/i.test(t)) opts.muted = true;
      else if (/^controls$/i.test(t)) opts.controls = true;
      else if (/^no-controls$/i.test(t)) opts.controls = false;
    }

    const attrs = [];
    if (opts.controls !== false) attrs.push('controls');
    attrs.push(`preload="${opts.preload || 'metadata'}"`);
    if (opts.autoplay) attrs.push('autoplay');
    if (opts.loop) attrs.push('loop');
    if (opts.muted) attrs.push('muted');
    if (opts.title) attrs.push(`title="${escapeHtml(opts.title)}"`);
    if (opts.classes.length) attrs.push(`class="${escapeHtml(opts.classes.join(' '))}"`);

    const mime = mimeTypeForAudio(src);

    return [
      `<audio ${attrs.join(' ')}>` ,
      `<source src="${escapeHtml(src)}" type="${mime}">`,
      `Your browser does not support the audio element. <a href="${escapeHtml(src)}">Download audio</a>`,
      `</audio>`
    ].join('');
  });

  // Images
  processed = processed.replace(/!\[\[(.+?)(?:\|([^\]]+))?\]\]/g, (full, raw, modRaw = '') => {
    const rawPath = String(raw).trim();
    if (isNonImageTarget(rawPath) || isAudioPath(rawPath)) return full;

    const assetPath = normalizeAssetPath(rawPath);
    const src = `/${encodeUrlPath(assetPath)}`;

    const opts = parseEmbedModifiers(String(modRaw).trim());

    const base = path.posix.basename(rawPath);
    const altDefault = base.replace(path.extname(base), '').replace(/[_-]+/g, ' ').trim();
    const alt = opts.alt || altDefault;

    const loading = opts.loading && ['lazy', 'eager'].includes(opts.loading) ? opts.loading : 'lazy';

    const attrs = [];
    attrs.push(`src="${escapeHtml(src)}"`);
    attrs.push(`alt="${escapeHtml(alt)}"`);
    attrs.push(`loading="${loading}"`);
    if (opts.width) attrs.push(`width="${opts.width}"`);
    if (opts.height) attrs.push(`height="${opts.height}"`);
    if (opts.classes.length) attrs.push(`class="${escapeHtml(opts.classes.join(' '))}"`);
    if (opts.title) attrs.push(`title="${escapeHtml(opts.title)}"`);

    return `<img ${attrs.join(' ')} />`;
  });

  return unshieldFences(processed, shields);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function convertWikiLinks(md, linkMap) {
  // Skip embeds (![[...]]). Convert [[Target]] and [[Target|Label]].
  return md.replace(/(?<!!)\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (full, targetRaw, labelRaw) => {
    const target = String(targetRaw).trim();
    const label = (labelRaw ? String(labelRaw).trim() : target);

    const key = target.toLowerCase();
    const href = linkMap.get(key);

    if (!href) {
      return label; // keep readable, drop broken link markup
    }

    return `<a class="internal-link" href="${href}">${escapeHtml(label)}</a>`;
  });
}

function cleanupJekyllBits(md) {
  return md
    .replace(/\{\:\s*[^}]+\}/g, '') // kramdown attribute lists
    .replace(/\{%-?\s*[\s\S]*?\s*-?%\}/g, '') // Liquid tags
    .replace(/\{\{\s*site\.baseurl\s*\}\}/g, '')
    .replace(/\{\{\s*site\.title\s*\}\}/g, 'Max Milne');
}

function ensureFrontmatterKeys(data, allowedKeys) {
  const out = {};
  for (const k of allowedKeys) {
    if (data[k] !== undefined) out[k] = data[k];
  }
  return out;
}

async function listMarkdownFiles(dir) {
  const out = [];
  async function walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) out.push(full);
    }
  }
  await walk(dir);
  return out;
}

async function resetDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  await resetDir(OUT_NOTES_DIR);
  await resetDir(OUT_PROJECTS_DIR);

  // Gather sources
  const noteFiles = await listMarkdownFiles(SRC_NOTES_DIR);
  const projectFiles = await listMarkdownFiles(SRC_PROJECTS_DIR);
  const pageFiles = await listMarkdownFiles(SRC_PAGES_DIR);

  // Parse frontmatter for mapping
  const notes = [];
  for (const file of noteFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const { data, content } = matter(raw);
    const base = path.basename(file, path.extname(file));
    const slug = slugify(base);

    let url;
    if (data.permalink) {
      url = ensureTrailingSlash(ensureLeadingSlash(String(data.permalink).trim()));
    } else {
      url = ensureTrailingSlash(`/${slug}`);
    }

    notes.push({ file, base, slug, url, data, content });
  }

  const projects = [];
  for (const file of projectFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const { data, content } = matter(raw);
    const base = path.basename(file, path.extname(file));
    const slug = slugify(base);
    const url = ensureTrailingSlash(`/projects/${slug}`);
    projects.push({ file, base, slug, url, data, content });
  }

  const pages = [];
  for (const file of pageFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const { data, content } = matter(raw);
    const permalink = data.permalink ? ensureTrailingSlash(ensureLeadingSlash(String(data.permalink).trim())) : null;
    const title = data.title ? String(data.title).trim() : path.basename(file, path.extname(file));
    pages.push({ file, data, content, permalink, title });
  }

  // Build link map (title + basename → href)
  const linkMap = new Map();

  function addLinkKeys(title, base, href) {
    if (title) linkMap.set(String(title).toLowerCase(), href);
    if (base) linkMap.set(String(base).toLowerCase(), href);
  }

  for (const n of notes) addLinkKeys(n.data.title, n.base, n.url);
  for (const p of projects) addLinkKeys(p.data.title, p.base, p.url);
  for (const pg of pages) {
    if (!pg.permalink) continue;
    addLinkKeys(pg.title, path.basename(pg.file, path.extname(pg.file)), pg.permalink);
  }

  // Write notes
  for (const n of notes) {
    let md = n.content;
    md = cleanupJekyllBits(md);
    md = convertObsidianEmbeds(md);
    md = convertWikiLinks(md, linkMap);

    const outData = {
      title: n.data.title || n.base,
      date: n.data.date || null,
      tags: n.data.tags || [],
      excerpt: n.data.excerpt || null,
      permalink: n.data.permalink || null
    };

    const fm = matter.stringify(md.trim() + '\n', outData);
    const outPath = path.join(OUT_NOTES_DIR, `${n.slug}.md`);
    await fs.writeFile(outPath, fm);
  }

  // Write projects
  for (const p of projects) {
    let md = p.content;
    md = cleanupJekyllBits(md);
    md = convertObsidianEmbeds(md);
    md = convertWikiLinks(md, linkMap);

    const outData = {
      title: p.data.title || p.base,
      year: p.data.year || null,
      description: p.data.description || null,
      order: p.data.order ?? null,
      tags: p.data.tags || []
    };

    const fm = matter.stringify(md.trim() + '\n', outData);
    const outPath = path.join(OUT_PROJECTS_DIR, `${p.slug}.md`);
    await fs.writeFile(outPath, fm);
  }

  // Write simple pages as Astro .md (skip pages that are now Astro-driven)
  const SKIP_PERMALINKS = new Set(['/','/writing/','/projects/']);
  const SKIP_FILES = new Set(['projects-filter-prototypes.md']);

  for (const pg of pages) {
    const fileBase = path.basename(pg.file);
    if (SKIP_FILES.has(fileBase)) continue;
    if (!pg.permalink) continue;
    if (SKIP_PERMALINKS.has(pg.permalink)) continue;

    // Map permalink to output path
    const trimmed = pg.permalink.replace(/^\/+|\/+$/g, '');
    const outFile = trimmed === '' ? 'index.md' : `${trimmed}.md`;
    const outPath = path.join(OUT_PAGES_DIR, outFile);

    await fs.mkdir(path.dirname(outPath), { recursive: true });

    let md = pg.content;
    md = cleanupJekyllBits(md);
    md = convertObsidianEmbeds(md);
    md = convertWikiLinks(md, linkMap);

    const outData = {
      title: pg.data.title || pg.title,
      bodyClass: pg.data.body_class || null
    };

    // Use the shared PageLayout for all markdown pages.
    outData.layout = '../layouts/PageLayout.astro';

    const fm = matter.stringify(md.trim() + '\n', outData);
    await fs.writeFile(outPath, fm);
  }

  console.log(`Migrated ${notes.length} notes, ${projects.length} projects, ${pages.length} pages.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
