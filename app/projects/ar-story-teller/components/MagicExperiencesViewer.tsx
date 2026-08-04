"use client";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";

import ProjectImage from "@/lib/media/ProjectImage";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import { bodyTypeSx, titleTypeSx } from "../typography";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MagicExperienceSlide = {
  title: string;
  alt: string;
  longDescription: string;
  objectPath: string;
};

export type MagicExperiencesViewerProps = {
  open: boolean;
  onClose: () => void;
  slides: MagicExperienceSlide[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_COLOR = "#E8A317";
const TEXT_COLOR = "#ffffff";
const OVERLAY_BG = "rgba(10, 18, 32, 0.78)";
const NAV_BTN_BG = "rgba(255, 255, 255, 0.14)";
const NAV_BTN_BG_HOVER = "rgba(255, 255, 255, 0.22)";
const PHONE_INTRINSIC_WIDTH = 434;
const PHONE_INTRINSIC_HEIGHT = 884;

const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;
const DESKTOP_UP_MQ = breakpointMediaQuery.desktopUp;

// ─── Component ────────────────────────────────────────────────────────────────

export function MagicExperiencesViewer({
  open,
  onClose,
  slides,
  activeIndex,
  onActiveIndexChange,
}: MagicExperiencesViewerProps) {
  const total = slides.length;
  const slide = slides[activeIndex];
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < total - 1;

  const goPrev = useCallback(() => {
    if (activeIndex > 0) onActiveIndexChange(activeIndex - 1);
  }, [activeIndex, onActiveIndexChange]);

  const goNext = useCallback(() => {
    if (activeIndex < total - 1) onActiveIndexChange(activeIndex + 1);
  }, [activeIndex, onActiveIndexChange, total]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  if (!slide) return null;

  const stepLabel = `Step ${activeIndex + 1} of ${total}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      aria-labelledby="magic-experiences-viewer-title"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: OVERLAY_BG,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          },
        },
        paper: {
          elevation: 0,
          sx: {
            backgroundColor: "transparent",
            backgroundImage: "none",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 8, lg: 10 },
          py: { xs: 6, md: 4 },
          boxSizing: "border-box",
        }}
      >
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: { xs: 12, md: 20 },
            right: { xs: 12, md: 20 },
            zIndex: 2,
            width: 44,
            height: 44,
            color: TEXT_COLOR,
            bgcolor: NAV_BTN_BG,
            "&:hover": { bgcolor: NAV_BTN_BG_HOVER },
          }}
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          aria-label="Previous screen"
          onClick={goPrev}
          disabled={!canGoPrev}
          sx={{
            position: "absolute",
            left: { xs: 8, md: 16, lg: 24 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            color: TEXT_COLOR,
            bgcolor: NAV_BTN_BG,
            "&:hover": { bgcolor: NAV_BTN_BG_HOVER },
            "&.Mui-disabled": {
              color: "rgba(255,255,255,0.35)",
              bgcolor: "rgba(255,255,255,0.06)",
            },
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <IconButton
          aria-label="Next screen"
          onClick={goNext}
          disabled={!canGoNext}
          sx={{
            position: "absolute",
            right: { xs: 8, md: 16, lg: 24 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            color: TEXT_COLOR,
            bgcolor: NAV_BTN_BG,
            "&:hover": { bgcolor: NAV_BTN_BG_HOVER },
            "&.Mui-disabled": {
              color: "rgba(255,255,255,0.35)",
              bgcolor: "rgba(255,255,255,0.06)",
            },
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 3, md: 5, lg: 7 },
            width: "100%",
            maxWidth: 1100,
            [TABLET_UP_MQ]: {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Box
            sx={{
              flex: "0 1 auto",
              width: "100%",
              maxWidth: { xs: 220, sm: 260, md: 300, lg: 340 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProjectImage
              key={slide.objectPath}
              objectPath={slide.objectPath}
              alt={slide.alt}
              width={PHONE_INTRINSIC_WIDTH}
              height={PHONE_INTRINSIC_HEIGHT}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                filter:
                  "drop-shadow(0 12px 32px rgba(0,0,0,0.45)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
              }}
              priority
            />
          </Box>

          <Box
            sx={{
              flex: "1 1 0",
              minWidth: 0,
              maxWidth: { xs: 420, md: 440 },
              textAlign: { xs: "center", md: "left" },
              px: { xs: 1, md: 0 },
            }}
          >
            <Typography
              component="p"
              sx={titleTypeSx("eyebrow", {
                m: 0,
                mb: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: STEP_COLOR,
                fontWeight: 700,
              })}
            >
              {stepLabel}
            </Typography>
            <Typography
              id="magic-experiences-viewer-title"
              component="h2"
              sx={titleTypeSx("sectionSubTitle", {
                m: 0,
                mb: 2,
                color: TEXT_COLOR,
                [DESKTOP_UP_MQ]: {
                  fontSize: "36px",
                },
              })}
            >
              {slide.title}
            </Typography>
            <Typography
              component="p"
              sx={bodyTypeSx("bodyText", {
                m: 0,
                color: "rgba(255,255,255,0.88)",
              })}
            >
              {slide.longDescription}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default MagicExperiencesViewer;
