import type { ContactLink } from "@/lib/cv-data";

type PortfolioHeroProps = {
  name: string;
  role: string;
  summary: string;
  location: string;
  phone: string;
  email: string;
  links: readonly ContactLink[];
  downloadHref: string;
};

export function PortfolioHero({
  name,
  role,
  summary,
  location,
  phone,
  email,
  links,
  downloadHref,
}: PortfolioHeroProps) {
  return (
    <header className="border-b border-border pb-12 pt-8 md:pt-16">
      <p className="font-mono text-sm text-muted">{role}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{summary}</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <span>{location}</span>
        <a className="transition-colors hover:text-foreground" href={`tel:${phone.replace(/\s+/g, "")}`}>
          {phone}
        </a>
        <a className="transition-colors hover:text-foreground" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={downloadHref}
          className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Download CV
        </a>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
