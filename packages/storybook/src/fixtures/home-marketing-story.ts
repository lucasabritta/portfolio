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
    metric: "0 → scale",
    body: "Comfortable operating from early ambiguity through scale — hiring, delivery cadence, and engineering culture as explicit levers.",
  },
  {
    title: "Platform quality",
    metric: "Reliability",
    body: "Treats observability, testing, and deployment hygiene as product features, not ticket overhead.",
  },
  {
    title: "Hands-on leadership",
    metric: "Teams + code",
    body: "Stays close enough to architecture and code paths to unblock teams without becoming a bottleneck.",
  },
];

function threeRoles(work: HomePageProps["workHistory"]): CondensedCvPreviewProps["entries"] {
  return work.map((entry) => ({
    company: entry.company,
    role: entry.role,
    period: entry.period,
  }));
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
    contactHint: props.location ? `${props.location} · ` : undefined,
    contactHintLabel: props.location ? "contacts" : undefined,
    contactHintHref: props.location ? "#contact-heading" : undefined,
    projectsHref: "/projects",
    githubHref: "https://github.com/example",
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
        title: "How I build this website",
        description: "Site structure, shared UI, release checks, and hosting path.",
        href: "/site-architecture",
        ctaLabel: "Read site architecture",
      },
    ],
  };
}

export const SYNTH_BUILD_TEASER: BuildStorybookTeaserProps = {
  heading: "Site & component library",
  lead: "The portfolio runs as a small monorepo: a Next.js app, a Storybook package for shared UI, résumé data for site content, and GitHub Actions for split CI.",
  buildHref: "/site-architecture",
  storybookHref: "/storybook",
};

export function condensedCvPreviewFromHomePageProps(props: HomePageProps): CondensedCvPreviewProps {
  return {
    heading: "Work history",
    entries: threeRoles(props.workHistory),
    resumeAnchorId: "resume",
  };
}
