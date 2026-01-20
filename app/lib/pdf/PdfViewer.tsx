"use client";

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

type PdfViewerProps = {
  fileUrl: string;
  title?: string;
};

type PdfPersistedState = {
  page: number;
  scale: number;
};

function storageKey(fileUrl: string) {
  return `pdfviewer:v3:${encodeURIComponent(fileUrl)}`;
}

function ToolbarSkeleton() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Box>
        <Skeleton variant="text" width={180} height={26} />
        <Skeleton variant="text" width={110} height={18} />
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton
          variant="rectangular"
          width={56}
          height={18}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Stack>
    </Stack>
  );
}

function MainPageSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "70vh", md: "75vh" },
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        bgcolor: "rgba(0,0,0,0.03)",
        borderRadius: 2,
        p: 1,
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: { xs: "92%", sm: 520, md: 640 },
          height: { xs: 520, sm: 680, md: 760 },
          borderRadius: 2,
        }}
      />
    </Box>
  );
}

function ThumbSkeletonList({ width = 120 }: { width?: number }) {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          sx={{
            width,
            height: 160,
            borderRadius: 1,
            mb: 1,
          }}
        />
      ))}
    </>
  );
}

export default function PdfViewer({ fileUrl, title }: PdfViewerProps) {
  const [numPages, setNumPages] = React.useState<number>(0);

  const [page, setPage] = React.useState<number>(1);
  const [scale, setScale] = React.useState<number>(1.0);

  const [docLoaded, setDocLoaded] = React.useState(false);
  const [pageRendering, setPageRendering] = React.useState(true);

  const restoredRef = React.useRef<string | null>(null);

  // --- Thumbnail settings ---
  const THUMB_WIDTH = 120;
  const MAX_THUMBS = 60;

  const thumbPages = React.useMemo(() => {
    const count = Math.min(numPages || MAX_THUMBS, MAX_THUMBS);
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [numPages]);

  // ✅ Reset + restore last page/zoom when switching PDFs
  React.useEffect(() => {
    setDocLoaded(false);
    setNumPages(0);
    setPageRendering(true);

    setPage(1);
    setScale(1.0);

    try {
      const raw = localStorage.getItem(storageKey(fileUrl));
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PdfPersistedState>;
        const nextPage =
          typeof parsed.page === "number" && parsed.page > 0 ? parsed.page : 1;
        const nextScale =
          typeof parsed.scale === "number" && parsed.scale > 0
            ? parsed.scale
            : 1.0;

        setPage(nextPage);
        setScale(nextScale);
      }
    } catch {
      // ignore bad storage
    }

    restoredRef.current = fileUrl;
  }, [fileUrl]);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setDocLoaded(true);

    // Clamp restored page after we know numPages
    setPage((p) => Math.min(Math.max(1, p), numPages));
    setPageRendering(true);
  };

  // When page/scale changes, show skeleton until render completes
  React.useEffect(() => {
    if (!docLoaded) return;
    setPageRendering(true);
  }, [docLoaded, page, scale]);

  // ✅ Persist page+zoom (debounced)
  React.useEffect(() => {
    if (!docLoaded) return;
    if (restoredRef.current !== fileUrl) return;

    const handle = window.setTimeout(() => {
      try {
        const payload: PdfPersistedState = { page, scale };
        localStorage.setItem(storageKey(fileUrl), JSON.stringify(payload));
      } catch {
        // ignore quota / storage errors
      }
    }, 250);

    return () => window.clearTimeout(handle);
  }, [docLoaded, fileUrl, page, scale]);

  const canPrev = page > 1;
  const canNext = numPages > 0 && page < numPages;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Toolbar */}
      {!docLoaded ? (
        <ToolbarSkeleton />
      ) : (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Page {page} / {numPages || "—"}
              {numPages > MAX_THUMBS ? ` (thumbs: first ${MAX_THUMBS})` : ""}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              size="small"
              onClick={() => canPrev && setPage((p) => p - 1)}
              disabled={!canPrev}
              aria-label="Previous page"
            >
              <NavigateBeforeIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => canNext && setPage((p) => p + 1)}
              disabled={!canNext}
              aria-label="Next page"
            >
              <NavigateNextIcon fontSize="small" />
            </IconButton>

            <Box sx={{ width: 12 }} />

            <IconButton
              size="small"
              onClick={() =>
                setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)))
              }
              aria-label="Zoom out"
            >
              <ZoomOutIcon fontSize="small" />
            </IconButton>

            <Typography variant="caption" sx={{ minWidth: 44, textAlign: "center" }}>
              {Math.round(scale * 100)}%
            </Typography>

            <IconButton
              size="small"
              onClick={() =>
                setScale((s) => Math.min(2.0, +(s + 0.1).toFixed(2)))
              }
              aria-label="Zoom in"
            >
              <ZoomInIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      )}

      {/* Layout: Thumbs + Main */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          width: "100%",
          height: { xs: "70vh", md: "75vh" },
        }}
      >
        {/* Thumbnails sidebar (hidden on xs/sm) */}
        <Box
          sx={{
            width: THUMB_WIDTH + 24,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            bgcolor: "rgba(0,0,0,0.03)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box sx={{ px: 1.25, py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Pages
            </Typography>
          </Box>
          <Divider />

          <Box
            sx={{
              px: 1,
              py: 1,
              overflowY: "auto",
              height: "100%",
            }}
          >
            <Document
              file={fileUrl}
              loading={<ThumbSkeletonList width={THUMB_WIDTH} />}
              error={
                <Typography variant="caption" color="error">
                  Failed to load thumbnails
                </Typography>
              }
            >
              {thumbPages.map((p) => (
                <Box
                  key={p}
                  onClick={() => setPage(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPage(p);
                    }
                  }}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    overflow: "hidden",
                    cursor: "pointer",
                    outline:
                      p === page
                        ? "2px solid rgba(7, 76, 95, 0.55)"
                        : "1px solid rgba(0,0,0,0.08)",
                    bgcolor: "white",
                    "&:hover": {
                      outline: "2px solid rgba(7, 76, 95, 0.35)",
                    },
                  }}
                >
                  <Page
                    pageNumber={p}
                    width={THUMB_WIDTH}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                  <Box sx={{ px: 0.75, py: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {p}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Document>
          </Box>
        </Box>

        {/* Main viewer */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "rgba(0,0,0,0.03)",
            borderRadius: 2,
            p: 1,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {pageRendering && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pt: 1,
                pointerEvents: "none",
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: "92%", sm: 520, md: 640 },
                  height: { xs: 520, sm: 680, md: 760 },
                  borderRadius: 2,
                }}
              />
            </Box>
          )}

          <Document
            file={fileUrl}
            onLoadSuccess={onLoadSuccess}
            loading={<MainPageSkeleton />}
            error={<Typography color="error">Failed to load PDF.</Typography>}
          >
            <Page
              pageNumber={page}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
              onRenderSuccess={() => setPageRendering(false)}
              onRenderError={() => setPageRendering(false)}
            />
          </Document>
        </Box>
      </Box>
    </Box>
  );
}

