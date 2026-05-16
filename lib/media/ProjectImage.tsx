"use client";

import React from "react";
import Image from "next/image";
import { useProjectAccess } from "@/lib/access/ProjectAccessContext";
import GatedImage from "@/lib/media/GatedImage";
import {
  buildPublicStorageUrl,
  stripLeadingSlash,
} from "@/lib/firebase/publicStorageUrl";

type ProjectImageProps = {
  objectPath?: string; // e.g. "projects/project_1/GenericTaskFlow.png"
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** When restricted, passes through to GatedImage `fullViewportLoading`. */
  fullViewportLoading?: boolean;
  /** Optional CSS `border-radius` (number → px, or any CSS string like `'1rem'`, `'50%'`).
   *  `style.borderRadius` overrides this when both are set. */
  borderRadius?: React.CSSProperties["borderRadius"];
  /** When false, Next.js may resize remote images and honor `sizes` (requires `images.remotePatterns`). Default true preserves existing behavior. */
  unoptimized?: boolean;
};


export default function ProjectImage({
  objectPath,
  alt,
  width = 0,
  height = 0,
  className,
  style,
  sizes,
  priority = false,
  fullViewportLoading = false,
  borderRadius,
  unoptimized = true,
}: ProjectImageProps) {
  const { projectKey, visibility } = useProjectAccess();
  console.log("Project Access Context:", { projectKey, visibility });

  if (!objectPath) {
    return null;
  }

  const normalizedPath = stripLeadingSlash(objectPath);

  /* `borderRadius` is a convenience default; spread `style` after so caller-supplied
     `style.borderRadius` always wins. */
  const mergedStyle: React.CSSProperties | undefined =
    borderRadius != null || style
      ? { ...(borderRadius != null ? { borderRadius } : {}), ...style }
      : undefined;

  if (visibility === "public") {
    const publicUrl = buildPublicStorageUrl(normalizedPath);

    return (
      <Image
        src={publicUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={mergedStyle}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
      />
    );
  }

  return (
    <GatedImage
      projectKey={projectKey}
      objectPath={normalizedPath}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={mergedStyle}
      sizes={sizes}
      priority={priority}
      fullViewportLoading={fullViewportLoading}
    />
  );
}