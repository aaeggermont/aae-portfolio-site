"use client";

import { Box, Container, Typography } from "@mui/material";

import {
  PROJECT_CONTENT_CONTAINER_SX,
} from "@/app/projects/finding-nemo/layoutConfig";
import {
  FINDING_NEMO_HEADLINE_COLOR,
  FINDING_NEMO_TITLE_FONT,
} from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

export type ProjectMetaBarProps = {
  items: FindingNemoDataProjectDocument["projectMetaBar"];
  /** Opens the shared recognition dialog (Recognition column). */
  onOpenRecognition?: () => void;
};

/**
 * Meta strip under the hero banner — Role / Year / Team / Recognition.
 */
export default function ProjectMetaBar({
  items,
  onOpenRecognition,
}: ProjectMetaBarProps) {
  if (!items.length) return null;

  return (
    <Box
      component="section"
      aria-label="Project details"
      sx={{
        bgcolor: "#FFFFFF",
        borderTop: "1px solid #E5E9EE",
        width: "100%",
      }}
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            columnGap: { xs: 3, md: 4, lg: 6 },
            rowGap: { xs: 3, md: 3.5 },
            py: { xs: 3.5, md: 4.5, lg: 5 },
            [breakpointMediaQuery.tabletUp]: {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
            [breakpointMediaQuery.desktopUp]: {
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            },
          }}
        >
          {items.map((item) => {
            const isRecognition =
              item.label.toLowerCase() === "recognition" && onOpenRecognition;

            return (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0.75,
                  minWidth: 0,
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    m: 0,
                    fontFamily: FINDING_NEMO_TITLE_FONT,
                    fontSize: { xs: "12px", md: "13px" },
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  color: "#0B6E9F",
                  opacity: 1,
                }}
              >
                {item.label}
              </Typography>
                {isRecognition ? (
                  <Box
                    component="button"
                    type="button"
                    onClick={onOpenRecognition}
                    aria-label="View datathon recognition details"
                    sx={{
                      m: 0,
                      p: 0,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: FINDING_NEMO_TITLE_FONT,
                      fontSize: { xs: "15px", md: "16px" },
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: "#0B6E9F",
                      textDecoration: "underline",
                      textDecorationColor: "rgba(11, 110, 159, 0.35)",
                      textUnderlineOffset: "3px",
                      "&:hover": {
                        textDecorationColor: "#0B6E9F",
                      },
                      "&:focus-visible": {
                        outline: "2px solid #0B6E9F",
                        outlineOffset: 3,
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {item.value}
                    <Box
                      component="span"
                      sx={{
                        ml: 0.75,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      (View)
                    </Box>
                  </Box>
                ) : (
                  <Typography
                    component="p"
                    sx={{
                      m: 0,
                      fontFamily: FINDING_NEMO_TITLE_FONT,
                      fontSize: { xs: "15px", md: "16px" },
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: FINDING_NEMO_HEADLINE_COLOR,
                    }}
                  >
                    {item.value}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
