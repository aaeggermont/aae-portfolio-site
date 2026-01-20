"use client";

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
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
  // Encode to keep key safe even if URL has query params
  return `pdfviewer:v1:${encodeURIComponent(fileUrl)}`;
}

function ToolbarSkeleton() {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
      <Box>
        <Skeleton variant="text" width={180} height={26} />
        <Skeleton variant="text" width={110} height={18} />
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="rectangular" width={56} height={18} sx={{ borderRadius: 1 }} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Stack>
    </Stack>
  );
}

function PageSkeleton() {
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

export default function PdfViewer({ fileUrl, title }: PdfViewerProps) {
  const [numPages, setNumPages] = React.useState<number>(0);

  // Defaults
  const [page, setPage] = React.useState<number>(1);
  const [scale, setScale] = React.useState<number>(1.0);

  const [docLoaded, setDocLoaded] = React.useState(false);
  const [pageRendering, setPageRendering] = React.useState(true);

  // Track whether we've restored state for the current fileUrl
  const restoredRef = React.useRef<string | null>(null);

  // ✅ Restore last page/zoom when file changes
  React.useEffect(() => {
    setDocLoaded(false);
    setNumPages(0);
    setPageRendering(true);

    // Reset to defaults first (in case no saved state)
    setPage(1);
    setScale(1.0);

    try {
      const raw = localStorage.getItem(storageKey(fileUrl));
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PdfPersistedState>;
        const nextPage = typeof parsed.page === "number" && parsed.page > 0 ? parsed.page : 1;
        const nextScale =
          typeof parsed.scale === "number" && parsed.scale > 0 ? parsed.scale : 1.0;

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

    // ✅ Clamp restored page to valid range once we know numPages
    setPage((p) => {
      const clamped = Math.min(Math.max(1, p), numPages);
      return clamped;
    });

    setPageRendering(true);
  };

  // When page or scale changes (after doc is loaded), show skeleton until render completes
  React.useEffect(() => {
    if (!docLoaded) return;
    setPageRendering(true);
  }, [docLoaded, page, scale]);

  // ✅ Persist page + scale (debounced)
  React.useEffect(() => {
    if (!docLoaded) return;
    if (restoredRef.current !== fileUrl) return; // sanity: only persist for active doc

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
              onClick={() => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)))}
              aria-label="Zoom out"
            >
              <ZoomOutIcon fontSize="small" />
            </IconButton>

            <Typography variant="caption" sx={{ minWidth: 44, textAlign: "center" }}>
              {Math.round(scale * 100)}%
            </Typography>

            <IconButton
              size="small"
              onClick={() => setScale((s) => Math.min(2.0, +(s + 0.1).toFixed(2)))}
              aria-label="Zoom in"
            >
              <ZoomInIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      )}

      {/* Canvas area */}
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
          position: "relative", // ✅ anchor overlay skeleton
        }}
      >
        {/* Skeleton overlay while a page is rendering */}
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
          loading={<PageSkeleton />}
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
  );
}
