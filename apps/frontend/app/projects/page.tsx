import type { Metadata } from "next";

import { ProjectsPageView } from "@portfolio/storybook/projects-page-view";

import { projectsPageContent } from "@/lib/site/projects-site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Flagship Android game Echoes of the missing cat, plus curated GitHub repositories for portfolio, backend, and dashboard work.",
};

export default function ProjectsPage() {
  return (
    <main id="main" tabIndex={-1}>
      <ProjectsPageView {...projectsPageContent} />
    </main>
  );
}
