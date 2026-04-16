import type { Metadata } from "next";

import { ActionLink, Card, SectionHeading } from "@portfolio/storybook";

import { buildPageContent } from "@/lib/build-site";

import styles from "./build-page.module.css";

export const metadata: Metadata = {
  title: "Build",
  description:
    "How this portfolio is structured — Next.js, Storybook, multi-package layout, CI, and deployment on Vercel.",
};

export default function BuildPage() {
  return (
    <main id="main" tabIndex={-1} className={styles.main}>
      <article className={styles.article}>
        <SectionHeading id="build-page-heading">{buildPageContent.title}</SectionHeading>
        <p className={styles.lead}>{buildPageContent.lead}</p>
        <div className={styles.stack}>
          {buildPageContent.sections.map((section) => (
            <Card key={section.id} as="article" elevated radius="md" padding="comfortable" className={styles.block}>
              <h3 className={styles.blockTitle}>{section.heading}</h3>
              <p className={styles.blockBody}>{section.body}</p>
            </Card>
          ))}
        </div>
        <div className={styles.ctaRow}>
          <ActionLink variant="primary" href="/storybook">
            Open Storybook
          </ActionLink>
          <ActionLink variant="secondary" href="/projects">
            View projects
          </ActionLink>
        </div>
      </article>
    </main>
  );
}
