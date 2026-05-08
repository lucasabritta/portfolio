import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { BrandIcon } from "../../icons/brand-icon";
import type { BrandIconName, BrandIconSize } from "../../icons/brand-icon-types";

import styles from "./button.module.css";

export type ActionButtonVariant = "primary" | "secondary";

type ActionButtonAsAnchor = {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ActionButtonAsButton = {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ActionButtonProps = {
  variant: ActionButtonVariant;
  /** Optional brand icon shown before label text (decorative). */
  icon?: BrandIconName;
  /** Icon dimensions; default matches dense CTAs. */
  iconSize?: BrandIconSize;
} & (ActionButtonAsAnchor | ActionButtonAsButton);

const variantClass: Record<ActionButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export function ActionButton({
  variant,
  className,
  href,
  icon,
  iconSize,
  children,
  ...rest
}: ActionButtonProps) {
  const cls = clsx(variantClass[variant], icon ? styles.withIcon : null, className);
  const content: ReactNode = (
    <>
      {icon ? <BrandIcon name={icon} size={iconSize} /> : null}
      {children}
    </>
  );
  if (href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorRest} href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
