"use client";

import { Box, Stack, Typography } from "@mui/material";

import GatedImage from "@/lib/media/GatedImage";

const DEFAULT_PROJECT_KEY = "project_4";
const DEFAULT_TITLE_COLOR = "#04C300";
const DEFAULT_DESCRIPTION_COLOR = "#204061";

export type ReusableComponentProps = {
  title: string;
  description: string;
  objectPath: string;
  alt: string;
  projectKey?: string;
  sizes?: string;
  textColors?: {
    title?: string;
    description?: string;
  };
};

export function ReusableComponent({
  title,
  description,
  objectPath,
  alt,
  projectKey = DEFAULT_PROJECT_KEY,
  sizes = "(max-width: 768px) 120px, 160px",
  textColors,
}: ReusableComponentProps) {
  const titleColor = textColors?.title ?? DEFAULT_TITLE_COLOR;
  const descriptionColor = textColors?.description ?? DEFAULT_DESCRIPTION_COLOR;

  return (
    <Box component="section" sx={{ px: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 5 }}
        alignItems="flex-start"
        justifyContent="center"
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: 100, sm: 110 },
            height: { xs: 100, sm: 110 },
            flexShrink: 0,
            mt: { xs: 0, sm: 0.5 },
          }}
        >
          <GatedImage
            mode="fill"
            projectKey={projectKey}
            objectPath={objectPath}
            alt={alt}
            sizes={sizes}
            priority={false}
            fullViewportLoading={false}
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box component="article" sx={{ maxWidth: 720, minWidth: 0 }}>
          <Typography
            component="h3"
            sx={{
              color: titleColor,
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1.25rem" },
              lineHeight: 1.1,
              fontFamily: "'Poppins', Helvetica, sans-serif",
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: descriptionColor,
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1.25rem" },
              lineHeight: 1.35,
              fontFamily: "'Poppins', Helvetica, sans-serif",
              m: 0,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default ReusableComponent;
