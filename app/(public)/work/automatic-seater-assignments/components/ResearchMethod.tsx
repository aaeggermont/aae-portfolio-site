import { Box, Stack, Typography } from "@mui/material";

import { breakpointPx } from "@/lib/responsive/breakpoints";
import { caseStudySectionGutterSx } from "../caseStudyLayout";
import type { ResearchMethodSectionData } from "../researchMethodTypes";
import { ResearchMethodCardShell } from "./ResearchMethodCardShell";

type Props = {
  /** Section copy and card blocks — from static module today; Firestore later. */
  data: ResearchMethodSectionData;
};

export const ResearchMethod = ({ data }: Props) => {
  const { kicker, title, introParagraphs, cards } = data;

  return (
    <Box sx={caseStudySectionGutterSx}>
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 655, md: 815, lg: 960, xl: 960 },
          minWidth: breakpointPx.mobileMin,
          mx: "auto",
          borderRadius: "32px",
          overflow: "hidden",
          borderTop: "1px solid #a8a8a8",
          background:
            "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
          py: { xs: 3, md: 6, lg: 8 },
          px: { xs: 3, md: 6, lg: 8 },
        }}
      >
        <Stack spacing={0} mb={2} px={2}>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Poppins', Helvetica",
              fontWeight: "bold",
              color: "#eef305",
              fontSize: { xs: "1.1rem", md: "1.2rem", lg: "1.4rem" },
              lineHeight: "normal",
              textAlign: { xs: "center", md: "left", lg: "left" },
            }}
          >
            {kicker}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Poppins', Helvetica",
              fontWeight: "bold",
              color: "#ffffff",
              fontSize: { xs: "1.1rem", md: "1.8rem", lg: "2rem" },
              textAlign: { xs: "center", md: "left", lg: "left" },
              lineHeight: "normal",
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Box p={2}>
          <Stack spacing={2}>
            {introParagraphs.map((paragraph, i) => (
              <Typography
                key={`intro-${i}`}
                sx={{
                  color: "#ffffff",
                  fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                  lineHeight: 1.6,
                  fontFamily: "'Poppins', Helvetica",
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
            mt: 1,
            px: 2,
            justifyContent: "space-between",
          }}
        >
          {cards.map((card) => (
            <Box
              key={card.id}
              sx={{ flex: { xs: "1 1 auto", lg: "1 1 0" }, minWidth: 0 }}
            >
              <ResearchMethodCardShell card={card} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ResearchMethod;
