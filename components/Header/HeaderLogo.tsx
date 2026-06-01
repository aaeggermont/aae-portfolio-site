/** Reference SVG on disk — paths below are inlined in this component. */
const HEADER_LOGO_SVG_PATH = "/images/topbar-header/AAE-Logo.svg";

/**
 * Default fills from `AAE-Logo.svg` (update if the source file changes).
 * - `primary` — three main letter paths
 * - `accent` — accent mark + underline bars
 */
export const HEADER_LOGO_DEFAULT_COLORS = {
  primary: "#01496d",
  accent: "#01a4e1",
} as const;

/** `fill-opacity` on accent shapes in `AAE-Logo.svg`. */
const HEADER_LOGO_DEFAULT_ACCENT_FILL_OPACITY = 0.996;

export type HeaderLogoProps = {
  width?: string | number;
  height?: string | number;
  /** Main letterforms — `Header` passes this as `logoFontColor`. */
  primaryColor?: string;
  /** Accent bar and dot — defaults to brand cyan. */
  accentColor?: string;
  /**
   * Alias for `primaryColor` (legacy prop from header call sites).
   * Ignored when `primaryColor` is set.
   */
  color?: string;
  className?: string;
  alt?: string;
};

function parseDim(v: string | number | undefined, fallback: number): number {
  if (v === undefined) return fallback;
  const n = typeof v === "number" ? v : Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Inline brand mark — colors are driven by props (no PNG / Storage fallback).
 * Source artwork: `public/images/topbar-header/AAE-Logo.svg` (`HEADER_LOGO_SVG_PATH`).
 */
export function HeaderLogo({
  width = 100,
  height = 30,
  color,
  primaryColor,
  accentColor = HEADER_LOGO_DEFAULT_COLORS.accent,
  className,
  alt = "Antonio Aranda Eggermont — home",
}: HeaderLogoProps) {
  const maxW = parseDim(width, 100);
  const maxH = parseDim(height, 30);
  const fillPrimary =
    primaryColor || color || HEADER_LOGO_DEFAULT_COLORS.primary;

  return (
    <svg
      className={className}
      role="img"
      aria-label={alt}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 81"
      width={maxW}
      height={maxH}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        width: maxW,
        height: "auto",
        maxWidth: maxW,
        maxHeight: maxH,
        aspectRatio: "200 / 81",
        flexShrink: 0,
      }}
    >
      <path
        fill={fillPrimary}
        d="M 38.33 26.39 L 18.29 62.06 A 4.65 4.65 0.0 0 1 13.36 64.35 L 13.29 64.33 A 2.37 2.36 19.9 0 1 11.65 60.83 Q 19.96 46.24 32.38 24.37 Q 33.44 22.50 35.29 21.29 A 1.93 1.86 -62.3 0 1 36.20 20.99 C 39.77 20.74 42.78 20.44 44.59 23.40 Q 47.09 27.47 65.91 58.24 C 67.13 60.25 63.73 61.13 65.62 63.65 A 0.40 0.40 0.0 0 1 65.30 64.29 Q 62.28 64.28 61.39 62.84 Q 49.60 43.97 39.03 26.38 A 0.41 0.40 -45.4 0 0 38.33 26.39 Z"
      />
      <path
        fill={fillPrimary}
        d="M 68.37 64.30 A 2.38 2.38 0.0 0 1 66.72 60.78 Q 85.61 27.54 88.11 23.36 Q 89.53 20.99 92.54 20.89 C 95.36 20.80 98.13 20.73 99.61 23.15 Q 109.72 39.79 123.00 61.21 A 2.05 2.05 0.0 0 1 121.43 64.33 L 120.91 64.37 A 5.35 5.35 0.0 0 1 115.94 61.83 L 94.23 26.35 A 0.42 0.42 0.0 0 0 93.51 26.36 L 73.33 62.04 A 4.64 4.63 19.8 0 1 68.46 64.32 L 68.37 64.30 Z"
      />
      <path
        fill={fillPrimary}
        d="M 132.09 42.72 C 132.11 48.79 131.60 53.90 137.40 57.33 Q 139.37 58.50 144.28 58.46 Q 156.31 58.37 168.35 58.35 A 2.95 2.95 0.0 0 1 171.31 61.31 L 171.31 61.43 A 2.98 2.97 -90.0 0 1 168.35 64.40 Q 161.34 64.42 140.50 64.45 Q 136.57 64.46 132.85 61.87 Q 126.26 57.29 125.64 49.24 Q 125.63 49.13 125.61 42.74 Q 125.59 36.34 125.60 36.23 Q 126.18 28.18 132.75 23.56 Q 136.45 20.95 140.38 20.94 Q 161.22 20.86 168.23 20.84 A 2.98 2.97 89.7 0 1 171.21 23.79 L 171.21 23.91 A 2.95 2.95 0.0 0 1 168.27 26.89 Q 156.23 26.94 144.19 26.91 Q 139.28 26.90 137.32 28.08 C 131.54 31.54 132.08 36.64 132.09 42.72 Z"
      />
      <path
        fill={accentColor}
        fillOpacity={HEADER_LOGO_DEFAULT_ACCENT_FILL_OPACITY}
        d="M 177.77 45.02 C 181.21 38.77 189.22 43.74 185.78 49.33 A 2.58 2.50 -0.6 0 1 184.97 50.13 Q 180.48 52.87 177.72 47.94 A 0.89 0.89 0.0 0 0 177.02 47.49 C 174.90 47.27 172.19 47.88 169.97 47.00 A 2.34 2.18 76.0 0 1 169.17 46.48 L 167.19 44.50 A 1.48 1.43 -21.7 0 0 166.16 44.08 L 139.32 44.07 A 1.54 1.54 0.0 0 1 137.80 42.28 L 137.83 42.08 A 2.13 2.13 0.0 0 1 139.95 40.18 Q 151.65 40.17 163.50 40.19 Q 165.73 40.19 167.61 41.39 A 0.59 0.43 2.5 0 1 167.76 41.51 L 171.13 45.05 A 1.36 1.35 67.7 0 0 172.10 45.46 L 177.02 45.46 A 0.86 0.84 14.0 0 0 177.77 45.02 Z M 184.67 46.58 A 2.56 2.56 0.0 0 0 182.11 44.02 A 2.56 2.56 0.0 0 0 179.55 46.58 A 2.56 2.56 0.0 0 0 182.11 49.14 A 2.56 2.56 0.0 0 0 184.67 46.58 Z"
      />
      <rect
        fill={accentColor}
        fillOpacity={HEADER_LOGO_DEFAULT_ACCENT_FILL_OPACITY}
        x="29.28"
        y="47.94"
        width="20.90"
        height="3.88"
        rx="1.90"
      />
      <rect
        fill={accentColor}
        fillOpacity={HEADER_LOGO_DEFAULT_ACCENT_FILL_OPACITY}
        x="-10.65"
        y="-1.94"
        width="21.30"
        height="3.88"
        rx="1.89"
        transform="translate(95.22,49.89) rotate(0.1)"
      />
    </svg>
  );
}
