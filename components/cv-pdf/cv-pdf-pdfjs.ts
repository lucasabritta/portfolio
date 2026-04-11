import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/**
 * Must match the `pdf.js` build shipped with the installed `pdf-parse` version
 * (`node_modules/pdf-parse/lib/pdf.js/<version>/build/pdf.js`).
 */
const PDF_PARSE_PDFJS_BUILD = "pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js";

const PDF_PARSE_IMPLEMENTATION = "pdf-parse/lib/pdf-parse.js";

type BundledPdfJs = {
  disableWorker: boolean;
  getDocument: (src: Buffer | Uint8Array) => {
    promise: Promise<{
      getPage: (n: number) => Promise<unknown>;
      destroy: () => Promise<void>;
    }>;
  };
};

let cachedPdfJs: BundledPdfJs | undefined;

function getBundledPdfJs(): BundledPdfJs {
  if (!cachedPdfJs) {
    cachedPdfJs = require(PDF_PARSE_PDFJS_BUILD) as BundledPdfJs;
    cachedPdfJs.disableWorker = true;
  }
  return cachedPdfJs;
}

/** pdf-parse root `index.js` runs a debug harness under Vitest ESM; load the implementation directly. */
export const pdfParse: (dataBuffer: Buffer) => Promise<{ numpages: number; text: string }> = require(
  PDF_PARSE_IMPLEMENTATION,
);

export type PdfTextItem = {
  str: string;
  x: number;
  y: number;
  width: number;
};

export type ExtractPdfPageTextItemsOptions = {
  /** When true, pdf.js may merge adjacent runs (default false for geometry tests). */
  combineTextItems?: boolean;
};

/**
 * Text runs from the same pdf.js build as `pdf-parse`, with positions and widths for layout checks.
 */
export async function extractPdfPageTextItems(
  data: Buffer | Uint8Array,
  pageNumber: number,
  options: ExtractPdfPageTextItemsOptions = {},
): Promise<PdfTextItem[]> {
  const { combineTextItems = false } = options;
  const PDFJS = getBundledPdfJs();
  const doc = await PDFJS.getDocument(data).promise;
  const page = await doc.getPage(pageNumber);
  const content = (await (
    page as { getTextContent: (o: { disableCombineTextItems: boolean }) => Promise<{ items: unknown[] }> }
  ).getTextContent({ disableCombineTextItems: !combineTextItems })) as { items: unknown[] };

  const out: PdfTextItem[] = [];
  for (const raw of content.items) {
    const item = raw as { str?: string; transform: number[]; width?: number };
    if (typeof item.str !== "string" || item.str.length === 0) continue;
    const w = typeof item.width === "number" ? item.width : 0;
    out.push({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5],
      width: w,
    });
  }
  await doc.destroy();
  return out;
}
