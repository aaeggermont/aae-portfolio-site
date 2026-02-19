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
  selected: boolean;
  onClick: (type: AboutMeMoreCardType | null) => void;
};

export function AboutMeMoreCard({
  type = null,
  title = "",
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
        width: { xs: 65, sm: 65, md: 135, lg: 165, xl: 207 },
        height: { xs: 110, sm: 110, md: 214, lg: 214, xl: 214 },

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
          alignItems: "center",
          justifyContent: "flex-start",
          py: { xs: 1.25, md: 2 },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            width: "70%",            
            maxWidth: { xs: 90, md: 150 },
            minWidth: { xs: 20, md: 110 },

            aspectRatio: "1 / 1",

            mt: { xs: 0.5, md: 0.5 },
            flexShrink: 0,
          }}
        >
          {img ? (
            <Image
              src={img}
              alt={type ?? "about-me"}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 600px) 90px, 150px"
            />
          ) : null}
        </Box>


        {/* Title */}
        <CardContent
          sx={{
            pt: { xs: 1, md: 1.25 },
            pb: { xs: 1.25, md: 2 },
            px: { xs: 1.25, md: 2 },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flex: 1,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 500,
              color: "#011114",
              lineHeight: 1.15,
              fontSize: { xs: "0.50rem", md: "1.05rem" },
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
