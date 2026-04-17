import clsx from "clsx";
import { createElement, type HTMLAttributes, type ReactNode } from "react";

import styles from "./title.module.css";

export type TitleLevel = 2 | 3 | 4 | 5 | 6;
export type TitleSize = "sm" | "md" | "lg";

export type TitleProps = {
  level: TitleLevel;
  size: TitleSize;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "children">;

const HEADING_TAG = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const satisfies Record<TitleLevel, "h2" | "h3" | "h4" | "h5" | "h6">;

const sizeClass: Record<TitleSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Title({ level, size, children, className, ...rest }: TitleProps) {
  const tag = HEADING_TAG[level];
  return createElement(tag, { className: clsx(sizeClass[size], className), ...rest }, children);
}
