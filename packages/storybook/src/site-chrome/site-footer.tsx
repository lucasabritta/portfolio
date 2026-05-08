import { BrandIcon, brandIconForLink } from "../primitives/icons";

import type { SiteShellLinkComponent } from "./site-link-component";
import styles from "./site-footer.module.css";

export type SiteFooterLink = {
  label: string;
  href: string;
  /** When true, `rel` and `target` are applied for outbound links. */
  external?: boolean;
};

export type SiteFooterProps = {
  name: string;
  descriptor: string;
  links: SiteFooterLink[];
  colophon: string;
  linkComponent?: SiteShellLinkComponent;
};

export function SiteFooter({
  name,
  descriptor,
  links,
  colophon,
  linkComponent: LinkComponent,
}: SiteFooterProps) {
  const NavLink = LinkComponent ?? "a";

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.name}>{name}</p>
          <p className={styles.descriptor}>{descriptor}</p>
        </div>
        <nav aria-label="Footer">
          <ul className={styles.linkRow}>
            {links.map((link) => {
              const icon = brandIconForLink({ href: link.href, label: link.label });
              const linkLabelInner = (
                <>
                  {icon ? <BrandIcon name={icon} size="sm" /> : null}
                  <span>{link.label}</span>
                </>
              );
              return (
                <li key={`${link.href}-${link.label}`}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className={styles.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={`${link.label} (opens in a new tab)`}
                    >
                      <span className={styles.linkLabel} aria-hidden="true">
                        {linkLabelInner}
                      </span>
                    </a>
                  ) : (
                    <NavLink href={link.href} className={styles.link}>
                      <span className={styles.linkLabel}>{linkLabelInner}</span>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <p className={styles.colophon}>{colophon}</p>
      </div>
    </footer>
  );
}
