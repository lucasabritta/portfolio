import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

import styles from "./section-heading.module.css";

export type SectionHeadingProps = {
  id: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "id">;

export function SectionHeading({ id, children, className, ...rest }: SectionHeadingProps) {
  return (
    <h2 id={id} className={clsx(styles.sectionTitle, className)} {...rest}>
      {children}
    </h2>
  );
}
