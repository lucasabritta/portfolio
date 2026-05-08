import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { BrandIcon } from "../../icons/brand-icon";
import type { BrandIconName } from "../../icons/brand-icon-types";

import styles from "./link.module.css";

export type ActionLinkVariant =
  | "inlineNeutral"
  | "inlineAccent"
  | "accentUnderline"
  | "accentChip";

export type ActionLinkProps = {
  variant: ActionLinkVariant;
  /** Optional brand icon shown before children (decorative). */
  icon?: BrandIconName;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClass: Record<ActionLinkVariant, string> = {
  inlineNeutral: styles.inlineNeutral,
  inlineAccent: styles.inlineAccent,
  accentUnderline: styles.accentUnderline,
  accentChip: styles.accentChip,
};

export function ActionLink({ variant, className, icon, children, ...rest }: ActionLinkProps) {
  const content: ReactNode = (
    <>
      {icon ? <BrandIcon name={icon} /> : null}
      {children}
    </>
  );
  return (
    <a className={clsx(variantClass[variant], icon ? styles.withIcon : null, className)} {...rest}>
      {content}
    </a>
  );
}
