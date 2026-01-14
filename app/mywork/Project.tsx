import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import "./Project.scss";

export type ProjectProps = {
  index: number;
  projectId: number;
  projectLink: string;
  similarProjects: Record<string, unknown>;
  skills: string;
  title: string;
  description: string;
  thumbnailImg: string;
};

type Props = { data: ProjectProps };

/**
 * Shared responsive card sizing token.
 * Uses your global theme breakpoints:
 * sm >= 360
 * md >= 768
 * lg >= 1024
 */
const cardSize = {
  width: { xs: 280, sm: 280, md: 276, lg: 345 },
  height: { xs: 180, sm: 180, md: 177, lg: 221 },
} as const;

export default function Project({ data }: Props) {
  const { title, thumbnailImg, description, skills } = data;

  return (
    <div className="flip-card-container">
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front">
          <Card
            sx={{
              ...cardSize,
              p: 0,
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              image={thumbnailImg}
              alt={title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0, 0, 0, 0.20)",
                color: "white",
                p: 1.25,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: { xs: "1rem", lg: "1.1rem" },
                  fontWeight: 500,
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                  m: 0,
                }}
              >
                {title}
              </Typography>
            </Box>
          </Card>
        </div>

        {/* BACK */}
        <div className="flip-card-back">
          <Card
            sx={{
              ...cardSize, // must match front dimensions
              p: 0,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardActionArea sx={{ width: "100%", height: "100%" }}>
              <CardContent sx={{ p: 2, height: "100%" }}>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "0.95rem", lg: "1rem" },
                    fontWeight: 500,
                  }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "0.75rem", lg: "0.8rem" },
                    fontWeight: 400,
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {description}
                </Typography>

                <Typography
                  sx={{
                    pt: 1,
                    mt: 0.5,
                    fontWeight: 800,
                    fontSize: { xs: "0.75rem", lg: "0.8rem" },
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {skills}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
