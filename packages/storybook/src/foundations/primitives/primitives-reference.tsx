import { TokenSection } from "../shared/token-section";
import styles from "./primitives-reference.module.css";

type PrimitiveToken = {
  name: string;
  value: string;
  role: string;
};

function PrimitiveList({ tokens }: { tokens: readonly PrimitiveToken[] }) {
  return (
    <ul className={styles.tokenList}>
      {tokens.map((token) => (
        <li key={token.name} className={styles.tokenRow}>
          <code className={styles.tokenName}>{token.name}</code>
          <code className={styles.tokenValue}>{token.value}</code>
          <span className={styles.tokenRole}>{token.role}</span>
        </li>
      ))}
    </ul>
  );
}

export function ColorPrimitives() {
  const tokens: readonly PrimitiveToken[] = [
    { name: "--color-neutral-0", value: "#ffffff", role: "White/inverse text source" },
    { name: "--color-neutral-200", value: "#e5e5e5", role: "Neutral divider tone" },
    { name: "--color-neutral-950", value: "#0a0a0a", role: "Dark text/canvas tone" },
    { name: "--color-blue-600", value: "#2563eb", role: "Primary accent primitive" },
    { name: "--color-blue-700", value: "#1d4ed8", role: "Focus ring primitive" },
    { name: "--color-indigo-950", value: "#172554", role: "Project gradient start" },
    { name: "--color-slate-400", value: "#94a3b8", role: "Project secondary text" },
  ];

  return (
    <TokenSection
      title="Color Primitives"
      description="Primitive color variables that feed semantic tokens and component styles."
    >
      <PrimitiveList tokens={tokens} />
    </TokenSection>
  );
}

export function SpacingPrimitives() {
  const tokens: readonly PrimitiveToken[] = [
    { name: "--space-0-5", value: "0.25rem", role: "Micro spacing" },
    { name: "--space-1", value: "0.5rem", role: "Tight spacing" },
    { name: "--space-2", value: "1rem", role: "Default spacing unit" },
    { name: "--space-3", value: "1.5rem", role: "Comfort spacing" },
    { name: "--space-4", value: "2rem", role: "Section spacing" },
    { name: "--space-10", value: "5rem", role: "Large vertical rhythm" },
  ];

  return (
    <TokenSection
      title="Spacing Primitives"
      description="Raw spacing scale used by semantic spacing, gap, and column tokens."
    >
      <PrimitiveList tokens={tokens} />
    </TokenSection>
  );
}

export function TypographyPrimitives() {
  const tokens: readonly PrimitiveToken[] = [
    { name: "--font-size-sm", value: "0.875rem", role: "Small body text" },
    { name: "--font-size-lg", value: "1.125rem", role: "Large body text" },
    { name: "--font-weight-medium", value: "500", role: "Medium emphasis" },
    { name: "--font-weight-semibold", value: "600", role: "Strong emphasis" },
    { name: "--line-height-reading", value: "1.55", role: "Readable body line-height" },
    { name: "--tracking-wide-2xl", value: "0.08em", role: "Uppercase labels" },
  ];

  return (
    <TokenSection
      title="Typography Primitives"
      description="Primitive typography values for type scale, weights, line-heights, and tracking."
    >
      <PrimitiveList tokens={tokens} />
    </TokenSection>
  );
}

export function LayoutPrimitives() {
  const tokens: readonly PrimitiveToken[] = [
    { name: "--size-layout-container-max", value: "70rem", role: "Raw container width primitive" },
    { name: "--size-layout-content-max", value: "64rem", role: "Raw content width primitive" },
    { name: "--size-layout-scroll-offset", value: "5rem", role: "Raw anchor offset primitive" },
    { name: "--size-control-hit-sm", value: "2.25rem", role: "Raw compact hit target size" },
    { name: "--size-control-hit-md", value: "2.75rem", role: "Raw default hit target size" },
  ];

  return (
    <TokenSection
      title="Layout Primitives"
      description="Primitive size values that semantic layout tokens map into page and interaction roles."
    >
      <PrimitiveList tokens={tokens} />
    </TokenSection>
  );
}

export function BorderPrimitives() {
  const tokens: readonly PrimitiveToken[] = [
    { name: "--border-width-1", value: "1px", role: "Hairline border primitive" },
    { name: "--border-width-2", value: "2px", role: "Strong border primitive" },
    { name: "--border-width-3", value: "3px", role: "Accent border primitive" },
    { name: "--outline-offset-2", value: "2px", role: "Tight focus offset primitive" },
    { name: "--shadow-surface-sm-raw", value: "0 1px 3px rgba(...)", role: "Surface shadow primitive" },
  ];

  return (
    <TokenSection
      title="Border Primitives"
      description="Primitive border widths, offsets, and shadows that feed semantic border and elevation tokens."
    >
      <PrimitiveList tokens={tokens} />
    </TokenSection>
  );
}
