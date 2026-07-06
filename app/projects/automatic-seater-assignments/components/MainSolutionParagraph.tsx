import { Box, Stack, Typography } from "@mui/material";

import { overviewParagraphMaxWidthSx } from "../layoutConfig";
import {
  AUTOMATIC_SEATER_OVERVIEW_TITLE_COLOR,
  bodyTypeSx,
  titleTypeSx,
} from "../typography";

export type MainSolutionParagraphData = {
  title: string;
  body: string;
};

type Props = {
  data: MainSolutionParagraphData;
};

export const MainSolutionParagraph = ({ data }: Props) => {
  const { title, body } = data;

  return (
    <Stack spacing={4} alignItems="center" sx={{ width: "100%" }}>
      <Typography
        component="h2"
        textAlign="center"
        sx={titleTypeSx("sectionTitle", {
          color: AUTOMATIC_SEATER_OVERVIEW_TITLE_COLOR,
          width: "100%",
        })}
      >
        {title}
      </Typography>
      <Box sx={overviewParagraphMaxWidthSx}>
        <Typography component="p" sx={bodyTypeSx("overviewBody")}>
          {body}
        </Typography>
      </Box>
    </Stack>
  );
};

export default MainSolutionParagraph;
