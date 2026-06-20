import { Stack, Typography } from "@mui/material";

import {
  MOBILE_EXPERIENCE_MOCKUP_DISPLAY,
  MOBILE_EXPERIENCE_NOTIFICATION_DISPLAY,
  PROBLEM_DEMO_CAROUSEL_CAPTION_FONT_SIZE,
} from "@/app/projects/finding-nemo/layoutConfig";
import { FINDING_NEMO_BODY_FONT } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImageLightbox from "@/lib/media/ProjectImageLightbox";
import type { FindingNemoMobileMockupItem } from "@/scripts/project-2.data";

export type MobileExperienceMockupProps = FindingNemoMobileMockupItem & {
  /** Phone screen mockup vs landscape push-notification banner. */
  variant?: "phone" | "notification";
};

const mockupAnnotationSx = {
  fontFamily: FINDING_NEMO_BODY_FONT,
  color: "#000",
  fontSize: PROBLEM_DEMO_CAROUSEL_CAPTION_FONT_SIZE.mobile,
  lineHeight: 1.3,
  fontWeight: 600,
  textAlign: "center",
  m: 0,
  [breakpointMediaQuery.tabletUp]: {
    fontSize: PROBLEM_DEMO_CAROUSEL_CAPTION_FONT_SIZE.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    fontSize: PROBLEM_DEMO_CAROUSEL_CAPTION_FONT_SIZE.desktop,
  },
} as const;

function getDisplayConfig(variant: "phone" | "notification") {
  return variant === "notification"
    ? MOBILE_EXPERIENCE_NOTIFICATION_DISPLAY
    : MOBILE_EXPERIENCE_MOCKUP_DISPLAY;
}

function mockupLightboxId(objectPath: string): string {
  const fileStem =
    objectPath
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "") ?? "mockup";
  return `finding-nemo-mobile-${fileStem}`;
}

export default function MobileExperienceMockup({
  title,
  objectPath,
  width,
  height,
  variant = "phone",
}: MobileExperienceMockupProps) {
  const display = getDisplayConfig(variant);
  const lightboxId = mockupLightboxId(objectPath);

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        width: `${display.mobile.width}px`,
        maxWidth: "100%",
        flexGrow: 0,
        flexShrink: 0,
        [breakpointMediaQuery.tabletUp]: {
          width: `${display.tablet.width}px`,
        },
        [breakpointMediaQuery.desktopUp]: {
          width: `${display.desktop.width}px`,
        },
      }}
    >
      <ProjectImageLightbox
        objectPath={objectPath}
        alt={title}
        lightboxId={lightboxId}
        width={width}
        height={height}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
      <Typography component="p" sx={mockupAnnotationSx}>
        {title}
      </Typography>
    </Stack>
  );
}
