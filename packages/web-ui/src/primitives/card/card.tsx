import { createElement, type ComponentPropsWithoutRef, type ReactNode } from "react";

import styles from "./card.module.css";

export type CardRadius = "md" | "lg";
export type CardPadding = "compact" | "comfortable";

type CardTag = "div" | "article" | "li";

type CommonCardProps = {
  elevated?: boolean;
  radius: CardRadius;
  padding: CardPadding;
  children?: ReactNode;
};

export type CardProps =
  | ({ as?: "div" } & CommonCardProps & Omit<ComponentPropsWithoutRef<"div">, "as">)
  | ({ as: "article" } & CommonCardProps & Omit<ComponentPropsWithoutRef<"article">, "as">)
  | ({ as: "li" } & CommonCardProps & Omit<ComponentPropsWithoutRef<"li">, "as">);

export function Card(props: CardProps) {
  const {
    as: tag = "div",
    elevated = false,
    radius,
    padding,
    className,
    children,
    ...rest
  } = props;

  const classes = [
    styles.card,
    radius === "md" ? styles.radiusMd : styles.radiusLg,
    padding === "compact" ? styles.paddingCompact : styles.paddingComfortable,
    elevated ? styles.elevated : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(tag as CardTag, { className: classes, ...rest }, children);
}
