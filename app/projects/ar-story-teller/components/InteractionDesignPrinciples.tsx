"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import polygon5 from "@mui/icons-material/Star";
import vector8 from "@mui/icons-material/Star";
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

/** Space between the panel heading and the grey content block (matches bleed-inner rhythm). */
const PANEL_HEADER_GAP = {
  mobile: "40px",
  tablet: "48px",
  desktop: "64px",
} as const;

function featureDescription(feature: FeatureSpecification): string {
  return (feature.description ?? feature.desciption ?? "").trim();
}

/** Illustration column — 15% smaller than original 437 / 411 / 320 layout. */
const ILLUSTRATION_PRIMARY_MAX_WIDTH_PX = Math.round(437 * 0.75);
const ILLUSTRATION_SECONDARY_MAX_WIDTH_PX = Math.round(411 * 0.75);
const ILLUSTRATION_INTRINSIC_HEIGHT_PX = Math.round(320 * 0.75);
const ILLUSTRATION_PRIMARY_CAPTION_MAX_WIDTH_PX = Math.round(409 * 0.75);
const ILLUSTRATION_SECONDARY_CAPTION_MAX_WIDTH_PX = Math.round(383 * 0.75);

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
      <Typography
        component="h1"
        sx={{
          color: "#03133c",
          fontFamily:
            'var(--font-satoshi), var(--font-poppins), "Source Sans 3", system-ui, sans-serif',
          fontSize: { xs: 28, md: 30, lg: 30 },
          fontWeight: 700,
          lineHeight: "normal !important",
          letterSpacing: 0,
          m: 0,
        }}
      >
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
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={{ xs: 4, md: 6 }}
      >

        <Box
          component="aside"
          sx={{ width: { xs: "100%", md: 402 }, flexShrink: 0 }}
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
                          fontFamily:
                            'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                          fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
                          fontWeight: 600,
                          color: "#000",
                          lineHeight: 'normal !important',
                          letterSpacing: 0,
                          flex: 1,
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
                            fontFamily: '"Source Sans 3", sans-serif',
                            fontWeight: 400,
                            color: "#000",
                            fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
                            lineHeight: 1.4,
                            letterSpacing: 0,
                            maxWidth: 360,
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
            borderRadius: "44px",
            width: { xs: "100%", md: 460 },
            p: { xs: 3, sm: 4, md: "35.46px 17.73px" },
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
                  maxWidth: {
                    xs: "100%",
                    md: illustrationMaxWidthPx,
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: {
                      xs: "100%",
                      md: illustrationMaxWidthPx,
                    },
                  }}
                >
                  <ProjectImage
                    objectPath={image.objectPath}
                    alt={image.alt}
                    width={illustrationMaxWidthPx}
                    height={ILLUSTRATION_INTRINSIC_HEIGHT_PX}
                    unoptimized={false}
                    sizes={`(max-width: 1023px) 100vw, ${illustrationMaxWidthPx}px`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxWidth: illustrationMaxWidthPx,
                    }}
                  />
                </Box>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: '"Source Sans 3", sans-serif',
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: 1.35,
                    color: "#000",
                    maxWidth:
                      index === 0
                        ? ILLUSTRATION_PRIMARY_CAPTION_MAX_WIDTH_PX
                        : ILLUSTRATION_SECONDARY_CAPTION_MAX_WIDTH_PX,
                  }}
                >
                  {image.alt}
                </Typography>
              </Stack>
            );
            })}
            <Stack spacing={1} sx={{ width: "100%", maxWidth: 320 }}>
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
                    <Box
                      component="img"
                      src={vector8}
                      alt="Target object icon"
                      sx={{ width: 20, height: 20, display: "block" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily:
                        'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                      fontSize: { xs: "0.8rem", md: "1rem", lg: "1rem" },
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: "#000",
                    }}
                  >
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
                  <Typography
                    sx={{
                      fontFamily:
                        'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                      fontSize: { xs: "0.8rem", md: "1rem", lg: "1rem" },
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: "#000",
                    }}
                  >
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
                  <Typography
                    sx={{
                     fontFamily:
                        'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                      fontSize: { xs: "0.8rem", md: "1rem", lg: "1rem" },
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: "#000",
                    }}
                  >
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
                    <Box
                      component="img"
                      src={polygon5}
                      alt="Camera point of view icon"
                      sx={{ width: 26, height: 22, display: "block" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily:
                        'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                      fontSize: { xs: "0.8rem", md: "1rem", lg: "1rem" },
                      fontWeight: 400,
                     
                      lineHeight: 1.2,
                      color: "#000",
                    }}
                  >
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
