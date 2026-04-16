/**
 * Marketing copy for `/build` (engineering narrative; not `@portfolio/resume-content`).
 */
export const buildPageContent = {
  title: "How this site is built",
  lead: "A small multi-package repo with a clear split between the Next.js app, shared DOM UI, résumé data, and automated checks — so the site stays fast to change without turning into a monolith.",
  sections: [
    {
      id: "architecture",
      heading: "Architecture",
      body: "The frontend lives in apps/frontend (App Router). Shared browser components and global styles ship from packages/storybook as @portfolio/storybook. Structured résumé data and types come from packages/resume-content. That boundary keeps Storybook presentation-only while the app composes real data into props.",
    },
    {
      id: "storybook",
      heading: "UI system and Storybook",
      body: "Storybook runs as its own workspace with Vite, a11y and docs addons, and Vitest-driven story tests. A static build is emitted under public/storybook with base path /storybook/ so Next can serve the bundle at /storybook alongside the marketing site.",
    },
    {
      id: "quality",
      heading: "Quality checks and CI",
      body: "GitHub Actions split lint, typecheck, unit tests, Storybook checks, and Playwright smoke tests across the packages they touch. Local parity prefers Docker Compose so Node and Playwright match what CI and Vercel expect.",
    },
    {
      id: "deploy",
      heading: "Deployment",
      body: "Production targets Vercel with a standalone Next.js output. Environment-specific configuration stays in the dashboard rather than hardcoding domains in source.",
    },
  ],
} as const;
