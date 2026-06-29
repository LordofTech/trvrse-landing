/**
 * Generate browser tab favicons and touch icons from the square app icon.
 * Usage: node scripts/generate-favicons.mjs
 */
import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const source = join(root, "public", "branding", "trvrse-app-icon-1024.png");
const iconsDir = join(root, "public", "icons");

const SIZES = [
  { name: "favicon-16.png", size: 16 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-48.png", size: 48 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

async function renderSquare(size) {
  return sharp(source)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

mkdirSync(iconsDir, { recursive: true });

for (const { name, size } of SIZES) {
  await sharp(await renderSquare(size)).toFile(join(iconsDir, name));
  console.log(`Wrote public/icons/${name} (${size}x${size})`);
}

// Next.js app directory conventions (tab + Apple home screen)
await sharp(await renderSquare(48)).toFile(join(root, "app", "icon.png"));
console.log("Wrote app/icon.png (48x48)");

await sharp(await renderSquare(180)).toFile(join(root, "app", "apple-icon.png"));
console.log("Wrote app/apple-icon.png (180x180)");

console.log("Done — hard refresh the browser tab (Ctrl+Shift+R).");
