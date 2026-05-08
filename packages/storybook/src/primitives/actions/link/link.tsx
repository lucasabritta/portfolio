import clsx from "clsx";
import type { AnchorHTMLAttributes } from "react";

import styles from "./link.module.css";

export type ActionLinkVariant = "inlineNeutral" | "inlineAccent" | "accentUnderline";

export type ActionLinkProps = {
  variant: ActionLinkVariant;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClass: Record<ActionLinkVariant, string> = {
  inlineNeutral: styles.inlineNeutral,
  inlineAccent: styles.inlineAccent,
  accentUnderline: styles.accentUnderline,
};

export function ActionLink({ variant, className, ...rest }: ActionLinkProps) {
  return <a className={clsx(variantClass[variant], className)} {...rest} />;
}
