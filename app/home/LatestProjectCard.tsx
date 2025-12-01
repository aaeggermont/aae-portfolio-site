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
};

function LatestProjectCard({ title, thumbnailImg, description }: LatestProjectProps) {
  return (
    <Card
      sx={{
        width: { xs: "294px", sm: "294px", md: "317px", lg: "352px" },
        height:  { xs: "420px", sm: "420px", md: "440px", lg: "440px" },
        borderRadius: 3,
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.3s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 26px rgba(0, 0, 0, 0.18)",   // soft elevated glow
        },

        "&:hover .project-media": {
          opacity: 0.92, // subtle responsive hover fade
        },
      }}
      raised
    >
      <CardActionArea sx={{ height: "100%" }}>
        {/* ⭐ Full width image with hover fade handled by parent */}
        <CardMedia
          component="img"
          className="project-media"
          image={typeof thumbnailImg === "string" ? thumbnailImg : thumbnailImg.src}
          alt={title}
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            objectFit: "contain",
            transition: "opacity 0.3s ease",  // smooth fade on hover
          }}
        />

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {/* Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: { xs: "3.2rem", sm: "3.6rem", md: "3.6rem" },
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.1rem" },
                fontWeight: 500,
                fontFamily: "Poppins, sans-serif",
                color: "#011114",
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ textAlign: "left" }}>
            {description.map((paragraph, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontSize: { xs: "0.95rem", sm: "1rem", md: "0.98rem" },
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
