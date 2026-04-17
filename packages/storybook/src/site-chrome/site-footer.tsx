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
        <ul className={styles.linkRow}>
          {links.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              {link.external ? (
                <a
                  href={link.href}
                  className={styles.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink href={link.href} className={styles.link}>
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <p className={styles.colophon}>{colophon}</p>
      </div>
    </footer>
  );
}
