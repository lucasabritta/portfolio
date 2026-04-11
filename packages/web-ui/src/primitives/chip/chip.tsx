import type { HTMLAttributes } from "react";

import styles from "./chip.module.css";

export type ChipProps = HTMLAttributes<HTMLSpanElement>;

export function Chip({ className, ...rest }: ChipProps) {
  const classes = [styles.chip, className].filter(Boolean).join(" ");
  return <span className={classes} {...rest} />;
}
