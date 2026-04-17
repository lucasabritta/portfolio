import { ActionLink, Card, SectionHeading } from "../primitives";

import styles from "./build-page-view.module.css";

export type BuildPageSection = {
  id: string;
  heading: string;
  body: string;
};

export type BuildPageCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external?: boolean;
};

export type BuildPageViewProps = {
  title: string;
  lead: string;
  sections: ReadonlyArray<BuildPageSection>;
  ctas: ReadonlyArray<BuildPageCta>;
  /** DOM id for the `<main>` landmark. Defaults to `"main"` so the skip link targets it. */
  mainId?: string;
};

export function BuildPageView({
  title,
  lead,
  sections,
  ctas,
  mainId = "main",
}: BuildPageViewProps) {
  return (
    <main id={mainId} tabIndex={-1} className={styles.main}>
      <article className={styles.article}>
        <SectionHeading id="build-page-heading">{title}</SectionHeading>
        <p className={styles.lead}>{lead}</p>
        <div className={styles.stack}>
          {sections.map((section) => (
            <Card
              key={section.id}
              as="article"
              elevated
              radius="md"
              padding="comfortable"
              className={styles.block}
            >
              <h3 className={styles.blockTitle}>{section.heading}</h3>
              <p className={styles.blockBody}>{section.body}</p>
            </Card>
          ))}
        </div>
        <div className={styles.ctaRow}>
          {ctas.map((cta) => (
            <ActionLink
              key={`${cta.label}-${cta.href}`}
              variant={cta.variant}
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
            >
              {cta.label}
            </ActionLink>
          ))}
        </div>
      </article>
    </main>
  );
}
