import { Stack, Typography } from "@mui/material";
import { breakpointPx } from "@/lib/responsive/breakpoints";

/** Matches PreviewDemo / project content band (px). */
const CONTENT_MAX_WIDTH_MOBILE_PX = 366;
const CONTENT_MAX_WIDTH_TABLET_PX = 560;
const CONTENT_MAX_WIDTH_DESKTOP_PX = 734;

const titleFontFamily = "'Poppins', Helvetica, sans-serif";

export const MainSolutionParagraph = () => {
  return (
    <Stack
      spacing={4}
      alignItems="center"
      sx={{
        width: "100%",
        maxWidth: CONTENT_MAX_WIDTH_MOBILE_PX,
        mx: "auto",
        [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
          maxWidth: CONTENT_MAX_WIDTH_TABLET_PX,
        },
        [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
          maxWidth: CONTENT_MAX_WIDTH_DESKTOP_PX,
        },
      }}
    >
      <Typography
        component="h2"
        sx={{
          width: "100%",
          textAlign: "center",
          color: "#1d2d92",
          fontFamily: titleFontFamily,
          fontWeight: 700,
          lineHeight: 1.25,
          [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
            fontSize: 24,
          },
          [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
            fontSize: 20,
          },
          [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
            fontSize: 36,
          },
        }}
      >
        Solution
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        width="100%"
        sx={{
          fontFamily: titleFontFamily,
          textAlign: "center",
          [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
            fontSize: 20,
          },
          [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
            fontSize: 26,
          },
          [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
            fontSize: 18,
          },
        }}
      >
        A scalable, configuration driven Web mobile app designed to automate the
        seating assignments for Guests in attractions and rides
        at&nbsp;&nbsp;Disney theme parks.
      </Typography>
    </Stack>
  );
};

export default MainSolutionParagraph;
