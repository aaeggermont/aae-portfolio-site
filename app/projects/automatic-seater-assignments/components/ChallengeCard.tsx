import { Box, Paper, Stack, Typography } from "@mui/material";

export type ChallengeCardData = {
  title: string;
  background: string;
  introParagraph: string;
  question: {
    emphasisPrefix: string;
    text: string;
  };
};

type Props = {
  data: ChallengeCardData;
};

export default function ChallengeCard({ data }: Props) {
  const { title, background, introParagraph, question } = data;

  return (
    <Paper
      component="section"
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: 660,
        mx: "auto",
        px: { xs: 3, sm: 5, md: 6 },
        py: { xs: 4, sm: 5, md: "50px" },
        borderRadius: "32px",
        overflow: "hidden",
        borderTop: 1,
        borderColor: "divider",
        background,
      }}
    >
      <Stack spacing={{ xs: 4, sm: 5 }}>
        <Box component="header">
          <Typography
            component="h2"
            align="center"
            sx={{
              color: "#003366",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.25rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Stack spacing={{ xs: 4, sm: 5 }} component="article">
          <Typography
            component="p"
            sx={{
              color: "#1f2937",
              fontWeight: 500,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              lineHeight: 1.45,
            }}
          >
            {introParagraph}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "#1f2937",
              fontWeight: 500,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              lineHeight: 1.45,
            }}
          >
            <Box component="span" sx={{ color: "#003366", fontWeight: 700 }}>
              {question.emphasisPrefix}
            </Box>
            {question.text}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
