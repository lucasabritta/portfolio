/**
 * @vitest-environment node
 * Set RENDER_CV_PDF=1 and CV_PDF_OUT to an absolute path to write a PDF (see scripts/cv/docker-dump.sh).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { describe, it } from "vitest";

import { createCvPdfDownloadPayload } from "./cv-pdf.response";

describe("CV PDF file dump (opt-in)", () => {
  it.skipIf(!process.env.RENDER_CV_PDF || !process.env.CV_PDF_OUT)(
    "writes generated PDF bytes to CV_PDF_OUT",
    async () => {
      const outPath = process.env.CV_PDF_OUT!;
      mkdirSync(dirname(outPath), { recursive: true });
      const { body } = await createCvPdfDownloadPayload();
      writeFileSync(outPath, body);
    },
  );
});
