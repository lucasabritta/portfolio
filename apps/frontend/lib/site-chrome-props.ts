import { resumeData } from "@portfolio/resume-content";

import type { SiteFooterLink, SiteNavItem } from "@portfolio/storybook";

import { siteProfile } from "./site-profile";

export type SiteChromeStaticProps = {
  wordmarkText: string;
  role: string;
  navItems: SiteNavItem[];
  footerLinks: SiteFooterLink[];
  colophon: string;
  downloadCvHref: string;
};

export function buildSiteChromeProps(): SiteChromeStaticProps {
  return {
    wordmarkText: resumeData.name,
    role: resumeData.role,
    navItems: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Build", href: "/build" },
      { label: "CV", href: "/#resume" },
    ],
    footerLinks: [
      { label: "GitHub", href: siteProfile.githubProfileUrl, external: true },
      { label: "LinkedIn", href: resumeData.linkedin, external: true },
      { label: "Component library (Storybook)", href: "/storybook", external: true },
      { label: "How this site is built", href: "/build" },
      { label: "Résumé PDF", href: "/api/cv" },
    ],
    colophon: "Built with Next.js, Storybook, and Vercel.",
    downloadCvHref: "/api/cv",
  };
}
