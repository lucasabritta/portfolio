import type { ResumeData } from "@portfolio/resume-content";
import type { BuildPageViewProps } from "@portfolio/storybook/build-page";
import type { ProjectsPageViewProps } from "@portfolio/storybook/projects-page";

import type { SiteChromeStaticProps } from "@/lib/site-chrome-props";

type Link = {
  label: string;
  href: string;
  description?: string;
};

function absolutize(pathOrUrl: string, origin: string): string {
  return new URL(pathOrUrl, origin).toString();
}

function linkLine({ label, href, description }: Link, origin: string): string {
  const suffix = description ? ` - ${description}` : "";
  return `- ${label}: ${absolutize(href, origin)}${suffix}`;
}

function bulletList(items: ReadonlyArray<string>): string[] {
  return items.map((item) => `- ${item}`);
}

export function buildResumeText(resume: ResumeData): string {
  const lines = [
    `# ${resume.name}`,
    "",
    resume.role,
    resume.location,
    resume.email,
    resume.phone,
    resume.linkedin,
    "",
    "## Summary",
    resume.summary,
    "",
    "## Highlights",
    ...bulletList(resume.summaryHighlights),
    "",
    "## Tech Stack",
    resume.techStack.join(", "),
    "",
    "## Work History",
    ...resume.workHistory.flatMap((entry) => [
      "",
      `### ${entry.role} - ${entry.company}`,
      `${entry.period} | ${entry.location}`,
      entry.summary,
      ...bulletList(entry.achievements),
    ]),
    "",
    "## Education",
    ...resume.education.flatMap((entry) => [
      `- ${entry.degree}, ${entry.institution} (${entry.location}, ${entry.date})`,
    ]),
    "",
    "## Certifications",
    ...bulletList(resume.certifications),
    "",
    "## Personal Projects",
    ...resume.personalProjects.flatMap((project) => [
      `- ${project.title}: ${project.description}`,
      `  ${project.href}`,
    ]),
    "",
    "## Contact Links",
    ...resume.contactLinks.map((link) => `- ${link.label}: ${link.href}`),
  ];

  return lines.join("\n");
}

export function buildProjectsText(projects: ProjectsPageViewProps): string {
  const { flagship } = projects;
  const lines = [
    `# ${projects.introTitle}`,
    "",
    projects.introLead,
    "",
    `## ${flagship.title}`,
    flagship.eyebrow,
    flagship.role,
    "",
    "### Stack",
    flagship.stack.join(", "),
    "",
    "### Pitch",
    flagship.pitch,
    "",
    "### Hardest Problem",
    flagship.hardestProblem,
    "",
    "### Outcomes",
    ...bulletList(flagship.outcomes),
    "",
    "### AI Pipeline Note",
    flagship.aiPipelineNote,
    "",
    "### Links",
    ...flagship.links.map((link) => `- ${link.label}: ${link.href}`),
    "",
    `## ${projects.pinnedReposHeading}`,
    ...projects.pinnedRepos.flatMap((repo) => [
      `- ${repo.name}: ${repo.summary}`,
      `  ${repo.href}`,
      `  Tags: ${repo.tags.join(", ")}`,
    ]),
  ];

  return lines.join("\n");
}

export function buildLlmsText({
  origin,
  resume,
  projects,
  build,
  siteChrome,
}: {
  origin: string;
  resume: ResumeData;
  projects: ProjectsPageViewProps;
  build: BuildPageViewProps;
  siteChrome: SiteChromeStaticProps;
}): string {
  const primaryPages: Link[] = [
    { label: "Home", href: "/", description: "Portfolio home and resume overview." },
    { label: "Projects", href: "/projects", description: projects.introLead },
    { label: "Build", href: "/build", description: build.lead },
  ];

  const textPages: Link[] = [
    { label: "Resume text", href: "/resume.txt", description: "Full text resume/CV." },
    { label: "Projects text", href: "/projects.txt", description: "Project summaries and links." },
    { label: "CV PDF", href: siteChrome.downloadCvHref, description: "Generated PDF resume." },
  ];

  const contactLinks: Link[] = [
    { label: "Email", href: `mailto:${resume.email}` },
    { label: "LinkedIn", href: resume.linkedin },
    ...resume.contactLinks.filter((link) => link.href !== resume.linkedin),
  ];

  const lines = [
    `# ${resume.name}`,
    "",
    `> ${resume.role} portfolio and CV. ${resume.summary}`,
    "",
    "This site has machine-readable text endpoints for AI agents and crawlers. Prefer the text endpoints below for concise structured content, and use the canonical pages for the visual website.",
    "",
    "## Primary Pages",
    ...primaryPages.map((link) => linkLine(link, origin)),
    "",
    "## Agent Text Endpoints",
    ...textPages.map((link) => linkLine(link, origin)),
    "",
    "## Contact",
    ...contactLinks.map((link) => linkLine(link, origin)),
    "",
    "## Navigation",
    ...siteChrome.navItems.map((item) => linkLine(item, origin)),
  ];

  return lines.join("\n");
}
