import { Box, Container, Stack, Typography } from "@mui/material";
import { breakpointPx } from "@/lib/responsive/breakpoints";

export const OverviewSection = () => {
  const paragraphs = [
    "Disney Theme Parks operate on the principle of serving as many Guests as possible and as quickly as possible. Maintaining high attraction capacity and throughput is essential to getting Guests into the gates and keeping them happy while maximize attractions capacity.",
    "One key aspect of attraction capacity is the seat assignment process. Attractions staff referred as Cast Members need to keep track of how many Guests were in a given row and try to do some mathematical calculations on the fly to squeeze in more parties of Guests. This as a result increases operational complexity as social distance requirements lead to more complicated mathematical and tracking of party sizes, and social distancing seats.",
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        background:
          "linear-gradient(180deg, rgba(30,59,90,1) 0%, rgba(64,126,192,1) 77%)",
        py: 8,
        px: { xs: 4, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            color="white"
            textAlign="center"
            fontFamily="'Poppins', Helvetica"
            fontSize={36}
          >
            Overview
          </Typography>
          <Box>
            {paragraphs.map((text, index) => (
              <Typography
                key={index}
                component="p"
                sx={{
                  color: "#cfcccc",
                  [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
                    fontSize: 20,
                  },
                  [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
                    fontSize: 26,
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
      </Container>
    </Box>
  );
};

export default OverviewSection;
