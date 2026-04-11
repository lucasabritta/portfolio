import type { HTMLAttributes, ReactNode } from "react";

import styles from "./hero-type.module.css";

export type HeroRoleProps = { children: ReactNode } & HTMLAttributes<HTMLParagraphElement>;

export function HeroRole({ children, className, ...rest }: HeroRoleProps) {
  const classes = [styles.role, className].filter(Boolean).join(" ");
  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}

export type HeroNameProps = { children: ReactNode } & HTMLAttributes<HTMLHeadingElement>;

export function HeroName({ children, className, ...rest }: HeroNameProps) {
  const classes = [styles.name, className].filter(Boolean).join(" ");
  return (
    <h1 className={classes} {...rest}>
      {children}
    </h1>
  );
}

export type HeroLeadProps = { children: ReactNode } & HTMLAttributes<HTMLParagraphElement>;

export function HeroLead({ children, className, ...rest }: HeroLeadProps) {
  const classes = [styles.lead, className].filter(Boolean).join(" ");
  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}

export type HeroTypeCompositionProps = {
  role: ReactNode;
  name: ReactNode;
  lead: ReactNode;
};

/** Storybook / docs composition — matches the hero typography stack used in `PortfolioHero`. */
export function HeroTypeComposition({ role, name, lead }: HeroTypeCompositionProps) {
  return (
    <div>
      <HeroRole>{role}</HeroRole>
      <HeroName>{name}</HeroName>
      <HeroLead>{lead}</HeroLead>
    </div>
  );
}
