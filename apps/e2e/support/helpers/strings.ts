export const PAGE_COPY = {
  homeHeroName: "Lucas Abritta",
  projectsHeading: "Projects",
  projectsFlagshipTitle: "Echoes of the missing cat",
  projectsPinnedHeading: "Pinned GitHub repositories",
  projectsHardestHeading: "Hardest problem",
  buildHeading: /Site architecture/i,
  resumeSectionHeading: /education/i,
  storybookShellMarker: /storybook/i,
  colophonMarker: /built with next\.js, storybook, vercel, and cloudflare/i,
} as const;

export const NAV_LINKS = {
  home: { label: "Home", href: "/" },
  projects: { label: "Projects", href: "/projects" },
  build: { label: "Site architecture", href: "/site-architecture" },
} as const;

export const EXTERNAL_URLS = {
  githubProfile: /^https:\/\/github\.com\/lucasabritta\/?$/,
  storybookIndex: "/storybook",
} as const;
