import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const stitchRoot = path.join(rootDir, ".stitch", "trvrse-app-specification");
const htmlDir = path.join(stitchRoot, "html");
const dsDir = path.join(stitchRoot, "design-system");
const fontsDir = path.join(dsDir, "fonts");
const imagesDir = path.join(dsDir, "assets", "images");
const shadersDir = path.join(dsDir, "assets", "shaders");

const POPPINS_WEIGHTS = [300, 400, 600, 700, 800];
const POPPINS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap";

const RASTER_ASSETS = [
  {
    id: "logo-auth",
    filename: "logo-auth.png",
    alt: "TRVRSE Logo (auth screens)",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu0IyzKzZgR2cTzXOlbvjB5Yvc38HkXI6nGTURnJXsViVVhept0-c_jRnL3zgEuh3h93UUJKLjlxoQaZS0PIHBreFMlDUpJcEaXGcGRsL30ePP1nUh0svezOrkCsqYvjyIbPJLmZjSVUFiwtBF-mESkUpggi0TYUGtkZlhIu6m7Cd5_dOA3IyuxzGtnWUo_lRx_w-qOyOMpUeBeflOAkPQEtrym7sBne1Vprk-yaKntrbJhi_avGpi14a1GujmCgYSExk26jFNXfGi",
  },
  {
    id: "logo-splash",
    filename: "logo-splash.png",
    alt: "TRVRSE Logo (splash matrix reveal)",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPR0EIAw05HNhAedLCdcNwcXB2en_T2HB0AVvyb3RXzZzyBU8xAoCjgyFgsVEHSDhfJ7jCS5ZPtYGfy9MJE11rXM5kbQm8CTtHSve3pACiK8S1rFlj6YTm_yzRemZBS0Dej20a_mKhurNPCyOIlijn37JT3BIzcng7NWnudAzoxJMtVE1P9CaFqS-4cv4dB22Ha4J94A4WRFlolOcaY2fCvXYnp_QHHS0jTo4VGap7bqWKnNBt3_Ufr5mT2ph8_uRgUsMZ72pTEJTP",
  },
  {
    id: "onboarding-globe",
    filename: "onboarding-globe.png",
    alt: "3D globe with Nigeria, UK, and US connection pins",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzMaV54z-458100KS1NE6U_daVDYm5cPJZvgJ5SGaFW9YGFE9fAn3903rnZ_in0UEs6pRvkxB2cgXAF2S1jgDm1B6jcKgalWEOTtgx6w7KpRcD3PDP9E5GAieqQuo4jCAZxAtCyy0ETr3t4FjqOaOj6x5kuHX7HHT_6uQPml1vS6gr2PJk9jFrtnpae9BqaS4vVHHyYeP9Lt_Uq4fOUe-ipcWoYGgAztsn7Z7VLE0Wmc3gW8xjNmS9jCNc8pCM-UlLzcnPss75Tf7x",
  },
  {
    id: "flag-nigeria",
    filename: "flag-nigeria.png",
    alt: "Nigeria flag",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7ctmT_54lelrfpJnrxqxSUQyuhIteRVxSVHaIs-YtuJqa45Gg0Az-fN9JU427VSQpfOdKZpZh3l7ZqPkF-b-HjNNkCwPSVNU9CoVATLq2rYPhAtjClWEq0bmV0ePhbqgL4TfymQm3VlDaMvueoGCO5waZJUQcVynmh_F-4f51EIfquTkpOK9Nlg6xqHq7E2XJyo32dy2MrZy5hVgA_qIVIayNoJwFPv_MREEiEzFwhivryuMXAuIJXxpHSzTsR5_XPTUq9pvYjgQf",
  },
  {
    id: "flag-usa",
    filename: "flag-usa.png",
    alt: "USA flag",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc6QLy5yBj-hYC8E0g7m8ALcc3poC5maqPpyEnOvVbkeIz_cQy7UkD2u34EarKp9GPm22a_YYK3Qs7T3a0DuoFP01i7xgHrixfXMZ_LlRMkgK84nTgq35GBnAYhdUkQCMK6diWejzzbR8CDiykzEQepNZ6_OSVuWT5A6ujkc2zoVG0p7b3H6nrfMtahDRQMdCZNQ57m7oQNe1WN2oW5wyAesnLZzB1gJ0XLUKJPjSSY-2VH2sM-UmSxCOLb_yPrnbtw2rlQoTgaAk6",
  },
];

const NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E";

function deepMerge(target, source) {
  const output = { ...target };
  for (const [key, value] of Object.entries(source ?? {})) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      output[key] = deepMerge(output[key] ?? {}, value);
    } else {
      output[key] = value;
    }
  }
  return output;
}

function extractTailwindConfig(html) {
  const match = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*\n\s*<\/script>/);
  if (!match) return null;
  return Function(`"use strict"; return (${match[1]});`)();
}

function extractStyleBlocks(html) {
  const blocks = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1].trim());
  return blocks.filter(Boolean);
}

function extractShader(html) {
  const match = html.match(
    /<!-- STITCH_SHADER_START:([\w-]+)[\s\S]*?-->([\s\S]*?)<!-- STITCH_SHADER_END:\1 -->/
  );
  if (!match) return null;
  return { id: match[1], markup: match[2].trim() };
}

async function downloadBinary(url, dest) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; TRVRSE-design-export/1.0)" },
  });
  if (!response.ok) {
    throw new Error(`Failed to download ${url} (${response.status})`);
  }
  await writeFile(dest, Buffer.from(await response.arrayBuffer()));
}

async function downloadPoppinsFonts() {
  const cssResponse = await fetch(POPPINS_CSS_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; TRVRSE-design-export/1.0)" },
  });
  if (!cssResponse.ok) {
    throw new Error(`Failed to fetch Poppins CSS (${cssResponse.status})`);
  }

  const css = await cssResponse.text();
  const fontFaceBlocks = [...css.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)];
  const files = [];

  for (const [, block] of fontFaceBlocks) {
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const urlMatch = block.match(/url\((https:[^)]+)\)/);
    if (!weightMatch || !urlMatch) continue;

    const weight = weightMatch[1];
    const filename = `poppins-${weight}.woff2`;
    const dest = path.join(fontsDir, filename);
    await downloadBinary(urlMatch[1], dest);
    files.push({ weight: Number(weight), filename, path: path.relative(rootDir, dest).replace(/\\/g, "/") });
  }

  return files.sort((a, b) => a.weight - b.weight);
}

function buildFontFaceCss(fontFiles) {
  return fontFiles
    .map(
      ({ weight, filename }) => `@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url("./fonts/${filename}") format("woff2");
}`
    )
    .join("\n\n");
}

function buildAppCss() {
  return `/* TRVRSE App Design System — generated from Stitch export */

${buildFontFaceCss([])}

:root {
  --trvrse-brand-blue: #2d7dd2;
  --trvrse-glow-primary: 0 0 16px rgba(45, 125, 210, 0.3);
  --trvrse-glass-bg: rgba(13, 25, 41, 0.6);
  --trvrse-glass-border: rgba(255, 255, 255, 0.1);
  --trvrse-noise-image: url("${NOISE_SVG}");
}

.glass-panel {
  background: var(--trvrse-glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--trvrse-glass-border);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: var(--trvrse-noise-image);
  pointer-events: none;
  z-index: 1;
}

.glow-effect {
  box-shadow: var(--trvrse-glow-primary);
}

.trvrse-app-shell {
  min-height: max(884px, 100dvh);
}
`;
}

function buildDesignMd(tokens, assets, fonts, shaders) {
  return `# TRVRSE App Design System

Extracted from **Stitch project**: TRVRSE App Specification (\`14133958113372143743\`).

## Stack

| Layer | Choice |
|-------|--------|
| Theme | Material Design 3 (dark) |
| CSS | Tailwind CSS + custom utilities |
| Display font | Poppins (300, 400, 600, 700, 800) — local \`fonts/\` |
| Icons | Material Symbols Outlined + Phosphor (form screens) |
| Motion | WebGL matrix shader (\`assets/shaders/\`) |

## Colors (MD3 dark)

| Token | Hex | Usage |
|-------|-----|-------|
| background / surface | \`${tokens.colors.background}\` | App shell |
| primary | \`${tokens.colors.primary}\` | Links, accents |
| primary-container | \`${tokens.colors["primary-container"]}\` | CTA buttons |
| on-surface | \`${tokens.colors["on-surface"]}\` | Primary text |
| on-surface-variant | \`${tokens.colors["on-surface-variant"]}\` | Secondary text |
| brand-blue | \`${tokens.colors["brand-blue"] ?? "#2d7dd2"}\` | Glow / brand accent |

Full palette: see \`design-tokens.json\`.

## Typography

| Token | Size / Line | Weight |
|-------|-------------|--------|
| display-lg | 32px / 40px | 700 |
| headline-md | 24px / 32px | 700 |
| headline-sm | 20px / 28px | 700 |
| body-lg | 16px / 24px | 400 |
| body-md | 14px / 20px | 400 |
| body-sm | 12px / 16px | 400 |
| label-lg | 16px / 24px | 600 |
| label-md | 14px / 20px | 600 |

Tailwind usage: \`font-headline-md text-headline-md\`, \`font-body-md text-body-md\`, etc.

## Spacing & radius

- Spacing: xs 4, sm 8, md 16, lg 24, xl 32, gutter 16, margin-mobile 20
- Radius: default 0.5rem, lg 0.5rem, xl 0.75rem, full pill

## Components / patterns

- \`.glass-panel\` — frosted card surface
- \`.noise-overlay\` — subtle film grain
- \`.glow-effect\` — primary blue glow shadow
- \`.trvrse-app-shell\` — mobile min-height shell

Defined in \`trvrse-app.css\`.

## Local assets

${assets.images.map((a) => `- \`${a.path}\` — ${a.alt}`).join("\n")}

${shaders.length ? shaders.map((s) => `- \`${s.path}\` — WebGL shader (${s.id})`).join("\n") : ""}

## Fonts on disk

${fonts.map((f) => `- \`${f.path}\` (weight ${f.weight})`).join("\n")}

## Icons (install for implementation)

\`\`\`bash
npm install @phosphor-icons/react
\`\`\`

Material Symbols: load via Google Fonts or \`material-symbols-outlined\` in layout.

## Tailwind integration

\`\`\`js
// tailwind.config.ts
const trvrsePreset = require("./.stitch/trvrse-app-specification/design-system/tailwind.preset.cjs");

module.exports = {
  presets: [trvrsePreset],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
};
\`\`\`

Import CSS in app layout:

\`\`\`ts
import "../.stitch/trvrse-app-specification/design-system/trvrse-app.css";
\`\`\`

## Screens reference

See \`../manifest.json\` and \`../html/\` for full Stitch screen exports.

Regenerate this bundle:

\`\`\`bash
npm run build:stitch-design-system
\`\`\`
`;
}

async function main() {
  await mkdir(fontsDir, { recursive: true });
  await mkdir(imagesDir, { recursive: true });
  await mkdir(shadersDir, { recursive: true });

  const htmlFiles = (await readdir(htmlDir)).filter((f) => f.endsWith(".html"));
  let mergedTheme = { extend: {} };
  const cssRules = new Set();
  const shaders = [];

  for (const file of htmlFiles) {
    const html = await readFile(path.join(htmlDir, file), "utf8");
    const config = extractTailwindConfig(html);
    if (config?.theme?.extend) {
      mergedTheme.extend = deepMerge(mergedTheme.extend, config.theme.extend);
    }
    for (const block of extractStyleBlocks(html)) {
      if (block.includes(".glass-panel") || block.includes(".noise-overlay") || block.includes(".glow-effect")) {
        cssRules.add(block);
      }
    }
    const shader = extractShader(html);
    if (shader) {
      const shaderPath = path.join(shadersDir, `${shader.id}.html`);
      await writeFile(shaderPath, shader.markup);
      shaders.push({
        id: shader.id,
        path: path.relative(rootDir, shaderPath).replace(/\\/g, "/"),
      });
    }
  }

  if (!mergedTheme.extend.colors?.["brand-blue"]) {
    mergedTheme.extend.colors = {
      ...mergedTheme.extend.colors,
      "brand-blue": "#2d7dd2",
    };
  }

  console.log("Downloading Poppins font files...");
  const fontFiles = await downloadPoppinsFonts();

  console.log("Downloading raster assets...");
  const imageManifest = [];
  for (const asset of RASTER_ASSETS) {
    const dest = path.join(imagesDir, asset.filename);
    await downloadBinary(asset.url, dest);
    imageManifest.push({
      id: asset.id,
      alt: asset.alt,
      filename: asset.filename,
      path: path.relative(rootDir, dest).replace(/\\/g, "/"),
      sourceUrl: asset.url,
    });
    process.stdout.write(`  ${asset.filename}\n`);
  }

  const designTokens = {
    meta: {
      projectId: "14133958113372143743",
      projectTitle: "TRVRSE App Specification",
      extractedAt: new Date().toISOString(),
      source: ".stitch/trvrse-app-specification/html",
    },
    colors: mergedTheme.extend.colors,
    borderRadius: mergedTheme.extend.borderRadius,
    spacing: mergedTheme.extend.spacing,
    fontFamily: mergedTheme.extend.fontFamily,
    fontSize: mergedTheme.extend.fontSize,
    effects: {
      glassPanel: {
        background: "rgba(13, 25, 41, 0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
      },
      glowPrimary: "0 0 16px rgba(45, 125, 210, 0.3)",
      noiseOverlay: NOISE_SVG,
    },
    icons: {
      materialSymbols: "Material Symbols Outlined (Google Fonts CDN)",
      phosphor: "@phosphor-icons/web@2.1.2 (form screens: sign-up)",
      phosphorReact: "@phosphor-icons/react (recommended for Next.js)",
    },
    fonts: {
      family: "Poppins",
      weights: POPPINS_WEIGHTS,
      files: fontFiles,
    },
    assets: {
      images: imageManifest,
      shaders,
    },
  };

  const tailwindPreset = {
    darkMode: "class",
    theme: {
      extend: {
        colors: mergedTheme.extend.colors,
        borderRadius: mergedTheme.extend.borderRadius,
        spacing: mergedTheme.extend.spacing,
        fontFamily: Object.fromEntries(
          Object.entries(mergedTheme.extend.fontFamily ?? {}).map(([key, value]) => [
            key,
            Array.isArray(value) ? value : [value],
          ])
        ),
        fontSize: mergedTheme.extend.fontSize,
        boxShadow: {
          "trvrse-glow": "0 0 16px rgba(45, 125, 210, 0.3)",
          "trvrse-glow-lg": "0 0 32px rgba(45, 125, 210, 0.35)",
        },
      },
    },
  };

  let appCss = buildAppCss();
  appCss = appCss.replace(buildFontFaceCss([]), `${buildFontFaceCss(fontFiles)}\n`);

  const assetsManifest = {
    fonts: fontFiles,
    images: imageManifest,
    shaders,
    dependencies: {
      npm: {
        "@phosphor-icons/react": "^2.1.2",
        "@fontsource/poppins": "optional — alternative to local woff2",
      },
      cdn: {
        materialSymbols:
          "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
      },
    },
  };

  await writeFile(path.join(dsDir, "design-tokens.json"), JSON.stringify(designTokens, null, 2));
  await writeFile(
    path.join(dsDir, "tailwind.preset.cjs"),
    `/** TRVRSE App Tailwind preset — generated from Stitch export */\nmodule.exports = ${JSON.stringify(tailwindPreset, null, 2)};\n`
  );
  await writeFile(path.join(dsDir, "trvrse-app.css"), appCss);
  await writeFile(path.join(dsDir, "assets-manifest.json"), JSON.stringify(assetsManifest, null, 2));
  await writeFile(
    path.join(dsDir, "DESIGN.md"),
    buildDesignMd(designTokens, { images: imageManifest }, fontFiles, shaders)
  );

  console.log(`\nDesign system written to ${path.relative(rootDir, dsDir)}`);
  console.log(`  ${fontFiles.length} font files`);
  console.log(`  ${imageManifest.length} images`);
  console.log(`  ${shaders.length} shader(s)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
