/**
 * Visual sizing knobs for the capability map chart.
 *
 * The chart area is a 1:1 square. Its size is `min(available width, maxChartSize)`.
 * Lower `maxChartSize` to shrink the block and reduce empty space around the map.
 */
export const CAPABILITY_MAP_SIZE = {
  /**
   * Hard cap on the square chart width/height (px).
   * Example: 800 → viz block is at most 800×800.
   */
  maxChartSize: 780,
  /** Max width for the section (header/footer copy); chart is capped separately. */
  sectionMaxWidth: 1100,
} as const;

export function getCapabilityMapSizeStyles(): {
  sectionMaxWidth: number;
  chartMaxSize: number;
} {
  const { maxChartSize, sectionMaxWidth } = CAPABILITY_MAP_SIZE;

  return {
    sectionMaxWidth,
    chartMaxSize: maxChartSize,
  };
}
