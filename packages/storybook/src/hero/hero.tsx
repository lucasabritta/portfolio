import { ActionButton, ActionLink, HeroLead, HeroName, HeroRole, brandIconForLink } from "../primitives";

import styles from "./hero.module.css";

import type { PresentationContactLink } from "../home/presentation-types";

export type PortfolioHeroProps = {
  name: string;
  role: string;
  summary: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  links: readonly PresentationContactLink[];
};

export function PortfolioHero({
  name,
  role,
  summary,
  location,
  phone,
  phoneHref,
  email,
  links,
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
          <ActionLink variant="inlineNeutral" href={phoneHref}>
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
        {links.map((link, index) => (
          <ActionButton
            key={`${index}-${link.label}-${link.href}`}
            variant={index === 0 ? "primary" : "secondary"}
            href={link.href}
            icon={brandIconForLink({ href: link.href, label: link.label })}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </ActionButton>
        ))}
      </div>
    </header>
  );
}
