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
    role: "Creator — game direction, Godot implementation, Android delivery, release hygiene, and agent workflow design",
    stack: ["Godot 4", "Android", "Google Play", "Docker", "GitHub Actions", "AI agents"],
    pitch:
      "Echoes of the missing cat is a landscape-only, top-down 2D Android adventure built in Godot 4. The shipped game has touch controls, 13 maps, simple puzzles, light backtracking, English and Brazilian Portuguese text, and a final cat reunion shaped by family playtesting.",
    hardestProblem:
      "The real challenge was not prompting an agent to make a game. It was creating enough structure for many AI-assisted sessions to stay aligned: Docker-first tooling, small tickets, map and flag validation, ownership boundaries, and release checks that agents could not accidentally bypass.",
    outcomes: [
      "Published on Google Play with signed AAB/APK paths, artifact verification, native-symbol checks, 16 KB page-size validation, and Android 15 warning follow-up.",
      "Turned broad prompts into 247 scoped tickets with dependencies, acceptance criteria, files to touch, and validation expectations.",
      "Added guardrails for map exits, return-side continuity, spawn cells, topology uniqueness, flags, docs, assets, logging, ownership, and Android release artifacts.",
      "Split monolithic gameplay code into smaller systems for input, movement, interactions, abilities, flute behavior, map data, and biome-owned content so parallel agents had fewer collision points.",
    ],
    aiPipelineNote:
      "The Medium write-up captures the biggest lesson from the project: agents move fastest when the project has boring structure around them. Tickets, lint rules, Docker wrappers, validation scripts, and release automation mattered more than clever one-off prompts.",
    imageSrc: "/projects/echoes-phone-1-768.webp",
    imageAvifSrcSet:
      "/projects/echoes-phone-1-480.avif 480w, /projects/echoes-phone-1-768.avif 768w, /projects/echoes-phone-1-1080.avif 1080w",
    imageWebpSrcSet:
      "/projects/echoes-phone-1-480.webp 480w, /projects/echoes-phone-1-768.webp 768w, /projects/echoes-phone-1-1080.webp 1080w",
    imageSizes: "(min-width: 1024px) 52vw, calc(100vw - 5rem)",
    imageWidth: 768,
    imageHeight: 346,
    imageAlt:
      "Echoes of the missing cat Android screenshot showing the phone-framed adventure game interface.",
    links: [
      {
        label: "Google Play",
        href: PROJECT_URLS.echoesMissingCatPlayStore,
        variant: "primary",
      },
      {
        label: "Medium article",
        href: PROJECT_URLS.echoesMissingCatMediumArticle,
        variant: "secondary",
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
