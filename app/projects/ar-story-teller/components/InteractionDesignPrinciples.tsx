"use client";

import AdjustIcon from "@mui/icons-material/Adjust";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ProjectImage from "@/lib/media/ProjectImage";
import { PANEL_HEADER_GAP } from "../layoutConfig";
import { breakpointMediaQuery, breakpointPx } from "@/lib/responsive/breakpoints";
import { bodyTypeSx, titleTypeSx } from "../typography";

export interface FeatureSpecification {
  title: string;
  description?: string;
  /** Legacy seed typo — prefer `description`. */
  desciption?: string;
}

export interface InteractionDesignImage {
  objectPath: string;
  alt: string;
}

export interface InteractionDesignPrinciplesProps {
  /** Panel heading — defaults to seed copy when omitted. */
  title?: string;
  features: FeatureSpecification[];
  images?: InteractionDesignImage[];
}

function featureDescription(feature: FeatureSpecification): string {
  return (feature.description ?? feature.desciption ?? "").trim();
}

/** Illustration column — 15% smaller than original 437 / 411 / 320 layout. */
const ILLUSTRATION_PRIMARY_MAX_WIDTH_PX = Math.round(437 * 0.75);
const ILLUSTRATION_SECONDARY_MAX_WIDTH_PX = Math.round(411 * 0.75);
const ILLUSTRATION_INTRINSIC_HEIGHT_PX = Math.round(320 * 0.75);
const ILLUSTRATION_PRIMARY_CAPTION_MAX_WIDTH_PX = Math.round(409 * 0.75);
const ILLUSTRATION_SECONDARY_CAPTION_MAX_WIDTH_PX = Math.round(383 * 0.75);

const panelHeadingSx = titleTypeSx("panelHeading", {
  m: 0,
  textAlign: "center",
  [breakpointMediaQuery.tabletUp]: {
    textAlign: "left",
  },
});

const accordionTitleSx = titleTypeSx("cardTitle", {
  flex: 1,
  lineHeight: "normal !important",
  letterSpacing: 0,
});

const accordionBodySx = bodyTypeSx("smallBody", {
  letterSpacing: 0,
  maxWidth: "100%",
});

const illustrationCaptionSx = bodyTypeSx("caption", {
  maxWidth: "100%",
  textAlign: "center",
});

const legendLabelSx = bodyTypeSx("smallBody", {
  lineHeight: 1.2,
});

/** Row layout only at project desktop (1024px+); mobile + tablet stack accordion then illustrations. */
const DESKTOP_LAYOUT_MQ = breakpointMediaQuery.desktopUp;

/** White illustration card — identical on mobile + tablet; desktop overrides below. */
const STACKED_ILLUSTRATION_PAPER = {
  borderRadius: "32px",
  padding: 3,
} as const;

/** Vertical gap between accordion block and illustration card when stacked. */
const STACKED_COLUMN_GAP = {
  mobile: "32px",
  tablet: "40px",
  desktop: "48px",
} as const;

export const InteractionDesignPrinciples = ({
  title = "Interaction Design Principles & Specifications",
  features,
  images = [],
}: InteractionDesignPrinciplesProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  if (!features.length) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1100px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: {
          xs: PANEL_HEADER_GAP.mobile,
          sm: PANEL_HEADER_GAP.tablet,
          md: PANEL_HEADER_GAP.desktop,
        },
      }}
    >
      <Typography component="h1" sx={panelHeadingSx}>
        {title}
      </Typography>
      <Box
        component="section"
        sx={{
          bgcolor: "#f5f5f7",
          borderRadius: "40px",
          p: { xs: 3, sm: 5, md: "60px" },
          width: "100%",
        }}
      >
        
      <Stack
        sx={{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          gap: {
            xs: STACKED_COLUMN_GAP.mobile,
            sm: STACKED_COLUMN_GAP.tablet,
          },
          [DESKTOP_LAYOUT_MQ]: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: STACKED_COLUMN_GAP.desktop,
          },
        }}
      >
        <Box
          component="aside"
          sx={{
            width: "100%",
            flexShrink: 0,
            [DESKTOP_LAYOUT_MQ]: {
              width: 402,
              maxWidth: "42%",
            },
          }}
        >
          <List disablePadding>
            {features.map((item, index) => {
              const isExpanded = expandedIndex === index;
              const description = featureDescription(item);

              return (
                <Box key={item.title}>
                  {index !== 0 && <Divider sx={{ borderColor: "#d9d9d9" }} />}
                  <ListItemButton
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    sx={{
                      px: 0,
                      py: 3.5,
                      alignItems: "flex-start",
                      borderRadius: 0,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                      sx={{ width: "100%" }}
                    >
                      <Typography
                        component="h2"
                        sx={{
                          ...accordionTitleSx,
                          maxWidth: index === 0 ? 268 : "100%",
                        }}
                      >
                        {item.title}
                      </Typography>
                      {isExpanded ? (
                        <ExpandLessIcon sx={{ color: "#5f5f5f", mt: 0.5 }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: "#5f5f5f", mt: 0.5 }} />
                      )}
                    </Stack>
                  </ListItemButton>
                  <Collapse
                    in={isExpanded}
                    timeout="auto"
                    unmountOnExit={index !== 0}
                  >
                    {description ? (
                      <Box sx={{ pt: 0.5, pb: 3 }}>
                        <Typography
                          component="p"
                          sx={{
                            ...accordionBodySx,
                            [DESKTOP_LAYOUT_MQ]: {
                              maxWidth: 360,
                            },
                          }}
                        >
                          {description}
                        </Typography>
                      </Box>
                    ) : null}
                  </Collapse>
                </Box>
              );
            })}
          </List>
        </Box>
        <Paper
          component="section"
          elevation={0}
          sx={{
            bgcolor: "#fff",
            width: "100%",
            maxWidth: "498px",
            flexShrink: 0,
            alignSelf: "center",
            borderRadius: STACKED_ILLUSTRATION_PAPER.borderRadius,
            p: STACKED_ILLUSTRATION_PAPER.padding,
            [DESKTOP_LAYOUT_MQ]: {
              borderRadius: "44px",
              alignSelf: "center",
              p: "35.46px 17.73px",
              width: 468,
              maxWidth: "52%",
            },
          }}
        >
          <Stack alignItems="center" spacing={3}>
            {images.map((image, index) => {
              const illustrationMaxWidthPx =
                index === 0
                  ? ILLUSTRATION_PRIMARY_MAX_WIDTH_PX
                  : ILLUSTRATION_SECONDARY_MAX_WIDTH_PX;

              return (
              <Stack
                key={image.objectPath}
                spacing={index === 0 ? 3 : 2}
                alignItems="center"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  [DESKTOP_LAYOUT_MQ]: {
                    maxWidth: illustrationMaxWidthPx,
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    mx: "auto",
                    [DESKTOP_LAYOUT_MQ]: {
                      maxWidth: illustrationMaxWidthPx,
                    },
                  }}
                >
                  <ProjectImage
                    objectPath={image.objectPath}
                    alt={image.alt}
                    width={illustrationMaxWidthPx}
                    height={ILLUSTRATION_INTRINSIC_HEIGHT_PX}
                    unoptimized={false}
                    sizes={[
                      `(max-width: ${breakpointPx.mobileMax}px) 100vw`,
                      `(max-width: ${breakpointPx.tabletMax}px) 90vw`,
                      `${illustrationMaxWidthPx}px`,
                    ].join(", ")}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  />
                </Box>
                <Typography
                  component="p"
                  sx={{
                    ...illustrationCaptionSx,
                    [DESKTOP_LAYOUT_MQ]: {
                      maxWidth:
                        index === 0
                          ? ILLUSTRATION_PRIMARY_CAPTION_MAX_WIDTH_PX
                          : ILLUSTRATION_SECONDARY_CAPTION_MAX_WIDTH_PX,
                      textAlign: "left",
                    },
                  }}
                >
                  {image.alt}
                </Typography>
              </Stack>
            );
            })}
            <Stack
              spacing={1}
              sx={{
                width: "100%",
                maxWidth: "100%",
                [DESKTOP_LAYOUT_MQ]: {
                  maxWidth: 320,
                },
              }}
            >
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ width: "50%" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 30,
                      borderRadius: "50%",
                      border: "1.11px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <AdjustIcon
                      aria-hidden
                      sx={{ fontSize: 20, color: "#000" }}
                    />
                  </Box>
                  <Typography sx={legendLabelSx}>
                    Target object
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ width: "50%" }}
                >
                  <Box
                    sx={{
                      width: 33,
                      height: 33,
                      borderRadius: "50%",
                      border: "2.22px dashed #000",
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={legendLabelSx}>
                    Geofancing area
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ width: "50%" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      display: "flex",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 15,
                        height: 15,
                        bgcolor: "#000",
                        borderRadius: "50%",
                        mt: "2px",
                      }}
                    />
                  </Box>
                  <Typography sx={legendLabelSx}>
                    Smart Phone Camera
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ width: "50%" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ChangeHistoryIcon
                      aria-hidden
                      sx={{
                        fontSize: 26,
                        color: "#000",
                        transform: "rotate(180deg)",
                      }}
                    />
                  </Box>
                  <Typography sx={legendLabelSx}>
                    Camera point of view
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
      </Box>
    </Box>
  );
};

export default InteractionDesignPrinciples;
