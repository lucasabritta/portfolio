import { buildPhoneHref } from "@portfolio/cv";
import heading from "../shared/section-heading.module.css";
import styles from "./contact-section.module.css";

type ContactSectionProps = {
  location: string;
  phone: string;
  email: string;
  linkedin: string;
};

export function ContactSection({ location, phone, email, linkedin }: ContactSectionProps) {
  const phoneTrim = phone.trim();
  const emailTrim = email.trim();

  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading" className={heading.sectionTitle}>
        Contact
      </h2>
      <div className={styles.contactCard}>
        <p className={styles.contactLocation}>
          Based in {location.trim() ? location.trim() : "—"}
        </p>
        <ul className={styles.contactLinks}>
          <li>
            <a
              className={styles.contactLink}
              href={phoneTrim ? buildPhoneHref(phone) : "tel:"}
              aria-label={phoneTrim ? undefined : "Phone not provided"}
            >
              {phoneTrim ? phoneTrim : "—"}
            </a>
          </li>
          <li>
            <a
              className={styles.contactLink}
              href={emailTrim ? `mailto:${emailTrim}` : "mailto:"}
              aria-label={emailTrim ? undefined : "Email not provided"}
            >
              {emailTrim ? emailTrim : "—"}
            </a>
          </li>
          <li>
            <a className={styles.contactLink} href={linkedin} rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
