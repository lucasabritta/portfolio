import type { BuildPageCta, BuildPageSection } from "@portfolio/storybook/build-page";

/**
 * Marketing copy for `/site-architecture` (engineering narrative; not `@portfolio/resume-content`).
 *
 * Shape matches the `@portfolio/storybook/build-page` view props so the page
 * stays a thin composition layer.
 */
export const buildPageContent = {
  title: "Site architecture",
  lead: "How I build and maintain this portfolio: a small multi-package repo, shared UI in Storybook, résumé data reused across web and PDF, and deployment through Vercel with Cloudflare in front of the domain.",
  sections: [
    {
      id: "architecture",
      heading: "Architecture",
      body: "The Next.js app lives in apps/frontend. Shared browser components and global styles ship from packages/storybook as @portfolio/storybook. Structured résumé data and types come from packages/resume-content. The app composes the real data into props while Storybook stays presentation-only.",
    },
    {
      id: "storybook",
      heading: "UI system and Storybook",
      body: "Storybook runs as its own workspace with Vite, accessibility/docs addons, and Vitest-driven story tests. A static build is emitted under public/storybook with base path /storybook/ so Next can serve the component library beside the marketing site.",
    },
    {
      id: "quality",
      heading: "Quality checks and CI",
      body: "GitHub Actions split lint, typecheck, unit tests, Storybook checks, and Playwright smoke tests across the packages they touch. Local validation prefers Docker Compose so Node, Yarn, and browser tooling match the CI and deployment environment.",
    },
    {
      id: "deploy",
      heading: "Vercel deployment",
      body: "Production builds target Vercel with standalone Next.js output. Build settings and environment-specific values stay in Vercel configuration instead of being hardcoded into the app.",
    },
    {
      id: "edge",
      heading: "Vercel to Cloudflare",
      body: "Vercel serves the Next.js application, while Cloudflare manages the public DNS and front-door domain path. That keeps application deployment and domain/network controls separate and easier to reason about.",
    },
  ] as const satisfies ReadonlyArray<BuildPageSection>,
  ctas: [
    { label: "Open Storybook", href: "/storybook", variant: "primary", external: true },
    {
      label: "View GitHub repository",
      href: "https://github.com/lucasabritta/portfolio",
      variant: "secondary",
      external: true,
    },
    { label: "View projects", href: "/projects", variant: "secondary" },
  ] as const satisfies ReadonlyArray<BuildPageCta>,
} as const;
