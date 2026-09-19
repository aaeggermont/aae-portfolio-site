import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  CONTENT_CONTAINER_SX,
  SECTION_PADDING_Y,
} from "@/app/projects/spotify-music-groups-session/layoutConfig";

type FullBleedBandProps = {
  backgroundColor: string;
  children: ReactNode;
  /** Optional section landmark id for debugging / QA. */
  dataId?: string;
  sx?: SxProps<Theme>;
};

/**
 * Edge-to-edge background band. Content stays within `CONTENT_CONTAINER_SX`.
 * Page is already `isFullWidth`, so a simple 100% width band is enough.
 */
export default function FullBleedBand({
  backgroundColor,
  children,
  dataId,
  sx,
}: FullBleedBandProps) {
  return (
    <Box
      component="section"
      data-id={dataId}
      sx={
        [
          {
            width: "100%",
            boxSizing: "border-box",
            backgroundColor,
            py: {
              xs: SECTION_PADDING_Y.mobile,
              md: SECTION_PADDING_Y.tablet,
              lg: SECTION_PADDING_Y.desktop,
            },
          },
          ...(sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    >
      <Box sx={CONTENT_CONTAINER_SX}>{children}</Box>
    </Box>
  );
}
