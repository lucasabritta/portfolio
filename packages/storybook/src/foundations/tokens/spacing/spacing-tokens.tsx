import type { CSSProperties } from "react";

import { TokenSection } from "../../shared/token-section";
import styles from "./spacing-tokens.module.css";

export type SpacingToken = {
  name: string;
  cssVar: string;
  value: string;
  role: string;
};

const SPACING_PRIMITIVE_TOKENS = [
  { name: "0.5", cssVar: "--space-0-5", value: "4px", role: "Micro spacing" },
  { name: "1", cssVar: "--space-1", value: "8px", role: "Tight control spacing" },
  { name: "1.5", cssVar: "--space-1-5", value: "12px", role: "Dense inline grouping" },
  { name: "2", cssVar: "--space-2", value: "16px", role: "Default block spacing" },
  { name: "3", cssVar: "--space-3", value: "24px", role: "Card rhythm" },
  { name: "4", cssVar: "--space-4", value: "32px", role: "Section spacing (compact)" },
  { name: "7", cssVar: "--space-7", value: "56px", role: "Section spacing (mobile)" },
  { name: "10", cssVar: "--space-10", value: "80px", role: "Section spacing (desktop)" },
] as const satisfies readonly SpacingToken[];

const SPACING_ELEMENT_TOKENS = [
  {
    name: "none",
    cssVar: "--space-element-none",
    value: "0px",
    role: "Reset spacing",
  },
  {
    name: "xs",
    cssVar: "--space-element-xs",
    value: "4px",
    role: "Fine gaps and offsets",
  },
  {
    name: "sm",
    cssVar: "--space-element-sm",
    value: "8px",
    role: "Tight inline spacing",
  },
  {
    name: "2sm",
    cssVar: "--space-element-2sm",
    value: "12px",
    role: "Compact content clusters",
  },
  {
    name: "md",
    cssVar: "--space-element-md",
    value: "16px",
    role: "Default spacing unit",
  },
  {
    name: "lg",
    cssVar: "--space-element-lg",
    value: "24px",
    role: "Card and section rhythm",
  },
  {
    name: "xl",
    cssVar: "--space-element-xl",
    value: "32px",
    role: "Large split layout gaps",
  },
  {
    name: "2xl",
    cssVar: "--space-element-2xl",
    value: "40px",
    role: "Hero-level spacing",
  },
  {
    name: "3xl",
    cssVar: "--space-element-3xl",
    value: "48px",
    role: "Large vertical rhythm",
  },
] as const satisfies readonly SpacingToken[];

const RADIUS_TOKENS = [
  { name: "sm", cssVar: "--radius-sm", value: "8px", role: "Small controls" },
  { name: "md", cssVar: "--radius-md", value: "12px", role: "Cards and chips" },
  { name: "lg", cssVar: "--radius-lg", value: "16px", role: "Section surfaces" },
  { name: "xl", cssVar: "--radius-xl", value: "24px", role: "Hero surfaces" },
  { name: "full", cssVar: "--radius-full", value: "9999px", role: "Pill and circular UI" },
] as const satisfies readonly SpacingToken[];

const GAP_TOKENS = [
  { name: "xs", cssVar: "--gap-xs", value: "4px", role: "Tight cluster gaps" },
  { name: "sm", cssVar: "--gap-sm", value: "8px", role: "Inline control gaps" },
  { name: "md", cssVar: "--gap-md", value: "16px", role: "Default list/card gaps" },
  { name: "lg", cssVar: "--gap-lg", value: "24px", role: "Section block gaps" },
  { name: "xl", cssVar: "--gap-xl", value: "32px", role: "Large layout gaps" },
] as const satisfies readonly SpacingToken[];

const SPACE_COLUMN_TOKENS = [
  { name: "sm", cssVar: "--space-column-sm", value: "8px", role: "Dense multi-column spacing" },
  {
    name: "md",
    cssVar: "--space-column-md",
    value: "16px",
    role: "Default column separation",
  },
  {
    name: "lg",
    cssVar: "--space-column-lg",
    value: "24px",
    role: "Comfortable column separation",
  },
  {
    name: "xl",
    cssVar: "--space-column-xl",
    value: "32px",
    role: "Large split-column layouts",
  },
] as const satisfies readonly SpacingToken[];

function SpacingTokenList({
  tokens,
  label,
}: {
  tokens: readonly SpacingToken[];
  label: string;
}) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{label}</h3>
      <ul className={styles.spacingList}>
        {tokens.map((token) => (
          <li key={token.cssVar} className={styles.spacingRow}>
            <code className={styles.tokenName}>{token.name}</code>
            <span className={styles.spacingTrack}>
              <span
                className={styles.spacingBar}
                style={{ width: `var(${token.cssVar})` } as CSSProperties}
              />
            </span>
            <span className={styles.tokenRole}>{token.role}</span>
            <code className={styles.tokenValue}>
              {token.cssVar} ({token.value})
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SpacingTokens() {
  return (
    <TokenSection
      title="Spacing"
      description="Spacing and radius tokens mirror the runtime CSS custom properties in globals.css and follow a primitive-plus-semantic token model."
    >
      <SpacingTokenList tokens={SPACING_PRIMITIVE_TOKENS} label="Spacing primitives" />
      <SpacingTokenList tokens={SPACING_ELEMENT_TOKENS} label="Element spacing tokens" />
      <SpacingTokenList tokens={GAP_TOKENS} label="Gap tokens" />
      <SpacingTokenList tokens={SPACE_COLUMN_TOKENS} label="Space-column tokens" />
      <SpacingTokenList tokens={RADIUS_TOKENS} label="Radius tokens" />
    </TokenSection>
  );
}
