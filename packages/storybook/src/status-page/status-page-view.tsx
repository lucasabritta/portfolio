import type { SiteShellLinkComponent } from "../site-chrome/site-link-component";
import styles from "./status-page-view.module.css";

export type StatusPageAction =
  | { kind: "button"; label: string; onClick: () => void }
  | { kind: "link"; label: string; href: string; external?: boolean };

export type StatusPageViewProps = {
  /** Visible heading. For the loading variant this renders inside a live region. */
  heading: string;
  /** Secondary descriptive text under the heading. */
  body: string;
  /** Optional calls to action. Omit for pure loading/status messaging. */
  actions?: StatusPageAction[];
  /**
   * When set, the heading/body pair is wrapped in a live region with the given
   * politeness. Use `"polite"` for App Router `loading.tsx` so screen readers
   * announce the state change.
   */
  live?: "polite" | "assertive";
  /**
   * Internal link renderer (typically Next.js `Link`). External links always
   * stay plain `<a>`. Buttons never use this.
   */
  linkComponent?: SiteShellLinkComponent;
  /** DOM id for the `<main>` landmark. Defaults to `"main"` for skip-link parity. */
  mainId?: string;
};

export function StatusPageView({
  heading,
  body,
  actions,
  live,
  linkComponent: LinkComponent,
  mainId = "main",
}: StatusPageViewProps) {
  const NavLink = LinkComponent ?? "a";
  const HeadingTag = live ? "p" : "h1";
  const copy = (
    <>
      <HeadingTag className={styles.heading}>{heading}</HeadingTag>
      <p className={styles.body}>{body}</p>
    </>
  );

  return (
    <main id={mainId} tabIndex={-1} className={styles.status}>
      {live ? (
        <div role="status" aria-live={live}>
          {copy}
        </div>
      ) : (
        copy
      )}
      {actions && actions.length > 0 ? (
        <div className={styles.actions}>
          {actions.map((action) => {
            if (action.kind === "button") {
              return (
                <button
                  key={action.label}
                  type="button"
                  className={styles.action}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              );
            }
            if (action.external) {
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={styles.action}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {action.label}
                </a>
              );
            }
            return (
              <NavLink key={action.label} href={action.href} className={styles.action}>
                {action.label}
              </NavLink>
            );
          })}
        </div>
      ) : null}
    </main>
  );
}
