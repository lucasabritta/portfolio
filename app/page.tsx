import { PortfolioHero } from "@/components/portfolio-hero";
import { cvData } from "@/lib/cv-data";

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
          name={cvData.name}
          role={cvData.role}
          summary={cvData.summary}
          location={cvData.location}
          phone={cvData.phone}
          email={cvData.email}
          links={cvData.contactLinks}
          downloadHref="/api/cv"
        />

        <main id="main" className="flex flex-1 flex-col gap-16 py-16">
          <section aria-labelledby="summary-heading">
            <h2
              id="summary-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Professional summary
            </h2>
            <ul className="mt-6 space-y-3 text-foreground">
              {cvData.summaryHighlights.map((item) => (
                <li key={item} className="rounded-xl border border-border bg-card p-5 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {cvData.techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section aria-labelledby="experience-heading">
            <h2
              id="experience-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Work history
            </h2>
            <div className="mt-6 space-y-6">
              {cvData.workHistory.map((entry) => (
                <article key={`${entry.company}-${entry.role}`} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {entry.company} / {entry.role}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{entry.location}</p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wide text-muted">
                      {entry.period}
                    </p>
                  </div>
                  <p className="mt-4 leading-relaxed text-foreground">{entry.summary}</p>
                  {entry.achievements.length > 0 ? (
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                      {entry.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3">
                          <span className="mt-1 text-accent" aria-hidden="true">
                            *
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Education
            </h2>
            <div className="mt-6 grid gap-4">
              {cvData.education.map((entry) => (
                <article key={entry.institution} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{entry.institution}</h3>
                      <p className="text-sm text-muted">{entry.location}</p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wide text-muted">{entry.date}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{entry.degree}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="certifications-heading">
            <h2
              id="certifications-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Certifications
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {cvData.certifications.map((certification) => (
                <li key={certification}>
                  <article className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-base font-semibold text-foreground">{certification}</h3>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="projects-heading">
            <h2
              id="projects-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Personal projects
            </h2>
            <div className="mt-6 grid gap-4">
              {cvData.personalProjects.map((project) => (
                <article key={project.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                  <a
                    href={project.href}
                    className="mt-4 inline-flex text-sm font-medium text-accent hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View project
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="font-mono text-sm font-medium uppercase tracking-wider text-muted"
            >
              Contact
            </h2>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <p className="text-sm text-muted">Based in {cvData.location}</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-foreground">
                <a className="hover:text-accent" href={`tel:${cvData.phone.replace(/\s+/g, "")}`}>
                  {cvData.phone}
                </a>
                <a className="hover:text-accent" href={`mailto:${cvData.email}`}>
                  {cvData.email}
                </a>
                <a
                  className="hover:text-accent"
                  href={cvData.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {cvData.linkedin}
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-auto border-t border-border pt-8 font-mono text-xs text-muted">
          <p>
            {cvData.name} - {cvData.role}
          </p>
        </footer>
      </div>
    </div>
  );
}
