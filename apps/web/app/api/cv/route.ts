import { generateCvPdfResponse } from "@/app/api/cv/pdf";

export const runtime = "nodejs";

export async function GET() {
  return generateCvPdfResponse();
}
