import { Box, Stack, Typography } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";
import { SectionTitle } from "./SectionTitle";
import { PANEL_BLOCK_PADDINGS } from "../layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type {
  ProjectOverviewColumn,
  ProjectOverviewData,
} from "@/app/projects/ar-story-teller/types/arStoryTellerContent";

const DESKTOP_BREAKPOINT_MQ = breakpointMediaQuery.desktopUp;
const TABLET_STACKED_MQ = breakpointMediaQuery.tabletOnly;
const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;

const ICON_INTRINSIC_SIZE = 60;

/** Body copy — typography tokens to be refined in a follow-up pass. */
const bodyTextSx = {
  color: "#002464",
  fontFamily:
    'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
  fontWeight: 400,
  fontSize: { xs: "16px", md: "20px" },
  lineHeight: 1.35,
} as const;

/** Column heading — typography tokens to be refined in a follow-up pass. */
const columnTitleSx = {
  fontFamily: 'var(--font-satoshi), sans-serif',
  fontWeight: 600,
  color: "#002464",
  lineHeight: 1.2,
  fontSize: { xs: "18px", md: "22px" },
} as const;

interface ProjectOverviewProps {
  data: ProjectOverviewData;
}

function OverviewIcon({ objectPath, alt }: { objectPath: string; alt: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: 42,
        height: 42,
        mx: "auto",
      }}
    >
      <ProjectImage
        objectPath={objectPath}
        alt={alt}
        width={ICON_INTRINSIC_SIZE}
        height={ICON_INTRINSIC_SIZE}
        style={{ display: "block", width: 42, height: 42, objectFit: "contain" }}
      />
    </Box>
  );
}

function OverviewColumn({ item }: { item: ProjectOverviewColumn }) {
  return (
    <Stack
      alignItems="center"
      sx={{
        flex: "1 1 0",
        minWidth: 0,
        textAlign: "center",
      }}
    >
      <Box sx={{ pb: 1.5 }}>
        <OverviewIcon objectPath={item.icon} alt={`${item.title} icon`} />
      </Box>
      <Typography component="h3" sx={{ m: 0, pb: 1, ...columnTitleSx }}>
        {item.title}
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {item.items.map((entry) => (
          <Typography
            key={entry}
            component="li"
            sx={{ ...bodyTextSx, display: "block" }}
          >
            {entry}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}

function OverviewRow({ item }: { item: ProjectOverviewColumn }) {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Stack
        alignItems="center"
        sx={{
          flex: "0 0 35%",
          textAlign: "center",
        }}
      >
        <OverviewIcon objectPath={item.icon} alt={`${item.title} icon`} />
        <Typography component="h3" sx={{ m: 0, mt: 1, ...columnTitleSx }}>
          {item.title}
        </Typography>
      </Stack>
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          flex: "1 1 auto",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {item.items.map((entry) => (
          <Typography
            key={entry}
            component="li"
            sx={{ ...bodyTextSx, display: "block" }}
          >
            {entry}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}

const ProjectOverview = ({ data }: ProjectOverviewProps) => {
  const { title, columns } = data;
  const headingId = "project-overview-heading";

  return (
    <section aria-labelledby={headingId}>
      <SectionTitle id={headingId} title={title} paddingBottom="2rem" />
      <Box
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
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            [TABLET_UP_MQ]: { width: { xs: "100%", sm: "80%", md: "90%", lg: "90%" } },
          }}
        >
          {/* Mobile: icon + title beside list items */}
          <Stack
            spacing={2.5}
            sx={{
              display: "flex",
              [TABLET_UP_MQ]: { display: "none" },
            }}
          >
            {columns.map((item) => (
              <OverviewRow key={item.title} item={item} />
            ))}
          </Stack>

          {/* Tablet+: three centered columns */}
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{
              display: "none",
              width: "100%",
              gap: { xs: 2, md: 2.5},
              [TABLET_UP_MQ]: { display: "flex" },
            }}
          >
            {columns.map((item) => (
              <OverviewColumn key={item.title} item={item} />
            ))}
          </Stack>
        </Box>
      </Box>
    </section>
  );
};

export default ProjectOverview;
