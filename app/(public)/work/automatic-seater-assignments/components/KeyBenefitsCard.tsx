import { Box, Stack, Typography } from "@mui/material";
import { breakpointPx } from "@/lib/responsive/breakpoints";
const benefitItems = [
  "Intelligent seating decisions through the use of historic party size distribution.",
  "Potential integration into park´s reservation systems",
  "Increased seating of Guest throughput over manual procedures.",
  "The app can be used as a simulation tool to test seating throughput of different scenarios.",
];

export const KeyBenefitsCard = () => {
  return (
    <Box
      sx={{
        [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
            width: 386,
            height: 350,
         },
         [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
            width: 500,
            height: 350,
         },
         [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
            width: 500,
            height: 370,
         },
        borderRadius: "32px",
        overflow: "hidden",
        borderTop: "1px solid #a8a8a8",
        background:
          "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
        pt: 2.5,
        pb: "61px",
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.25,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontFamily: "'Poppins', Helvetica",
          fontWeight: "bold",
          color: "white",
          fontSize: "24px",
          [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
            fontSize: 20,
            },
            [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
                fontSize: 24,
            },
            [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
                fontSize: 24,
            },
          lineHeight: "normal",
          mt: "-1px",
        }}
      >
        Key Benefits
      </Typography>
      <Stack spacing={2} sx={{ p: 2, width: "100%" }}>
        {benefitItems.map((text, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ px: 2, width: "100%" }}
          >
            {/* Bullet indicator */}
            <Box
              sx={{
                width: 12,
                height: 12,
                minWidth: 12,
                backgroundColor: "#e2e3e8",
                borderRadius: "4px",
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "white",
                lineHeight: 1.5,
                flex: 1,
                [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
                    fontWeight: 500,
                    fontSize: 14,
                },
                [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
                    fontSize: 16,
                },
                [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
                    fontSize: 18,
                },
              }}
            >
              {text}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default KeyBenefitsCard;
