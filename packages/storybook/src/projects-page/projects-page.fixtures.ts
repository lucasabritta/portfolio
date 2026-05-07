import type { ProjectsPageViewProps } from "./presentation-types";

/** Storybook-only sample data (no `@portfolio/resume-content`). */
export function projectsPageViewFixture(): ProjectsPageViewProps {
  return {
    introTitle: "Projects",
    introLead:
      "Selected work: a flagship game built with heavy AI assistance, plus curated GitHub repositories.",
    flagship: {
      title: "Echoes of the missing cat",
      eyebrow: "Flagship",
      role: "Creator · game direction, Godot implementation, Android delivery, and agent workflow design",
      stack: ["Godot 4", "Android", "Google Play", "Docker", "GitHub Actions", "AI agents"],
      pitch:
        "A short top-down Android adventure with touch controls, 13 maps, simple puzzles, light backtracking, bilingual text, and a final cat reunion shaped by family playtesting.",
      hardestProblem:
        "Keeping many AI-assisted sessions aligned required more than better prompts: Docker-first tooling, scoped tickets, validation scripts, ownership boundaries, and release checks made the work repeatable.",
      outcomes: [
        "Published on Google Play after turning a playable prototype into a store-ready Android release.",
        "Replaced broad prompts with scoped tickets carrying dependencies and acceptance criteria.",
        "Added checks for map topology, flags, assets, docs, logs, ownership, and Android artifacts.",
        "Split gameplay into smaller systems so parallel agents had clearer boundaries.",
      ],
      aiPipelineNote:
        "The project showed that agents respect failing checks more than intentions. The useful work was the structure left behind: tickets, lint rules, Docker wrappers, validation scripts, and release automation.",
      imageSrc: null,
      imageAlt: "Echoes of the missing cat key art placeholder",
      links: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
          variant: "primary",
        },
        {
          label: "Medium article",
          href: "https://medium.com/@lucasabritta_93729/what-i-learned-building-an-android-game-with-ai-agents-5f64d23024fe",
          variant: "secondary",
        },
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
