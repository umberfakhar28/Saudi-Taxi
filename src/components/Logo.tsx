/**
 * Gulf Trip Service brand mark.
 * Icon: a location pin rising out of Gulf waves — trip (pin) + gulf (waves).
 * viewBox is 0 0 100 100 throughout so the mark stays crisp from favicon (16–32px) to hero (300px+).
 */

import {
  BRAND_GOLD,
  BRAND_IVORY,
  BRAND_NAVY,
  PIN_DOT,
  PIN_PATH,
  WAVE_PATHS,
} from "@/lib/brandMark";

export type LogoVariant = "color" | "white";

// Re-exported under the original local names so the rest of this file reads
// unchanged. The geometry now lives in src/lib/brandMark.ts so the invoice
// PNG exporter can draw the identical mark from the same source.
const NAVY = BRAND_NAVY;
const IVORY = BRAND_IVORY;
const GOLD = BRAND_GOLD;

export function LogoMark({
  size = 40,
  variant = "color",
  className,
}: {
  size?: number;
  variant?: LogoVariant;
  className?: string;
}) {
  const isWhite = variant === "white";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Gulf Trip Service"
      className={className}
      style={{ flexShrink: 0, display: "block" }}
    >
      {!isWhite && <rect width="100" height="100" rx="24" fill={NAVY} />}

      {/* Gulf waves rising toward the base — ivory-toned in both variants,
         since the icon always sits on a dark surface (the navy tile itself
         in "color" variant, the page's own navy header/footer in "white"). */}
      {WAVE_PATHS.map((wave) => (
        <path
          key={wave.d}
          d={wave.d}
          fill={IVORY}
          opacity={isWhite ? wave.whiteOpacity : wave.colorOpacity}
        />
      ))}

      {/* Location pin */}
      <path d={PIN_PATH} fill="#FFFFFF" />
      <circle cx={PIN_DOT.cx} cy={PIN_DOT.cy} r={PIN_DOT.r} fill={GOLD} />
    </svg>
  );
}

export default function Logo({
  size = 40,
  variant = "color",
  showWordmark = true,
  className,
}: {
  size?: number;
  variant?: LogoVariant;
  showWordmark?: boolean;
  className?: string;
}) {
  const isWhite = variant === "white";
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: size * 0.22 }}
    >
      <LogoMark size={size} variant={variant} />
      {showWordmark && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: isWhite ? IVORY : NAVY, fontWeight: 800, fontSize: size * 0.5 }}>
            Gulf
          </span>
          {/* Gold, not teal — a static brand wordmark isn't interactive
             text. Only ever rendered in the "white" (on-navy) variant in
             practice, where gold clears contrast comfortably; the unused
             "color" variant keeps the safer navy instead of risking gold
             on an unknown light background. */}
          <span style={{ color: isWhite ? GOLD : NAVY, fontWeight: 700, fontSize: size * 0.5 }}>
            TripService
          </span>
        </span>
      )}
    </span>
  );
}
