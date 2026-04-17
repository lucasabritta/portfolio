import { PROJECT_URLS } from "@portfolio/resume-content";
import type { ProjectsPageViewProps } from "@portfolio/storybook";

import { siteProfile } from "./site-profile";

const githubBase = siteProfile.githubProfileUrl.replace(/\/$/, "");

/**
 * Curated `/projects` marketing content (not `@portfolio/resume-content`).
 * Pinned repos mirror public repositories on https://github.com/lucasabritta (update if you pin different work).
 */
export const projectsPageContent = {
  introTitle: "Projects",
  introLead:
    "Selected work spans a flagship Android title built with heavy AI assistance, plus three public GitHub repositories: a TypeScript user-service demo, a React feature-flag lab, and a Python booking dashboard.",
  flagship: {
    title: "Echoes: Missing Cat",
    eyebrow: "Flagship",
    role: "Creator — product direction, narrative beats, Android delivery, and release hygiene",
    stack: ["Android", "Kotlin", "Google Play", "LLM-assisted workflows", "Narrative & pacing"],
    pitch:
      "Echoes is a compact mystery on the Play Store: players follow audio and visual echoes to track down a missing cat. The project was a deliberate experiment in how far generative tooling can carry a solo-ish pipeline while still shipping something store-quality with clear accountability for player trust.",
    hardestProblem:
      "Keeping narrative cohesion when drafts, dialog, and even placeholder art moved quickly through AI-assisted iterations. The fix was not “more model” but tighter creative gates: human storyboarding, ruthless cutting, and weekly installs on real hardware so performance and UX regressions never stacked invisibly.",
    outcomes: [
      "Live Google Play listing with store graphics, privacy disclosures, and crash reporting wired in.",
      "A repeatable build → review → ship cadence that separated experimental branches from store-bound releases.",
      "Concrete lessons on where LLMs remove toil (copy iteration, asset exploration) versus where they create debt if you skip design ownership.",
    ],
    aiPipelineNote:
      "Generative tools accelerated exploration, but compliance, store policy, and player-visible polish stayed explicitly human-owned. If a line ships in the build, a person decided it belonged there — the models only ever proposed.",
    imageSrc: "/projects/echoes-phone-1.png",
    imageAlt: "Echoes: Missing Cat — Android gameplay screenshot",
    links: [
      {
        label: "Google Play",
        href: PROJECT_URLS.echoesMissingCatPlayStore,
        variant: "primary",
      },
      {
        label: "GitHub profile",
        href: siteProfile.githubProfileUrl,
        variant: "secondary",
      },
    ],
  },
  pinnedReposHeading: "Pinned GitHub repositories",
  pinnedRepos: [
    {
      name: "user-service-skill-demo",
      summary: "User CRUD + optional sort query — backend/API demo",
      href: `${githubBase}/user-service-skill-demo`,
      tags: ["TypeScript"],
    },
    {
      name: "feature-flag-simulator",
      summary: "React feature-flag simulation, state, boundaries",
      href: `${githubBase}/feature-flag-simulator`,
      tags: ["TypeScript"],
    },
    {
      name: "booking-dashboard",
      summary: "Booking APIs, dashboard aggregation, import job, Docker",
      href: `${githubBase}/booking-dashboard`,
      tags: ["Python"],
    },
  ],
} satisfies ProjectsPageViewProps;
