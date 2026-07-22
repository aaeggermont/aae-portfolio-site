"use client";

import React, { useState } from "react";
import Image from "next/image";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./background.module.scss";
import type { BackgroundItem } from "@/app/home/data/background-data";
import { buildPublicStorageUrl } from "@/lib/firebase/publicStorageUrl";

const DIALOG_ICON_OPACITY = 1;
const CARD_ICON_OPACITY = 1;

type BackgroundCardProps = {
  info: BackgroundItem;
};

export default function BackgroundCard({ info }: BackgroundCardProps) {
  const [open, setOpen] = useState(false);

  const {
    title,
    iconObjectPath,
    iconWidth = 36,
    iconHeight = 36,
    summary,
    description,
  } = info;
  const iconSrc = buildPublicStorageUrl(iconObjectPath);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="background-dialog-title"
        aria-describedby="background-dialog-description"
        slotProps={{
          paper: {
            className: styles.dialogPaper,
            sx: { position: "relative" },
          },
        }}
      >
        <div className={styles.dialogCloseSlot}>
          <Tooltip title="Close">
            <IconButton
              aria-label="Close dialog"
              onClick={handleClose}
              size="small"
              sx={{ color: "#011114" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>

        <div className={styles.dialogHeader}>
          <div className={styles.dialogHeaderMain}>
            <div className={styles.dialogIcon}>
              <Image
                src={iconSrc}
                alt={title}
                fill
                unoptimized
                style={{ objectFit: "contain", opacity: DIALOG_ICON_OPACITY }}
              />
            </div>

            <DialogTitle
              id="background-dialog-title"
              className={styles.dialogTitle}
              sx={{
                padding: 0,
                margin: 0,
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.6rem",
                  lg: "1.7rem",
                },
                fontWeight: 500,
                fontFamily: "Poppins, sans-serif",
                color: "#011114",
              }}
            >
              {title}
            </DialogTitle>
          </div>
        </div>

        <DialogContent dividers id="background-dialog-description">
          {description.map((paragraph, index) => (
            <DialogContentText
              key={index}
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.1rem",
                  lg: "1.1rem",
                },
                fontWeight: 400,
                fontFamily: "Poppins, sans-serif",
                margin: {
                  xs: "0.75rem 0.75rem",
                  sm: "1rem 1.5rem",
                  md: "1rem 2rem",
                  lg: "1rem 2.5rem",
                },
                color: "#011114",
              }}
            >
              {paragraph}
            </DialogContentText>
          ))}
        </DialogContent>
      </Dialog>

      <Card
        onClick={handleClickOpen}
        className={styles.fullHeightCard}
        sx={{
          cursor: "pointer",
          borderRadius: 3,
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
          backgroundColor: "#ffffff",
          transition:
            "transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, opacity 0.22s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 18px 45px rgba(0, 0, 0, 0.18)",
            backgroundColor: "#f7fbff",
          },
        }}
        raised
      >
        <CardActionArea
          className={styles.cardActionArea}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "24px",
            boxSizing: "border-box",
            gap: "16px",
          }}
        >
          <div className={styles.cardIconArea}>
            <div
              className={styles.cardIcon}
              style={{ width: iconWidth, height: iconHeight }}
            >
              <Image
                src={iconSrc}
                alt={title}
                fill
                unoptimized
                style={{ objectFit: "contain", opacity: CARD_ICON_OPACITY }}
              />
            </div>
          </div>

          <CardContent className={styles.cardContent}>
            <div className={styles.backgroundTitle}>
              <span className={styles.backgroundTitleLabel}>{title}</span>
            </div>
            <p className={styles.cardSummary}>{summary}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
