"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { SlideshowLightbox } from "lightbox.js-react";
import type { CSSProperties } from "react";

import { useProjectAccess } from "@/lib/access/ProjectAccessContext";
import {
  buildPublicStorageUrl,
  stripLeadingSlash,
} from "@/lib/firebase/publicStorageUrl";
import {
  lightboxIconColorForModalBackground,
  PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE,
} from "@/lib/media/lightboxModal";
import { useSignedMediaUrl } from "@/lib/media/useSignedMediaUrl";

export type ProjectImageLightboxProps = {
  objectPath: string;
  alt: string;
  /** Unique id for `data-lightboxjs` / `lightboxIdentifier` (stable per image). */
  lightboxId: string;
  width: number;
  height: number;
  style?: CSSProperties;
  /** Backdrop when the lightbox is open. */
  modalBackground?: string;
};

/**
 * Click-to-zoom image using `lightbox.js-react` (same stack as `ResearchMethodImageBlock`).
 * Requires `NEXT_PUBLIC_LIGHTBOXJS_LICENSE` and `initLightboxJS` in `app/providers.tsx`.
 */
export default function ProjectImageLightbox({
  objectPath,
  alt,
  lightboxId,
  width,
  height,
  style,
  modalBackground = PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE,
}: ProjectImageLightboxProps) {
  const { projectKey, visibility } = useProjectAccess();
  const normalizedPath = stripLeadingSlash(objectPath);
  const isPublic = visibility === "public";
  const publicUrl = isPublic ? buildPublicStorageUrl(normalizedPath) : null;
  const { url: signedUrl, error: signedError } = useSignedMediaUrl(
    projectKey,
    normalizedPath,
    { enabled: !isPublic },
  );
  const url = publicUrl ?? signedUrl;
  const error = publicUrl ? null : signedError;
  const modalBg = modalBackground;

  if (error) {
    return (
      <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
        Image failed: {error}
      </Typography>
    );
  }

  if (!url) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          py: 4,
        }}
      >
        <CircularProgress size={32} sx={{ color: "rgba(0,0,0,0.4)" }} />
      </Box>
    );
  }

  return (
    <SlideshowLightbox
      framework="next"
      images={[{ src: url, alt }]}
      lightboxIdentifier={lightboxId}
      showThumbnails={false}
      showSlideshowIcon={false}
      showNavigationDots={false}
      backgroundColor={modalBg}
      iconColor={lightboxIconColorForModalBackground(modalBg)}
      modalClose="clickOutside"
    >
      <img
        src={url}
        alt={alt}
        data-lightboxjs={lightboxId}
        width={width}
        height={height}
        style={{
          display: "block",
          width: style?.width ?? "100%",
          height: style?.height ?? "auto",
          maxWidth: style?.maxWidth,
          cursor: "zoom-in",
          ...style,
        }}
      />
    </SlideshowLightbox>
  );
}
