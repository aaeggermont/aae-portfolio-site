"use client";

import React from "react";
import Image from "next/image";
import { useProjectAccess } from "@/lib/access/ProjectAccessContext";
import GatedImage from "@/lib/media/GatedImage";

type ProjectImageProps = {
  objectPath: string; // e.g. "projects/project_1/GenericTaskFlow.png"
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
};

function stripLeadingSlash(path: string) {
  return path.startsWith("/") ? path.slice(1) : path;
}

function buildPublicStorageUrl(objectPath: string) {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!bucket) {
    throw new Error("Missing NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  }

  const normalizedPath = stripLeadingSlash(objectPath);
  // Firebase Storage REST: path must be URI-encoded; ?alt=media returns file bytes (not JSON)
  const encodedPath = encodeURIComponent(normalizedPath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media`;
}

export default function ProjectImage({
  objectPath,
  alt,
  width,
  height,
  className,
  style,
  sizes,
  priority = false,
}: ProjectImageProps) {
  const { projectKey, visibility } = useProjectAccess();
  console.log("Project Access Context:", { projectKey, visibility });

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
    />
  );
}