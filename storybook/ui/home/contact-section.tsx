import styles from "@/storybook/ui/portfolio-page.module.css";
import { buildPhoneHref } from "@/lib/contact";

type ContactSectionProps = {
  location: string;
  phone: string;
  email: string;
  linkedin: string;
};

export function ContactSection({ location, phone, email, linkedin }: ContactSectionProps) {
  return (
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading" className={styles.sectionTitle}>
        Contact
      </h2>
      <div className={styles.contactCard}>
        <p className={styles.contactLocation}>Based in {location}</p>
        <ul className={styles.contactLinks}>
          <li>
            <a className={styles.contactLink} href={buildPhoneHref(phone)}>
              {phone}
            </a>
          </li>
          <li>
            <a className={styles.contactLink} href={`mailto:${email}`}>
              {email}
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
