import { Box, Stack, Typography } from "@mui/material";
import { SectionTitle } from "../SectionTitle";
import { PANEL_BLOCK_PADDINGS } from "../../layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type {
  BusinessGoalItem,
  BusinessGoalsData,
} from "@/app/projects/ar-story-teller/types/arStoryTellerContent";
import {
  DEFAULT_BUSINESS_GOAL_ITEMS,
} from "../../lib/businessGoalsDefaults";
import { overviewNarrativeBlockSx } from "../../overviewNarrativeLayout";
import { bodyTypeSx } from "../../typography";
import styles from "../../ArStoryTeller.module.scss";

const DESKTOP_BREAKPOINT_MQ = breakpointMediaQuery.desktopUp;
const TABLET_STACKED_MQ = breakpointMediaQuery.tabletOnly;
const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;

const panelBodySx = bodyTypeSx("panelBody");

interface BusinessGoalsProps {
  data: BusinessGoalsData;
}

function goalRowKey(item: BusinessGoalItem) {
  return item.title;
}

function GoalRowDesktop({ item }: { item: BusinessGoalItem }) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ width: "100%" }}
    >
      <Box sx={{ width: "40%", flexShrink: 0, pr: { xs: 1, md: 2 } }}>
        <Typography
          component="p"
          sx={{
            m: 0,
            textAlign: "right",
            ...panelBodySx,
            fontWeight: 600,
          }}
        >
          {item.title}
        </Typography>
      </Box>
      <Box sx={{ width: "40%", flexShrink: 0, pl: { xs: 1, md: 2 } }}>
        <Typography
          component="p"
          sx={{
            m: 0,
            textAlign: "left",
            ...panelBodySx,
          }}
        >
          {item.description}
        </Typography>
      </Box>
    </Stack>
  );
}

function GoalRowMobile({ item }: { item: BusinessGoalItem }) {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography
        component="p"
        sx={{
          m: 0,
          ...panelBodySx,
          fontWeight: 600,
        }}
      >
        {item.title}
      </Typography>
      <Typography
        component="p"
        sx={{
          m: 0,
          mt: 0.5,
          ...panelBodySx,
        }}
      >
        {item.description}
      </Typography>
    </Box>
  );
}

const BusinessGoals = ({ data }: BusinessGoalsProps) => {
  const { title, items } = data;
  const headingId = "business-goals-heading";
  const goalItems =
    items && items.length > 0 ? items : [...DEFAULT_BUSINESS_GOAL_ITEMS];

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      className={styles['panel-subsection']}
      sx={overviewNarrativeBlockSx}
    >
      <SectionTitle id={headingId} title={title} />
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
        <Stack
          spacing={3}
          alignItems="center"
          sx={{
            display: "flex",
            width: "100%",
            [TABLET_UP_MQ]: { display: "none" },
          }}
        >
          {goalItems.map((item) => (
            <GoalRowMobile key={goalRowKey(item)} item={item} />
          ))}
        </Stack>

        <Stack
          spacing={2.5}
          sx={{
            display: "none",
            width: "100%",
            mx: "auto",
            [TABLET_UP_MQ]: { display: "flex" },
          }}
        >
          {goalItems.map((item) => (
            <GoalRowDesktop key={goalRowKey(item)} item={item} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default BusinessGoals;
