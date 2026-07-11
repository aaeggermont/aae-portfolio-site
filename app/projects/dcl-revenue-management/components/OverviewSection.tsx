import { Box, Stack, Typography } from "@mui/material";

import { overviewParagraphMaxWidthSx } from "../layoutConfig";
import { bodyTypeSx, titleTypeSx } from "../typography";

export type OverviewSectionData = {
  title: string;
  paragraphs: string[];
};

type Props = {
  data: OverviewSectionData;
};

export const OverviewSection = ({ data }: Props) => {
  const { title, paragraphs } = data;

  return (
    <Stack spacing={4} alignItems="center" sx={{ width: "100%" }}>
      <Typography component="h2" textAlign="center" sx={titleTypeSx("sectionTitle")}>
        {title}
      </Typography>
      <Box sx={overviewParagraphMaxWidthSx}>
        {paragraphs.map((text, index) => (
          <Typography
            key={index}
            component="p"
            sx={bodyTypeSx("overviewBody", {
              mb: index < paragraphs.length - 1 ? 3 : 0,
            })}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
};

export default OverviewSection;
