"use client";

import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import type { StaticImageData } from "next/image";
import { SELECTED_WORK_CARD } from "./selectedWorkCardLayout";

export type LatestProjectProps = {
  title: string;
  thumbnailImg: StaticImageData;
  role: string;
  description: string;
  outcome: string;
  href?: string;
};

function LatestProjectCard({
  title,
  thumbnailImg,
  role,
  description,
  outcome,
  href,
}: LatestProjectProps) {
  const { widthPx, heightPx, imageHeightPx, contentPaddingPx } =
    SELECTED_WORK_CARD;

  return (
    <Card
      sx={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        flexShrink: 0,
        borderRadius: 3,
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.3s ease",
        overflow: "hidden",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 26px rgba(0, 0, 0, 0.18)",
        },

        "&:hover .project-media": {
          opacity: 0.92,
        },
      }}
      raised
    >
      <CardActionArea
        {...(href
          ? { component: Link, href }
          : { disableRipple: true })}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          boxSizing: "border-box",
          ...(href ? {} : { cursor: "default" }),
        }}
      >
        <CardMedia
          component="img"
          className="project-media"
          image={typeof thumbnailImg === "string" ? thumbnailImg : thumbnailImg.src}
          alt={title}
          sx={{
            display: "block",
            width: "100%",
            height: `${imageHeightPx}px`,
            flexShrink: 0,
            objectFit: "cover",
            objectPosition: "center",
            transition: "opacity 0.3s ease",
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minHeight: 0,
            boxSizing: "border-box",
            padding: `${contentPaddingPx}px`,
            "&:last-child": {
              paddingBottom: `${contentPaddingPx}px`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1,
              // Reserve two title lines so single-line titles don't shift the footer.
              minHeight: "calc(1rem * 1.35 * 2)",
            }}
          >
            <Typography
              component="h3"
              sx={{
                flex: 1,
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
                color: "#011114",
                lineHeight: 1.35,
                textAlign: "left",
              }}
            >
              {title}
            </Typography>
            <NorthEastIcon
              aria-hidden
              sx={{
                fontSize: 18,
                color: "#4a5560",
                mt: "2px",
                flexShrink: 0,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              color: "#F59F0A",
              lineHeight: 1.3,
              textAlign: "left",
            }}
          >
            {role}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: 400,
              fontFamily: "Poppins, sans-serif",
              color: "#5c6b73",
              lineHeight: 1.5,
              textAlign: "left",
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Divider sx={{ borderColor: "rgba(1, 17, 20, 0.12)" }} />

            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                fontFamily: "Poppins, sans-serif",
                color: "#011114",
                lineHeight: 1.4,
                textAlign: "left",
              }}
            >
              {outcome}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default LatestProjectCard;
