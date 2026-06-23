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

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import { bodyTypeSx, titleTypeSx } from "../typography";

const DESKTOP_LAYOUT_MQ = breakpointMediaQuery.desktopUp;

const accordionTitleSx = titleTypeSx("cardTitle", {
  flex: 1,
  lineHeight: "normal !important",
  letterSpacing: 0,
});

const accordionBodySx = bodyTypeSx("smallBody", {
  letterSpacing: 0,
  maxWidth: "100%",
});

export interface PanelAccordionItem {
  title: string;
  description?: string;
  /** Legacy seed typo — prefer `description`. */
  desciption?: string;
}

export interface PanelAccordionListProps {
  items: PanelAccordionItem[];
  /** Which item is open on first render — defaults to `0`. */
  defaultExpandedIndex?: number;
  /** Optional desktop max-width for expanded body copy (Interaction Design panel). */
  bodyMaxWidthDesktop?: number;
  /** Optional title width cap for the first row only. */
  firstItemTitleMaxWidth?: number;
}

function itemDescription(item: PanelAccordionItem): string {
  return (item.description ?? item.desciption ?? "").trim();
}

/**
 * Expandable list — same interaction model as `InteractionDesignPrinciples` /
 * `UsabilityFindingsInsights` (first item open by default; one expanded at a time).
 */
export function PanelAccordionList({
  items,
  defaultExpandedIndex = 0,
  bodyMaxWidthDesktop,
  firstItemTitleMaxWidth,
}: PanelAccordionListProps) {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpandedIndex);

  if (!items.length) {
    return null;
  }

  return (
    <List disablePadding>
      {items.map((item, index) => {
        const isExpanded = expandedIndex === index;
        const description = itemDescription(item);

        return (
          <Box key={`${item.title}-${index}`}>
            {index !== 0 ? (
              <Divider sx={{ borderColor: "#d9d9d9" }} />
            ) : null}
            <ListItemButton
              onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
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
                <Typography
                  component="h2"
                  sx={{
                    ...accordionTitleSx,
                    maxWidth:
                      index === 0 && firstItemTitleMaxWidth !== undefined
                        ? firstItemTitleMaxWidth
                        : "100%",
                  }}
                >
                  {item.title}
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
              unmountOnExit={index !== defaultExpandedIndex}
            >
              {description ? (
                <Box sx={{ pt: 0.5, pb: 3 }}>
                  <Typography
                    component="p"
                    sx={{
                      ...accordionBodySx,
                      ...(bodyMaxWidthDesktop !== undefined
                        ? {
                            [DESKTOP_LAYOUT_MQ]: {
                              maxWidth: bodyMaxWidthDesktop,
                            },
                          }
                        : {}),
                    }}
                  >
                    {description}
                  </Typography>
                </Box>
              ) : null}
            </Collapse>
          </Box>
        );
      })}
    </List>
  );
}

export default PanelAccordionList;
