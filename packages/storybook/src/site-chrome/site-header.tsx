"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { pathMatchesNav } from "./nav-active-path";
import type { SiteShellLinkComponent } from "./site-link-component";
import styles from "./site-header.module.css";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteHeaderProps = {
  wordmarkText: string;
  wordmarkHref: string;
  navItems: SiteNavItem[];
  themeControl: ReactNode;
  mobileThemeControl: ReactNode;
  currentPath: string;
  /** When set (e.g. Next.js `Link`), internal navigation uses this component. */
  linkComponent?: SiteShellLinkComponent;
};

function MenuIcon() {
  return (
    <svg
      aria-hidden
      focusable={false}
      height={20}
      width={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      focusable={false}
      height={20}
      width={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function SiteHeader({
  wordmarkText,
  wordmarkHref,
  navItems,
  themeControl,
  mobileThemeControl,
  currentPath,
  linkComponent: LinkComponent,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuTitleId = `${menuId}-title`;
  const NavLink = LinkComponent ?? "a";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        queueMicrotask(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(
        mobilePanelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      );
      if (focusable.length === 0) {
        event.preventDefault();
        mobilePanelRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    const inertTargets = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    document.body.style.overflow = "hidden";
    inertTargets.forEach((target) => target.setAttribute("inert", ""));
    const firstLink = mobilePanelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    queueMicrotask(() => firstLink?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((target) => target.removeAttribute("inert"));
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <NavLink href={wordmarkHref} className={styles.wordmark}>
            {wordmarkText}
          </NavLink>
          <nav className={styles.desktopNav} aria-label="Primary">
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const active = pathMatchesNav(currentPath, item.href);
                return (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      className={active ? styles.navLinkActive : styles.navLink}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className={styles.right}>
          <div className={styles.desktopThemeSlot}>{themeControl}</div>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <>
          <div
            className={styles.mobileBackdrop}
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={mobilePanelRef}
            className={styles.mobilePanel}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={menuTitleId}
            tabIndex={-1}
          >
            <h2 id={menuTitleId} className={styles.mobileDialogTitle}>
              Navigation
            </h2>
            <nav aria-label="Primary mobile">
              <ul className={styles.mobileNavList}>
                {navItems.map((item) => {
                  const active = pathMatchesNav(currentPath, item.href);
                  return (
                    <li key={`m-${item.href}`}>
                      <NavLink
                        href={item.href}
                        className={active ? styles.mobileNavLinkActive : styles.mobileNavLink}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className={styles.mobileThemeSlot}>
              <p className={styles.mobileThemeLabel}>Theme</p>
              {mobileThemeControl}
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
