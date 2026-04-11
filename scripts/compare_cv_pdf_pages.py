"""
Compare two CV PDFs as raster images (per page).
Uses PyMuPDF + Pillow + NumPy — no extra packages.

Example:
  python scripts/compare_cv_pdf_pages.py \\
    "C:/Users/Lucas/Downloads/Lucas_Abritta_EM.pdf" \\
    cv-compare-generated.pdf
"""
from __future__ import annotations

import sys
from pathlib import Path

import fitz  # PyMuPDF
import numpy as np
from PIL import Image


def render_page_pdfium(path: Path, page_index: int, dpi: float = 144.0) -> Image.Image:
    doc = fitz.open(path)
    page = doc.load_page(page_index)
    zoom = dpi / 72.0
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()
    return img


def align_and_diff(a: Image.Image, b: Image.Image) -> tuple[float, float, float | None]:
    """Return (mse, similarity_0_1, ssim_mean_or_none) after resizing *a* to *b* size."""
    if a.size != b.size:
        a = a.resize(b.size, Image.Resampling.LANCZOS)
    aa = np.asarray(a, dtype=np.float32)
    bb = np.asarray(b, dtype=np.float32)
    mse = float(np.mean((aa - bb) ** 2))
    max_mse = 255.0**2
    sim = 1.0 - min(1.0, mse / max_mse)
    ssim_val: float | None
    try:
        from skimage.metrics import structural_similarity as ssim_fn

        a8 = np.asarray(a, dtype=np.uint8)
        b8 = np.asarray(b, dtype=np.uint8)
        ssim_val = float(
            np.mean([ssim_fn(a8[:, :, c], b8[:, :, c], data_range=255) for c in range(3)]),
        )
    except ImportError:
        ssim_val = None
    return mse, sim, ssim_val


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: compare_cv_pdf_pages.py <reference.pdf> <generated.pdf>")
        sys.exit(1)
    ref_path = Path(sys.argv[1])
    gen_path = Path(sys.argv[2])
    if not ref_path.is_file() or not gen_path.is_file():
        print("Missing PDF path(s).")
        sys.exit(1)

    ref_doc = fitz.open(ref_path)
    gen_doc = fitz.open(gen_path)
    n = min(ref_doc.page_count, gen_doc.page_count)
    ref_doc.close()
    gen_doc.close()

    mses: list[float] = []
    sims: list[float] = []
    ssims: list[float] = []
    for i in range(n):
        r = render_page_pdfium(ref_path, i)
        g = render_page_pdfium(gen_path, i)
        mse, sim, ssim_v = align_and_diff(g, r)
        mses.append(mse)
        sims.append(sim)
        if ssim_v is not None:
            ssims.append(ssim_v)
        ssim_s = f"  SSIM={ssim_v * 100:.2f}%" if ssim_v is not None else ""
        print(f"page {i + 1}: MSE={mse:.1f}  similarity={sim * 100:.2f}%{ssim_s}")

    if mses:
        line = f"overall (mean): MSE={float(np.mean(mses)):.1f}  similarity={float(np.mean(sims)) * 100:.2f}%"
        if ssims:
            line += f"  SSIM={float(np.mean(ssims)) * 100:.2f}%"
        print(line)
        if not ssims:
            print("(Install scikit-image for SSIM: pip install scikit-image)")


if __name__ == "__main__":
    main()
