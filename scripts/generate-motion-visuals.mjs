import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import matter from 'gray-matter';
import { createCanvas } from '@napi-rs/canvas';

const ROOT = process.cwd();
const NOTES_DIR = path.join(ROOT, 'src', 'content', 'notes');
const OUTPUT_DIR = path.join(ROOT, 'public', 'generated', 'writing');
const FFMPEG_PATH = process.env.FFMPEG_PATH || '/opt/homebrew/bin/ffmpeg';

const WIDTH = 960;
const HEIGHT = 540;
const FPS = 20;
const DURATION = 6;
const FRAME_COUNT = FPS * DURATION;

const palette = [
  { color: '#201d1a', alpha: 0.08 },
  { color: '#2d2926', alpha: 0.1 },
  { color: '#4a453f', alpha: 0.08 },
  { color: '#9c958c', alpha: 0.06 },
  { color: '#3b82f6', alpha: 0.05 },
  { color: '#93c5fd', alpha: 0.04 }
];

function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function parseArgs() {
  const args = process.argv.slice(2);
  let limit = null;
  let only = null;
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg.startsWith('--limit=')) {
      limit = Number(arg.split('=')[1]);
    } else if (arg === '--limit') {
      limit = Number(args[i + 1]);
      i += 1;
    } else if (arg.startsWith('--only=')) {
      only = arg.split('=')[1];
    } else if (arg === '--only') {
      only = args[i + 1];
      i += 1;
    }
  }
  return { limit, only };
}

function toSlug(input) {
  return String(input)
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/["'']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createNoisePattern(ctx, rng) {
  const size = 220;
  const noiseCanvas = createCanvas(size, size);
  const noiseCtx = noiseCanvas.getContext('2d');
  const imageData = noiseCtx.createImageData(size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = 210 + Math.floor(rng() * 35);
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 20 + Math.floor(rng() * 40);
  }
  noiseCtx.putImageData(imageData, 0, 0);
  return ctx.createPattern(noiseCanvas, 'repeat');
}

function buildParticles(rng, count) {
  const particles = [];
  for (let i = 0; i < count; i += 1) {
    const choice = palette[Math.floor(rng() * palette.length)];
    particles.push({
      baseX: rng() * WIDTH,
      baseY: rng() * HEIGHT,
      drift: 6 + rng() * 18,
      phase: rng() * Math.PI * 2,
      length: 10 + rng() * 18,
      weight: 0.35 + rng() * 0.9,
      color: choice.color,
      alpha: choice.alpha * (0.7 + rng() * 0.7)
    });
  }
  return particles;
}

function flowAngle(x, y, t, seedShift) {
  const nx = (x / WIDTH - 0.5) * 2.2;
  const ny = (y / HEIGHT - 0.5) * 2.2;
  const t1 = t * Math.PI * 2;
  const a = Math.sin(nx * 1.8 + Math.cos(ny * 1.4 + seedShift) + Math.cos(t1 * 0.8));
  const b = Math.cos(ny * 1.6 - Math.sin(nx * 1.2 + seedShift * 0.7) + Math.sin(t1 * 0.9));
  return Math.atan2(a, b);
}

async function renderNote(note) {
  const rng = mulberry32(note.seed);
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `motion-${note.slug}-`));
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');
  const grainPattern = createNoisePattern(ctx, rng);
  const particles = buildParticles(rng, 320);
  const seedShift = rng() * Math.PI * 2;

  const backgroundGradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  backgroundGradient.addColorStop(0, '#141210');
  backgroundGradient.addColorStop(1, '#1b1816');

  for (let frame = 0; frame < FRAME_COUNT; frame += 1) {
    const t = frame / FRAME_COUNT;
    const tAngle = t * Math.PI * 2;

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const glow = ctx.createRadialGradient(
      WIDTH * 0.35,
      HEIGHT * 0.4,
      50,
      WIDTH * 0.35,
      HEIGHT * 0.4,
      WIDTH * 0.75
    );
    glow.addColorStop(0, 'rgba(74, 69, 63, 0.18)');
    glow.addColorStop(1, 'rgba(20, 18, 16, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineCap = 'round';

    for (const p of particles) {
      const wobble = 0.65 + 0.35 * Math.sin(tAngle + p.phase);
      const x = p.baseX + Math.cos(tAngle + p.phase) * p.drift * wobble;
      const y = p.baseY + Math.sin(tAngle * 0.92 + p.phase * 1.3) * p.drift * 0.9;
      const angle = flowAngle(x, y, t, seedShift);

      ctx.strokeStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.lineWidth = p.weight;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(angle) * p.length,
        y + Math.sin(angle) * p.length
      );
      ctx.stroke();
    }

    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#e8ddd4';
    ctx.beginPath();
    ctx.arc(WIDTH * 0.72, HEIGHT * 0.32, 80, 0, Math.PI * 2);
    ctx.fill();

    if (grainPattern) {
      ctx.globalAlpha = 0.035;
      ctx.fillStyle = grainPattern;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    const filename = path.join(tempDir, `frame_${String(frame).padStart(4, '0')}.png`);
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(filename, buffer);
  }

  await fs.mkdir(path.dirname(note.outputWebm), { recursive: true });
  await fs.copyFile(path.join(tempDir, 'frame_0000.png'), note.outputPoster);

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn(
      FFMPEG_PATH,
      [
        '-y',
        '-loglevel',
        'error',
        '-framerate',
        String(FPS),
        '-i',
        path.join(tempDir, 'frame_%04d.png'),
        '-c:v',
        'libvpx-vp9',
        '-b:v',
        '0',
        '-crf',
        '38',
        '-deadline',
        'good',
        '-row-mt',
        '1',
        '-pix_fmt',
        'yuv420p',
        '-t',
        String(DURATION),
        '-an',
        note.outputWebm
      ],
      { stdio: 'inherit' }
    );

    ffmpeg.on('error', reject);
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });

  await fs.rm(tempDir, { recursive: true, force: true });
}

async function main() {
  if (!existsSync(FFMPEG_PATH)) {
    console.warn(`[motion] ffmpeg not found at ${FFMPEG_PATH}. Skipping motion visual generation.`);
    return;
  }

  const { limit, only } = parseArgs();
  const entries = await fs.readdir(NOTES_DIR, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));
  const notes = [];

  for (const file of files) {
    const filepath = path.join(NOTES_DIR, file.name);
    const raw = await fs.readFile(filepath, 'utf8');
    const parsed = matter(raw);
    const body = parsed.content || '';
    const data = parsed.data || {};

    const permalink = typeof data.permalink === 'string' ? data.permalink.replace(/^\/+|\/+$/g, '') : null;
    const baseSlug = permalink || file.name.replace(/\.md$/, '');
    const slug = baseSlug.includes('/') ? baseSlug.split('/').map(toSlug).join('/') : toSlug(baseSlug);

    const seedSource = slug || `${data.title || file.name}-${data.date || body.length}`;
    const seed = hashString(seedSource);

    notes.push({
      slug,
      seed,
      title: data.title || file.name,
      outputWebm: path.join(OUTPUT_DIR, `${slug}.webm`),
      outputPoster: path.join(OUTPUT_DIR, `${slug}.png`)
    });
  }

  const filtered = only ? notes.filter((note) => note.slug === only) : notes;
  const limited = typeof limit === 'number' && Number.isFinite(limit) ? filtered.slice(0, limit) : filtered;

  if (limited.length === 0) {
    console.warn('[motion] No notes found to generate.');
    return;
  }

  console.log(`[motion] Generating visuals for ${limited.length} note(s)...`);
  for (const note of limited) {
    console.log(`[motion] Rendering ${note.slug}...`);
    await renderNote(note);
  }
  console.log('[motion] Done.');
}

main().catch((err) => {
  console.error('[motion] Failed to generate motion visuals.');
  console.error(err);
  process.exitCode = 1;
});
