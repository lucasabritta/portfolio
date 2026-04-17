import type {
  BuildStorybookTeaserProps,
  CondensedCvPreviewProps,
  CredibilityStripProps,
  FeaturedWorkPreviewProps,
  HomeLeadHeroProps,
} from "@portfolio/storybook";

import type { ResumeData } from "@portfolio/resume-content";

/** Anchor for the in-page full résumé block (header CV link uses `/#resume`). */
export const HOME_RESUME_ANCHOR_ID = "resume";

const HOME_POSITIONING_LEAD =
  "Lucas leads engineering through rapid startup growth with a bias for clear ownership: platform reliability and delivery speed that show up in revenue and retention—not only in sprint charts—and teams that scale without losing accountability for quality.";

const CREDIBILITY_ITEMS = [
  {
    title: "Startup → scale",
    body: "Comfortable from seed ambiguity through Series B: hiring, delivery cadence, and engineering culture as explicit levers alongside the product roadmap.",
  },
  {
    title: "Platform & delivery",
    body: "Treats observability, testing, CI/CD, and incident practice as product features—so releases stay boring and regressions do not stack invisibly.",
  },
  {
    title: "Hands-on leadership",
    body: "Stays close enough to architecture and code paths to unblock teams without becoming a bottleneck; invests in managers and IC growth with structured feedback.",
  },
] as const satisfies CredibilityStripProps["items"];

const BUILD_TEASER: BuildStorybookTeaserProps = {
  heading: "Site & component library",
  lead: "This portfolio is a small monorepo: a Next.js app, a Storybook package for shared UI, résumé data reused by the PDF CV, Docker for local parity, and GitHub Actions split by package so changes stay reviewable.",
  buildHref: "/build",
  storybookHref: "/storybook",
};

function threeProofPoints(highlights: readonly string[]): HomeLeadHeroProps["proofPoints"] {
  const a = highlights[0] ?? "—";
  const b = highlights[1] ?? a;
  const c = highlights[2] ?? b;
  return [a, b, c];
}

function threeCondensedEntries(
  work: ResumeData["workHistory"],
): CondensedCvPreviewProps["entries"] {
  const pick = (i: number) => ({
    company: work[i]?.company ?? "—",
    role: work[i]?.role ?? "—",
    period: work[i]?.period ?? "—",
  });
  return [pick(0), pick(1), pick(2)];
}

function flagshipCta(href: string): string {
  if (href.includes("play.google.com")) return "Google Play";
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
        title: "Build story",
        description: "Monorepo layout, Storybook, CI, Docker, and hosting choices.",
        href: "/build",
        ctaLabel: "Read build notes",
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
  const contactHint = resume.location
    ? `${resume.location} · Phone, email, and LinkedIn are on the CV PDF and below`
    : undefined;

  return {
    homeLeadHero: {
      name: resume.name,
      roleEyebrow: resume.role,
      positioningLead: HOME_POSITIONING_LEAD,
      proofPoints: threeProofPoints(resume.summaryHighlights),
      contactHint,
      downloadHref: "/api/cv",
      projectsHref: "/projects",
      storybookHref: "/storybook",
      headshotSrc: "/headshot-lucas.png",
      headshotAlt: `Portrait of ${resume.name}`,
    },
    credibilityStrip: {
      id: "how-i-work",
      items: CREDIBILITY_ITEMS,
    },
    featuredWork: featuredWorkFromResume(resume),
    buildTeaser: BUILD_TEASER,
    condensedCv: {
      heading: "Recent roles",
      entries: threeCondensedEntries(resume.workHistory),
      resumeAnchorId: HOME_RESUME_ANCHOR_ID,
      continueLabel: "Continue to full résumé",
    },
  };
}
