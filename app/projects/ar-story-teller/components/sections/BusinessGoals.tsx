import { Box, Stack, Typography } from "@mui/material";
import { SectionTitle } from "../SectionTitle";
import { PANEL_BLOCK_PADDINGS } from "../../layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { BusinessGoalsData } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";

const DESKTOP_BREAKPOINT_MQ = breakpointMediaQuery.desktopUp;
const TABLET_STACKED_MQ = breakpointMediaQuery.tabletOnly;

/** Body copy — typography tokens to be refined in a follow-up pass. */
const bodyTextSx = {
  color: "#002464",
  fontFamily:
    'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
  fontWeight: 500,
  fontSize: { xs: "1.5rem", sm: "1.2rem", md: "1.5rem" },
  lineHeight: 1.35,
} as const;

interface BusinessGoalsProps {
  data: BusinessGoalsData;
}

const BusinessGoals = ({ data }: BusinessGoalsProps) => {
  const { title, intro, goals } = data;
  const headingId = "business-goals-heading";

  return (
    <section aria-labelledby={headingId}>
      <SectionTitle
        id={headingId}
        title={title}
        paddingBottom="2rem"
      />
      <Box
        sx={{
          bgcolor: "#f4f5f6",
          borderRadius: { xs: 4, md: "30px" },
          overflow: "hidden",
          px: PANEL_BLOCK_PADDINGS.x.mobile,
          py: PANEL_BLOCK_PADDINGS.y.mobile,
          [TABLET_STACKED_MQ]: {
            px: PANEL_BLOCK_PADDINGS.x.tablet,
            py: PANEL_BLOCK_PADDINGS.y.tablet,
          },
          [DESKTOP_BREAKPOINT_MQ]: {
            px: PANEL_BLOCK_PADDINGS.x.desktop,
            py: PANEL_BLOCK_PADDINGS.y.desktop,
          },
          width: "100%",
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: "100%" }}>
          <Typography component="p" sx={{ m: 0, ...bodyTextSx }}>
            {intro}
          </Typography>
          <Box
            component="ul"
            sx={{
              m: 0,
              pl: { xs: 3, md: 4 },
              listStyleType: "disc",
            }}
          >
            {goals.map((goal) => (
              <Typography
                key={goal}
                component="li"
                sx={{
                  ...bodyTextSx,
                  display: "list-item",
                  "&:not(:first-of-type)": { mt: 1.5 },
                }}
              >
                {goal}
              </Typography>
            ))}
          </Box>
        </Stack>
      </Box>
    </section>
  );
};

export default BusinessGoals;
