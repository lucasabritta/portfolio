import type {
  BuildStorybookTeaserProps,
  CondensedCvPreviewProps,
  CredibilityStripProps,
  FeaturedWorkPreviewProps,
  HomeLeadHeroProps,
} from "@portfolio/storybook/home-marketing";

import { GOOGLE_PLAY_HOST, type ResumeData } from "@portfolio/resume-content";

import { siteProfile } from "./site-profile";

/** Anchor for the in-page résumé details block. */
export const HOME_RESUME_ANCHOR_ID = "resume";

type ContactHintText = string & {
  prefix?: string;
  label?: string;
  href?: string;
};

const HOME_POSITIONING_LEAD =
  "I lead engineering through rapid startup growth with a bias for clear ownership: reliable platforms and faster delivery that show up in revenue, retention, and teams that scale without losing accountability for quality.";

const CREDIBILITY_ITEMS = [
  {
    title: "Startup → scale",
    metric: "Seed → Series B",
    body: "Comfortable from seed ambiguity through Series B: hiring, delivery cadence, and engineering culture as explicit levers alongside the product roadmap.",
  },
  {
    title: "Calm launches",
    metric: "Less drama",
    body: "Builds the habits that let teams ship with confidence: clear ownership, steady follow-through, and problems surfaced early enough to fix before customers feel them.",
  },
  {
    title: "Hands-on leadership",
    metric: "Managers + ICs",
    body: "Stays close enough to architecture and code paths to unblock teams without becoming a bottleneck; invests in managers and IC growth with structured feedback.",
  },
] as const satisfies CredibilityStripProps["items"];

const BUILD_TEASER: BuildStorybookTeaserProps = {
  heading: "Site & component library",
  lead: "This portfolio is a small monorepo: a Next.js app, a Storybook package for shared UI, résumé data for site content, Docker for local parity, and GitHub Actions split by package so changes stay reviewable.",
  buildHref: "/site-architecture",
  storybookHref: "/storybook",
};

function condensedEntries(work: ResumeData["workHistory"]): CondensedCvPreviewProps["entries"] {
  return work.map((entry) => ({
    company: entry.company,
    role: entry.role,
    period: entry.period,
  }));
}

function flagshipCta(href: string): string {
  if (href === "/projects") return "View Projects";
  if (href.includes(GOOGLE_PLAY_HOST)) return "Google Play";
  return "Open";
}

function isHttpOrHttpsUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function featuredWorkFromResume(resume: ResumeData): FeaturedWorkPreviewProps {
  const flagship = resume.personalProjects[0] ?? {
    title: "Projects",
    description: "See selected work and pinned repositories.",
    href: "/projects",
  };
  const flagshipExternal = isHttpOrHttpsUrl(flagship.href);
  return {
    heading: "Featured work",
    flagship: {
      title: flagship.title,
      description: flagship.description,
      href: flagship.href,
      ctaLabel: flagshipCta(flagship.href),
      external: flagshipExternal ? true : undefined,
    },
    supporting: [
      {
        title: "Projects & GitHub",
        description: "Flagship game case study, pinned repos, and outbound links.",
        href: "/projects",
        ctaLabel: "View Projects",
      },
      {
        title: "How I build this website",
        description:
          "A practical look at the site structure, shared UI, release checks, and hosting path.",
        href: "/site-architecture",
        ctaLabel: "Read site architecture",
      },
    ] as const satisfies FeaturedWorkPreviewProps["supporting"],
  };
}

export type HomeMarketingBlocks = {
  homeLeadHero: HomeLeadHeroProps;
  credibilityStrip: CredibilityStripProps;
  featuredWork: FeaturedWorkPreviewProps;
  buildTeaser: BuildStorybookTeaserProps;
  condensedCv: CondensedCvPreviewProps;
};

/**
 * Curated home marketing blocks for `/` (person-first hero, teasers, condensed résumé).
 * Presentation lives in `@portfolio/storybook`; strings here are site-only unless mirrored from résumé fields.
 */
export function buildHomeMarketing(resume: ResumeData): HomeMarketingBlocks {
  const contactHint = resume.location ? (`${resume.location} · ` as ContactHintText) : undefined;

  return {
    homeLeadHero: {
      name: resume.name,
      roleEyebrow: resume.role,
      positioningLead: HOME_POSITIONING_LEAD,
      contactHint,
      contactHintLabel: contactHint ? "contacts" : undefined,
      contactHintHref: contactHint ? "#contact-heading" : undefined,
      projectsHref: "/projects",
      githubHref: siteProfile.githubProfileUrl,
      headshotSrc: "/headshot-lucas-192.webp",
      headshotAvifSrcSet:
        "/headshot-lucas-96.avif 96w, /headshot-lucas-192.avif 192w, /headshot-lucas-256.avif 256w",
      headshotWebpSrcSet:
        "/headshot-lucas-96.webp 96w, /headshot-lucas-192.webp 192w, /headshot-lucas-256.webp 256w",
      headshotSizes: "(min-width: 768px) 96px, 80px",
      headshotAlt: `Portrait of ${resume.name}`,
    },
    credibilityStrip: {
      id: "how-i-work",
      items: CREDIBILITY_ITEMS,
    },
    featuredWork: featuredWorkFromResume(resume),
    buildTeaser: BUILD_TEASER,
    condensedCv: {
      heading: "Work history",
      entries: condensedEntries(resume.workHistory),
      resumeAnchorId: HOME_RESUME_ANCHOR_ID,
    },
  };
}
