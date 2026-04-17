import { ActionLink, Card, SectionHeading } from "../../primitives";

import styles from "./contact-section.module.css";

export type ContactSectionProps = {
  location: string;
  phone: string;
  /** Precomputed `tel:` href (computed by the Next app in `apps/frontend`). */
  phoneHref: string;
  email: string;
  linkedin: string;
};

export function ContactSection({ location, phone, phoneHref, email, linkedin }: ContactSectionProps) {
  const phoneTrim = phone.trim();
  const emailTrim = email.trim();
  const linkedinTrim = linkedin.trim();

  return (
    <section aria-labelledby="contact-heading">
      <SectionHeading id="contact-heading">Contact</SectionHeading>
      <Card as="div" className={styles.contactShell} radius="lg" padding="comfortable">
        <p className={styles.contactLocation}>
          Based in {location.trim() ? location.trim() : "—"}
        </p>
        <ul className={styles.contactLinks}>
          <li>
            {phoneTrim ? (
              <ActionLink variant="inlineAccent" href={phoneHref}>
                {phoneTrim}
              </ActionLink>
            ) : (
              <span aria-label="Phone not provided">—</span>
            )}
          </li>
          <li>
            {emailTrim ? (
              <ActionLink variant="inlineAccent" href={`mailto:${emailTrim}`}>
                {emailTrim}
              </ActionLink>
            ) : (
              <span aria-label="Email not provided">—</span>
            )}
          </li>
          <li>
            {linkedinTrim ? (
              <ActionLink variant="inlineAccent" href={linkedinTrim} rel="noopener noreferrer" target="_blank">
                LinkedIn
              </ActionLink>
            ) : (
              <span aria-label="LinkedIn not provided">—</span>
            )}
          </li>
        </ul>
      </Card>
    </section>
  );
}
