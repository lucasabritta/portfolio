#!/usr/bin/env python3
"""Rasterize one PDF page to a PNG (for visual CV diffs). Requires PyMuPDF."""
from __future__ import annotations

import sys
from pathlib import Path

import fitz


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: preview_pdf_page.py <input.pdf> <output.png> [page_index=0] [dpi=144]")
        sys.exit(1)
    pdf = Path(sys.argv[1])
    png = Path(sys.argv[2])
    page_i = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    dpi = float(sys.argv[4]) if len(sys.argv) > 4 else 144.0
    if not pdf.is_file():
        raise SystemExit(f"Missing PDF: {pdf}")
    png.parent.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf)
    page = doc.load_page(page_i)
    zoom = dpi / 72.0
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    pix.save(png.as_posix())
    doc.close()
    print("Wrote", png, f"({pix.width}x{pix.height})")


if __name__ == "__main__":
    main()
