import { ActionLink, Card, SectionHeading, Title } from "../primitives";

import type { FeaturedWorkPreviewProps } from "./home-marketing-types";
import styles from "./featured-work-preview.module.css";

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
            <ActionLink
              variant="primary"
              href={flagship.href}
              rel={flagship.external ? "noopener noreferrer" : undefined}
              target={flagship.external ? "_blank" : undefined}
            >
              {flagship.ctaLabel}
            </ActionLink>
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
            <ActionLink variant="secondary" href={card.href}>
              {card.ctaLabel}
            </ActionLink>
          </Card>
        ))}
      </div>
    </section>
  );
}
