"use client";

import React from "react";
import Image from "next/image";

type GatedImageProps = {
  projectKey: string; // e.g. "project_4"
  objectPath: string; // e.g. "projects/project_4/GenericTaskFlow.png"
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
};

export default function GatedImage({
  projectKey,
  objectPath,
  alt,
  width,
  height,
  className,
  style,
  sizes,
  priority = false,
}: GatedImageProps) {
  const [url, setUrl] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;

    async function load() {
      setErr(null);
      setUrl(null);

      const res = await fetch("/api/media/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ projectKey, objectPath }),
      });

      const data = await res.json().catch(() => null);

      if (!alive) return;

      if (!res.ok || !data?.url) {
        setErr(data?.message || data?.reason || `signed-url failed (${res.status})`);
        return;
      }

      setUrl(data.url);
    }

    load().catch((e: any) => {
      if (!alive) return;
      setErr(e?.message ?? "Failed to load image.");
    });

    return () => {
      alive = false;
    };
  }, [projectKey, objectPath]);

  if (err) {
    return <div>Image failed: {err}</div>;
  }

  if (!url) {
    return <div>Loading image…</div>;
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain", ...style }}
      sizes={sizes}
      priority={priority}
      unoptimized
    />
  );
}