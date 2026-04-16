import { Card, SectionHeading } from "../primitives";

import type { CredibilityStripProps } from "./home-marketing-types";
import styles from "./credibility-strip.module.css";

export function CredibilityStrip({ id = "credibility", items }: CredibilityStripProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className={styles.section} id={id}>
      <SectionHeading id={`${id}-heading`}>How I work</SectionHeading>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.title}>
            <Card as="article" elevated radius="md" padding="comfortable">
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
