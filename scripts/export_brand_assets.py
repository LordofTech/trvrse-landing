"""Export Trvrse brand SVGs to PNG and JPEG raster files."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRANDING = ROOT / "public" / "branding"

try:
    import cairosvg
except ImportError:
    raise SystemExit("Run: pip install cairosvg pillow") from None

from PIL import Image
import io

EXPORTS = [
    ("trvrse-logomark.svg", [
        ("trvrse-logomark-512.png", 512),
        ("trvrse-logomark-1024.png", 1024),
        ("trvrse-logomark.jpg", 1024),
    ]),
    ("trvrse-horizontal-lockup.svg", [
        ("trvrse-horizontal-lockup-1600.png", 1600),
        ("trvrse-horizontal-lockup.jpg", 1600),
    ]),
    ("trvrse-app-icon.svg", [
        ("trvrse-app-icon-1024.png", 1024),
        ("trvrse-app-icon.jpg", 1024),
    ]),
]


def svg_to_png(svg_path: Path, out_path: Path, width: int) -> None:
    png_bytes = cairosvg.svg2png(url=str(svg_path), output_width=width)
    out_path.write_bytes(png_bytes)
    print(f"Wrote {out_path}")


def png_to_jpeg(png_path: Path, jpg_path: Path, quality: int = 95) -> None:
    with Image.open(png_path) as img:
        if img.mode in ("RGBA", "LA"):
            background = Image.new("RGB", img.size, (10, 22, 40))
            background.paste(img, mask=img.split()[-1])
            img = background
        else:
            img = img.convert("RGB")
        img.save(jpg_path, "JPEG", quality=quality, optimize=True)
    print(f"Wrote {jpg_path}")


def main() -> None:
    BRANDING.mkdir(parents=True, exist_ok=True)

    for svg_name, outputs in EXPORTS:
        svg_path = BRANDING / svg_name
        if not svg_path.exists():
            print(f"Skip missing {svg_path}")
            continue

        png_cache: Path | None = None
        for out_name, width in outputs:
            out_path = BRANDING / out_name
            if out_name.endswith(".png"):
                svg_to_png(svg_path, out_path, width)
                png_cache = out_path
            elif out_name.endswith(".jpg"):
                if png_cache is None:
                    tmp = BRANDING / f".tmp-{svg_name}.png"
                    svg_to_png(svg_path, tmp, width)
                    png_to_jpeg(tmp, out_path)
                    tmp.unlink(missing_ok=True)
                else:
                    png_to_jpeg(png_cache, out_path)


if __name__ == "__main__":
    main()
