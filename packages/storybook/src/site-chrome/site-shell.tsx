import type { ReactNode } from "react";

import styles from "./site-shell.module.css";

export type SiteShellProps = {
  /** Skip-to-main link rendered above the header for keyboard/AT users. */
  skipLink?: ReactNode;
  /** Site header (typically `<SiteHeader />`). */
  header: ReactNode;
  /** Page content (rendered in the flex-grown body slot). */
  children: ReactNode;
  /** Site footer (typically `<SiteFooter />`). */
  footer: ReactNode;
};

/**
 * Outer chrome layout for every page: full-height flex column with header,
 * grown body slot, and footer. The Next app composes this with `SkipToMain`,
 * `SiteHeader`, and `SiteFooter` from this same package.
 */
export function SiteShell({ skipLink, header, children, footer }: SiteShellProps) {
  return (
    <div className={styles.page}>
      {skipLink}
      {header}
      <div className={styles.bodySlot}>{children}</div>
      {footer}
    </div>
  );
}
