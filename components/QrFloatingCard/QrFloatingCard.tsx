"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import styles from "./QrFloatingCard.module.scss";

type Props = {
  src: string;            // "/images/qr/AAEQRImage.png"
  title?: string;         // "Scan me"
  subtitle?: string;      // "Open portfolio on mobile"
  size?: number;          // QR image size
  href?: string;          // Optional link
};

export default function QrFloatingCard({
  src,
  title = "Scan me",
  subtitle = "Open my portfolio on your phone",
  size = 240,
  href,
}: Props) {
  const content = (
    <Paper className={`${styles.card} qrfloatingcard`} elevation={2}>
      {/* Floating accents */}
      <span className={styles.floatA} aria-hidden="true" />
      <span className={styles.floatB} aria-hidden="true" />
      <span className={styles.floatC} aria-hidden="true" />

      {/* QR container */}
      <Box className={styles.qrFrame} sx={{ width: size + 28 }}>
        <Box
          className={styles.qrInner}
          sx={{
            width: size,
            height: size,
          }}
        >
          <Image
            src={src}
            alt={title}
            fill
            sizes={`${size}px`}
            style={{ objectFit: "contain" }}
            priority={false}
          />
        </Box>
      </Box>
    </Paper>
  );

  if (!href) return content;

  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      sx={{ display: "inline-flex", textDecoration: "none" }}
      aria-label={`${title} (opens link)`}
    >
      {content}
    </Box>
  );
}
