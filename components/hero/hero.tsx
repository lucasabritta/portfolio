import type { ContactLink } from "@/lib/cv-data";
import { buildPhoneHref } from "@/lib/contact";

import styles from "@/components/hero/hero.module.css";

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
  return (
    <header className={styles.header}>
      <p className={styles.role}>{role}</p>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.contactRow}>
        <span>{location}</span>
        <a className={styles.contactLink} href={buildPhoneHref(phone)}>
          {phone}
        </a>
        <a className={styles.contactLink} href={`mailto:${email}`}>
          {email}
        </a>
      </div>
      <div className={styles.actions}>
        <a href={downloadHref} className={styles.downloadAction}>
          Download CV
        </a>
        {links.map((link) => (
          <a
            key={link.label}
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
