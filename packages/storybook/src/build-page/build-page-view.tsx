import { ActionButton, Card, Title, brandIconForLink, type ActionButtonVariant } from "../primitives";

import styles from "./build-page-view.module.css";

export type BuildPageSection = {
  id: string;
  heading: string;
  body: string;
};

export type BuildPageCta = {
  label: string;
  href: string;
  variant: ActionButtonVariant;
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

const SECTION_META: Record<string, { eyebrow: string; glyph: string }> = {
  architecture: { eyebrow: "Boundaries", glyph: "01" },
  storybook: { eyebrow: "Design system", glyph: "02" },
  quality: { eyebrow: "Confidence", glyph: "03" },
  deploy: { eyebrow: "Release path", glyph: "04" },
  edge: { eyebrow: "Domain path", glyph: "05" },
};

function sectionMeta(section: BuildPageSection, index: number) {
  return (
    SECTION_META[section.id] ?? {
      eyebrow: "Build note",
      glyph: String(index + 1).padStart(2, "0"),
    }
  );
}

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
        <Title id="build-page-heading" level={1} size="lg">
          {title}
        </Title>
        <p className={styles.lead}>{lead}</p>
        <ol className={styles.flow} aria-label="Build flow">
          {sections.map((section, index) => (
            <li key={`flow-${section.id}`}>
              <a href={`#${section.id}`}>{sectionMeta(section, index).eyebrow}</a>
            </li>
          ))}
        </ol>
        <div className={styles.stack}>
          {sections.map((section, index) => {
            const meta = sectionMeta(section, index);
            return (
              <Card
                key={section.id}
                as="section"
                elevated
                radius="md"
                padding="comfortable"
                className={styles.block}
                id={section.id}
              >
                <div className={styles.blockHeader}>
                  <span className={styles.blockGlyph} aria-hidden="true">
                    {meta.glyph}
                  </span>
                  <div>
                    <p className={styles.blockEyebrow}>{meta.eyebrow}</p>
                    <h2 className={styles.blockTitle}>{section.heading}</h2>
                  </div>
                </div>
                <p className={styles.blockBody}>{section.body}</p>
              </Card>
            );
          })}
        </div>
        <div className={styles.ctaRow}>
          {ctas.map((cta) => (
            <ActionButton
              key={`${cta.label}-${cta.href}`}
              variant={cta.variant}
              href={cta.href}
              icon={brandIconForLink({ href: cta.href, label: cta.label })}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
            >
              {cta.label}
              {cta.external ? (
                <span className={styles.visuallyHidden}> (opens in a new tab)</span>
              ) : null}
            </ActionButton>
          ))}
        </div>
      </article>
    </main>
  );
}
