import { ActionButton, Card, SectionHeading, Title } from "../primitives";

import type { FeaturedWorkPreviewProps } from "./home-marketing-types";
import styles from "./featured-work-preview.module.css";

const fallbackFlagshipActions = (flagship: FeaturedWorkPreviewProps["flagship"]) => [
  {
    label: flagship.ctaLabel,
    href: flagship.href,
    variant: "primary" as const,
    external: flagship.external,
  },
];

export function FeaturedWorkPreview({
  id = "featured-work",
  heading,
  flagship,
  supporting,
}: FeaturedWorkPreviewProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className={styles.section} id={id}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      <div className={styles.grid}>
        <Card as="article" elevated radius="lg" padding="comfortable" className={styles.flagship}>
          <Title level={3} size="md">
            {flagship.title}
          </Title>
          <p className={styles.desc}>{flagship.description}</p>
          <div className={styles.actions}>
            {(flagship.actions ?? fallbackFlagshipActions(flagship)).map((action) => (
              <ActionButton
                key={`${action.label}-${action.href}`}
                variant={action.variant ?? "secondary"}
                href={action.href}
                rel={action.external ? "noopener noreferrer" : undefined}
                target={action.external ? "_blank" : undefined}
              >
                {action.label}
                {action.external ? (
                  <span className={styles.visuallyHidden}> (opens in a new tab)</span>
                ) : null}
              </ActionButton>
            ))}
          </div>
        </Card>
        {supporting.map((card, index) => (
          <Card
            key={`${index}-${card.title}`}
            as="article"
            elevated
            radius="md"
            padding="comfortable"
          >
            <Title level={4} size="sm">
              {card.title}
            </Title>
            <p className={styles.desc}>{card.description}</p>
            <ActionButton variant="secondary" href={card.href}>
              {card.ctaLabel}
            </ActionButton>
          </Card>
        ))}
      </div>
    </section>
  );
}
