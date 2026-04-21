"use client";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { SlideshowLightbox } from "lightbox.js-react";

import GatedImage from "@/lib/media/GatedImage";
import { useSignedMediaUrl } from "@/lib/media/useSignedMediaUrl";
import type { ResearchCardContentBlock } from "../researchMethodTypes";

export type ResearchMethodImageBlockData = Extract<
  ResearchCardContentBlock,
  { type: "image" }
>;

const DEFAULT_MEDIA_PROJECT_KEY = "project_4";
const DEFAULT_IMAGE_SIZES = "(max-width: 900px) 100vw, min(815px, 100vw)";

type Props = {
  block: ResearchMethodImageBlockData;
};

export function ResearchMethodImageBlock({ block }: Props) {
  const ratio = block.aspectRatio ?? "16 / 9";
  const projectKey = block.projectKey ?? DEFAULT_MEDIA_PROJECT_KEY;
  const objectFit = block.objectFit ?? "cover";
  const frameBg =
    block.letterboxBackground ??
    (objectFit === "contain" ? "#ffffff" : "rgba(0,0,0,0.2)");

  const { url, error } = useSignedMediaUrl(projectKey, block.objectPath);

  const caption = block.caption ? (
    <Typography
      sx={{
        color: "#cfcccc",
        fontSize: "12px",
        lineHeight: 1.5,
        fontFamily: "'Poppins', Helvetica",
        textAlign: "center",
      }}
    >
      {block.caption}
    </Typography>
  ) : null;

  const annotation = block.annotation ? (
    <Typography
      sx={{
        color: "#dbe6f0",
        fontSize: "12px",
        lineHeight: 1.5,
        fontFamily: "'Poppins', Helvetica",
        textAlign: "center",
        fontStyle: "italic",
      }}
    >
      {block.annotation}
    </Typography>
  ) : null;

  if (block.lightbox) {
    if (error) {
      return (
        <Stack spacing={1} px={2}>
          <Typography color="error" variant="body2" sx={{ px: 1 }}>
            Image failed: {error}
          </Typography>
        </Stack>
      );
    }

    if (!url) {
      return (
        <Stack spacing={1} px={2}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: ratio,
              borderRadius: "8px",
              bgcolor: frameBg,
              display: "grid",
              placeItems: "center",
            }}
          >
            <CircularProgress size={32} sx={{ color: "rgba(255,255,255,0.7)" }} />
          </Box>
          {caption}
          {annotation}
        </Stack>
      );
    }

    return (
      <Stack spacing={1} px={2}>
        <SlideshowLightbox
          framework="next"
          images={[{ src: url, alt: block.alt }]}
          lightboxIdentifier={block.id}
          showThumbnails={false}
          showSlideshowIcon={false}
          showNavigationDots={false}
          theme="night"
          backgroundColor="rgba(8, 12, 18, 0.97)"
          modalClose="clickOutside"
        >
          <img
            src={url}
            alt={block.alt}
            data-lightboxjs={block.id}
            style={{
              width: "100%",
              aspectRatio: ratio,
              objectFit,
              borderRadius: 8,
              backgroundColor: frameBg,
              display: "block",
              cursor: "zoom-in",
            }}
          />
        </SlideshowLightbox>
        {caption}
        {annotation}
      </Stack>
    );
  }

  return (
    <Stack spacing={1} px={2}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: ratio,
          borderRadius: "8px",
          overflow: "hidden",
          bgcolor: frameBg,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            "& img": {
              display: "block",
            },
          }}
        >
          <GatedImage
            mode="fill"
            projectKey={projectKey}
            objectPath={block.objectPath}
            alt={block.alt}
            sizes={block.sizes ?? DEFAULT_IMAGE_SIZES}
            priority={block.priority ?? false}
            fullViewportLoading={block.fullViewportLoading ?? false}
            style={{ objectFit }}
          />
        </Box>
      </Box>
      {caption}
      {annotation}
    </Stack>
  );
}
