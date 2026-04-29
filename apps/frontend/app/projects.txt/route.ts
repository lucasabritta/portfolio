import { createAgentTextResponse } from "@/lib/agent-surfaces/response";
import { buildProjectsText } from "@/lib/agent-surfaces/text";
import { projectsPageContent } from "@/lib/projects-site";

export const revalidate = 86400;

export function GET() {
  return createAgentTextResponse(buildProjectsText(projectsPageContent));
}
