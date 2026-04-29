import { describe, expect, it } from "vitest";

import { resumeData } from "@portfolio/resume-content";

import { buildPageContent } from "../build-site";
import { projectsPageContent } from "../projects-site";
import { buildSiteChromeProps } from "../site-chrome-props";
import { buildLlmsText, buildProjectsText, buildResumeText } from "./text";

describe("agent text formatters", () => {
  it("formats the resume from canonical resume data", () => {
    const text = buildResumeText(resumeData);

    expect(text).toContain(`# ${resumeData.name}`);
    expect(text).toContain("## Work History");
    expect(text).toContain(resumeData.workHistory[0].company);
    expect(text).toContain(resumeData.contactLinks[0].href);
  });

  it("formats project content from the projects page model", () => {
    const text = buildProjectsText(projectsPageContent);

    expect(text).toContain("# Projects");
    expect(text).toContain(projectsPageContent.flagship.title);
    expect(text).toContain(projectsPageContent.pinnedRepos[0].href);
  });

  it("builds an llms.txt index with absolute discovery links", () => {
    const text = buildLlmsText({
      origin: "https://portfolio.example",
      resume: resumeData,
      projects: projectsPageContent,
      build: buildPageContent,
      siteChrome: buildSiteChromeProps(),
    });

    expect(text).toContain("https://portfolio.example/resume.txt");
    expect(text).toContain("https://portfolio.example/projects.txt");
    expect(text).toContain("https://portfolio.example/api/cv");
  });
});
