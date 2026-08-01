import { Box, Typography } from "@mui/material";

import type {
  BusinessGoalItem,
  BusinessGoalsData,
} from "@/app/projects/ar-story-teller/types/arStoryTellerContent";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import {
  DEFAULT_BUSINESS_GOAL_ITEMS,
  DEFAULT_BUSINESS_GOALS_COPY,
} from "../../lib/businessGoalsDefaults";
import { bodyTypeSx, titleTypeSx } from "../../typography";
import styles from "./BusinessGoals.module.scss";

const DESKTOP_UP_MQ = breakpointMediaQuery.desktopUp;
const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;

const CARD_TITLE_COLOR = "#E8910F";
const BAND_BG = "#F4F6FA";

interface BusinessGoalsProps {
  data: BusinessGoalsData;
}

function goalCardKey(item: BusinessGoalItem) {
  return item.title;
}

function GoalCard({ item }: { item: BusinessGoalItem }) {
  return (
    <Box
      className={styles.card}
      sx={{
        bgcolor: "#ffffff",
        borderRadius: { xs: 2, md: 3 },
        p: { xs: 2.5, md: 3.5 },
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        component="h3"
        sx={titleTypeSx("cardTitle", {
          m: 0,
          mb: 1.25,
          color: CARD_TITLE_COLOR,
          fontWeight: 700,
          textAlign: "left",
        })}
      >
        {item.title}
      </Typography>
      <Typography
        component="p"
        sx={bodyTypeSx("panelBody", {
          m: 0,
          textAlign: "left",
          color: "#3F5266",
        })}
      >
        {item.description}
      </Typography>
    </Box>
  );
}

const BusinessGoals = ({ data }: BusinessGoalsProps) => {
  const headingId = "business-goals-heading";
  const eyebrow = data.eyebrow?.trim() || DEFAULT_BUSINESS_GOALS_COPY.eyebrow;
  const rawTitle = data.title?.trim() || "";
  const title =
    !rawTitle || rawTitle === "Business Goals." || rawTitle === "Business Goals"
      ? DEFAULT_BUSINESS_GOALS_COPY.title
      : rawTitle;
  const description =
    data.description?.trim() || DEFAULT_BUSINESS_GOALS_COPY.description;
  const rawItems = data.items ?? [];
  const looksLegacy =
    rawItems.length === 0 ||
    rawItems.some((item) => item.title === "Extend Storytelling");
  const goalItems = looksLegacy ? [...DEFAULT_BUSINESS_GOAL_ITEMS] : rawItems;

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      className={styles.band}
      sx={{ bgcolor: BAND_BG }}
    >
      <Box className={styles.inner}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.5,
            mb: { xs: 3, md: 4, lg: 5 },
            maxWidth: { xs: "100%", md: "52rem" },
          }}
        >
          <Typography
            component="p"
            sx={titleTypeSx("eyebrow", {
              m: 0,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#1B3C90",
              textAlign: "left",
            })}
          >
            {eyebrow}
          </Typography>
          <Typography
            id={headingId}
            component="h2"
            sx={titleTypeSx("sectionTitle", {
              m: 0,
              textAlign: "left",
            })}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={bodyTypeSx("bodyText", {
              m: 0,
              textAlign: "left",
              color: "#3F5266",
            })}
          >
            {description}
          </Typography>
        </Box>

        <Box
          className={styles.grid}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: { xs: 2, md: 2.5 },
            width: "100%",
            [TABLET_UP_MQ]: {
              gridTemplateColumns: "1fr 1fr",
            },
            [DESKTOP_UP_MQ]: {
              gap: 3,
            },
          }}
        >
          {goalItems.map((item) => (
            <GoalCard key={goalCardKey(item)} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessGoals;
