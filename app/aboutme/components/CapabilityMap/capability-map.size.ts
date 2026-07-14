/**
 * Visual sizing knobs for the capability map chart.
 * Adjust `scale` to grow/shrink the whole viz (1 = baseline).
 */
export const CAPABILITY_MAP_SIZE = {
  /** Overall viz scale. 1.15 ≈ 15% larger than the baseline. */
  scale: 2.50,
  /** Baseline section max width before scale (px). */
  baseMaxWidth: 1100,
  /** Baseline chart wrap height cap before scale (px). */
  baseChartHeight: 984,
  /** Baseline min height before scale (px). */
  baseMinHeight: 504,
  /** Mobile/fluid height factor before scale (vw). */
  baseHeightVw: 138,
} as const;

export function getCapabilityMapSizeStyles(): {
  maxWidth: number;
  height: string;
  minHeight: number;
} {
  const { scale, baseMaxWidth, baseChartHeight, baseMinHeight, baseHeightVw } =
    CAPABILITY_MAP_SIZE;

  return {
    maxWidth: Math.round(baseMaxWidth * scale),
    height: `min(${baseHeightVw * scale}vw, ${Math.round(baseChartHeight * scale)}px)`,
    minHeight: Math.round(baseMinHeight * scale),
  };
}
