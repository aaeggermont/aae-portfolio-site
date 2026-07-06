"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import type { JSX } from "react";
import ResearchMethodDialog from "./ResearchMethodDialog";
import type { ResearchMethodCardData } from "../types/researchMethodCard";
import { bodyTypeSx, titleTypeSx } from "../typography";

const cardTitleSx = titleTypeSx("cardTitle");
const cardSummarySx = bodyTypeSx("smallBody", { lineHeight: 1.45 });
const cardActionSx = bodyTypeSx("smallBody", { fontWeight: 500, lineHeight: 1.25 });

export interface UserResearchMethodCardProps {
  method: ResearchMethodCardData;
  actionLabel?: string;
}

export function UserResearchMethodCard({
  method,
  actionLabel = "Read insights",
}: UserResearchMethodCardProps): JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const summaryText = method.summary?.trim() ?? "";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          spacing={6}
          sx={{
            width: "100%",
            maxWidth: 400,
            height: "100%",
            bgcolor: "#fff",
            borderRadius: "40px",
            overflow: "hidden",
            px: 4,
            pt: 6,
            pb: 4,
            boxSizing: "border-box",
          }}
        >
          <Typography component="h3" sx={cardTitleSx}>
            {method.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            {summaryText ? (
              <Typography component="p" sx={cardSummarySx}>
                {summaryText}
              </Typography>
            ) : null}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonBase
              aria-label={actionLabel}
              onClick={() => setDialogOpen(true)}
              sx={{
                borderRadius: 999,
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    bgcolor: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AddIcon sx={{ color: "#fff", fontSize: 16 }} />
                </Box>
                <Typography component="span" sx={cardActionSx}>
                  {actionLabel}
                </Typography>
              </Stack>
            </ButtonBase>
          </Box>
        </Stack>
      </Box>
      <ResearchMethodDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        method={method}
      />
    </>
  );
}

export default UserResearchMethodCard;
