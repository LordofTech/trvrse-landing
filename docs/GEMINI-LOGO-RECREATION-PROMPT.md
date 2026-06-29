# Gemini Logo Recreation Prompt — Trvrse Official Brand

Copy everything below the line into Gemini. Attach your reference brand board image if Gemini supports image input.

**Reference:** The approved Trvrse identity board — bidirectional T logomark, blue→teal gradient, TRVRSE by NEXXOGEN lockup, Pay Anywhere. Always. tagline.

---

```
You are a principal brand designer and vector illustrator. Recreate the **official Trvrse by Nexxogen logo system EXACTLY** from the reference brand identity board I am providing. This is not a redesign — this is a pixel-accurate, production-grade recreation for legal and commercial use.

Your output must be suitable for App Store, CBN filings, investor decks, physical cards, and marketing at global scale.

---

## REFERENCE — MATCH THIS EXACTLY

Study the attached brand board image. Reproduce these elements with surgical precision:

### THE LOGOMARK (hero "T" icon)

**Shape anatomy:**
- A geometric capital **T** where the **horizontal crossbar ends in bidirectional arrows**
  - Left arrow wing points **outward left**
  - Right arrow wing points **outward right**
  - Crossbar center is a solid rectangular bridge connecting both wings
- The **vertical stem is split into two panels**:
  - Left stem panel: straight vertical rectangle
  - Right stem panel: curves subtly at the bottom into the outbound flow (right side feels like motion / traversing)
- Left side of the T has a **sharp diagonal cut** — architectural, not soft/blobby
- Overall feel: **navigation + exchange + cross-border movement** in one mark

**Color & finish:**
- Vertical gradient on the mark:
  - Base: **#2D7DD2** (royal/electric blue)
  - Mid: **#1FA3C9** (cyan bridge)
  - Top: **#06D6A0** (vibrant teal)
- Subtle **brushed metal / linear sheen** overlay (light white highlight ~30% opacity on upper-left facets)
- Clean vector edges — no blur, no raster noise, no AI mush

**Do NOT change:** arrow directions, stem split, proportions, or gradient direction (bottom blue → top teal).

---

### TYPOGRAPHY LOCKUPS

**Horizontal lockup (primary):**
```
[LOGOMARK]  TRVRSE
            by NEXXOGEN
            Pay Anywhere. Always.
```

- **TRVRSE** — bold uppercase sans (Poppins / Inter / Neue Haas style), white `#FFFFFF`, wide letter-spacing (+3%)
- **by NEXXOGEN** — smaller, `by` regular weight, `NEXXOGEN` medium-bold, color `#8899AA`
- **Pay Anywhere. Always.** — small, light-medium weight, accent `#06D6A0` or soft white
- Logomark left, text block left-aligned to the right of the mark

**Stacked vertical lockup:**
- Mark centered on top
- TRVRSE centered below
- by NEXXOGEN centered below that

**Monochrome version:**
- Black mark + black text on white background (high contrast, no gradient)

---

### COLOR PALETTE (use these hex codes only)

| Name | Hex |
|------|-----|
| Deep Navy (background) | `#0A1628` |
| Card Navy | `#0F1F35` |
| Electric Blue | `#2D7DD2` |
| Vibrant Teal | `#06D6A0` |
| Pure White | `#FFFFFF` |
| Subtext Grey | `#8899AA` |
| Accent Gold (sparingly) | `#FFD700` |

---

### APP ICON

- Rounded square (iOS squircle ~22% corner radius)
- Background: dark navy gradient `#0F1F35` → `#0A1628`
- Centered logomark at ~60% of icon width
- Subtle **teal outer glow** / aura (`#06D6A0` at 12–18% opacity, soft blur)
- Must be crisp at 1024×1024 and readable at 32×32

---

### BRAND BOARD LAYOUT (optional deliverable)

If generating a presentation sheet, match the reference board structure:
1. Hero horizontal lockup on dark navy with particle/network background
2. Logo variations row (horizontal, stacked, monochrome)
3. Construction grid blueprint panel showing geometric proportions
4. Icon scale test: 512 / 128 / 64 / 32 px
5. App icon mockup + phone home screen
6. Brushed metal Trvrse card mockup (chip top-left, logo top-right, TRVRSE wordmark bottom-left)
7. Color palette swatches with hex labels

Background style: dark glassmorphism panels, thin blue borders, subtle plexus/dot-network (`#2D7DD2` at 5% opacity).

---

## EXPORT FILES — REQUIRED DOWNLOADS

Generate and provide downloadable files:

### Vector
1. `trvrse-logomark.svg` — mark only, transparent background, clean paths
2. `trvrse-horizontal-lockup.svg` — mark + wordmark + tagline
3. `trvrse-stacked-lockup.svg` — vertical lockup
4. `trvrse-app-icon.svg` — 1024×1024 with navy background
5. `trvrse-brand-sheet.pdf` — vector PDF of full identity board

### PNG (transparent where applicable)
6. `trvrse-logomark-1024.png`
7. `trvrse-logomark-512.png`
8. `trvrse-horizontal-lockup-1600.png`
9. `trvrse-app-icon-1024.png`
10. `trvrse-brand-identity-board.png` — full board at 2400px wide minimum

### JPEG (white or navy background for documents)
11. `trvrse-horizontal-lockup.jpg` — white bg, 1600px wide
12. `trvrse-logomark.jpg` — navy bg, 1024×1024
13. `trvrse-brand-identity-board.jpg` — full board

All PNG/JPEG must be **sharp, anti-aliased, no compression artifacts**.

---

## QUALITY RULES

- [ ] Logomark matches reference arrows, stem split, and gradient exactly
- [ ] Works in monochrome (black on white) without losing legibility
- [ ] 32px icon test passes — simplify inner detail if needed but keep arrow T identity
- [ ] No globe, no dollar sign, no generic fintech clipart
- [ ] Files are true vector SVG (paths), not embedded PNG inside SVG
- [ ] Consistent proportions across all lockups

---

## WORKFLOW

**Step 1:** Analyze the attached reference image and list 5 construction measurements you observe (crossbar width vs stem height, arrow wing angle, etc.)

**Step 2:** Generate the isolated logomark SVG first. Show on navy `#0A1628` and on white.

**Step 3:** Generate horizontal + stacked lockups.

**Step 4:** Generate app icon 1024×1024.

**Step 5:** Export all PNG, JPEG, and PDF files listed above as downloadable attachments.

**Step 6:** Provide a zip or individual download links for every file.

This is the official Trvrse logo. Recreate it exactly. Do not reinterpret. Do not simplify the arrows. Do not change colors.

Begin with Step 1.
```

---

## Local assets (this repo)

Vector files already in `public/branding/`:

| File | Description |
|------|-------------|
| `trvrse-logomark.svg` | Icon only |
| `trvrse-horizontal-lockup.svg` | Icon + wordmark |
| `trvrse-app-icon.svg` | 1024 app icon |

**Export PNG + JPEG locally:**

```bash
pip install cairosvg pillow
python scripts/export_brand_assets.py
```

Or: `npm run export:brand` (after cairo is available on your machine).

**Use on site:** Replace footer/nav `T` placeholder with `public/branding/trvrse-logomark.svg`.

---

## If Gemini can't export files

Ask: *"Output each SVG as raw code in separate code blocks, then generate 1024×1024 PNG renders of each."*

Save SVG code into `public/branding/` and run the export script above.
