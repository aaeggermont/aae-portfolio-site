"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

type PdfModalProps = {
  open: boolean;
  onClose: () => void;
  fileUrl: string | null;
  title?: string;
};

export default function PdfModal({ open, onClose, fileUrl, title }: PdfModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {title ?? "PDF"}
        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {fileUrl ? <PdfViewer fileUrl={fileUrl} title={title} /> : null}
      </DialogContent>
    </Dialog>
  );
}
