/**
 * @vitest-environment node
 *
 * pdf-parse/pdf.js needs a real Node worker; jsdom triggers the fake-worker path without workerSrc.
 */
import { describe, expect, it } from "vitest";

import { CV_PDF_RIGHT_COLUMN_INNER_LEFT_PT } from "@/components/cv-pdf/constants";
import {
  flattenCvPdfTextForSubstringMatch,
  normalizeCvPdfExtractedText,
} from "@/components/cv-pdf/pdf-text-normalize";
import { extractPdfPageTextItems, pdfParse } from "@/components/cv-pdf/cv-pdf-pdfjs";
import { renderCvPdfToBuffer } from "@/components/cv-pdf/cv-pdf-vitest-helpers";
import { buildCvPdfRequiredSubstrings, cvData } from "@/lib/cv";

describe("CV PDF integrity (data from lib/cv)", () => {
  it("text extract contains every required substring derived from cvData", async () => {
    const pdfBuffer = await renderCvPdfToBuffer();
    expect(pdfBuffer.length).toBeGreaterThan(5000);

    const parsed = await pdfParse(pdfBuffer);
    expect(parsed.numpages).toBe(2);

    const normalized = normalizeCvPdfExtractedText(parsed.text);
    const flat = flattenCvPdfTextForSubstringMatch(normalized);

    for (const fragment of buildCvPdfRequiredSubstrings(cvData)) {
      expect(flat, `missing CV fragment`).toContain(fragment);
    }
  }, 90_000);

  it("keeps legacy layout (contacts in sidebar, work section title)", async () => {
    const pdfBuffer = await renderCvPdfToBuffer();
    const parsed = await pdfParse(pdfBuffer);
    const normalized = normalizeCvPdfExtractedText(parsed.text);

    expect(normalized).toContain("Work History");
    expect(normalized).not.toContain("Work Experience");
    expect(normalized).not.toContain("\nContacts\n");
    expect(normalized).not.toMatch(/Phone:\s/);
    expect(normalized).not.toMatch(/Email:\s/);
    expect(normalized).not.toMatch(/Location:\s/);
  }, 90_000);

  it("keeps Play Store URL text runs inside the left column (no bleed into work history)", async () => {
    const href = cvData.personalProjects[0]?.href ?? "";
    const needle = "play.google";
    expect(href.length).toBeGreaterThan(10);
    expect(href).toContain(needle);

    const pdfBuffer = await renderCvPdfToBuffer();
    const items = await extractPdfPageTextItems(pdfBuffer, 1);

    const urlRuns = items.filter(
      (it) =>
        it.str.includes(needle) ||
        it.str.includes("missingcat") ||
        it.str.includes("store/apps") ||
        it.str.includes("/apps/"),
    );
    expect(urlRuns.length, "expected PDF text runs for the Play URL").toBeGreaterThan(0);

    const maxRight = CV_PDF_RIGHT_COLUMN_INNER_LEFT_PT + 1;
    for (const it of urlRuns) {
      const right = it.x + it.width;
      expect(
        right,
        `run "${it.str.slice(0, 48)}…" extends to x+width=${right.toFixed(2)} (limit ${maxRight})`,
      ).toBeLessThanOrEqual(maxRight);
    }

    expect(
      items.some((it) => it.str.includes("missingcat")),
      "package id should still be present in page 1 text",
    ).toBe(true);
  }, 90_000);
});
