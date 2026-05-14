"use client";

import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";
import { getUsableLayoutWidth } from "../layoutConfig";

/* The card caps at the project's desktop usable width (`1260 − 2 × 80 = 1100px`) and
   centers in any viewport wider than that. Inside `.project-content` the parent already
   constrains it on desktop, so this `maxWidth` is mostly defensive — it keeps the
   component looking right if it's ever rendered outside the page wrapper. */
const CONTEXT_NOTIFICATIONS_MAX_WIDTH = getUsableLayoutWidth("desktop");

const NOTIFICATION_IMAGE_INTRINSIC_WIDTH = 434;
const NOTIFICATION_IMAGE_INTRINSIC_HEIGHT = 361;
const NOTIFICATION_CAROUSEL_INTERVAL_MS = 3500;

const navigationButtons = [
  {
    key: "previous",
    label: "Previous notification",
    icon: <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "next",
    label: "Next notification",
    icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} />,
  },
];

export interface ContextualNotificationsProps {
  title: string;
  /* Optional + defaulted in the component because Firestore data is loosely typed and
     the field may not be present on every document. Same pattern as `ArAsNarrative`. */
  paragraphs?: string[];
  images?: string[];
  alt?: string;
}

export const ContextualNotifications = ({
  title,
  paragraphs = [],
  images = [],
  alt = "Contextual notification example",
}: ContextualNotificationsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasUserInteractedWithCarousel, setHasUserInteractedWithCarousel] =
    useState(false);
  const currentImage = images[currentImageIndex];
  const canNavigateCarousel = images.length > 1;

  useEffect(() => {
    if (currentImageIndex < images.length) return;
    setCurrentImageIndex(0);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    if (hasUserInteractedWithCarousel || !canNavigateCarousel) return;

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % images.length);
    }, NOTIFICATION_CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [canNavigateCarousel, hasUserInteractedWithCarousel, images.length]);

  const handlePrevious = () => {
    if (!canNavigateCarousel) return;
    setHasUserInteractedWithCarousel(true);
    setCurrentImageIndex(
      (index) => (index - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    if (!canNavigateCarousel) return;
    setHasUserInteractedWithCarousel(true);
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: CONTEXT_NOTIFICATIONS_MAX_WIDTH,
        mx: "auto",
        bgcolor: "#f5f5f7",
        borderRadius: { xs: 4, md: "30px" },
        px: { xs: 3, sm: 5, md: 6 },
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Typography
              component="h2"
              variant="h4"
              sx={{
                color: "#03133c",
                fontWeight: 800,
                fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.75rem" },
                lineHeight: 1.2,
                letterSpacing: 0,
              }}
            >
              {title}
            </Typography>
            {paragraphs.map((paragraph, idx) => (
              <Typography
                key={idx}
                component="p"
                sx={{
                  color: "#010a24",
                  fontSize: { xs: "1.5rem", sm: "1.2rem", md: "1.5rem" },
                  lineHeight: 1.45,
                  letterSpacing: 0,
                  maxWidth: 760,
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Stack>
          <Stack spacing={3} alignItems="center">
            {currentImage ? (
              <Box sx={{ width: "100%", maxWidth: 434 }}>
                <ProjectImage
                  objectPath={currentImage}
                  alt={`${alt} ${currentImageIndex + 1}`}
                  width={NOTIFICATION_IMAGE_INTRINSIC_WIDTH}
                  height={NOTIFICATION_IMAGE_INTRINSIC_HEIGHT}
                  sizes="(max-width: 767px) 100vw, 434px"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </Box>
            ) : null}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ width: "100%" }}
            >
              {navigationButtons.map((button) => (
                <IconButton
                  key={button.key}
                  aria-label={button.label}
                  disabled={!canNavigateCarousel}
                  onClick={
                    button.key === "previous" ? handlePrevious : handleNext
                  }
                  size="small"
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor:
                      button.key === "next" ? "#142257" : "#f1f1f3",
                    color: button.key === "next" ? "#ffffff" : "#11255f",
                    "&.Mui-disabled": {
                      bgcolor: "#f1f1f3",
                      color: "rgba(17, 37, 95, 0.28)",
                    },
                    "&:hover": {
                      bgcolor:
                        button.key === "next" ? "#1d317a" : "#e8e8ec",
                    },
                  }}
                >
                  {button.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContextualNotifications;
