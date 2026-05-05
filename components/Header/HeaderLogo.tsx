"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { buildPublicStorageUrlWithBucket } from "@/lib/firebase/publicStorageUrl";

const LOGO_PNG_STORAGE_PATH = "site/AAE-SimpleLogo.png";
const LOCAL_FALLBACK_SVG = "/images/topbar-header/AAE-SimpleLogo.svg";

type LogoProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
  className?: string;
  alt?: string;
};

function parseDim(v: string | number | undefined, fallback: number): number {
  if (v === undefined) return fallback;
  const n = typeof v === "number" ? v : parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

function useLogoSrc(): string {
  return useMemo(() => {
    const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim();
    if (!bucket) return LOCAL_FALLBACK_SVG;
    /* Use the bucket string from env as-is. New projects use `*.firebasestorage.app` in the REST path;
     * rewriting to `*.appspot.com` breaks URLs for those buckets (404). */
    try {
      return buildPublicStorageUrlWithBucket(bucket, LOGO_PNG_STORAGE_PATH);
    } catch {
      return LOCAL_FALLBACK_SVG;
    }
  }, []);
}

/**
 * PNG from Storage (`unoptimized` for public download URLs) or local SVG under `public/`.
 * Next `<Image>` keeps a real layout box — plain `<img>`/`<picture>` was collapsing in the flex header.
 */
export function HeaderLogo({
  width = 100,
  height = 30,
  className,
  alt = "Antonio Aranda Eggermont — home",
}: LogoProps) {
  const maxW = parseDim(width, 100);
  const maxH = parseDim(height, 30);
  const remoteSrc = useLogoSrc();
  const [src, setSrc] = useState(remoteSrc);

  const onError = useCallback(() => {
    setSrc((current) =>
      current !== LOCAL_FALLBACK_SVG ? LOCAL_FALLBACK_SVG : current,
    );
  }, []);

  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={maxW}
      height={maxH}
      unoptimized
      priority
      sizes={`${maxW}px`}
      onError={onError}
      style={{
        width: "auto",
        height: "auto",
        maxWidth: maxW,
        maxHeight: maxH,
        objectFit: "contain",
      }}
    />
  );
}
