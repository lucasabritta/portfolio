import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";

import { CvPdfDocument } from "@/lib/cv-pdf/document";

/** Shared CV PDF render for Vitest (`@vitest-environment node`). */
export async function renderCvPdfToBuffer(): Promise<Buffer> {
  const buf = await renderToBuffer(createElement(CvPdfDocument));
  return Buffer.from(buf);
}
