import { buildPhoneHref, type ContactLink } from "@portfolio/cv";

import { ActionLink, HeroLead, HeroName, HeroRole } from "../primitives";

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
      <HeroRole aria-label={role.trim() ? undefined : "Role not provided"}>
        {role.trim() ? role : "—"}
      </HeroRole>
      <HeroName aria-label={name.trim() ? undefined : "Name not provided"}>
        {name.trim() ? name : "—"}
      </HeroName>
      <HeroLead aria-label={summary.trim() ? undefined : "Summary not provided"}>
        {summary.trim() ? summary : "—"}
      </HeroLead>
      <div className={styles.contactRow}>
        <span aria-label={locationTrim ? undefined : "Location not provided"}>
          {locationTrim ? locationTrim : "—"}
        </span>
        {phoneTrim ? (
          <ActionLink variant="inlineNeutral" href={buildPhoneHref(phone)}>
            {phoneTrim}
          </ActionLink>
        ) : (
          <span aria-label="Phone not provided">—</span>
        )}
        {emailTrim ? (
          <ActionLink variant="inlineNeutral" href={`mailto:${emailTrim}`}>
            {emailTrim}
          </ActionLink>
        ) : (
          <span aria-label="Email not provided">—</span>
        )}
      </div>
      <div className={styles.actions}>
        <ActionLink variant="primary" href={downloadHref}>
          Download CV
        </ActionLink>
        {links.map((link, index) => (
          <ActionLink
            key={`${index}-${link.label}-${link.href}`}
            variant="secondary"
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </ActionLink>
        ))}
      </div>
    </header>
  );
}
