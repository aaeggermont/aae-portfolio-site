import { Box, Stack, Typography } from "@mui/material";

import type { ResearchMethodSectionData } from "../researchMethodTypes";
import { ResearchMethodCardShell } from "./ResearchMethodCardShell";

type Props = {
  /** Section copy and card blocks — from static module today; Firestore later. */
  data: ResearchMethodSectionData;
};

export const ResearchMethod = ({ data }: Props) => {
  const { kicker, title, introParagraphs, cards } = data;

  return (
    <Box
      sx={{
        minWidth: 868,
        maxWidth: 1439,
        borderRadius: "32px",
        overflow: "hidden",
        borderTop: "1px solid #a8a8a8",
        background:
          "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
        p: 8,
      }}
    >
      <Stack spacing={0} mb={2}>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'Poppins', Helvetica",
            fontWeight: "bold",
            color: "#eef305",
            fontSize: "16px",
            lineHeight: "normal",
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
            fontSize: "40px",
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
                color: "#cfcccc",
                fontSize: "16px",
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
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mt: 1,
          px: 2,
          justifyContent: "space-between",
        }}
      >
        {cards.map((card) => (
          <Box
            key={card.id}
            sx={{ flex: { xs: "1 1 auto", md: "1 1 0" }, minWidth: 0 }}
          >
            <ResearchMethodCardShell card={card} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ResearchMethod;
