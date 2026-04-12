/**
 * @vitest-environment node
 * Dump PDF for visual diff (off in CI): `RENDER_CV_PDF=1 yarn vitest run lib/cv-pdf/cv-pdf-dump.test.ts`
 * Optional: `CV_PDF_OUT=C:/path/out.pdf` when `latest-cv.pdf` is locked by a viewer.
 * Then rasterize: `python scripts/pdf_to_png.py tmp-cv-compare/latest-cv.pdf tmp-cv-compare/screens`
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { renderCvPdfToBuffer } from "@cv-pdf/cv-pdf-vitest-helpers";

const enabled = process.env.RENDER_CV_PDF === "1";

describe.skipIf(!enabled)("CV PDF dump", () => {
  it("writes tmp-cv-compare/latest-cv.pdf (avoids locking an open file in the repo root)", async () => {
    const buf = await renderCvPdfToBuffer();
    const dir = path.join(process.cwd(), "tmp-cv-compare");
    mkdirSync(dir, { recursive: true });
    const out =
      process.env.CV_PDF_OUT?.trim() ||
      path.join(dir, "latest-cv.pdf");
    writeFileSync(out, buf);
    expect(buf.byteLength).toBeGreaterThan(5000);
    console.log("Wrote", out);
  }, 120_000);
});
