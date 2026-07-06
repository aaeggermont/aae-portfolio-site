"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { StaticImageData } from "next/image";

export type LatestProjectProps = {
  title: string;
  thumbnailImg: StaticImageData;
  description: string[];
  /** Desktop grid — fills the grid column width. */
  fullWidth?: boolean;
};

function LatestProjectCard({
  title,
  thumbnailImg,
  description,
  fullWidth = false,
}: LatestProjectProps) {
  return (
    <Card
      sx={{
        width: fullWidth ? "100%" : "294px",
        height: "390px",
        borderRadius: 1.5,
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.3s ease",

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
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          className="project-media"
          image={typeof thumbnailImg === "string" ? thumbnailImg : thumbnailImg.src}
          alt={title}
          sx={{
            display: "block",
            margin: "0 auto",
            objectFit: "contain",
            transition: "opacity 0.3s ease",
          }}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            padding: 2.5,
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

          <Box sx={{ textAlign: "left" }}>
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
