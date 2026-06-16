import { Stack, Typography } from "@mui/material";

import { MOBILE_EXPERIENCE_MOCKUP_DISPLAY } from "@/app/projects/finding-nemo/layoutConfig";
import { titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";
import type { FindingNemoMobileMockupItem } from "@/scripts/project-2.data";

export type MobileExperienceMockupProps = FindingNemoMobileMockupItem;

const mockupImageSizes = [
  `(max-width: 767px) ${MOBILE_EXPERIENCE_MOCKUP_DISPLAY.mobile.width}px`,
  `(max-width: 1023px) ${MOBILE_EXPERIENCE_MOCKUP_DISPLAY.tablet.width}px`,
  `${MOBILE_EXPERIENCE_MOCKUP_DISPLAY.desktop.width}px`,
].join(", ");

export default function MobileExperienceMockup({
  title,
  objectPath,
  width,
  height,
}: MobileExperienceMockupProps) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        width: `${MOBILE_EXPERIENCE_MOCKUP_DISPLAY.mobile.width}px`,
        maxWidth: "100%",
        flexGrow: 0,
        flexShrink: 0,
        [breakpointMediaQuery.tabletUp]: {
          width: `${MOBILE_EXPERIENCE_MOCKUP_DISPLAY.tablet.width}px`,
        },
        [breakpointMediaQuery.desktopUp]: {
          width: `${MOBILE_EXPERIENCE_MOCKUP_DISPLAY.desktop.width}px`,
        },
      }}
    >
      <ProjectImage
        objectPath={objectPath}
        alt={title}
        width={width}
        height={height}
        sizes={mockupImageSizes}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
      <Typography
        component="p"
        align="center"
        sx={titleTypeSx("cardTitle", {
          fontWeight: 700,
          lineHeight: 1.1,
          color: "common.black",
        })}
      >
        {title}
      </Typography>
    </Stack>
  );
}
