import { Box, Typography } from "@mui/material";

import {
  FINDING_NEMO_BODY_FONT,
  FINDING_NEMO_TITLE_FONT,
  TYPOGRAPHY,
} from "@/app/projects/finding-nemo/typography";
import type { FindingNemoKpiCardItem } from "@/scripts/project-2.data";

export const KPI_CARD_WIDTH_PX = 300;
export const KPI_CARD_HEIGHT_PX = 280;
export const KPI_CARD_BG_COLOR = "#F2F6FA";

const kpiCardHoverSx = {
  boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
  transition:
    "transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, opacity 0.22s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 45px rgba(0, 0, 0, 0.18)",
    bgcolor: "#f7fbff",
  },
} as const;

export type KpiCardProps = FindingNemoKpiCardItem;

export default function KpiCard({ icon, title, description }: KpiCardProps) {
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        width: KPI_CARD_WIDTH_PX,
        minWidth: KPI_CARD_WIDTH_PX,
        maxWidth: KPI_CARD_WIDTH_PX,
        height: KPI_CARD_HEIGHT_PX,
        minHeight: KPI_CARD_HEIGHT_PX,
        maxHeight: KPI_CARD_HEIGHT_PX,
        flexGrow: 0,
        flexShrink: 0,
        px: 4,
        pt: 6,
        pb: 4,
        bgcolor: KPI_CARD_BG_COLOR,
        borderRadius: "20px",
        overflow: "hidden",
        boxSizing: "border-box",
        ...kpiCardHoverSx,
      }}
    >
      <Box
        component="h3"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100%",
          m: 0,
          fontFamily: FINDING_NEMO_TITLE_FONT,
          fontWeight: 600,
          lineHeight: 1.2,
          color: "common.black",
          textAlign: "center",
          fontSize: {
            xs: TYPOGRAPHY.kpiCardTitle.mobile,
            md: TYPOGRAPHY.kpiCardTitle.tablet,
            lg: TYPOGRAPHY.kpiCardTitle.desktop,
          },
        }}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            fontSize: "1em",
            lineHeight: 1,
          }}
        >
          {icon}
        </Box>
        <Box component="span">{title}</Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
        <Typography
          component="p"
          variant="inherit"
          sx={{
            m: 0,
            fontFamily: FINDING_NEMO_BODY_FONT,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "common.black",
            fontSize: {
              xs: TYPOGRAPHY.kpiCardBody.mobile,
              md: TYPOGRAPHY.kpiCardBody.tablet,
              lg: TYPOGRAPHY.kpiCardBody.desktop,
            },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
