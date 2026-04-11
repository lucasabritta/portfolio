import type { AnchorHTMLAttributes } from "react";

import styles from "./action-link.module.css";

export type ActionLinkVariant =
  | "primary"
  | "secondary"
  | "inlineNeutral"
  | "inlineAccent"
  | "accentUnderline";

export type ActionLinkProps = {
  variant: ActionLinkVariant;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClass: Record<ActionLinkVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  inlineNeutral: styles.inlineNeutral,
  inlineAccent: styles.inlineAccent,
  accentUnderline: styles.accentUnderline,
};

export function ActionLink({ variant, className, ...rest }: ActionLinkProps) {
  const classes = [variantClass[variant], className].filter(Boolean).join(" ");
  return <a className={classes} {...rest} />;
}
