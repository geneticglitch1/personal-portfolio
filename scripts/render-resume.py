#!/usr/bin/env python3
"""
Rasterise public/resume.pdf into the page images the in-page viewer shows.

Run this by hand whenever resume.pdf changes — the images are committed, so
nothing at build time depends on Python being installed:

    pip install PyMuPDF Pillow
    python3 scripts/render-resume.py

The PDF stays the source of truth: the viewer's download and open-in-a-tab
actions both serve public/resume.pdf directly. These images only exist so the
résumé can be read inside the page, on a phone, without the browser's PDF
plugin — which on iOS renders a single unscrollable page in an iframe.
"""

import json
import pathlib

import pymupdf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF = ROOT / "public" / "resume.pdf"
OUT = ROOT / "public" / "resume"

# 2x a 72dpi page, so the sheets stay crisp on a retina display without the
# files getting silly.
SCALE = 2.0
QUALITY = 82


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(PDF)
    pages = []

    for i, page in enumerate(doc, start=1):
        pix = page.get_pixmap(matrix=pymupdf.Matrix(SCALE, SCALE), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        dest = OUT / f"page-{i}.webp"
        img.save(dest, "WEBP", quality=QUALITY, method=6)
        pages.append({"page": i, "w": pix.width, "h": pix.height})
        print(f"{dest.relative_to(ROOT)}  {pix.width}x{pix.height}  "
              f"{dest.stat().st_size / 1024:.0f} KB")

    print("\nPaste into content/resume.ts:")
    print(json.dumps(pages, indent=2))


if __name__ == "__main__":
    main()
