"use client";

import { Box, Stack, Typography } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";
import {
  INTERACTION_MODE_IMAGE_COPY_GAP,
  PANEL_HEADER_GAP,
} from "../layoutConfig";
import { breakpointMediaQuery, breakpointPx } from "@/lib/responsive/breakpoints";

export interface InteractionModeImage {
  objectPath: string;
  alt: string;
}

export interface InteractionModeSpec {
  title: string;
  description: string;
  image: InteractionModeImage;
}

export interface UserModeInteractionsProps {
  title: string;
  modes: InteractionModeSpec[];
}

const DESKTOP_LAYOUT_MQ = breakpointMediaQuery.desktopUp;

const INTERACTION_MODE_IMAGE_MAX_WIDTH_PX = 300;
const INTERACTION_MODE_IMAGE_INTRINSIC_SIZE_PX = 300;

const INTERACTION_MODE_IMAGE_SIZES = [
  `(max-width: ${breakpointPx.mobileMax}px) 100vw`,
  `(max-width: ${breakpointPx.tabletMax}px) min(90vw, ${INTERACTION_MODE_IMAGE_MAX_WIDTH_PX}px)`,
  `${INTERACTION_MODE_IMAGE_MAX_WIDTH_PX}px`,
].join(", ");

export const UserModeInteractions = ({
  title,
  modes,
}: UserModeInteractionsProps) => {
  if (!modes.length) {
    return null;
  }

  return (
    <Stack
      component="section"
      sx={{
        width: "100%",
        maxWidth: 1100,
        minWidth: { xs: "auto", sm: 358 },
        gap: {
          xs: PANEL_HEADER_GAP.mobile,
          sm: PANEL_HEADER_GAP.tablet,
          md: PANEL_HEADER_GAP.desktop,
        },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: "#03133c",
          fontFamily:
            'var(--font-satoshi), var(--font-poppins), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: { xs: "1.9rem", md: "2rem" },
          lineHeight: 1.15,
          m: 0,
          textAlign: "center",
          [breakpointMediaQuery.tabletUp]: {
            textAlign: "left",
          },
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#f5f5f7",
          borderRadius: { xs: 4, md: "40px" },
          px: { xs: 3, sm: 5, md: 7.5 },
          py: { xs: 4, sm: 5, md: 7.5 },
        }}
      >
        <Stack spacing={{ xs: 6, md: 8 }}>
          {modes.map((item, index) => {
            const imageFirst = index % 2 === 1;

            return (
              <Stack
                key={item.title}
                alignItems="center"
                sx={{
                  flexDirection: "column",
                  gap: {
                    xs: INTERACTION_MODE_IMAGE_COPY_GAP.mobile,
                    sm: INTERACTION_MODE_IMAGE_COPY_GAP.tablet,
                  },
                  [DESKTOP_LAYOUT_MQ]: {
                    flexDirection: "row",
                    alignItems: "center",
                    gap: INTERACTION_MODE_IMAGE_COPY_GAP.desktop,
                  },
                }}
              >
                <Stack
                  spacing={3}
                  sx={{
                    order: 1,
                    flex: 1,
                    width: "100%",
                    maxWidth: "100%",
                    [DESKTOP_LAYOUT_MQ]: {
                      order: imageFirst ? 2 : 1,
                      maxWidth: 532,
                    },
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      color: "#000",
                      fontFamily:
                        'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: { xs: "20px", md: "24px" },
                      lineHeight: 1.25,
                      textAlign: "center",
                      [breakpointMediaQuery.tabletUp]: {
                        textAlign: "left",
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      color: "#000",
                      fontFamily:
                        'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    order: 2,
                    width: "100%",
                    maxWidth: INTERACTION_MODE_IMAGE_MAX_WIDTH_PX,
                    flexShrink: 0,
                    mx: "auto",
                    [DESKTOP_LAYOUT_MQ]: {
                      order: imageFirst ? 1 : 2,
                      mx: 0,
                    },
                  }}
                >
                  <ProjectImage
                    objectPath={item.image.objectPath}
                    alt={item.image.alt}
                    width={INTERACTION_MODE_IMAGE_INTRINSIC_SIZE_PX}
                    height={INTERACTION_MODE_IMAGE_INTRINSIC_SIZE_PX}
                    unoptimized={false}
                    sizes={INTERACTION_MODE_IMAGE_SIZES}
                    borderRadius={16}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxWidth: INTERACTION_MODE_IMAGE_MAX_WIDTH_PX,
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
};

export default UserModeInteractions;
