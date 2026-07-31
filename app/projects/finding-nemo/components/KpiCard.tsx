import { Box, Typography } from "@mui/material";

import { IDENTIFY_AI_OPPORTUNITY_CARD } from "@/app/projects/finding-nemo/layoutConfig";
import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import {
  bodyTypeSx,
  FINDING_NEMO_HEADLINE_COLOR,
  titleTypeSx,
} from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoKpiCardItem } from "@/scripts/project-2.data";

export type KpiCardProps = FindingNemoKpiCardItem;

/**
 * Defining Success KPI card — same chrome as Business Opportunities
 * (white surface, border, left-aligned body); titles match section subtitle color.
 */
export default function KpiCard({ icon, title, description }: KpiCardProps) {
  return (
    <Box
      component="article"
      sx={{
        flex: "0 1 auto",
        width: IDENTIFY_AI_OPPORTUNITY_CARD.widthPx.mobile,
        maxWidth: "100%",
        boxSizing: "border-box",
        borderRadius: `${IDENTIFY_AI_OPPORTUNITY_CARD.borderRadiusPx}px`,
        bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        backgroundColor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        border: `1px solid ${IDENTIFY_AI_OPPORTUNITY_CARD.border}`,
        px: { xs: 2.5, md: 3 },
        py: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2.5,
        height: "100%",
        [breakpointMediaQuery.tabletUp]: {
          width: IDENTIFY_AI_OPPORTUNITY_CARD.widthPx.tablet,
        },
        [breakpointMediaQuery.desktopUp]: {
          width: IDENTIFY_AI_OPPORTUNITY_CARD.widthPx.desktop,
        },
        ...interactiveCardHoverSx,
        "&:hover": {
          ...interactiveCardHoverSx["&:hover"],
          bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
          backgroundColor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              flexShrink: 0,
              fontSize: "1.35em",
              lineHeight: 1,
            }}
          >
            {icon}
          </Box>
          <Typography
            component="h3"
            sx={[
              titleTypeSx("kpiCardTitle", {
                fontWeight: 700,
                lineHeight: 1.2,
                m: 0,
                textAlign: "left",
              }),
              { color: FINDING_NEMO_HEADLINE_COLOR },
            ]}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Typography
        component="p"
        sx={bodyTypeSx("contentCardBody", {
          fontWeight: 400,
          lineHeight: 1.5,
          textAlign: "left",
          m: 0,
        })}
      >
        {description}
      </Typography>
    </Box>
  );
}
