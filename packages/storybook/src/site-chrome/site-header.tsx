"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { ActionLink } from "../primitives";

import { pathMatchesNav } from "./nav-active-path";
import type { SiteShellLinkComponent } from "./site-link-component";
import styles from "./site-header.module.css";

export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteHeaderProps = {
  wordmarkText: string;
  wordmarkHref: string;
  navItems: SiteNavItem[];
  downloadCvHref: string;
  themeControl: ReactNode;
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
  downloadCvHref,
  themeControl,
  currentPath,
  linkComponent: LinkComponent,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
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
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const firstLink = mobilePanelRef.current?.querySelector<HTMLElement>("a[href]");
    queueMicrotask(() => firstLink?.focus());
    return () => document.removeEventListener("keydown", onKeyDown);
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
          <ActionLink variant="primary" href={downloadCvHref} className={styles.download}>
            Download CV
          </ActionLink>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? menuId : undefined}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div ref={mobilePanelRef} className={styles.mobilePanel} id={menuId}>
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
            {themeControl}
          </div>
        </div>
      ) : null}
    </header>
  );
}
