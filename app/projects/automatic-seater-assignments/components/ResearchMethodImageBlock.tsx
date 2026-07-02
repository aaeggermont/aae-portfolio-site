"use client";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { SlideshowLightbox } from "lightbox.js-react";

import GatedImage from "@/lib/media/GatedImage";
import { useSignedMediaUrl } from "@/lib/media/useSignedMediaUrl";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { ResearchCardContentBlock } from "../researchMethodTypes";
import { bodyTypeSx } from "../typography";

export type ResearchMethodImageBlockData = Extract<
  ResearchCardContentBlock,
  { type: "image" }
>;

export type StandaloneResearchMethodImageData = Omit<
  ResearchMethodImageBlockData,
  "type"
>;

const DEFAULT_MEDIA_PROJECT_KEY = "project_4";
const DEFAULT_IMAGE_SIZES = "(max-width: 900px) 100vw, min(815px, 100vw)";

const DEFAULT_LIGHTBOX_MODAL_BG = "rgba(8, 12, 18, 0.97)";

/** Contrast for header/close icons; `lightbox.js` `theme` overwrites `backgroundColor` on mount, so we avoid `theme` and set this explicitly. */
function lightboxIconColorForModalBackground(background: string): string {
  const t = background.trim().toLowerCase();
  if (t === "transparent") return "#c0c0c0";
  const rgba = t.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgba) {
    const r = +rgba[1];
    const g = +rgba[2];
    const b = +rgba[3];
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#1a1a1a" : "#c0c0c0";
  }
  const hex = t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1];
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const v = parseInt(full, 16);
    const r = (v >> 16) & 255;
    const g = (v >> 8) & 255;
    const b = v & 255;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#1a1a1a" : "#c0c0c0";
  }
  return "#c0c0c0";
}

type ImageBlockLike = ResearchMethodImageBlockData | StandaloneResearchMethodImageData;

function resolveAspectRatio(block: ImageBlockLike): string {
  if (block.aspectRatio) return block.aspectRatio;
  if (block.frameDimensionsPx) {
    const { width, height } = block.frameDimensionsPx;
    return `${width} / ${height}`;
  }
  return "16 / 9";
}

function getConstrainedFrameSx(
  frameDimensionsPx?: { width: number; height: number },
): SxProps<Theme> {
  if (!frameDimensionsPx) {
    return { width: "100%" };
  }

  return {
    width: "100%",
    maxWidth: "100%",
    [breakpointMediaQuery.desktopUp]: {
      maxWidth: frameDimensionsPx.width,
    },
  };
}

function getImageFrameSx(
  ratio: string,
  frameBg: string,
  frameDimensionsPx?: { width: number; height: number },
  options?: { forLoading?: boolean },
): SxProps<Theme> {
  return {
    position: "relative",
    ...getConstrainedFrameSx(frameDimensionsPx),
    aspectRatio: ratio,
    borderRadius: "8px",
    bgcolor: frameBg,
    overflow: "hidden",
    ...(options?.forLoading ? { display: "grid", placeItems: "center" } : {}),
  };
}

const rootStackProps = {
  spacing: 1 as const,
  px: 2,
  alignItems: "center" as const,
  sx: { width: "100%" },
};

type Props = {
  block: ResearchMethodImageBlockData | StandaloneResearchMethodImageData;
};

export function ResearchMethodImageBlock({ block }: Props) {
  const ratio = resolveAspectRatio(block);
  const projectKey = block.projectKey ?? DEFAULT_MEDIA_PROJECT_KEY;
  const objectFit = block.objectFit ?? "cover";
  const frameBg =
    block.letterboxBackground ??
    (objectFit === "contain" ? "#ffffff" : "rgba(0,0,0,0.2)");

  const { url, error } = useSignedMediaUrl(projectKey, block.objectPath);
  const titleColor = block.textColors?.title ?? "#ffffff";
  const captionColor = block.textColors?.caption ?? "#cfcccc";
  const annotationColor = block.textColors?.annotation ?? "#dbe6f0";

  const caption = block.caption ? (
    <Typography
      sx={bodyTypeSx("figureLabel", {
        color: captionColor,
        textAlign: "center",
        width: "100%",
        m: 0,
      })}
    >
      {block.caption}
    </Typography>
  ) : null;

  const blockTitle = block.title ? (
    <Typography
      component="h3"
      sx={{
        fontFamily: "'Poppins', Helvetica",
        fontWeight: 700,
        color: titleColor,
        fontSize: { xs: "1rem", md: "1.125rem" },
        textAlign: "center",
        lineHeight: 1.3,
        width: "100%",
      }}
    >
      {block.title}
    </Typography>
  ) : null;

  const annotation = block.annotation ? (
    <Typography
      sx={
        block.caption
          ? bodyTypeSx("figureHint", {
              color: annotationColor,
              textAlign: "center",
              width: "100%",
              m: 0,
            })
          : {
              color: annotationColor,
              fontSize: "12px",
              lineHeight: 1.5,
              fontFamily: "'Poppins', Helvetica",
              textAlign: "center",
              fontStyle: "italic",
              width: "100%",
            }
      }
    >
      {block.annotation}
    </Typography>
  ) : null;

  const figureFooter =
    block.caption || block.annotation ? (
      <Stack spacing={0.5} alignItems="center" sx={{ width: "100%" }}>
        {caption}
        {annotation}
      </Stack>
    ) : null;

  if (block.lightbox) {
    if (error) {
      return (
        <Stack {...rootStackProps}>
          <Typography color="error" variant="body2" sx={{ px: 1 }}>
            Image failed: {error}
          </Typography>
        </Stack>
      );
    }

    if (!url) {
      return (
        <Stack {...rootStackProps}>
          <Box sx={getImageFrameSx(ratio, frameBg, block.frameDimensionsPx, { forLoading: true })}>
            <CircularProgress size={32} sx={{ color: "rgba(255,255,255,0.7)" }} />
          </Box>
          {figureFooter}
        </Stack>
      );
    }

    const modalBg =
      block.lightboxModalBackground ?? DEFAULT_LIGHTBOX_MODAL_BG;

    return (
      <Stack {...rootStackProps}>
        {blockTitle}
        <Box sx={getConstrainedFrameSx(block.frameDimensionsPx)}>
          <SlideshowLightbox
            framework="next"
            images={[{ src: url, alt: block.alt }]}
            lightboxIdentifier={block.id}
            showThumbnails={false}
            showSlideshowIcon={false}
            showNavigationDots={false}
            backgroundColor={modalBg}
            iconColor={lightboxIconColorForModalBackground(modalBg)}
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
        </Box>
        {figureFooter}
      </Stack>
    );
  }

  return (
    <Stack {...rootStackProps}>
      {blockTitle}
      <Box sx={getImageFrameSx(ratio, frameBg, block.frameDimensionsPx)}>
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
      {figureFooter}
    </Stack>
  );
}
