"use client";

import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { StaticImageData } from "next/image";
import { SELECTED_WORK_CARD } from "./selectedWorkCardLayout";

export type LatestProjectProps = {
  title: string;
  thumbnailImg: StaticImageData;
  description: string[];
  href?: string;
};

function LatestProjectCard({ title, thumbnailImg, description, href }: LatestProjectProps) {
  const { widthPx, heightPx, contentPaddingPx } = SELECTED_WORK_CARD;
  const bleedX = contentPaddingPx * 2;

  return (
    <Card
      sx={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        flexShrink: 0,
        borderRadius: 1.5,
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
          padding: `${contentPaddingPx}px`,
          paddingBottom: 0,
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
            width: `calc(100% + ${bleedX}px)`,
            maxWidth: `calc(100% + ${bleedX}px)`,
            height: "auto",
            flexShrink: 0,
            marginTop: `-${contentPaddingPx}px`,
            marginLeft: `-${contentPaddingPx}px`,
            marginRight: `-${contentPaddingPx}px`,
            marginBottom: `${contentPaddingPx}px`,
            objectFit: "contain",
            objectPosition: "top center",
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
            padding: 0,
            paddingBottom: `${contentPaddingPx}px`,
            "&:last-child": {
              paddingBottom: `${contentPaddingPx}px`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                fontFamily: "Poppins, sans-serif",
                color: "#011114",
              }}
            >
              {title}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left", flex: 1 }}>
            {description.map((paragraph, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  fontFamily: "Poppins, sans-serif",
                  color: "#011114",
                  lineHeight: 1.6,
                  "&:not(:last-of-type)": {
                    mb: 1,
                  },
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default LatestProjectCard;
