import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stitch } from "@google/stitch-sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const PROJECT_ID = "14133958113372143743";
const PROJECT_TITLE = "TRVRSE App Specification";
const DELAY_MS = 300;

const outDir = path.join(rootDir, ".stitch", "trvrse-app-specification");
const htmlDir = path.join(outDir, "html");
const imageDir = path.join(outDir, "images");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(title) {
  return (title || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

function assignSlugs(screens) {
  const used = new Map();
  return screens.map((screen) => {
    const base = slugify(screen.title);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const slug = count === 0 ? base : `${base}-${count + 1}`;
    return { ...screen, slug };
  });
}

function dedupeScreens(screens) {
  const seen = new Map();
  for (const screen of screens) {
    const id = screen.id;
    if (!seen.has(id)) {
      seen.set(id, screen);
      continue;
    }
    const existing = seen.get(id);
    const existingTitle = existing.title || "";
    const nextTitle = screen.title || "";
    if (nextTitle.length > existingTitle.length) {
      seen.set(id, screen);
    }
  }
  return [...seen.values()];
}

function pickMetadata(data) {
  if (!data || typeof data !== "object") return {};
  const {
    deviceType,
    width,
    height,
    screenType,
    groupId,
    groupName,
    prompt,
    generatedBy,
    screenMetadata,
    theme,
    name,
    isCreatedByClient,
  } = data;
  return {
    ...(deviceType ? { deviceType } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(screenType ? { screenType } : {}),
    ...(groupId ? { groupId } : {}),
    ...(groupName ? { groupName } : {}),
    ...(prompt ? { prompt } : {}),
    ...(generatedBy ? { generatedBy } : {}),
    ...(screenMetadata ? { screenMetadata } : {}),
    ...(theme ? { theme } : {}),
    ...(name ? { resourceName: name } : {}),
    ...(isCreatedByClient != null ? { isCreatedByClient } : {}),
  };
}

async function download(url, dest) {
  if (!url || !String(url).trim()) {
    return false;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}): ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(dest, buffer);
  return true;
}

function buildScreensMd(catalog) {
  const lines = [
    `# ${PROJECT_TITLE} — Screen Catalog`,
    "",
    `Project ID: \`${PROJECT_ID}\``,
    `Exported: ${catalog.exportedAt}`,
    `Total screens: **${catalog.count}**`,
    "",
    "| # | Slug | Title | Device | Dimensions | HTML | Image |",
    "|---|------|-------|--------|------------|------|-------|",
  ];

  catalog.screens.forEach((s, i) => {
    const dims = s.metadata?.width && s.metadata?.height
      ? `${s.metadata.width}×${s.metadata.height}`
      : "—";
    const device = s.metadata?.deviceType?.replace("DEVICE_TYPE_", "") ?? "—";
    const html = s.html ? "✓" : "—";
    const image = s.image ? "✓" : "—";
    const title = (s.title || "").replace(/\|/g, "\\|");
    lines.push(`| ${i + 1} | \`${s.slug}\` | ${title} | ${device} | ${dims} | ${html} | ${image} |`);
  });

  if (catalog.failures?.length) {
    lines.push("", "## Failures", "");
    for (const f of catalog.failures) {
      lines.push(`- **${f.slug}** (\`${f.id}\`): ${f.error}`);
    }
  }

  lines.push(
    "",
    "## Re-run export",
    "",
    "```bash",
    "STITCH_API_KEY=... npm run fetch:stitch-screens",
    "```",
    ""
  );

  return lines.join("\n");
}

async function main() {
  if (!process.env.STITCH_API_KEY) {
    throw new Error("STITCH_API_KEY is required");
  }

  await mkdir(htmlDir, { recursive: true });
  await mkdir(imageDir, { recursive: true });

  const project = stitch.project(PROJECT_ID);

  console.log("Listing screens from Stitch project...");
  const listed = await project.screens();
  console.log(`Found ${listed.length} screens\n`);

  const withTitles = dedupeScreens(
    listed.map((s) => ({
      id: s.screenId || s.id,
      title: s.data?.title || s.data?.name?.split("/").pop() || `Screen ${s.screenId}`,
      listData: s.data ?? {},
    }))
  );

  const screens = assignSlugs(withTitles);

  const manifest = {
    projectId: PROJECT_ID,
    projectTitle: PROJECT_TITLE,
    exportedAt: new Date().toISOString(),
    screenCount: screens.length,
    screens: {},
  };

  const catalog = {
    projectId: PROJECT_ID,
    projectTitle: PROJECT_TITLE,
    exportedAt: manifest.exportedAt,
    count: screens.length,
    screens: [],
    failures: [],
    stats: { htmlSaved: 0, imagesSaved: 0, failed: 0 },
  };

  for (let i = 0; i < screens.length; i++) {
    const { id, title, slug } = screens[i];
    process.stdout.write(`[${i + 1}/${screens.length}] ${slug}... `);

    try {
      const screen = await project.getScreen(id);
      const metadata = pickMetadata(screen.data);

      const htmlUrl = await screen.getHtml();
      let imageUrl = await screen.getImage();
      if (imageUrl.includes("googleusercontent.com") && !imageUrl.includes("=w")) {
        imageUrl = `${imageUrl}=w1280`;
      }

      const htmlPath = path.join(htmlDir, `${slug}.html`);
      const imagePath = path.join(imageDir, `${slug}.png`);

      let htmlSaved = false;
      let imageSaved = false;

      if (htmlUrl) {
        htmlSaved = await download(htmlUrl, htmlPath);
        if (htmlSaved) catalog.stats.htmlSaved++;
      }

      try {
        if (imageUrl) {
          imageSaved = await download(imageUrl, imagePath);
          if (imageSaved) catalog.stats.imagesSaved++;
        }
      } catch (imageError) {
        console.log(`done (image failed: ${imageError.message})`);
      }

      const entry = {
        id,
        title,
        slug,
        html: htmlSaved ? path.relative(rootDir, htmlPath).replace(/\\/g, "/") : null,
        image: imageSaved ? path.relative(rootDir, imagePath).replace(/\\/g, "/") : null,
        htmlUrl: htmlUrl || null,
        imageUrl: imageUrl || null,
        metadata,
      };

      manifest.screens[slug] = entry;
      catalog.screens.push(entry);

      if (!imageSaved && htmlSaved) {
        console.log("done (no screenshot)");
      } else if (htmlSaved && imageSaved) {
        console.log("done");
      } else if (!htmlSaved && imageSaved) {
        console.log("done (image only, no HTML)");
      } else if (!htmlSaved && !imageSaved) {
        throw new Error("No HTML or image URL returned");
      }
    } catch (error) {
      catalog.stats.failed++;
      const message = error instanceof Error ? error.message : String(error);
      catalog.failures.push({ id, title, slug, error: message });
      manifest.screens[slug] = { id, title, slug, error: message };
      catalog.screens.push({ id, title, slug, error: message });
      console.log(`FAILED: ${message}`);
    }

    if (i < screens.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  await writeFile(path.join(outDir, "screens-catalog.json"), JSON.stringify(catalog, null, 2));
  await writeFile(path.join(outDir, "SCREENS.md"), buildScreensMd(catalog));

  console.log(`\n--- Export summary ---`);
  console.log(`Screens found:  ${screens.length}`);
  console.log(`HTML saved:     ${catalog.stats.htmlSaved}`);
  console.log(`Images saved:   ${catalog.stats.imagesSaved}`);
  console.log(`Failures:       ${catalog.stats.failed}`);
  console.log(`Output:         ${path.relative(rootDir, outDir)}`);

  if (catalog.failures.length) {
    console.log(`\nFailed screens:`);
    for (const f of catalog.failures) {
      console.log(`  - ${f.slug} (${f.id}): ${f.error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
