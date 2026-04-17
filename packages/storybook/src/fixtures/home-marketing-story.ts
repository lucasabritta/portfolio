import type {
  BuildStorybookTeaserProps,
  CondensedCvPreviewProps,
  CredibilityStripProps,
  FeaturedWorkPreviewProps,
  HomeLeadHeroProps,
} from "../home-marketing/home-marketing-types";
import type { HomePageProps } from "../home/presentation-types";
import type { PresentationPersonalProject } from "../home/presentation-types";

export const SYNTH_HOME_POSITIONING =
  "Jane leads platform-minded teams with a bias for measurable reliability: clear ownership, tight feedback loops, and shipping that stays understandable to the business.";

export const SYNTH_CREDIBILITY_ITEMS: CredibilityStripProps["items"] = [
  {
    title: "Startup growth",
    body: "Comfortable operating from early ambiguity through scale — hiring, delivery cadence, and engineering culture as explicit levers.",
  },
  {
    title: "Platform quality",
    body: "Treats observability, testing, and deployment hygiene as product features, not ticket overhead.",
  },
  {
    title: "Hands-on leadership",
    body: "Stays close enough to architecture and code paths to unblock teams without becoming a bottleneck.",
  },
];

function threeStrings(values: readonly string[]): HomeLeadHeroProps["proofPoints"] {
  const a = values[0] ?? "—";
  const b = values[1] ?? a;
  const c = values[2] ?? b;
  return [a, b, c];
}

function threeRoles(work: HomePageProps["workHistory"]): CondensedCvPreviewProps["entries"] {
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

export function homeLeadHeroFromHomePageProps(props: HomePageProps): HomeLeadHeroProps {
  return {
    name: props.name,
    roleEyebrow: props.role,
    positioningLead: SYNTH_HOME_POSITIONING,
    proofPoints: threeStrings(props.summaryHighlights),
    contactHint: props.location
      ? `${props.location} · Full contact details on the CV PDF`
      : undefined,
    downloadHref: props.downloadHref,
    projectsHref: "/projects",
    storybookHref: "/storybook",
  };
}

export function featuredWorkPreviewFromHomePageProps(
  heading: string,
  projects: readonly PresentationPersonalProject[],
): FeaturedWorkPreviewProps {
  const flagship = projects[0] ?? {
    title: "Featured project",
    description: "Add a flagship project to the home fixture.",
    href: "https://example.com",
  };
  return {
    heading,
    flagship: {
      title: flagship.title,
      description: flagship.description,
      href: flagship.href,
      ctaLabel: flagshipCta(flagship.href),
      external: true,
    },
    supporting: [
      {
        title: "Projects & GitHub",
        description: "Case study layout, pinned repositories, and outbound links.",
        href: "/projects",
        ctaLabel: "View Projects",
      },
      {
        title: "Build story",
        description: "Monorepo, Storybook, CI, and how this site is hosted.",
        href: "/build",
        ctaLabel: "Read build notes",
      },
    ],
  };
}

export const SYNTH_BUILD_TEASER: BuildStorybookTeaserProps = {
  heading: "Site & component library",
  lead: "The portfolio runs as a small monorepo: a Next.js app, a Storybook package for shared UI, résumé data shared with the PDF CV, and GitHub Actions for split CI.",
  buildHref: "/build",
  storybookHref: "/storybook",
};

export function condensedCvPreviewFromHomePageProps(props: HomePageProps): CondensedCvPreviewProps {
  return {
    heading: "Recent roles",
    entries: threeRoles(props.workHistory),
    resumeAnchorId: "resume",
    continueLabel: "Continue to full résumé",
  };
}
