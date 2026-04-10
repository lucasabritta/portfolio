import { createElement } from "react";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import { CvPdfDocument } from "@/components/cv-pdf-document";

export async function generateCvPdfResponse(): Promise<NextResponse> {
  const generatedPdf = await renderToBuffer(createElement(CvPdfDocument));
  const pdfBytes = new Uint8Array(generatedPdf);

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Disposition": 'attachment; filename="Lucas_Abritta_CV.pdf"',
      "Content-Type": "application/pdf",
    },
  });
}
