"use client";

import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { auth } from "@/firebase";
import SessionAccessDialog, {
  type SessionAccessDialogReason,
} from "@/lib/access/SessionAccessDialog";
import { signOutSessionAndReloadForSignIn } from "@/lib/auth/signInAgainNavigation";

type GatedImageProps = {
  projectKey: string; // e.g. "project_4"
  objectPath: string; // e.g. "projects/project_4/GenericTaskFlow.png"
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** `intrinsic` uses width/height; `fill` fills the parent box. */
  mode?: "intrinsic" | "fill";
  /** Full-viewport loading overlay until signed URL + image decode. */
  fullViewportLoading?: boolean;
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
  mode = "intrinsic",
  fullViewportLoading = false,
}: GatedImageProps) {
  const [url, setUrl] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [imageReady, setImageReady] = React.useState(false);
  const [dialogReason, setDialogReason] =
    React.useState<SessionAccessDialogReason | null>(null);

  const isAccessIssueReason = React.useCallback((reason?: string) => {
    return (
      reason === "session_hard_expired" ||
      reason === "no_session" ||
      reason === "bad_session" ||
      reason === "not_allowed" ||
      reason === "signed_url_failed"
    );
  }, []);

  React.useEffect(() => {
    let alive = true;

    async function load() {
      setErr(null);
      setUrl(null);

      const idToken = await auth.currentUser?.getIdToken().catch(() => undefined);

      const res = await fetch("/api/media/signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ projectKey, objectPath }),
      });

      const data = await res.json().catch(() => null);

      if (!alive) return;

      if (!res.ok || !data?.url) {
        const reason = typeof data?.reason === "string" ? data.reason : undefined;
        if (isAccessIssueReason(reason)) {
          setDialogReason(reason as SessionAccessDialogReason);
        }
        setErr(data?.message || reason || `signed-url failed (${res.status})`);
        return;
      }

      setUrl(data.url);
    }

    load().catch((e: unknown) => {
      if (!alive) return;
      setErr(e instanceof Error ? e.message : "Failed to load image.");
    });

    return () => {
      alive = false;
    };
  }, [projectKey, objectPath, isAccessIssueReason]);

  React.useEffect(() => {
    if (!fullViewportLoading) return;
    setImageReady(false);
  }, [fullViewportLoading, url]);

  const isFill = mode === "fill";
  const missingIntrinsicSize = !isFill && (!width || !height);
  const showFullViewportLoadingOverlay =
    fullViewportLoading && !err && (!url || !imageReady);

  const mergedImageStyle: React.CSSProperties = {
    objectFit: "contain",
    ...style,
    ...(fullViewportLoading && url && !imageReady ? { opacity: 0 } : {}),
  };

  const inner =
    err ? (
      <div>Image failed: {err}</div>
    ) : missingIntrinsicSize ? (
      <div>Image failed: width/height required when mode is intrinsic.</div>
    ) : !url ? (
      fullViewportLoading ? null : (
        <Typography variant="body2" color="text.secondary" component="div">
          Loading image…
        </Typography>
      )
    ) : (
      <Image
        src={url}
        alt={alt}
        {...(isFill ? { fill: true } : { width, height })}
        className={className}
        style={mergedImageStyle}
        sizes={sizes}
        priority={priority}
        unoptimized
        onLoadingComplete={() => {
          if (fullViewportLoading) setImageReady(true);
        }}
      />
    );

  const handleSignInAgain = React.useCallback(() => {
    void signOutSessionAndReloadForSignIn(auth);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: isFill ? "100%" : undefined,
        height: isFill ? "100%" : undefined,
      }}
    >
      {showFullViewportLoadingOverlay ? (
        <Box
          aria-busy="true"
          aria-live="polite"
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (t) => t.zIndex.modal,
            display: "grid",
            placeItems: "center",
            px: 2,
            bgcolor: "rgba(244, 248, 251, 0.92)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Stack spacing={2} alignItems="center" sx={{ width: "100%", maxWidth: 360 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {!url ? "Preparing banner…" : "Loading banner…"}
            </Typography>
            <LinearProgress sx={{ width: "100%", borderRadius: 1 }} />
          </Stack>
        </Box>
      ) : null}
      {inner}
      <SessionAccessDialog
        open={dialogReason !== null}
        reason={dialogReason ?? "unknown"}
        onSignInAgain={handleSignInAgain}
      />
    </Box>
  );
}
