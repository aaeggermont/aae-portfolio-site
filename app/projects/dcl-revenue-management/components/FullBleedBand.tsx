import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  FULL_BLEED_BAND_PADDINGS,
  layoutContentContainerSx,
} from "@/app/projects/dcl-revenue-management/layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

type FullBleedBandProps = {
  backgroundColor?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  /** When false, vertical band padding from `FULL_BLEED_BAND_PADDINGS` is omitted. */
  withVerticalPadding?: boolean;
  /**
   * When true (default), children are wrapped in a `Container` using `LAYOUT_DIMENSIONS`.
   * Set false when each child applies `layoutContentContainerSx` itself.
   */
  constrainContent?: boolean;
};

/**
 * Edge-to-edge background band; children stay within `LAYOUT_DIMENSIONS`.
 */
export default function FullBleedBand({
  backgroundColor,
  children,
  sx,
  withVerticalPadding = true,
  constrainContent = true,
}: FullBleedBandProps) {
  return (
    <Box
      component="section"
      sx={
        [
          {
            position: "relative",
            width: "100vw",
            maxWidth: "none",
            ml: "calc(50% - 50vw)",
            mr: "calc(50% - 50vw)",
            overflowX: "hidden",
            boxSizing: "border-box",
            ...(backgroundColor ? { bgcolor: backgroundColor } : {}),
            ...(withVerticalPadding
              ? {
                  py: FULL_BLEED_BAND_PADDINGS.y.mobile,
                  [breakpointMediaQuery.tabletUp]: {
                    py: FULL_BLEED_BAND_PADDINGS.y.tablet,
                  },
                  [breakpointMediaQuery.desktopUp]: {
                    py: FULL_BLEED_BAND_PADDINGS.y.desktop,
                  },
                }
              : {}),
          },
          ...(sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    >
      {constrainContent ? (
        <Container maxWidth={false} sx={layoutContentContainerSx}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Box>
  );
}
