"use client";

import React from "react";
import Image from "next/image";

type Props = {
  projectKey: string;          // "project_4"
  objectPath: string;          // "projects/project_4/GenericTaskFlow.png"
  alt: string;
  width: number;
  height: number;
};

export function GatedImage({ projectKey, objectPath, alt, width, height }: Props) {
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
        credentials: "include", // IMPORTANT: ensure cookie is sent
        body: JSON.stringify({ projectKey, objectPath }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `signed-url failed (${res.status})`);
      }

      const data = (await res.json()) as { url: string };
      if (!alive) return;
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

  if (err) return <div>Image failed: {err}</div>;
  if (!url) return <div>Loading image…</div>;

  // IMPORTANT:
  // If you keep next/image optimization ON, Next.js will fetch this signed URL
  // from the server without cookies (fine). Signed URL itself is the auth.
  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: "contain" }}
    />
  );
}
