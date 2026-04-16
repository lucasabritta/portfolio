import type { Metadata } from "next";

import { ProjectsPageView } from "@portfolio/storybook/projects-page-view";

import { projectsPageContent } from "@/lib/projects-site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Flagship Android game Echoes: Missing Cat — pitch, hardest problems, and outcomes — plus curated GitHub repositories.",
};

export default function ProjectsPage() {
  return (
    <main id="main" tabIndex={-1}>
      <ProjectsPageView {...projectsPageContent} />
    </main>
  );
}
