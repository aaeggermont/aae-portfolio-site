"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FullBleedBand from "@/app/projects/spotify-music-groups-session/components/FullBleedBand";
import { SECTION_COLORS } from "@/app/projects/spotify-music-groups-session/layoutConfig";
import {
  bodyTypeSx,
  titleTypeSx,
} from "@/app/projects/spotify-music-groups-session/typography";
import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";

type FrameworkData =
  SpotifyMusicGroupsSessionDataProjectDocument["theoreticalFramework"];
type TheoryCard = FrameworkData["cards"][number];

type TheoreticalFrameworkSectionProps = {
  data: FrameworkData;
};

function TheoryBadge({ abbreviation }: { abbreviation: string }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: SECTION_COLORS.label,
        color: "#FFFFFF",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        fontFamily: 'var(--font-sora), "Sora", system-ui, sans-serif',
        fontWeight: 700,
        fontSize: "12px",
        letterSpacing: "0.02em",
      }}
    >
      {abbreviation}
    </Box>
  );
}

function TheoryCardPanel({ card }: { card: TheoryCard }) {
  return (
    <Box
      sx={{
        backgroundColor: SECTION_COLORS.cardSurface,
        border: `1px solid ${SECTION_COLORS.cardBorder}`,
        borderRadius: "16px",
        px: { xs: 2.5, md: 3 },
        py: { xs: 3, md: 3.5 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 2.25 },
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <TheoryBadge abbreviation={card.abbreviation} />
        <Typography
          component="h3"
          sx={titleTypeSx("cardTitle", {
            color: SECTION_COLORS.heading,
            fontWeight: 700,
            m: 0,
          })}
        >
          {card.title}
        </Typography>
      </Stack>

      <Typography
        component="p"
        sx={bodyTypeSx("cardBody", {
          color: SECTION_COLORS.body,
          fontWeight: 400,
          lineHeight: 1.6,
          m: 0,
        })}
      >
        {card.description}
      </Typography>

      <Typography
        component="p"
        sx={bodyTypeSx("sectionEyebrow", {
          color: SECTION_COLORS.accent,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          fontWeight: 700,
          m: 0,
          mt: 0.5,
        })}
      >
        {card.keyConceptsLabel}
      </Typography>

      <Box
        component="ul"
        sx={{
          m: 0,
          pl: "1.15rem",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {card.keyConcepts.map((concept) => (
          <Typography
            key={concept}
            component="li"
            sx={bodyTypeSx("cardBody", {
              color: SECTION_COLORS.body,
              fontWeight: 400,
              lineHeight: 1.5,
            })}
          >
            {concept}
          </Typography>
        ))}
      </Box>

      {card.mappings ? (
        <Box
          sx={{
            backgroundColor: SECTION_COLORS.highlight,
            borderRadius: "12px",
            px: { xs: 1.75, md: 2 },
            py: { xs: 1.75, md: 2 },
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
          }}
        >
          {card.mappings.map((row) => (
            <Box
              key={row.label}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: 0.75, sm: 1.25 },
              }}
            >
              <Box
                component="span"
                sx={{
                  ...bodyTypeSx("pillLabel"),
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Shared width (fits “Mediators”) so → arrows share one vertical edge
                  minWidth: "6.5rem",
                  px: 1.25,
                  py: 0.4,
                  borderRadius: "999px",
                  backgroundColor: SECTION_COLORS.heading,
                  color: "#FFFFFF",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  boxSizing: "border-box",
                }}
              >
                {row.label}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 0.75,
                  minWidth: 0,
                }}
              >
                <Typography
                  component="span"
                  aria-hidden
                  sx={bodyTypeSx("cardBody", {
                    color: SECTION_COLORS.body,
                    fontWeight: 500,
                    lineHeight: 1.45,
                    flexShrink: 0,
                  })}
                >
                  →
                </Typography>
                <Typography
                  component="span"
                  sx={bodyTypeSx("cardBody", {
                    color: SECTION_COLORS.body,
                    fontWeight: 500,
                    lineHeight: 1.45,
                  })}
                >
                  {row.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}

      {card.chips ? (
        <Box
          sx={{
            backgroundColor: SECTION_COLORS.highlight,
            borderRadius: "12px",
            px: { xs: 1.75, md: 2 },
            py: { xs: 1.75, md: 2 },
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1.25,
          }}
        >
          {card.chips.map((chip) => (
            <Box
              key={chip}
              sx={{
                backgroundColor: SECTION_COLORS.cardSurface,
                borderRadius: "10px",
                px: 1.5,
                py: 1.25,
                textAlign: "center",
              }}
            >
              <Typography
                component="span"
                sx={bodyTypeSx("cardBody", {
                  color: SECTION_COLORS.body,
                  fontWeight: 600,
                })}
              >
                {chip}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}

      <Typography
        component="p"
        sx={bodyTypeSx("linkText", {
          color: SECTION_COLORS.label,
          fontWeight: 600,
          m: 0,
          mt: "auto",
          pt: 0.5,
        })}
      >
        {card.readMoreLabel}
      </Typography>
    </Box>
  );
}

export default function TheoreticalFrameworkSection({
  data,
}: TheoreticalFrameworkSectionProps) {
  return (
    <FullBleedBand
      dataId="spotify-theoretical-framework"
      backgroundColor={SECTION_COLORS.surface}
    >
      <Stack spacing={{ xs: 3.5, md: 4.5 }}>
        <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ maxWidth: "48rem" }}>
          <Typography
            component="p"
            sx={bodyTypeSx("sectionEyebrow", {
              color: SECTION_COLORS.label,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
              m: 0,
            })}
          >
            {data.eyebrow}
          </Typography>

          <Typography
            component="h2"
            sx={titleTypeSx("sectionTitle", {
              color: SECTION_COLORS.heading,
              fontWeight: 700,
              lineHeight: 1.2,
              m: 0,
            })}
          >
            {data.title}
          </Typography>

          <Typography
            component="p"
            sx={bodyTypeSx("bodyText", {
              color: SECTION_COLORS.body,
              fontWeight: 400,
              lineHeight: 1.65,
              m: 0,
            })}
          >
            {data.intro}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 2.5, md: 3 },
            alignItems: "stretch",
          }}
        >
          {data.cards.map((card) => (
            <TheoryCardPanel key={card.abbreviation} card={card} />
          ))}
        </Box>

        <Box
          sx={{
            position: "relative",
            pl: { xs: 2.75, md: 3.25 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {/* Continuous `[` accent — short inward arms + rounded corners */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "11px",
              boxSizing: "border-box",
              borderStyle: "solid",
              borderColor: SECTION_COLORS.accent,
              borderWidth: "3.5px 0 3.5px 3.5px",
              borderRadius: "10px 0 0 10px",
              pointerEvents: "none",
            }}
          />

          <Typography
            component="p"
            sx={bodyTypeSx("sectionEyebrow", {
              color: SECTION_COLORS.accent,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 700,
              m: 0,
            })}
          >
            {data.combinedLens.label}
          </Typography>

          {data.combinedLens.paragraphs.map((paragraph) => (
            <Typography
              key={paragraph.slice(0, 32)}
              component="p"
              sx={bodyTypeSx("bodyText", {
                color: SECTION_COLORS.body,
                fontWeight: 400,
                lineHeight: 1.65,
                m: 0,
              })}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Stack>
    </FullBleedBand>
  );
}
