/**
 * Shared expected strings and URLs for the E2E suite. Centralized here so a
 * copy change only touches one file and so specs read like contracts.
 *
 * Keep values in sync with:
 *  - `packages/resume-content/src/cv-filename.ts` — `CV_FILENAME_PATTERN`
 *  - `packages/resume-content/src/profile.ts` — GitHub URL
 *  - `apps/frontend/lib/build-site.ts` / `apps/frontend/lib/home-site.ts`
 */

/**
 * Body of the filename shape served by `/api/cv`. Playwright's Node loader
 * cannot strip types from TS sources under `node_modules`, so we mirror the
 * canonical `CV_FILENAME_PATTERN` defined in
 * `packages/resume-content/src/cv-filename.ts` — do not edit without updating
 * that file and the frontend contract test at
 * `apps/frontend/lib/cv-pdf/cv-pdf.response.test.ts`.
 */
export const CV_FILENAME_BODY = "[A-Za-z0-9_]+_CV\\.pdf";
export const CV_FILENAME_PATTERN = new RegExp(`^${CV_FILENAME_BODY}$`);
export const CONTENT_DISPOSITION_FILENAME = new RegExp(
  `filename="(${CV_FILENAME_BODY})"`,
);

/** Copy that identifies landmark pages when checking HTML responses or DOM. */
export const PAGE_COPY = {
  homeHeroName: "Lucas Abritta",
  projectsHeading: "Projects",
  projectsFlagshipTitle: "Echoes: Missing Cat",
  projectsPinnedHeading: "Pinned GitHub repositories",
  projectsHardestHeading: "Hardest problem",
  buildHeading: /How this site is built/i,
  resumeSectionHeading: /professional summary/i,
  storybookShellMarker: /storybook/i,
  colophonMarker: /built with next\.js, storybook, and vercel/i,
} as const;

/** Primary-nav href mapping assertions share across specs. */
export const NAV_LINKS = {
  home: { label: "Home", href: "/" },
  projects: { label: "Projects", href: "/projects" },
  build: { label: "Build", href: "/build" },
  cv: { label: "CV", href: "/#resume" },
} as const;

/** Outbound/internal URLs the chrome links to. */
export const EXTERNAL_URLS = {
  githubProfile: /^https:\/\/github\.com\/lucasabritta\/?$/,
  cvApi: "/api/cv",
  storybookIndex: "/storybook",
} as const;
