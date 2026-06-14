import { Box, Stack, Typography } from "@mui/material";

import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import ProjectImage from "@/lib/media/ProjectImage";
import type { FindingNemoPanelSectionItem } from "@/scripts/project-2.data";

export type PanelSectionProps = FindingNemoPanelSectionItem;

export default function PanelSection({
  title,
  description,
  image,
}: PanelSectionProps) {
  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
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
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
          p: { xs: 3, sm: 4, md: 6, lg: 8 },
          bgcolor: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "100%",
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
    </Stack>
  );
}
