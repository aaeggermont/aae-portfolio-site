import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import type { FindingNemoPersonaItem } from "@/scripts/project-2.data";

export type PersonaProps = FindingNemoPersonaItem;

export default function Persona({
  title,
  roleDescription,
  avatarAlt,
  avatarSrc,
  goals,
  painPoints,
  quote,
}: PersonaProps) {
  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        maxWidth: 490,
        width: "100%",
        mx: "auto",
        px: 4,
        pt: 4,
        pb: 5,
        borderRadius: "15px",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems={{ xs: "center", sm: "flex-start" }}
          justifyContent="center"
        >
          <Avatar alt={avatarAlt} src={avatarSrc} sx={{ width: 84, height: 82 }} />
          <Stack spacing={1} maxWidth={223}>
            <Typography
              component="h1"
              sx={titleTypeSx("contentCardTitle", {
                fontWeight: 700,
                lineHeight: 1.1,
                color: "common.black",
                textAlign: { xs: "center", sm: "left" },
              })}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              sx={bodyTypeSx("personaRoleDescription", {
                fontWeight: 400,
                lineHeight: 1.25,
                color: "#022f5d",
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
                  color: "common.black",
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
                    color: "common.black",
                  })}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          </Stack>
        ) : null}
        <Box display="flex" justifyContent="center">
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 486,
              px: 2.5,
              py: 2,
              borderRadius: "15px",
              backgroundColor: "#dee8f380",
              borderLeft: "5px solid #009d1799",
            }}
          >
            <Typography
              component="blockquote"
              sx={{
                m: 0,
                fontSize: 16,
                lineHeight: 1.35,
                color: "#000",
              }}
            >
              &ldquo;{quote}&rdquo;
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  );
}
