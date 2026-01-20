import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/navigation";
import "./Project.scss";

export type ProjectProps = {
  index: number;
  projectId: number;
  projectLink: string;
  projectType?: "pdf" | "page" | "external" | string;
  similarProjects: string[] | Record<string, unknown>;
  skills: string;
  title: string;
  description: string;
  thumbnailImg: string;
  latestProject?: boolean;
};

type Props = {
  data: ProjectProps;
  onOpenPdf?: (url: string, title?: string) => void;
};

const cardSize = {
  width: { xs: 280, sm: 280, md: 276, lg: 276, xl: 345 },
  height: { xs: 180, sm: 180, md: 177, lg: 177, xl: 221 },
} as const;

export default function Project({ data, onOpenPdf }: Props) {
  const { title, thumbnailImg, description, skills, projectType, projectLink } = data;

  const router = useRouter();
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleToggleFlip = () => setIsFlipped((v) => !v);
  const handleUnflip = () => setIsFlipped(false);

  const isExternal = (href: string) => /^https?:\/\//i.test(href);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation(); // don’t flip when activating

    // Decide behavior from Firestore
    if (projectType === "pdf") {
      // Open PDF modal using projectLink (e.g. "/pdfs/SpotifyMusicGroupsSession.pdf")
      onOpenPdf?.(projectLink, title);
      return;
    }

    // Otherwise: navigate
    if (isExternal(projectLink)) {
      window.open(projectLink, "_blank", "noopener,noreferrer");
      return;
    }

    // Internal Next route (e.g. "/work/xyz" or "/case-studies/...")
    router.push(projectLink);
  };

  return (
    <div
      className={`flip-card-container ${isFlipped ? "isFlipped" : ""}`}
      onClick={handleToggleFlip}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggleFlip();
        }
        if (e.key === "Escape") handleUnflip();
      }}
    >
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
                bgcolor: "rgba(0, 0, 0, 0.2)",
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
              ...cardSize,
              p: 0,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardActionArea sx={{ width: "100%", height: "100%" }} onClick={handleAction}>
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

                <Typography sx={{ mt: 1 }} variant="caption" color="text.secondary">
                  {projectType === "pdf" ? "Open PDF" : "Open project"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
