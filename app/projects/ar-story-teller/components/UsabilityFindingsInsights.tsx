"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { PANEL_CONTENT_MAX_WIDTH_PX } from "../layoutConfig";

const PANEL_SURFACE_SX = {
  width: "100%",
  bgcolor: "#ffffff",
  borderRadius: { xs: 4, md: "40px" },
  px: { xs: 3, sm: 5, md: 7.5 },
  py: { xs: 4, sm: 5, md: 7.5 },
} as const;

const INSIGHT_TITLE_SX = {
  fontFamily:
    'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif',
  fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
  fontWeight: 600,
  color: "#000",
  lineHeight: "normal !important",
  letterSpacing: 0,
  flex: 1,
  maxWidth: "100%",
} as const;

const INSIGHT_DESCRIPTION_SX = {
  fontFamily: '"Source Sans 3", sans-serif',
  fontWeight: 400,
  color: "#000",
  fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
  lineHeight: 1.4,
  letterSpacing: 0,
  maxWidth: "100%",
} as const;

export interface UsabilityInsight {
  insightTitle: string;
  insightDescription: string;
}

export interface UsabilityFindingsInsightsProps {
  insights: UsabilityInsight[];
}

/**
 * Accordion list — same interaction model as `InteractionDesignPrinciples`
 * (first item open by default; one expanded at a time).
 */
export function UsabilityFindingsInsights({
  insights,
}: UsabilityFindingsInsightsProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!insights.length) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: PANEL_CONTENT_MAX_WIDTH_PX,
        minWidth: { xs: "auto", sm: 358 },
        mx: "auto",
      }}
    >
      <Box component="section" sx={PANEL_SURFACE_SX}>
        <List disablePadding>
          {insights.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const description = item.insightDescription?.trim() ?? "";

            return (
              <Box key={`${item.insightTitle}-${index}`}>
                {index !== 0 ? (
                  <Divider sx={{ borderColor: "#d9d9d9" }} />
                ) : null}
                <ListItemButton
                  onClick={() =>
                    setExpandedIndex(isExpanded ? -1 : index)
                  }
                  sx={{
                    px: 0,
                    py: 3.5,
                    alignItems: "flex-start",
                    borderRadius: 0,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ width: "100%" }}
                  >
                    <Typography component="h2" sx={INSIGHT_TITLE_SX}>
                      {item.insightTitle}
                    </Typography>
                    {isExpanded ? (
                      <ExpandLessIcon sx={{ color: "#5f5f5f", mt: 0.5 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: "#5f5f5f", mt: 0.5 }} />
                    )}
                  </Stack>
                </ListItemButton>
                <Collapse
                  in={isExpanded}
                  timeout="auto"
                  unmountOnExit={index !== 0}
                >
                  {description ? (
                    <Box sx={{ pt: 0.5, pb: 3 }}>
                      <Typography component="p" sx={INSIGHT_DESCRIPTION_SX}>
                        {description}
                      </Typography>
                    </Box>
                  ) : null}
                </Collapse>
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default UsabilityFindingsInsights;
