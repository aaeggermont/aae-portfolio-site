"use client";

import Box from "@mui/material/Box";

import ProjectImage from "@/lib/media/ProjectImage";

export type SectionDelimiterData = {
  objectPath: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  data: SectionDelimiterData;
};

/**
 * Decorative divider between narrative sections (Storage-backed image).
 */
export default function SectionDelimiter({ data }: Props) {
  return (
    <Box
      component="figure"
      aria-hidden={data.alt ? undefined : true}
      sx={{
        m: 0,
        width: "100%",
        maxWidth: { xs: 280, md: 360, lg: 420 },
        mx: "auto",
        lineHeight: 0,
        "& img": {
          width: "100%",
          height: "auto",
          display: "block",
        },
      }}
    >
      <ProjectImage
        objectPath={data.objectPath}
        alt={data.alt}
        width={data.width}
        height={data.height}
        sizes="(max-width: 767px) 280px, (max-width: 1023px) 360px, 420px"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}
