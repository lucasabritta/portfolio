import { createElement, type ReactElement } from "react";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import {
  buildCvFilename,
  resumeData as defaultResumeData,
  type ResumeData,
} from "@portfolio/resume-content";

import { CvPdfDocument } from "./cv-pdf.document";

const BASE_PDF_HEADERS = {
  "Content-Type": "application/pdf",
  "Cache-Control": "private, max-age=0, must-revalidate",
} as const;

function buildCvPdfHeaders(name: string): Record<string, string> {
  return {
    ...BASE_PDF_HEADERS,
    "Content-Disposition": `attachment; filename="${buildCvFilename(name)}"`,
  };
}

export type BinaryHttpPayload = {
  body: Uint8Array;
  headers: Record<string, string>;
  status: number;
};

export type CvPdfDownloadOptions = {
  resumeData?: ResumeData;
};

export async function createCvPdfDownloadPayload(
  options: CvPdfDownloadOptions = {},
): Promise<BinaryHttpPayload> {
  const resume = options.resumeData ?? defaultResumeData;
  // `CvPdfDocument` always returns a <Document>; the cast satisfies the
  // react-pdf typings which expect `ReactElement<DocumentProps>` at the root.
  const documentElement = createElement(CvPdfDocument, {
    resumeData: resume,
  }) as unknown as ReactElement<DocumentProps>;
  const generatedPdf = await renderToBuffer(documentElement);
  const pdfBytes = Uint8Array.from(generatedPdf);

  return {
    body: pdfBytes,
    headers: buildCvPdfHeaders(resume.name),
    status: 200,
  };
}

export async function createCvPdfDownloadResponse(
  options: CvPdfDownloadOptions = {},
): Promise<Response> {
  const payload = await createCvPdfDownloadPayload(options);
  const responseBody = new ArrayBuffer(payload.body.byteLength);
  new Uint8Array(responseBody).set(payload.body);

  return new Response(responseBody, {
    headers: payload.headers,
    status: payload.status,
  });
}
