import { Box, Stack, Typography } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";
import {
  PANEL_BLOCK_PADDINGS,
  LAYOUT_DIMENSIONS,
  cssLengthToPx,
  getUsableLayoutWidth,
} from "../layoutConfig";
import { breakpointMediaQuery, breakpointPx } from "@/lib/responsive/breakpoints";

interface ArAsNarrativeProps {
  title: string;
  /* Optional + defaulted in the component because Firestore data is loosely typed and the
     field may not be present on every document. */
  paragraphs?: string[];
  imageSrc: string;
  alt: string;
}

/* Intrinsic size for `next/image` — matches design ratio (454×319) so layout reserves
   the correct aspect; CSS controls responsive display width. */
const AR_NARRATIVE_IMAGE_INTRINSIC_WIDTH = 454;
const AR_NARRATIVE_IMAGE_INTRINSIC_HEIGHT = 319;

/** Max rendered width when stacked (tablet). Keeps proportion ≈400×281 at same ratio. */
const AR_NARRATIVE_IMAGE_MAX_WIDTH_TABLET_PX = 400;
/** Design-spec desktop display width. Height follows aspect (319/454 of width). */
const AR_NARRATIVE_IMAGE_MAX_WIDTH_DESKTOP_PX = 454;

const AR_NARRATIVE_DESKTOP_STACK_GAP_PX = 64;
const AR_NARRATIVE_DESKTOP_COLUMN_MAX_WIDTH = `${
  (getUsableLayoutWidth("desktop") - AR_NARRATIVE_DESKTOP_STACK_GAP_PX) / 2
}px`;
const AR_NARRATIVE_IMAGE_SIZES = [
  `(max-width: ${breakpointPx.mobileMax}px) calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.mobile.margin) * 2
  }px)`,
  `(max-width: ${breakpointPx.tabletMax}px) min(calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.tablet.margin) * 2
  }px), ${AR_NARRATIVE_IMAGE_MAX_WIDTH_TABLET_PX}px)`,
  `${AR_NARRATIVE_IMAGE_MAX_WIDTH_DESKTOP_PX}px`,
].join(", ");

/* Row layout at desktop — bands from `lib/responsive/breakpoints.ts`. */
const DESKTOP_BREAKPOINT_MQ = breakpointMediaQuery.desktopUp;

/* Tablet-only: stacked image; same band as `breakpointMediaQuery.tabletOnly`. */
const TABLET_STACKED_MQ = breakpointMediaQuery.tabletOnly;

const ArAsNarrative = ({
  title,
  paragraphs = [],
  imageSrc,
  alt,
}: ArAsNarrativeProps) => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#f4f5f6",
        borderRadius: { xs: 4, md: "30px" },
        overflow: "hidden",
        px: PANEL_BLOCK_PADDINGS.x.mobile,
        py: PANEL_BLOCK_PADDINGS.y.mobile,
        [TABLET_STACKED_MQ]: {
          px: PANEL_BLOCK_PADDINGS.x.tablet,
          py: PANEL_BLOCK_PADDINGS.y.tablet,
        },
        [DESKTOP_BREAKPOINT_MQ]: {
          px: PANEL_BLOCK_PADDINGS.x.desktop,
          py: PANEL_BLOCK_PADDINGS.y.desktop,
        },
        width: "100%",
      }}
    >
      <Stack
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
          [DESKTOP_BREAKPOINT_MQ]: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          },
        }}
      >
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            maxWidth: "100%",
            [DESKTOP_BREAKPOINT_MQ]: {
              maxWidth: AR_NARRATIVE_DESKTOP_COLUMN_MAX_WIDTH,
            },
          }}
        >
          {paragraphs.map((paragraph, idx) => (
            <Typography
              key={idx}
              component="p"
              sx={{
                color: "#002464",
                fontFamily:
                  'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                fontWeight: 500,
                fontSize: { xs: "1.5rem", sm: "1.2rem", md: "1.5rem" },
                lineHeight: 1.35,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Stack>
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: "100%",
            /* Stacked layouts: center image when narrower than the content width (tablet cap). */
            alignSelf: "center",
            [TABLET_STACKED_MQ]: {
              maxWidth: AR_NARRATIVE_IMAGE_MAX_WIDTH_TABLET_PX,
              width: `min(100%, ${AR_NARRATIVE_IMAGE_MAX_WIDTH_TABLET_PX}px)`,
            },
            [DESKTOP_BREAKPOINT_MQ]: {
              maxWidth: AR_NARRATIVE_IMAGE_MAX_WIDTH_DESKTOP_PX,
              width: "100%",
              alignSelf: "auto",
            },
          }}
        >
          <ProjectImage
            objectPath={imageSrc}
            alt={alt}
            width={AR_NARRATIVE_IMAGE_INTRINSIC_WIDTH}
            height={AR_NARRATIVE_IMAGE_INTRINSIC_HEIGHT}
            borderRadius="24px"
            sizes={AR_NARRATIVE_IMAGE_SIZES}
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ArAsNarrative;