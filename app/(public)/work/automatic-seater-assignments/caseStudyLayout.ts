import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Shared horizontal rhythm for case-study sections on this route.
 * Keep in sync: outer gutter + inner container padding.
 */
export const CASE_STUDY_CONTAINER_MAX_WIDTH = "lg" as const;

/** Outer section: full width + symmetric horizontal inset (theme spacing). */
export const caseStudySectionGutterSx: SxProps<Theme> = {
  width: "100%",
  px: { xs: 4, md: 10 },
};

/** Inner `Container` horizontal padding — applied on top of `caseStudySectionGutterSx`. */
export const caseStudyContainerSx: SxProps<Theme> = {
  px: { xs: 2, sm: 3 },
};
