"use client";

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ Worker: serve from your own site (reliable with Next)
// We’ll add the file in step 2.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

type PdfViewerProps = {
  fileUrl: string;          // e.g. "/pdfs/my-case-study.pdf"
  title?: string;
};

export default function PdfViewer({ fileUrl, title }: PdfViewerProps) {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [scale, setScale] = React.useState<number>(1.0);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPage(1);
  };

  const canPrev = page > 1;
  const canNext = numPages > 0 && page < numPages;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Toolbar */}
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

      {/* PDF canvas area */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "70vh", md: "75vh" },
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          bgcolor: "rgba(0,0,0,0.03)",
          borderRadius: 2,
          p: 1,
        }}
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onLoadSuccess}
          loading={<Typography>Loading PDF…</Typography>}
          error={<Typography color="error">Failed to load PDF.</Typography>}
        >
          <Page
            pageNumber={page}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </Box>
    </Box>
  );
}
