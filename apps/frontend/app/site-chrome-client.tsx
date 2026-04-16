"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import type { SiteChromeStaticProps } from "@/lib/site-chrome-props";
import {
  SiteFooter,
  SiteHeader,
  SkipToMain,
  ThemeModeSwitch,
} from "@portfolio/storybook";

import { useThemeMode } from "./theme-provider";
import styles from "./site-chrome-client.module.css";

export type SiteChromeClientProps = SiteChromeStaticProps & {
  children: ReactNode;
};

export function SiteChromeClient({
  children,
  wordmarkText,
  role,
  navItems,
  footerLinks,
  colophon,
  downloadCvHref,
}: SiteChromeClientProps) {
  const pathname = usePathname() ?? "/";
  const { preference, setPreference } = useThemeMode();

  return (
    <div className={styles.page}>
      <SkipToMain />
      <SiteHeader
        wordmarkText={wordmarkText}
        wordmarkHref="/"
        navItems={navItems}
        downloadCvHref={downloadCvHref}
        currentPath={pathname}
        linkComponent={Link}
        themeControl={
          <span suppressHydrationWarning>
            <ThemeModeSwitch value={preference} onChange={setPreference} />
          </span>
        }
      />
      <div className={styles.bodySlot}>{children}</div>
      <SiteFooter
        name={wordmarkText}
        descriptor={role}
        links={footerLinks}
        colophon={colophon}
        linkComponent={Link}
      />
    </div>
  );
}
