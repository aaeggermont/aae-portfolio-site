"use client";

import Box from "@mui/material/Box";
import GatedImage from "@/lib/media/GatedImage";
import { breakpointPx } from "@/lib/responsive/breakpoints";

const PROJECT_KEY = "project_4";
const OBJECT_PATH = "projects/project_4/SeaterVideoRecording-Desktop.gif";

/** Preview figure max width per band (px) — aligns to `breakpointPx` ranges. */
const PREVIEW_MAX_WIDTH_MOBILE_PX = 440;
const PREVIEW_MAX_WIDTH_TABLET_PX = 800;
const PREVIEW_MAX_WIDTH_DESKTOP_PX = 1034;

/**
 * GatedImage `mode`:
 * - `fill` — Next/Image `fill`; needs a sized parent (`aspectRatio` + `position: relative` here).
 * - `intrinsic` — pass `width` + `height` (px); image keeps that layout box.
 *
 * Demo uses `objectFit: "contain"` so the whole GIF stays visible inside the frame (`cover` would crop).
 */
export default function PreviewDemo() {
  return (
    <Box
      component="figure"
      sx={{
        position: "relative",
        margin: 0,
        width: "100%",
        maxWidth: PREVIEW_MAX_WIDTH_MOBILE_PX,
        [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
          maxWidth: PREVIEW_MAX_WIDTH_TABLET_PX,
        },
        [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
          maxWidth: PREVIEW_MAX_WIDTH_DESKTOP_PX,
        },
        aspectRatio: "16 / 9",
        maxHeight: "min(70vh, 900px)",
        mx: "auto",
        overflow: "hidden",
        bgcolor: "rgba(255, 255, 255, 0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GatedImage
        priority
        mode="fill"
        projectKey={PROJECT_KEY}
        objectPath={OBJECT_PATH}
        alt="Automatic seater demo recording"
        sizes={`(max-width: ${breakpointPx.mobileMax}px) ${PREVIEW_MAX_WIDTH_MOBILE_PX}px, (max-width: ${breakpointPx.tabletMax}px) ${PREVIEW_MAX_WIDTH_TABLET_PX}px, ${PREVIEW_MAX_WIDTH_DESKTOP_PX}px`}
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
