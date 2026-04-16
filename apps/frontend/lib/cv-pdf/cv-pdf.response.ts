import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { resumeData } from "@portfolio/resume-content";

import { CvPdfDocument } from "./cv-pdf.document";

function buildCvFilename(): string {
  const slug = resumeData.name
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${slug || "resume"}_CV.pdf`;
}

const CV_PDF_HEADERS = {
  "Content-Disposition": `attachment; filename="${buildCvFilename()}"`,
  "Content-Type": "application/pdf",
  "Cache-Control": "private, max-age=0, must-revalidate",
} as const;

export type BinaryHttpPayload = {
  body: Uint8Array;
  headers: Record<string, string>;
  status: number;
};

export async function createCvPdfDownloadPayload(): Promise<BinaryHttpPayload> {
  const generatedPdf = await renderToBuffer(createElement(CvPdfDocument));
  const pdfBytes = Uint8Array.from(generatedPdf);

  return {
    body: pdfBytes,
    headers: { ...CV_PDF_HEADERS },
    status: 200,
  };
}

export async function createCvPdfDownloadResponse(): Promise<Response> {
  const payload = await createCvPdfDownloadPayload();
  const responseBody = new ArrayBuffer(payload.body.byteLength);
  new Uint8Array(responseBody).set(payload.body);

  return new Response(responseBody, {
    headers: payload.headers,
    status: payload.status,
  });
}
