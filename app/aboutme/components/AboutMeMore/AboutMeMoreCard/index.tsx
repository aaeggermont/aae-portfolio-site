"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import certifications from "./images/certifications.png";
import education from "./images/education.png";
import personal from "./images/personal.png";
import professional_experience from "./images/professional_experience.png";

export enum AboutMeMoreCardType {
  professional_experience = "professional_experience",
  education = "education",
  certifications = "certifications",
  personal = "personal",
}

const TypeCardImg: Record<AboutMeMoreCardType, StaticImageData> = {
  certifications,
  education,
  personal,
  professional_experience,
} as const;

export type AboutMeMoreCardProps = {
  type: null | AboutMeMoreCardType;
  title: string;
  /** Optional one-line blurb under the title. */
  description?: string;
  selected: boolean;
  onClick: (type: AboutMeMoreCardType | null) => void;
};

export function AboutMeMoreCard({
  type = null,
  title = "",
  description,
  selected = false,
  onClick,
}: AboutMeMoreCardProps) {
  const img = type ? TypeCardImg[type] : null;

  return (
    <Card
      onClick={() => onClick(type)}
      sx={{
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
        backgroundColor: "#ffffff",
        transition:
          "transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, opacity 0.22s ease",
        width: 280,
        height: 210,
        maxWidth: "100%",
        flexShrink: 0,
        overflow: "hidden",

        // selected state (subtle but clear)
        outline: selected ? "2px solid rgba(7, 76, 95, 0.55)" : "1px solid rgba(0,0,0,0.06)",
        background: selected ? "rgba(247, 251, 255, 0.9)" : "#fff",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.18)",
          backgroundColor: "#f7fbff",
        },
        "&:active": {
          transform: "translateY(-2px)",
        },
      }}
      raised
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: "24px",
          boxSizing: "border-box",
          gap: "16px",
          borderRadius: "inherit",
          overflow: "hidden",
          "& .MuiCardActionArea-focusHighlight": {
            backgroundColor: "transparent",
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            width: 37,
            height: 37,
            flexShrink: 0,
          }}
        >
          {img ? (
            <Image
              src={img}
              alt={type ?? "about-me"}
              fill
              style={{ objectFit: "contain" }}
              sizes="37px"
            />
          ) : null}
        </Box>

        {/* Title + optional description */}
        <CardContent
          sx={{
            padding: "0 !important",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
            flex: 1,
            gap: "0.5rem",
            minHeight: 0,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 500,
              color: "#074c5f",
              lineHeight: 1.3,
              fontSize: "18px",
            }}
          >
            {title}
          </Typography>
          {description ? (
            <Typography
              component="p"
              sx={{
                margin: 0,
                fontFamily: "var(--font-poppins)",
                fontWeight: 300,
                color: "#074c5f",
                lineHeight: 1.4,
                fontSize: "16px",
              }}
            >
              {description}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
