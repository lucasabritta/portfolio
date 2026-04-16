/** Site `/projects` presentation shapes only — no `@portfolio/resume-content` imports. */

export type PresentationProjectLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "accentUnderline";
};

export type PresentationFlagshipProject = {
  title: string;
  eyebrow: string;
  role: string;
  stack: readonly string[];
  pitch: string;
  hardestProblem: string;
  outcomes: readonly string[];
  aiPipelineNote: string;
  /** Public URL (e.g. `/projects/art.svg`). `null` uses the built-in gradient frame only. */
  imageSrc: string | null;
  imageAlt: string;
  links: readonly PresentationProjectLink[];
};

export type PresentationPinnedRepo = {
  name: string;
  summary: string;
  href: string;
  tags: readonly string[];
};

export type ProjectsPageViewProps = {
  introTitle: string;
  introLead: string;
  flagship: PresentationFlagshipProject;
  pinnedReposHeading: string;
  pinnedRepos: readonly PresentationPinnedRepo[];
};
