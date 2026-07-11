/**
 * Gulf Trip Service brand mark.
 * Icon: a route line arcing over stylized causeway waves (King Fahd Causeway motif).
 * viewBox is 0 0 100 100 throughout so the mark stays crisp from favicon (16–32px) to hero (300px+).
 */

export type LogoVariant = "color" | "white";

const NAVY = "#10121A";
const BLUE = "#2454E8";
const BLUE_LIGHT = "#4A72F5";

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

      {/* Causeway / gulf waves */}
      <path
        d="M-2 68 Q 15 56 32 68 T 66 68 T 100 68 V 102 H -2 Z"
        fill={isWhite ? "#FFFFFF" : BLUE}
        opacity={isWhite ? 0.22 : 0.28}
      />
      <path
        d="M-2 78 Q 15 66 32 78 T 66 78 T 100 78 V 102 H -2 Z"
        fill={isWhite ? "#FFFFFF" : BLUE}
        opacity={isWhite ? 0.45 : 0.6}
      />

      {/* Route line curving over the causeway */}
      <path
        d="M18 68 C 26 34, 46 20, 58 20 C 70 20, 80 30, 84 48"
        stroke="#FFFFFF"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <circle cx="18" cy="68" r="5.5" fill="#FFFFFF" />
      <circle
        cx="84"
        cy="48"
        r="6.5"
        fill="none"
        stroke={isWhite ? "#FFFFFF" : BLUE_LIGHT}
        strokeWidth={3.4}
      />
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
          <span style={{ color: isWhite ? "#FFFFFF" : NAVY, fontWeight: 800, fontSize: size * 0.5 }}>
            Gulf
          </span>
          <span style={{ color: isWhite ? BLUE_LIGHT : BLUE, fontWeight: 700, fontSize: size * 0.5 }}>
            TripService
          </span>
        </span>
      )}
    </span>
  );
}
