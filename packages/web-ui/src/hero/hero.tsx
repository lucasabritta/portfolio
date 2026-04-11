import { buildPhoneHref, type ContactLink } from "@portfolio/cv";

import styles from "./hero.module.css";

type PortfolioHeroProps = {
  name: string;
  role: string;
  summary: string;
  location: string;
  phone: string;
  email: string;
  links: readonly ContactLink[];
  downloadHref: string;
};

export function PortfolioHero({
  name,
  role,
  summary,
  location,
  phone,
  email,
  links,
  downloadHref,
}: PortfolioHeroProps) {
  const phoneTrim = phone.trim();
  const emailTrim = email.trim();
  const locationTrim = location.trim();

  return (
    <header className={styles.header}>
      <p className={styles.role}>{role.trim() ? role : "—"}</p>
      <h1 className={styles.name} aria-label={name.trim() ? undefined : "Name not provided"}>
        {name.trim() ? name : "—"}
      </h1>
      <p className={styles.summary}>{summary.trim() ? summary : "—"}</p>
      <div className={styles.contactRow}>
        <span>{locationTrim ? locationTrim : "—"}</span>
        <a
          className={styles.contactLink}
          href={phoneTrim ? buildPhoneHref(phone) : "tel:"}
          aria-label={phoneTrim ? undefined : "Phone not provided"}
        >
          {phoneTrim ? phoneTrim : "—"}
        </a>
        <a
          className={styles.contactLink}
          href={emailTrim ? `mailto:${emailTrim}` : "mailto:"}
          aria-label={emailTrim ? undefined : "Email not provided"}
        >
          {emailTrim ? emailTrim : "—"}
        </a>
      </div>
      <div className={styles.actions}>
        <a href={downloadHref} className={styles.downloadAction}>
          Download CV
        </a>
        {links.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            className={styles.externalAction}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
