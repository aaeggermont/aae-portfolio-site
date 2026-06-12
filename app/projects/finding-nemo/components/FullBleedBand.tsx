import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";

import { LAYOUT_DIMENSIONS, PANEL_BLOCK_PADDINGS } from "@/app/projects/finding-nemo/layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

type FullBleedBandProps = {
  backgroundColor: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
};

/**
 * Edge-to-edge background band; children stay within `LAYOUT_DIMENSIONS`.
 * Breakout matches AR Story Teller / automatic-seater full-bleed pattern.
 */
export default function FullBleedBand({
  backgroundColor,
  children,
  sx,
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
            bgcolor: backgroundColor,
            py: {
              xs: PANEL_BLOCK_PADDINGS.y.mobile,
              md: PANEL_BLOCK_PADDINGS.y.tablet,
              lg: PANEL_BLOCK_PADDINGS.y.desktop,
            },
          },
          ...(sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: LAYOUT_DIMENSIONS.mobile.maxWidth,
            md: LAYOUT_DIMENSIONS.tablet.maxWidth,
            lg: LAYOUT_DIMENSIONS.desktop.maxWidth,
          },
          px: LAYOUT_DIMENSIONS.mobile.margin,
          [breakpointMediaQuery.tabletUp]: {
            px: LAYOUT_DIMENSIONS.tablet.margin,
          },
          [breakpointMediaQuery.desktopUp]: {
            px: LAYOUT_DIMENSIONS.desktop.margin,
          },
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
