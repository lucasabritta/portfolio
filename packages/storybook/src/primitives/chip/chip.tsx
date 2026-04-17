import clsx from "clsx";
import type { HTMLAttributes } from "react";

import styles from "./chip.module.css";

export type ChipProps = HTMLAttributes<HTMLSpanElement>;

export function Chip({ className, ...rest }: ChipProps) {
  return <span className={clsx(styles.chip, className)} {...rest} />;
}
