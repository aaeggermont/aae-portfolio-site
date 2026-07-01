import { Box, Stack, Typography } from "@mui/material";
import { breakpointPx } from "@/lib/responsive/breakpoints";

export type OverviewSectionData = {
  title: string;
  paragraphs: string[];
  background: string;
};

type Props = {
  data: OverviewSectionData;
};

export const OverviewSection = ({ data }: Props) => {
  const { title, paragraphs } = data;

  return (
    <Stack spacing={4} alignItems="center" sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        color="white"
        textAlign="center"
        fontFamily="'Poppins', Helvetica"
        fontSize={24}
        sx={{
          [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
            fontSize: 30,
          },
          [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
            fontSize: 36,
          },
        }}
      >
        {title}
      </Typography>
      <Box>
        {paragraphs.map((text, index) => (
          <Typography
            key={index}
            component="p"
            sx={{
              color: "#cfcccc",
              [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
                fontSize: 26,
              },
              [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
                fontSize: 20,
              },
              [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
                fontSize: 18,
              },
              fontFamily: "'Poppins', Helvetica",
              fontWeight: 500,
              lineHeight: 1.7,
              mb: index < paragraphs.length - 1 ? 3 : 0,
            }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
};

export default OverviewSection;
