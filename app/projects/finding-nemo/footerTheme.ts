import type { ProjectFooterTheme } from "@/components/Footer/FooterState";

import { BAND_COLORS } from "@/app/projects/finding-nemo/layoutConfig";

/**
 * Footer blends into the final full-bleed band
 * (Expected Impact + Reflections & Key Learnings).
 */
export const FINDING_NEMO_FOOTER_THEME: ProjectFooterTheme = {
  isDark: false,
  backgroundColor: BAND_COLORS.expectedImpactAndReflections,
};
