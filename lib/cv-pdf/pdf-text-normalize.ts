/**
 * PDF text extraction cleanup: generic steps first, then optional CV template tweaks.
 */
import { finalizeCvPdfExtractLines } from "@/lib/cv/pdf-text-postprocess";

/** Whitespace, footer strips, and common font-substitution quirks (document-agnostic). */
export function normalizePdfExtractLines(raw: string): string[] {
  let s = raw.replace(/\u000b/g, " ");
  s = s.replace(/\f/g, "\n");
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  s = s.replace(/--\s*\d+\s+of\s+\d+\s+--/gi, "");
  // Some pdf.js text runs mis-map BLACK CIRCLE to "Ï" depending on font subsetting.
  s = s.replace(/Ï/g, "●");

  return s
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0);
}

/** Full pipeline for this repo’s CV PDF integrity tests. */
export function normalizeCvPdfExtractedText(raw: string): string {
  const lines = normalizePdfExtractLines(raw);
  return finalizeCvPdfExtractLines(lines).join("\n");
}

/** Collapse wrapped lines and strip ZWSP so substring checks match `lib/cv` source strings. */
export function flattenCvPdfTextForSubstringMatch(normalized: string): string {
  return normalized
    .replace(/\u200b/g, "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
