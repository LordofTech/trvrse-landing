/**
 * Generate clean vector SVG exports from the transparent Trvrse logo PNG.
 *
 * Outputs:
 *   public/branding/trvrse-logo-transparent.svg
 *   public/branding/trvrse-logo-with-bg.svg
 *
 * Usage: node scripts/generate-logo-svg.mjs
 */
import potrace from "potrace";
import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

const trace = promisify(potrace.trace);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const branding = join(root, "public", "branding");
const source = join(branding, "trvrse-logo.png");
const transparentOut = join(branding, "trvrse-logo-transparent.svg");
const withBgOut = join(branding, "trvrse-logo-with-bg.svg");

const SITE_NAVY = "#0A1628";
const GRADIENT = {
  id: "trvrseGrad",
  stops: [
    { offset: "0%", color: "#00E5FF" },
    { offset: "45%", color: "#4F7BFF" },
    { offset: "100%", color: "#9333EA" },
  ],
};

async function createTraceBitmap() {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const bitmap = Buffer.alloc(width * height * 3);

  for (let i = 0; i < width * height; i++) {
    const alpha = data[i * 4 + 3];
    const value = alpha > 64 ? 0 : 255;
    bitmap[i * 3] = value;
    bitmap[i * 3 + 1] = value;
    bitmap[i * 3 + 2] = value;
  }

  return {
    width,
    height,
    png: await sharp(bitmap, { raw: { width, height, channels: 3 } })
      .png()
      .toBuffer(),
  };
}

async function traceLogo() {
  const { width, height, png } = await createTraceBitmap();

  const rawSvg = await trace(png, {
    turdSize: 2,
    optTolerance: 0.35,
    threshold: 128,
  });

  const paths = [...rawSvg.matchAll(/<path[^>]*d="([^"]+)"[^>]*\/?>/gi)].map(
    (match) => match[1]
  );

  if (paths.length === 0) {
    throw new Error("Potrace did not return any paths.");
  }

  const pathD = paths.join(" ");

  return { width, height, pathD };
}

function buildSvg({ width, height, pathD, background }) {
  const gradientStops = GRADIENT.stops
    .map((s) => `      <stop offset="${s.offset}" stop-color="${s.color}"/>`)
    .join("\n");

  const bgRect = background
    ? `  <rect width="${width}" height="${height}" fill="${background}"/>\n`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none" role="img" aria-label="Trvrse logo">
  <defs>
    <linearGradient id="${GRADIENT.id}" x1="0" y1="0" x2="${width}" y2="0" gradientUnits="userSpaceOnUse">
${gradientStops}
    </linearGradient>
  </defs>
${bgRect}  <path d="${pathD}" fill="url(#${GRADIENT.id})"/>
</svg>
`;
}

const traced = await traceLogo();

writeFileSync(
  transparentOut,
  buildSvg({ ...traced, background: null }),
  "utf8"
);

writeFileSync(
  withBgOut,
  buildSvg({ ...traced, background: SITE_NAVY }),
  "utf8"
);

console.log(`Wrote ${transparentOut}`);
console.log(`Wrote ${withBgOut}`);
