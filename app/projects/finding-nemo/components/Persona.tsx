"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";

import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { IDENTIFY_AI_OPPORTUNITY_CARD } from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import ProjectImage from "@/lib/media/ProjectImage";
import type { FindingNemoPersonaItem } from "@/scripts/project-2.data";

export type PersonaProps = FindingNemoPersonaItem & {
  /** White surface with shadow, hover lift, and scroll-reveal row support. */
  interactive?: boolean;
  /** Stretch to match sibling persona card height in a row. */
  fillHeight?: boolean;
};

export default function Persona({
  title,
  roleDescription,
  avatarAlt,
  avatarObjectPath,
  goals,
  painPoints,
  quote,
  interactive = false,
  fillHeight = false,
}: PersonaProps) {
  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        maxWidth: 490,
        width: "100%",
        height: fillHeight ? "100%" : "auto",
        display: fillHeight ? "flex" : "block",
        flexDirection: fillHeight ? "column" : undefined,
        mx: "auto",
        px: { xs: 2.5, md: 3 },
        py: { xs: 2.5, md: 3 },
        borderRadius: `${IDENTIFY_AI_OPPORTUNITY_CARD.borderRadiusPx}px`,
        bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        backgroundColor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        border: `1px solid ${IDENTIFY_AI_OPPORTUNITY_CARD.border}`,
        overflow: "hidden",
        boxSizing: "border-box",
        ...(interactive
          ? {
              ...interactiveCardHoverSx,
              "&:hover": {
                ...interactiveCardHoverSx["&:hover"],
                bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
                backgroundColor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
              },
            }
          : {}),
      }}
    >
      <Stack spacing={4} sx={fillHeight ? { flex: 1 } : undefined}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "center", sm: "flex-start" }}
          justifyContent="flex-start"
          width="100%"
        >
          <Box
            sx={{
              width: 84,
              height: 82,
              flexShrink: 0,
              borderRadius: "41px",
              overflow: "hidden",
              alignSelf: { xs: "center", sm: "flex-start" },
            }}
          >
            <ProjectImage
              objectPath={avatarObjectPath}
              alt={avatarAlt}
              width={84}
              height={82}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Stack spacing={1} flex={1} minWidth={0}>
            <Typography
              component="h1"
              sx={[
                titleTypeSx("contentCardTitle", {
                  fontWeight: 700,
                  lineHeight: 1.1,
                  textAlign: { xs: "center", sm: "left" },
                }),
                { color: IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor },
              ]}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              sx={bodyTypeSx("personaRoleDescription", {
                fontWeight: 400,
                lineHeight: 1.25,
                textAlign: { xs: "center", sm: "left" },
              })}
            >
              {roleDescription}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1.5} component="section">
          <Typography
            component="h2"
            sx={titleTypeSx("personaSectionTitle", {
              fontWeight: 700,
              lineHeight: 1.2,
              color: "common.black",
            })}
          >
            Goals
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 4 }}>
            {goals.map((goal) => (
              <Typography
                key={goal}
                component="li"
                sx={bodyTypeSx("contentCardBody", {
                  lineHeight: 1.6,
                  fontWeight: 400,
                })}
              >
                {goal}
              </Typography>
            ))}
          </Box>
        </Stack>
        {painPoints.length > 0 ? (
          <Stack spacing={1.5} component="section">
            <Typography
              component="h2"
              sx={titleTypeSx("personaSectionTitle", {
                fontWeight: 700,
                lineHeight: 1.2,
                color: "common.black",
              })}
            >
              Pain Points
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 4 }}>
              {painPoints.map((point) => (
                <Typography
                  key={point}
                  component="li"
                  sx={bodyTypeSx("contentCardBody", {
                    lineHeight: 1.6,
                    fontWeight: 400,
                  })}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          </Stack>
        ) : null}
        <Box display="flex" justifyContent="center" sx={fillHeight ? { mt: "auto" } : undefined}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 486,
              px: 2.5,
              py: 2,
              borderRadius: `${IDENTIFY_AI_OPPORTUNITY_CARD.borderRadiusPx}px`,
              backgroundColor: "#F5F8FB",
              borderLeft: `5px solid ${IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor}`,
            }}
          >
            <Typography
              component="blockquote"
              sx={bodyTypeSx("contentCardBody", {
                m: 0,
                lineHeight: 1.35,
              })}
            >
              &ldquo;{quote}&rdquo;
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  );
}
