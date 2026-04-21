import { Box, Container, Stack, Typography } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";

import {
  CASE_STUDY_CONTAINER_MAX_WIDTH,
  caseStudyContainerSx,
  caseStudySectionGutterSx,
} from "../caseStudyLayout";

export type StandardParagraphBlockProps = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Defaults to square markers (current design). */
  bulletMarker?: "square" | "dot" | "dash";
  /** Optional extra spacing above the block wrapper. */
  paddingTop?: ResponsiveStyleValue<number | string>;
  /** Optional extra spacing below the block wrapper. */
  paddingBottom?: ResponsiveStyleValue<number | string>;
};

export function StandardParagraphBlock({
  title,
  paragraphs,
  bullets,
  bulletMarker = "square",
  paddingTop,
  paddingBottom,
}: StandardParagraphBlockProps) {
  return (
    <Box sx={{ ...caseStudySectionGutterSx, pt: paddingTop, pb: paddingBottom }}>
      <Container maxWidth={CASE_STUDY_CONTAINER_MAX_WIDTH} sx={caseStudyContainerSx}>
        <Stack alignItems="flex-start" spacing={4} sx={{ pb: 8 }}>
          {title ? (
            <Typography
              component="h2"
              variant="h4"
              fontFamily="'Poppins', Helvetica"
              fontWeight="bold"
              color="white"
              textAlign="center"
              alignSelf="stretch"
            >
              {title}
            </Typography>
          ) : null}
          {paragraphs?.length ? (
            <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100%", gap: 3 }}>
              {paragraphs.map((text, index) => (
                <Typography
                  key={index}
                  component="p"
                  fontFamily="'Poppins', Helvetica"
                  fontWeight={500}
                  color="#cfcccc"
                  fontSize={{ xs: "1rem", md: "1.1rem", lg: "1.2rem" }}
                  sx={{ m: 0, lineHeight: "1.6" }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
          ) : null}

          {bullets?.length ? (
            <Stack spacing={1.5} sx={{ width: "100%" }}>
              {bullets.map((text, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    columnGap: "13px",
                    alignItems: "start",
                    fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                  }}
                >
                  {bulletMarker === "square" ? (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        minWidth: 12,
                        bgcolor: "#e2e3e8",
                        borderRadius: "4px",
                        mt: "0.35em",
                      }}
                    />
                  ) : bulletMarker === "dot" ? (
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        minWidth: 8,
                        borderRadius: "50%",
                        bgcolor: "#e2e3e8",
                        mt: "0.45em",
                      }}
                    />
                  ) : (
                    <Typography
                      component="span"
                      sx={{
                        color: "#cfcccc",
                        fontFamily: "'Poppins', Helvetica",
                        minWidth: "1em",
                        mt: "0.2em",
                        lineHeight: 1.6,
                      }}
                    >
                      —
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      color: "#cfcccc",
                      lineHeight: 1.6,
                      fontFamily: "'Poppins', Helvetica",
                      fontSize: "inherit",
                      minWidth: 0,
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}

export default StandardParagraphBlock;
