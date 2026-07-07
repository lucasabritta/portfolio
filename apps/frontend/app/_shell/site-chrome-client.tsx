"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import type { SiteChromeStaticProps } from "@/lib/site/site-chrome-props";
import {
  SiteFooter,
  SiteHeader,
  SiteShell,
  SkipToMain,
  ThemeModeSwitch,
} from "@portfolio/storybook/site-chrome";

import type { SiteThemePreference } from "@portfolio/storybook/site-chrome";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { handleThemePreferenceChange } from "@/lib/analytics/theme-tracking";
import { trackEvent } from "@/lib/analytics/track";
import { usePreservedHrefDecorator } from "@/lib/analytics/use-preserve-internal-href";

import { useThemeMode } from "./theme-provider";

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
}: SiteChromeClientProps) {
  const pathname = usePathname() ?? "/";
  const [hash, setHash] = useState("");
  const { preference, setPreference: setThemePreference } = useThemeMode();
  const decorateHref = usePreservedHrefDecorator();

  const navItemsWithParams = navItems.map((item) => ({
    ...item,
    href: decorateHref(item.href),
  }));

  const footerLinksWithParams = footerLinks.map((link) =>
    link.external ? link : { ...link, href: decorateHref(link.href) },
  );

  const setPreference = (value: SiteThemePreference) => {
    handleThemePreferenceChange(preference, value, {
      apply: setThemePreference,
      track: (next) => trackEvent(ANALYTICS_EVENTS.themeChanged, { preference: next }),
    });
  };

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const currentPath = hash && pathname === "/" ? `${pathname}${hash}` : pathname;

  return (
    <SiteShell
      skipLink={<SkipToMain />}
      header={
        <SiteHeader
          wordmarkText={wordmarkText}
          wordmarkHref={decorateHref("/")}
          navItems={navItemsWithParams}
          currentPath={currentPath}
          linkComponent={Link}
          themeControl={
            <span suppressHydrationWarning>
              <ThemeModeSwitch
                value={preference}
                onChange={setPreference}
                idPrefix="desktop-theme"
              />
            </span>
          }
          mobileThemeControl={
            <span suppressHydrationWarning>
              <ThemeModeSwitch
                value={preference}
                onChange={setPreference}
                idPrefix="mobile-theme"
              />
            </span>
          }
        />
      }
      footer={
        <SiteFooter
          name={wordmarkText}
          descriptor={role}
          links={footerLinksWithParams}
          colophon={colophon}
          linkComponent={Link}
        />
      }
    >
      {children}
    </SiteShell>
  );
}
