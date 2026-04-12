import type { HTMLAttributes, ReactNode } from "react";

import styles from "./section-heading.module.css";

export type SectionHeadingProps = {
  id: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "id">;

export function SectionHeading({ id, children, className, ...rest }: SectionHeadingProps) {
  const classes = [styles.sectionTitle, className].filter(Boolean).join(" ");
  return (
    <h2 id={id} className={classes} {...rest}>
      {children}
    </h2>
  );
}
