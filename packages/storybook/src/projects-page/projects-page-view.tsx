"use client";

import type { SyntheticEvent } from "react";

import { ActionLink, Card, Chip, SectionHeading, Title } from "../primitives";

import type { ProjectsPageViewProps } from "./presentation-types";
import styles from "./projects-page-view.module.css";

function hideImageShowFallback(event: SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  img.style.display = "none";
  const fallback = img.nextElementSibling;
  if (fallback instanceof HTMLElement) {
    fallback.hidden = false;
  }
}

function FlagshipMedia({
  imageSrc,
  imageAlt,
  title,
}: {
  imageSrc: string | null;
  imageAlt: string;
  title: string;
}) {
  return (
    <div className={styles.flagshipMedia}>
      <div className={styles.mediaFrame}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            onError={hideImageShowFallback}
          />
        ) : null}
        <div
          className={styles.mediaPlaceholder}
          hidden={Boolean(imageSrc)}
          role="img"
          aria-label={imageAlt}
        >
          <span>{title}</span>
          <span>Artwork not loaded yet — gradient frame keeps the layout stable.</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsPageView({
  introTitle,
  introLead,
  flagship,
  pinnedReposHeading,
  pinnedRepos,
}: ProjectsPageViewProps) {
  return (
    <div className={styles.page}>
      <header>
        <Title level={2} size="lg">
          {introTitle}
        </Title>
        <p className={styles.introLead}>{introLead}</p>
      </header>

      <section aria-labelledby="flagship-title" className={styles.flagship}>
        <FlagshipMedia
          imageSrc={flagship.imageSrc}
          imageAlt={flagship.imageAlt}
          title={flagship.title}
        />
        <div className={styles.flagshipBody}>
          <p className={styles.eyebrow}>{flagship.eyebrow}</p>
          <Title id="flagship-title" level={3} size="md">
            {flagship.title}
          </Title>
          <p className={styles.roleLine}>{flagship.role}</p>
          <div className={styles.stackRow}>
            {flagship.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
          <h4 className={styles.blockHeading}>Pitch</h4>
          <p className={styles.blockText}>{flagship.pitch}</p>
          <h4 className={styles.blockHeading}>Hardest problem</h4>
          <p className={styles.blockText}>{flagship.hardestProblem}</p>
          <h4 className={styles.blockHeading}>Outcomes</h4>
          <ul className={styles.outcomesList}>
            {flagship.outcomes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className={styles.aiNote}>{flagship.aiPipelineNote}</p>
          <div className={styles.ctaRow}>
            {flagship.links.map((link) => (
              <ActionLink
                key={`${link.label}-${link.href}`}
                variant={link.variant}
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </ActionLink>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="repos-heading" className={styles.reposSection}>
        <SectionHeading id="repos-heading">{pinnedReposHeading}</SectionHeading>
        <ul className={styles.reposGrid}>
          {pinnedRepos.map((repo) => (
            <li key={repo.href}>
              <Card as="article" elevated radius="md" padding="comfortable">
                <h3 className={styles.repoCardTitle}>{repo.name}</h3>
                <p className={styles.repoSummary}>{repo.summary}</p>
                <div className={styles.repoTags}>
                  {repo.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
                <ActionLink
                  variant="accentUnderline"
                  href={repo.href}
                  className={styles.repoLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`Open GitHub repository: ${repo.name}`}
                >
                  View on GitHub
                </ActionLink>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
