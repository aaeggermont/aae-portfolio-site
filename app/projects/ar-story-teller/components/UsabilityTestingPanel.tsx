"use client";

import { Box, Stack, Typography } from "@mui/material";
import type { StaticImageData } from "next/image";
import Image from "next/image";

import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import BulletPointDesktop from "../Images/BulletPoint-Desktop.png";
import BulletPointLgMd from "../Images/BulletPoint-LgMd.png";
import BulletPointSmSx from "../Images/BulletPoint-SmSx.png";
import { PANEL_CONTENT_MAX_WIDTH_PX } from "../layoutConfig";
import { bodyTypeSx } from "../typography";

const bulletTextSx = bodyTypeSx("smallBody", {
  letterSpacing: 0,
  m: 0,
  flex: 1,
  minWidth: 0,
  maxWidth: "100%",
});

const PANEL_SURFACE_SX = {
  width: "100%",
  bgcolor: "#ffffff",
  borderRadius: { xs: 4, md: "40px" },
  px: { xs: 3, sm: 5, md: 7.5 },
  py: { xs: 4, sm: 5, md: 7.5 },
} as const;

export interface UsabilityTestingPanelBulletPoint {
  text: string;
  icon?: StaticImageData;
}

export interface UsabilityTestingPanelProps {
  bulletPoints: UsabilityTestingPanelBulletPoint[];
}

function UsabilityBulletRow({
  text,
  icon,
}: UsabilityTestingPanelBulletPoint) {
  const screen = useResponsive();

  const bulletSrc = icon
    ? icon
    : screen.isTablet
      ? BulletPointDesktop
      : screen.isDesktopOrLaptop
        ? BulletPointLgMd
        : BulletPointSmSx;

  const bulletSizePx = screen.isTablet ? 10 : 8;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={{ xs: 1.5, md: 2 }}
      sx={{
        width: "100%",
        pt: { xs: 2, md: 1.5 },
        "&:first-of-type": { pt: 0 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: bulletSizePx,
          minWidth: bulletSizePx,
          height: "1.4em",
          lineHeight: 0,
        }}
      >
        <Image
          alt=""
          src={bulletSrc}
          style={{
            width: bulletSizePx,
            height: bulletSizePx,
            opacity: screen.isTablet ? 0.95 : 1,
          }}
        />
      </Box>
      <Typography component="p" sx={bulletTextSx}>
        {text}
      </Typography>
    </Stack>
  );
}

export function UsabilityTestingPanel({
  bulletPoints,
}: UsabilityTestingPanelProps) {
  if (!bulletPoints.length) {
    return null;
  }

  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: PANEL_CONTENT_MAX_WIDTH_PX,
        minWidth: { xs: "auto", sm: 358 },
        mx: "auto",
      }}
    >
      <Box sx={PANEL_SURFACE_SX}>
        <Stack sx={{ width: "100%" }} spacing={0}>
          {bulletPoints.map((bullet, index) => (
            <UsabilityBulletRow key={index} {...bullet} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default UsabilityTestingPanel;
