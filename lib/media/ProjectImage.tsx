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
}: ProjectImageProps) {
  const { projectKey, visibility } = useProjectAccess();
  console.log("Project Access Context:", { projectKey, visibility });

  if (!objectPath) {
    return null;
  }

  const normalizedPath = stripLeadingSlash(objectPath);

  if (visibility === "public") {
    const publicUrl = buildPublicStorageUrl(normalizedPath);

    return (
      <Image
        src={publicUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        sizes={sizes}
        priority={priority}
        unoptimized
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
      style={style}
      sizes={sizes}
      priority={priority}
      fullViewportLoading={fullViewportLoading}
    />
  );
}