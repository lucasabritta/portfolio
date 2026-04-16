import { createCvPdfDownloadResponse } from "@/lib/cv-pdf-download-response";

export const runtime = "nodejs";

export async function GET() {
  try {
    return await createCvPdfDownloadResponse();
  } catch (error) {
    console.error("Failed to generate /api/cv response", error);
    return new Response("CV download is temporarily unavailable.", { status: 502 });
  }
}
