"use client";

import React, { useState } from "react";
import Image from "next/image";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./background.module.scss";

// Local type for the data shape coming from background-data.tsx
type BackgroundItem = {
  title: string;
  img: any;            // string | StaticImageData (from imported PNGs)
  description: string[];
};

type BackgroundCardProps = {
  info: BackgroundItem;
  dimensions?: {
    width: string | number;
    height: string | number;
  };
};

export default function BackgroundCard({ info }: BackgroundCardProps) {
  const [open, setOpen] = useState(false);

  const { title, img, description } = info;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Dialog with full description */}
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="background-dialog-title"
        aria-describedby="background-dialog-description"
      >
        {/* Header: icon + title */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            padding: "1rem 1.5rem 0",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 100,
              height: 100,
              flexShrink: 0,
            }}
          >
            <Image
              src={img}
              alt={title}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <DialogTitle
            id="background-dialog-title"
            sx={{
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

        {/* Body: paragraphs */}
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

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1.05rem" },
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              margin: "0.75rem 1rem",
              color: "#011114",
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Card */}
      <Card
        onClick={handleClickOpen}
        className={styles.fullHeightCard}
        sx={{
          // width/height are controlled by SCSS via fluid-card-size mixin
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
        <CardActionArea sx={{ height: "100%" }}>
          {/* Icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 120,
                height: 120,
              }}
            >
              <Image
                src={img}
                alt={title}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Title */}
          <CardContent>
            <div className={styles.backgroundTitle}>
              <span className={styles.backgroundTitleLabel}>{title}</span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

