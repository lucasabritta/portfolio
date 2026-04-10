import { PortfolioHero } from "@/components/portfolio-hero";

const projectPlaceholders = [
  {
    title: "Project one",
    description: "Short impact statement — problem, approach, and outcome.",
  },
  {
    title: "Project two",
    description: "Another concise summary readers can scan in a few seconds.",
  },
  {
    title: "Project three",
    description: "Replace these cards with real work and links when ready.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:shadow-md"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-full max-w-3xl flex-col px-6 pb-16 pt-6 md:px-8">
        <PortfolioHero
          name="Your name"
          role="Engineer · builder · learner"
          summary="I design and ship reliable web experiences. This site is a small, fast landing page you can extend with projects, writing, and contact details."
        />

        <main id="main" className="flex flex-1 flex-col gap-16 py-16">
          <section aria-labelledby="about-heading">
            <h2
              id="about-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              About
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground">
              Add a paragraph about your background, what you care about, and the kinds of problems
              you like to solve. Keep it friendly and specific — readers decide quickly whether to
              stay.
            </p>
          </section>

          <section aria-labelledby="projects-heading">
            <h2
              id="projects-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Selected work
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-1">
              {projectPlaceholders.map((project) => (
                <li key={project.title}>
                  <article className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Contact
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Reach out via email or add links to GitHub, LinkedIn, or other profiles you use.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Email
              </a>
              <a
                href="https://github.com"
                className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </section>
        </main>

        <footer className="mt-auto border-t border-border pt-8 font-mono text-xs text-muted">
          <p>© {new Date().getFullYear()} — Built with Next.js</p>
        </footer>
      </div>
    </div>
  );
}
