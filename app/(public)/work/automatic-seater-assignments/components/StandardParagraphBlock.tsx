import { Box, Container, Stack, Typography } from "@mui/material";

import {
  CASE_STUDY_CONTAINER_MAX_WIDTH,
  caseStudyContainerSx,
  caseStudySectionGutterSx,
} from "../caseStudyLayout";

export type StandardParagraphBlockProps = {
  title: string;
  paragraphs: string[];
};

export function StandardParagraphBlock({ title, paragraphs }: StandardParagraphBlockProps) {
  return (
    <Box sx={caseStudySectionGutterSx}>
      <Container maxWidth={CASE_STUDY_CONTAINER_MAX_WIDTH} sx={caseStudyContainerSx}>
        <Stack alignItems="flex-start" spacing={4} sx={{ pb: 8 }}>
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
          <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100%", gap: 3 }}>
            {paragraphs.map((text, index) => (
              <Typography
                key={index}
                component="p"
                fontFamily="'Poppins', Helvetica"
                fontWeight={500}
                color="#cfcccc"
                fontSize={ { xs: "1rem", md: "1.1rem", lg: "1.2rem" } }
                sx={{ m: 0, lineHeight: "1.6" }}
              >
                {text}
              </Typography>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default StandardParagraphBlock;
