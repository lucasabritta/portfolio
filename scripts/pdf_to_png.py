"""Render PDF pages to PNG for visual diff. Requires: pip install pymupdf"""
import sys
from pathlib import Path

import fitz  # PyMuPDF


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: pdf_to_png.py <pdf_path> [out_dir]")
        sys.exit(1)
    pdf_path = Path(sys.argv[1])
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else pdf_path.parent / "screens"
    out_dir.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf_path)
    stem = pdf_path.stem
    zoom = 2.0
    mat = fitz.Matrix(zoom, zoom)
    for i in range(doc.page_count):
        page = doc.load_page(i)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        out = out_dir / f"{stem}-page{i + 1}.png"
        pix.save(out.as_posix())
        print(out)
    doc.close()


if __name__ == "__main__":
    main()
