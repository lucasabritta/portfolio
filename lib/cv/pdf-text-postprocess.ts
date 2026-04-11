/**
 * CV-specific fixes after generic PDF text normalization (template / line-break quirks).
 * Keeps `components/cv-pdf/pdf-text-normalize.ts` free of résumé-only string hacks.
 */
export function finalizeCvPdfExtractLines(lines: string[]): string[] {
  const out = [...lines];

  for (let i = 0; i < out.length - 1; i++) {
    if (out[i].includes("Tech stack:") && /^Cypress,/.test(out[i + 1])) {
      out[i] = `${out[i].replace(/,$/, "")}, ${out[i + 1]}`;
      out.splice(i + 1, 1);
      break;
    }
  }

  const techIdx = out.findIndex((line) => line.startsWith("Tech stack:"));
  if (techIdx >= 0 && !out[techIdx].endsWith(".")) {
    out[techIdx] = `${out[techIdx]}.`;
  }

  return out;
}
