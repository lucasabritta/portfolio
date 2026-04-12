import { createCvPdfDownloadResponse } from "@portfolio/backend";

export const runtime = "nodejs";

export async function GET() {
  return createCvPdfDownloadResponse();
}
