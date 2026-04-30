export const CV_FILENAME_BODY = "[A-Za-z0-9_]+_CV\\.pdf";
export const CV_FILENAME_PATTERN = new RegExp(`^${CV_FILENAME_BODY}$`);
export const CONTENT_DISPOSITION_FILENAME = new RegExp(`filename="(${CV_FILENAME_BODY})"`);

export const PAGE_COPY = {
  homeHeroName: "Lucas Abritta",
  projectsHeading: "Projects",
  projectsFlagshipTitle: "Echoes of the missing cat",
  projectsPinnedHeading: "Pinned GitHub repositories",
  projectsHardestHeading: "Hardest problem",
  buildHeading: /Site architecture/i,
  resumeSectionHeading: /professional summary/i,
  storybookShellMarker: /storybook/i,
  colophonMarker: /built with next\.js, storybook, vercel, and cloudflare/i,
} as const;

export const NAV_LINKS = {
  home: { label: "Home", href: "/" },
  projects: { label: "Projects", href: "/projects" },
  build: { label: "Site architecture", href: "/site-architecture" },
  cv: { label: "CV", href: "/#resume" },
} as const;

export const EXTERNAL_URLS = {
  githubProfile: /^https:\/\/github\.com\/lucasabritta\/?$/,
  cvApi: "/api/cv",
  storybookIndex: "/storybook",
} as const;
