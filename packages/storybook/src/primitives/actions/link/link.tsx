import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { BrandIcon } from "../../icons/brand-icon";
import type { BrandIconName, BrandIconSize } from "../../icons/brand-icon-types";

import styles from "./link.module.css";

export type ActionLinkVariant = "inlineNeutral" | "inlineAccent" | "accentUnderline";

export type ActionLinkProps = {
  variant: ActionLinkVariant;
  /** Optional brand icon shown before children (decorative). */
  icon?: BrandIconName;
  /** Icon dimensions; default matches dense CTAs. */
  iconSize?: BrandIconSize;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClass: Record<ActionLinkVariant, string> = {
  inlineNeutral: styles.inlineNeutral,
  inlineAccent: styles.inlineAccent,
  accentUnderline: styles.accentUnderline,
};

export function ActionLink({
  variant,
  className,
  icon,
  iconSize,
  children,
  ...rest
}: ActionLinkProps) {
  const content: ReactNode = (
    <>
      {icon ? <BrandIcon name={icon} size={iconSize} /> : null}
      {children}
    </>
  );
  return (
    <a className={clsx(variantClass[variant], icon ? styles.withIcon : null, className)} {...rest}>
      {content}
    </a>
  );
}
