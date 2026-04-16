import type { ProjectsPageViewProps } from "./presentation-types";

/** Storybook-only sample data (no `@portfolio/resume-content`). */
export function projectsPageViewFixture(): ProjectsPageViewProps {
  return {
    introTitle: "Projects",
    introLead: "Selected work: a flagship game built with heavy AI assistance, plus curated GitHub repositories.",
    flagship: {
      title: "Echoes: Missing Cat",
      eyebrow: "Flagship",
      role: "Creator · product, narrative, and Android delivery",
      stack: ["Android", "Kotlin", "Play Console", "LLM-assisted workflows", "Narrative design"],
      pitch:
        "A short mystery adventure on Android where players follow echoes to find a missing cat. The goal was to ship a polished store listing with real art direction while keeping the build pipeline honest about where AI helped versus where craft still mattered.",
      hardestProblem:
        "Keeping tone and pacing consistent when large parts of content and tooling were AI-generated — without treating the model as an infallible co-author. The team had to establish review gates, cut scope aggressively, and validate builds on real devices early.",
      outcomes: [
        "Shipped to Google Play with store-ready listing, screenshots, and crash reporting.",
        "Established a repeatable pipeline from idea → playable build with clear human review checkpoints.",
        "Learned where generative tools save weeks, and where they silently create rework if you skip design discipline.",
      ],
      aiPipelineNote:
        "AI was used heavily for ideation, drafts, and asset iteration, but release engineering, store policy compliance, and player-facing quality bars stayed manual and accountable. That split is intentional: the stack is a lever, not the story.",
      imageSrc: null,
      imageAlt: "Echoes: Missing Cat key art placeholder",
      links: [
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.echoes.missingcat", variant: "primary" },
        { label: "Example GitHub", href: "https://github.com/example/echoes-missing-cat", variant: "secondary" },
      ],
    },
    pinnedReposHeading: "Curated GitHub",
    pinnedRepos: [
      {
        name: "example/portfolio",
        summary: "Illustrative repo card for Storybook — replace with your real monorepo link.",
        href: "https://github.com/example/portfolio",
        tags: ["Next.js", "TypeScript", "Storybook"],
      },
      {
        name: "example/tooling",
        summary: "Second illustrative card for layout testing.",
        href: "https://github.com/example/tooling",
        tags: ["Docker", "CI"],
      },
      {
        name: "example/notes",
        summary: "Third illustrative card for responsive grid behavior.",
        href: "https://github.com/example/notes",
        tags: ["Markdown"],
      },
    ],
  };
}
