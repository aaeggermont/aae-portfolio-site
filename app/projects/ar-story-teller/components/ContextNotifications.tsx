"use client";

import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";
import { getUsableLayoutWidth, getPanelInnerWidthPx, PANEL_BLOCK_PADDINGS, LAYOUT_DIMENSIONS, cssLengthToPx } from "../layoutConfig";
import { breakpointMediaQuery, breakpointPx } from "@/lib/responsive/breakpoints";
import { bodyTypeSx } from "../typography";

/* The card caps at the project's desktop usable width (`1260 − 2 × 80 = 1100px`) and
   centers in any viewport wider than that. Inside `.project-content` the parent already
   constrains it on desktop, so this `maxWidth` is mostly defensive — it keeps the
   component looking right if it's ever rendered outside the page wrapper. */
const CONTEXT_NOTIFICATIONS_MAX_WIDTH = getUsableLayoutWidth("desktop");
const CONTEXT_NOTIFICATIONS_DESKTOP_STACK_GAP_PX = 64;
/** Desktop row split: text ~40%, image ~60% (text column ~20% narrower than 50/50). */
const CONTEXT_NOTIFICATIONS_TEXT_COLUMN_FLEX = 2;
const CONTEXT_NOTIFICATIONS_IMAGE_COLUMN_FLEX = 3;

/** Notification carousel frames are 16:9 (uploaded assets: 1024×573). */
const NOTIFICATION_IMAGE_ASPECT_RATIO = "16 / 9";
const NOTIFICATION_IMAGE_MAX_WIDTH_DESKTOP_PX = Math.round(
  ((getPanelInnerWidthPx("desktop", CONTEXT_NOTIFICATIONS_MAX_WIDTH) -
    CONTEXT_NOTIFICATIONS_DESKTOP_STACK_GAP_PX) *
    CONTEXT_NOTIFICATIONS_IMAGE_COLUMN_FLEX) /
    (CONTEXT_NOTIFICATIONS_TEXT_COLUMN_FLEX +
      CONTEXT_NOTIFICATIONS_IMAGE_COLUMN_FLEX),
);

const NOTIFICATION_IMAGE_BORDER_RADIUS_PX = 15;

const NOTIFICATION_CAROUSEL_INTERVAL_MS = 3500;

const DESKTOP_BREAKPOINT_MQ = breakpointMediaQuery.desktopUp;
const TABLET_STACKED_MQ = breakpointMediaQuery.tabletOnly;

const NOTIFICATION_IMAGE_SIZES = [
  `(max-width: ${breakpointPx.mobileMax}px) calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.mobile.margin) * 2
  }px)`,
  `(max-width: ${breakpointPx.tabletMax}px) calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.tablet.margin) * 2 +
    cssLengthToPx(PANEL_BLOCK_PADDINGS.x.tablet) * 2
  }px)`,
  `${NOTIFICATION_IMAGE_MAX_WIDTH_DESKTOP_PX}px`,
].join(", ");

const navigationButtons = [
  {
    key: "previous",
    label: "Previous notification",
    icon: <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "next",
    label: "Next notification",
    icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} />,
  },
];

export interface ContextualNotificationsProps {
  title: string;
  /* Optional + defaulted in the component because Firestore data is loosely typed and
     the field may not be present on every document. Same pattern as `ArAsNarrative`. */
  paragraphs?: string[];
  images?: string[];
  alt?: string;
}

export const ContextualNotifications = ({
  title,
  paragraphs = [],
  images = [],
  alt = "Contextual notification example",
}: ContextualNotificationsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasUserInteractedWithCarousel, setHasUserInteractedWithCarousel] =
    useState(false);
  const currentImage = images[currentImageIndex];
  const canNavigateCarousel = images.length > 1;

  useEffect(() => {
    if (currentImageIndex < images.length) return;
    setCurrentImageIndex(0);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    if (hasUserInteractedWithCarousel || !canNavigateCarousel) return;

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % images.length);
    }, NOTIFICATION_CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [canNavigateCarousel, hasUserInteractedWithCarousel, images.length]);

  const handlePrevious = () => {
    if (!canNavigateCarousel) return;
    setHasUserInteractedWithCarousel(true);
    setCurrentImageIndex(
      (index) => (index - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    if (!canNavigateCarousel) return;
    setHasUserInteractedWithCarousel(true);
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: CONTEXT_NOTIFICATIONS_MAX_WIDTH,
        mx: "auto",
        bgcolor: "#f5f5f7",
        borderRadius: { xs: 4, md: "30px" },
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
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Stack
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4,
            [DESKTOP_BREAKPOINT_MQ]: {
              flexDirection: "row",
              alignItems: "center",
              gap: `${CONTEXT_NOTIFICATIONS_DESKTOP_STACK_GAP_PX}px`,
            },
          }}
        >
          <Stack
            spacing={{ xs: 3, md: 4 }}
            sx={{
              flex: 1,
              width: "100%",
              maxWidth: "100%",
              [DESKTOP_BREAKPOINT_MQ]: {
                flex: `${CONTEXT_NOTIFICATIONS_TEXT_COLUMN_FLEX} 1 0`,
                minWidth: 0,
              },
            }}
          >
            {paragraphs.map((paragraph, idx) => (
              <Typography
                key={idx}
                component="p"
                sx={{ m: 0, ...bodyTypeSx("panelBody") }}
              >
                {paragraph}
              </Typography>
            ))}
          </Stack>
          <Stack
            spacing={3}
            alignItems="stretch"
            sx={{
              flex: 1,
              width: "100%",
              maxWidth: "100%",
              [DESKTOP_BREAKPOINT_MQ]: {
                flex: `${CONTEXT_NOTIFICATIONS_IMAGE_COLUMN_FLEX} 1 0`,
                minWidth: 0,
              },
            }}
          >
            {currentImage ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: NOTIFICATION_IMAGE_ASPECT_RATIO,
                  borderRadius: `${NOTIFICATION_IMAGE_BORDER_RADIUS_PX}px`,
                  overflow: "hidden",
                }}
              >
                <ProjectImage
                  objectPath={currentImage}
                  alt={`${alt} ${currentImageIndex + 1}`}
                  fill
                  sizes={NOTIFICATION_IMAGE_SIZES}
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ) : null}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ width: "100%" }}
            >
              {navigationButtons.map((button) => (
                <IconButton
                  key={button.key}
                  aria-label={button.label}
                  disabled={!canNavigateCarousel}
                  onClick={
                    button.key === "previous" ? handlePrevious : handleNext
                  }
                  size="small"
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor:
                      button.key === "next" ? "#142257" : "#f1f1f3",
                    color: button.key === "next" ? "#ffffff" : "#11255f",
                    "&.Mui-disabled": {
                      bgcolor: "#f1f1f3",
                      color: "rgba(17, 37, 95, 0.28)",
                    },
                    "&:hover": {
                      bgcolor:
                        button.key === "next" ? "#1d317a" : "#e8e8ec",
                    },
                  }}
                >
                  {button.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContextualNotifications;
