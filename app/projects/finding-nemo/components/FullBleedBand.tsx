import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";

import { FULL_BLEED_BAND_PADDINGS, PROJECT_CONTENT_CONTAINER_SX } from "@/app/projects/finding-nemo/layoutConfig";
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
            py: FULL_BLEED_BAND_PADDINGS.y.mobile,
            [breakpointMediaQuery.tabletUp]: {
              py: FULL_BLEED_BAND_PADDINGS.y.tablet,
            },
            [breakpointMediaQuery.desktopUp]: {
              py: FULL_BLEED_BAND_PADDINGS.y.desktop,
            },
          },
          ...(sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        {children}
      </Container>
    </Box>
  );
}
