import { Box, Stack, Typography } from "@mui/material";

import { overviewParagraphMaxWidthSx } from "../layoutConfig";
import { bodyTypeSx, titleTypeSx } from "../typography";

export type PreviewNoticeData = {
  title: string;
  body: string;
};

type Props = {
  data: PreviewNoticeData;
};

/**
 * Lightweight “full case study coming soon” block for the production preview page.
 */
export default function PreviewNotice({ data }: Props) {
  return (
    <Stack spacing={4} alignItems="center" sx={{ width: "100%" }}>
      <Typography component="h2" textAlign="center" sx={titleTypeSx("sectionTitle")}>
        {data.title}
      </Typography>
      <Box sx={overviewParagraphMaxWidthSx}>
        <Typography component="p" sx={bodyTypeSx("overviewBody")}>
          {data.body}
        </Typography>
      </Box>
    </Stack>
  );
}
