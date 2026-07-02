/**
 * Remove checkerboard from brand PNGs and match squircle fill to site navy.
 *
 * Usage: node scripts/remove-logo-background.mjs [input] [output]
 */
import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const branding = join(__dirname, "..", "public", "branding");
const input = process.argv[2] ?? join(branding, "trvrse-app-icon-source.png");
const output = process.argv[3] ?? join(branding, "trvrse-app-icon.png");

/** Matches tailwind `navy.DEFAULT` */
const SITE_NAVY = { r: 10, g: 22, b: 40 };

function isCheckerboardPixel(r, g, b, a) {
  if (a < 8) return true;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const spread = max - min;
  const avg = (r + g + b) / 3;

  if (r > 235 && g > 235 && b > 235) return true;
  if (spread < 18 && avg > 175) return true;

  return false;
}

/** Solid dark navy field (e.g. Gemini export on #020617) */
function isSolidDarkBackground(r, g, b, a) {
  if (a < 8) return true;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const spread = max - min;
  const avg = (r + g + b) / 3;

  return max < 58 && avg < 48 && spread < 40 && b >= r;
}

function isBackgroundPixel(r, g, b, a) {
  return isCheckerboardPixel(r, g, b, a) || isSolidDarkBackground(r, g, b, a);
}

function isFlatSquircleFill(r, g, b, a) {
  if (a < 8) return false;

  const max = Math.max(r, g, b);
  const spread = Math.max(r, g, b) - Math.min(r, g, b);

  return max < 62 && spread < 16;
}

function isLightFringe(r, g, b, a) {
  if (a < 8) return false;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const spread = max - min;
  const avg = (r + g + b) / 3;

  return avg > 155 && spread < 40;
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const total = width * height;
const visited = new Uint8Array(total);
const queue = [];

function idx(x, y) {
  return y * width + x;
}

function alphaAt(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return 0;
  return data[idx(x, y) * 4 + 3];
}

function isDarkFringe(r, g, b, a) {
  if (a < 8) return false;
  return isSolidDarkBackground(r, g, b, a);
}

function pushIfBackground(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = idx(x, y);
  if (visited[i]) return;

  const p = i * 4;
  if (!isBackgroundPixel(data[p], data[p + 1], data[p + 2], data[p + 3])) return;

  visited[i] = 1;
  queue.push(i);
}

for (let x = 0; x < width; x++) {
  pushIfBackground(x, 0);
  pushIfBackground(x, height - 1);
}
for (let y = 0; y < height; y++) {
  pushIfBackground(0, y);
  pushIfBackground(width - 1, y);
}

while (queue.length > 0) {
  const i = queue.pop();
  const x = i % width;
  const y = (i - x) / width;

  pushIfBackground(x - 1, y);
  pushIfBackground(x + 1, y);
  pushIfBackground(x, y - 1);
  pushIfBackground(x, y + 1);
}

for (let i = 0; i < total; i++) {
  if (visited[i]) {
    data[i * 4 + 3] = 0;
  }
}

for (let pass = 0; pass < 10; pass++) {
  let changed = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = idx(x, y);
      const p = i * 4;
      if (data[p + 3] === 0) continue;

      const touchesTransparent =
        alphaAt(x - 1, y) === 0 ||
        alphaAt(x + 1, y) === 0 ||
        alphaAt(x, y - 1) === 0 ||
        alphaAt(x, y + 1) === 0;

      if (!touchesTransparent) continue;

      const r = data[p];
      const g = data[p + 1];
      const b = data[p + 2];

      if (isLightFringe(r, g, b, data[p + 3]) || isDarkFringe(r, g, b, data[p + 3])) {
        data[p + 3] = 0;
        changed = true;
      }
    }
  }

  if (!changed) break;
}

const useSquircleFill = output.includes("app-icon");

if (useSquircleFill) {
  for (let i = 0; i < total; i++) {
    const p = i * 4;
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const a = data[p + 3];

    if (a === 0) continue;

    if (isFlatSquircleFill(r, g, b, a)) {
      data[p] = SITE_NAVY.r;
      data[p + 1] = SITE_NAVY.g;
      data[p + 2] = SITE_NAVY.b;
      data[p + 3] = 255;
    }
  }
}

await sharp(data, {
  raw: { width, height, channels: 4 },
})
  .trim({ threshold: 12 })
  .png()
  .toFile(output);

console.log(`Wrote transparent logo: ${output}`);
