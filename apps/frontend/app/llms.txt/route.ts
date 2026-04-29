import { resumeData } from "@portfolio/resume-content";

import { createAgentTextResponse } from "@/lib/agent-surfaces/response";
import { getSiteOrigin } from "@/lib/agent-surfaces/site-url";
import { buildLlmsText } from "@/lib/agent-surfaces/text";
import { buildPageContent } from "@/lib/build-site";
import { projectsPageContent } from "@/lib/projects-site";
import { buildSiteChromeProps } from "@/lib/site-chrome-props";

export const revalidate = 86400;

export function GET() {
  return createAgentTextResponse(
    buildLlmsText({
      origin: getSiteOrigin(),
      resume: resumeData,
      projects: projectsPageContent,
      build: buildPageContent,
      siteChrome: buildSiteChromeProps(),
    }),
  );
}
