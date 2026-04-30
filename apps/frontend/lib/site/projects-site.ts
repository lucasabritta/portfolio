import { PROJECT_URLS } from "@portfolio/resume-content";
import type { ProjectsPageViewProps } from "@portfolio/storybook/projects-page";

import { siteProfile } from "./site-profile";

const githubBase = siteProfile.githubProfileUrl.replace(/\/$/, "");

/**
 * Curated `/projects` marketing content (not `@portfolio/resume-content`).
 * Pinned repos mirror public repositories on https://github.com/lucasabritta (update if you pin different work).
 */
export const projectsPageContent = {
  introTitle: "Projects",
  introLead:
    "Selected work includes an Android game shipped through a solo, AI-assisted workflow, plus public repositories that show product-minded engineering across this portfolio, backend APIs, and data dashboards.",
  flagship: {
    title: "Echoes of the missing cat",
    eyebrow: "Flagship",
    role: "Creator — game direction, Godot implementation, Android delivery, and release hygiene",
    stack: ["Godot 4", "Android", "Google Play", "PowerShell QA tooling", "AI-assisted workflows"],
    pitch:
      "Echoes of the missing cat is a landscape-only, top-down 2D adventure for Android. Players move through a compact sequence of coastal maps, collect simple items, clear gates, and reunite with the missing cat while the project stays intentionally small enough for one person to own end to end.",
    hardestProblem:
      "The hard part was not adding more mechanics. It was keeping the game predictable across Godot runtime code, map data, Android exports, and store-ready release checks while using AI to move faster without letting generated work decide the product shape.",
    outcomes: [
      "Google Play package identity and release documentation for com.echoes.missingcat, with signed AAB/APK release paths.",
      "A documented progression path across 13 maps, including item gates, controlled backtracking, and a final reunion flow.",
      "Headless QA, Android emulator validation, release-matrix checks, and store-release workflows captured as repeatable scripts.",
    ],
    aiPipelineNote:
      "AI helped accelerate drafts, tooling, and implementation loops, but the shipped behavior stayed human-owned: map progression, release gates, Play policy, and player-facing polish were validated through scripts, docs, and device checks.",
    imageSrc: "/projects/echoes-phone-1.png",
    imageAlt:
      "Echoes of the missing cat Android screenshot showing the phone-framed adventure game interface.",
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
      name: "portfolio",
      summary: "Next.js portfolio, Storybook UI, résumé data, CI, and deployment setup",
      href: `${githubBase}/portfolio`,
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
