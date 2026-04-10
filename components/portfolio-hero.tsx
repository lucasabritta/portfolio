"use client";

type PortfolioHeroProps = {
  name: string;
  role: string;
  summary: string;
};

export function PortfolioHero({ name, role, summary }: PortfolioHeroProps) {
  return (
    <header className="border-b border-border pb-12 pt-8 md:pt-16">
      <p className="font-mono text-sm text-muted">{role}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{summary}</p>
    </header>
  );
}
