import { Box, Paper, Stack, Typography } from "@mui/material";

import {
  AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
  AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
  bodyTypeSx,
  titleTypeSx,
} from "../typography";

const CHALLENGE_CARD_BACKGROUND = "#FFFFFF";

export type ChallengeCardData = {
  title: string;
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
  const { title, introParagraph, question } = data;

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
        background: CHALLENGE_CARD_BACKGROUND,
      }}
    >
      <Stack spacing={{ xs: 4, sm: 5 }}>
        <Box component="header">
          <Typography
            component="h2"
            align="center"
            sx={titleTypeSx("introCardTitle", {
              color: AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
            })}
          >
            {title}
          </Typography>
        </Box>
        <Stack spacing={{ xs: 4, sm: 5 }} component="article">
          <Typography
            component="p"
            sx={bodyTypeSx("introCardBody", {
              color: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
            })}
          >
            {introParagraph}
          </Typography>
          <Typography
            component="p"
            sx={bodyTypeSx("introCardBody", {
              color: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
            })}
          >
            <Box
              component="span"
              sx={bodyTypeSx("introCardBody", {
                color: AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
                fontWeight: 700,
              })}
            >
              {question.emphasisPrefix}
            </Box>
            {question.text}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
