# CV PDF — Docker-first workflow

Use **Docker Compose** for anything that depends on the locked Node image or on Python PDF tooling. Avoid relying on the host Python install (Windows path issues are common).

Stack file: **`docker-compose.yml`** at the repo root. The `web` image bakes in **Yarn 1.22.22** via `corepack prepare` in the `Dockerfile`, so `yarn cv:dump:docker` / `docker compose run … yarn` does not prompt to download Yarn.

## Layout source of truth

React-PDF uses **points**, not browser px. Table geometry is aligned to the DOCX `tblGrid` (3285 + 8235 twips) via `apps/web/lib/cv-pdf/constants.ts` and `styles/layout.ts`.

**Sidebar URLs:** Do **not** set `overflow: 'hidden'` on the whole left column — it clips multi-line links. Long Play Store URLs use a fixed inner width (`CV_PDF_LEFT_INNER_WIDTH_PT`), wrapping **`Text` inside `Link`** (`apps/web/lib/cv-pdf/sections/left-column/projects.tsx`), and **`formatSidebarUrlForPdf`** (`apps/web/lib/cv-pdf/sections/text-format.ts`) so pdf.js does not emit a single text run wider than the column. **`apps/web/lib/cv-pdf/cv-pdf-integrity.test.ts`** checks both text fragments and **geometry** (`x + width` vs `CV_PDF_RIGHT_COLUMN_INNER_LEFT_PT`) using **`apps/web/lib/cv-pdf/cv-pdf-pdfjs.ts`** (bundled pdf.js).

**Raster “99%+”** versus a Word-export PDF is usually **not** achievable (different text engines). Use `scripts/compare_cv_pdf_pages.py` in the `cv-tools` container to track **MSE / SSIM trends**, not as a merge gate.

## Render a PDF for visual review

From the repo root (Docker Desktop running):

```bash
yarn cv:dump:docker
```

Writes `tmp-cv-compare/docker-latest-cv.pdf` (bind-mounted from the container).

Equivalent manual invocation:

```bash
docker compose run --rm \
  -e RENDER_CV_PDF=1 \
  -e CV_PDF_OUT=/app/tmp-cv-compare/docker-latest-cv.pdf \
  web yarn vitest run apps/web/lib/cv-pdf/cv-pdf-dump.test.ts
```

## Raster compare or PNG preview (Python)

Use the **`cv`** profile (slim Python image):

```bash
docker compose --profile cv run --rm cv-tools pip install --no-cache-dir pymupdf pillow numpy
docker compose --profile cv run --rm -v "$HOME/Downloads:/docs:ro" cv-tools \
  python scripts/compare_cv_pdf_pages.py /docs/Lucas_Abritta_EM.pdf /app/tmp-cv-compare/docker-latest-cv.pdf
```

First-page PNG (after generating the PDF above):

```bash
docker compose --profile cv run --rm cv-tools pip install --no-cache-dir pymupdf
docker compose --profile cv run --rm cv-tools \
  python scripts/cv/preview_pdf_page.py /app/tmp-cv-compare/docker-latest-cv.pdf /app/tmp-cv-compare/page1.png
```

On Windows PowerShell, replace `$HOME/Downloads` with `C:/Users/<you>/Downloads`.

## Fonts

Regenerate bundled TTFs under `public/cv-fonts/`:

```bash
docker compose --profile cv run --rm cv-tools python scripts/download_cv_fonts.py
```

## Docx style extract

```bash
docker compose --profile cv run --rm -v "/path/to/doc:/doc:ro" cv-tools \
  python scripts/extract_docx_cv_styles.py /doc/Lucas_Abritta_EM.docx
```
