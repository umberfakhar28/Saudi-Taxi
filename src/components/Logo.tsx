/**
 * Gulf Trip Service brand mark.
 * Icon: a location pin rising out of Gulf waves — trip (pin) + gulf (waves).
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

      {/* Gulf waves rising toward the base */}
      <path
        d="M-4 66 Q 14 54 32 66 T 68 66 T 104 66 V 104 H -4 Z"
        fill={isWhite ? "#FFFFFF" : BLUE}
        opacity={isWhite ? 0.14 : 0.3}
      />
      <path
        d="M-4 74 Q 14 62 32 74 T 68 74 T 104 74 V 104 H -4 Z"
        fill={isWhite ? "#FFFFFF" : BLUE}
        opacity={isWhite ? 0.24 : 0.48}
      />
      <path
        d="M-4 82 Q 14 70 32 82 T 68 82 T 104 82 V 104 H -4 Z"
        fill={isWhite ? "#FFFFFF" : BLUE}
        opacity={isWhite ? 0.4 : 0.75}
      />

      {/* Location pin */}
      <path
        d="M50 24 C 60.5 24 69 32.5 69 43 C 69 56 50 74 50 74 C 50 74 31 56 31 43 C 31 32.5 39.5 24 50 24 Z"
        fill="#FFFFFF"
      />
      <circle cx="50" cy="43" r="7.5" fill={isWhite ? BLUE_LIGHT : BLUE} />
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
