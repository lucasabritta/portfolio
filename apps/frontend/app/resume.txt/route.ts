import { resumeData } from "@portfolio/resume-content";

import { createAgentTextResponse } from "@/lib/agent-surfaces/response";
import { buildResumeText } from "@/lib/agent-surfaces/text";

export const revalidate = 86400;

export function GET() {
  return createAgentTextResponse(buildResumeText(resumeData));
}
