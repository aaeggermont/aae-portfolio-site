import { Box, Stack, Typography } from "@mui/material";

import {
  CORE_PRINCIPLES_IMAGE_DISPLAY,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";
import type { FindingNemoPanelSectionItem } from "@/scripts/project-2.data";

export type PanelSectionProps = FindingNemoPanelSectionItem;

const panelShellSx = {
  py: "96px",
  px: { xs: 3, sm: 4, md: 6, lg: 8 },
  bgcolor: "#fff",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "100%",
} as const;

const corePrinciplesImageSizes = [
  `(max-width: 767px) ${CORE_PRINCIPLES_IMAGE_DISPLAY.mobile.width}px`,
  `(max-width: 1023px) ${CORE_PRINCIPLES_IMAGE_DISPLAY.tablet.width}px`,
  `${CORE_PRINCIPLES_IMAGE_DISPLAY.desktop.width}px`,
].join(", ");

const corePrinciplesImageBoxSx = {
  width: `${CORE_PRINCIPLES_IMAGE_DISPLAY.mobile.width}px`,
  maxWidth: "100%",
  flexShrink: 0,
  [breakpointMediaQuery.tabletUp]: {
    width: `${CORE_PRINCIPLES_IMAGE_DISPLAY.tablet.width}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: `${CORE_PRINCIPLES_IMAGE_DISPLAY.desktop.width}px`,
  },
} as const;

function PanelHeading({ title }: { title: string }) {
  return (
    <Typography
      component="h3"
      sx={titleTypeSx("cardTitle", {
        fontWeight: 700,
        lineHeight: 1.1,
        color: "common.black",
      })}
    >
      {title}
    </Typography>
  );
}

function ImageTextPanel({
  description,
  image,
}: Extract<FindingNemoPanelSectionItem, { type: "image-text" }>) {
  return (
    <Box
      component="section"
      sx={{
        ...panelShellSx,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: { xs: 4, md: 8 },
      }}
    >
      <Stack
        component="figure"
        sx={{
          m: 0,
          flexShrink: 0,
          width: { xs: "100%", md: "auto" },
          maxWidth: { xs: 280, md: 280 },
          alignItems: "center",
        }}
      >
        <ProjectImage
          objectPath={image.objectPath}
          alt={image.alt}
          width={image.width}
          height={image.height}
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </Stack>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <Typography
          component="p"
          sx={bodyTypeSx("sectionDescription", {
            color: "common.black",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 540,
            m: 0,
          })}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

function PrinciplesImagePanel({
  principles,
  image,
}: Extract<FindingNemoPanelSectionItem, { type: "principles-image" }>) {
  return (
    <Box
      component="section"
      sx={{
        ...panelShellSx,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 4, md: 8 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          flex: 1,
          minWidth: { xs: "100%", md: 280 },
          maxWidth: 540,
        }}
      >
        {principles.map((principle) => (
          <Stack key={principle.subtitle} spacing={1}>
            <Typography
              component="h4"
              sx={titleTypeSx("personaSectionTitle", {
                fontWeight: 700,
                lineHeight: 1.2,
                color: "common.black",
              })}
            >
              {principle.subtitle}
            </Typography>
            <Typography
              component="p"
              sx={bodyTypeSx("contentCardBody", {
                color: "common.black",
                fontWeight: 400,
                lineHeight: 1.6,
                m: 0,
              })}
            >
              {principle.description}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Box sx={corePrinciplesImageBoxSx}>
        <ProjectImage
          objectPath={image.objectPath}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={corePrinciplesImageSizes}
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}

export default function PanelSection(props: PanelSectionProps) {
  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <PanelHeading title={props.title} />
      {props.type === "image-text" ? (
        <ImageTextPanel {...props} />
      ) : (
        <PrinciplesImagePanel {...props} />
      )}
    </Stack>
  );
}
