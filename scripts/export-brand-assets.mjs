/**
 * Export Trvrse brand SVGs to PNG and JPEG.
 * Usage: node scripts/export-brand-assets.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRANDING = join(__dirname, "..", "public", "branding");

const EXPORTS = [
  {
    svg: "trvrse-logomark.svg",
    outputs: [
      { name: "trvrse-logomark-512.png", width: 512 },
      { name: "trvrse-logomark-1024.png", width: 1024 },
      { name: "trvrse-logomark.jpg", width: 1024, jpeg: true, bg: "#0A1628" },
    ],
  },
  {
    svg: "trvrse-horizontal-lockup.svg",
    outputs: [
      { name: "trvrse-horizontal-lockup-1600.png", width: 1600 },
      {
        name: "trvrse-horizontal-lockup.jpg",
        width: 1600,
        jpeg: true,
        bg: "#FFFFFF",
      },
    ],
  },
  {
    svg: "trvrse-app-icon.svg",
    outputs: [
      { name: "trvrse-app-icon-1024.png", width: 1024 },
      { name: "trvrse-app-icon.jpg", width: 1024, jpeg: true, bg: "#0A1628" },
    ],
  },
];

function svgToPng(svgPath, width) {
  const svg = readFileSync(svgPath, "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  });
  return resvg.render().asPng();
}

async function pngToJpeg(pngBuffer, outPath, bg) {
  const meta = await sharp(pngBuffer).metadata();
  const base = sharp({
    create: {
      width: meta.width ?? 1024,
      height: meta.height ?? 1024,
      channels: 3,
      background: bg,
    },
  });
  const jpeg = await base
    .composite([{ input: pngBuffer }])
    .jpeg({ quality: 95 })
    .toBuffer();
  writeFileSync(outPath, jpeg);
}

async function main() {
  if (!existsSync(BRANDING)) mkdirSync(BRANDING, { recursive: true });

  for (const { svg, outputs } of EXPORTS) {
    const svgPath = join(BRANDING, svg);
    if (!existsSync(svgPath)) {
      console.warn(`Skip missing ${svgPath}`);
      continue;
    }

    for (const out of outputs) {
      const outPath = join(BRANDING, out.name);
      const png = svgToPng(svgPath, out.width);

      if (out.jpeg) {
        await pngToJpeg(png, outPath, out.bg ?? "#0A1628");
      } else {
        writeFileSync(outPath, png);
      }
      console.log(`Wrote ${outPath}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
