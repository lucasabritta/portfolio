import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

export type ActionButtonVariant = "primary" | "secondary";

type ActionButtonAsAnchor = {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ActionButtonAsButton = {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ActionButtonProps = { variant: ActionButtonVariant } & (
  | ActionButtonAsAnchor
  | ActionButtonAsButton
);

const variantClass: Record<ActionButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export function ActionButton({ variant, className, href, ...rest }: ActionButtonProps) {
  const cls = clsx(variantClass[variant], className);
  if (href !== undefined) {
    return (
      <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />
  );
}
