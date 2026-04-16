import type { Metadata } from "next";

import { ActionLink, Title } from "@portfolio/storybook";

import styles from "./projects-page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work and projects by Lucas Abritta — case studies and highlights coming soon.",
};

export default function ProjectsPage() {
  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <Title level={2} size="lg">
        Projects
      </Title>
      <p className={styles.lead}>
        A dedicated projects page with flagship work and curated repositories is planned next. Until then, the home page still lists
        personal projects from the résumé data, and the PDF CV is always available from the header.
      </p>
      <ActionLink variant="primary" href="/">
        Back to home
      </ActionLink>
    </main>
  );
}
