"use client";

import { Box, Typography } from "@mui/material";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import {
  DEFAULT_FUTURE_WORK_CARDS,
  DEFAULT_FUTURE_WORK_COPY,
  FUTURE_WORK_CARD_ICONS,
  type FutureWorkCard,
} from "../../lib/futureWorkDefaults";
import { bodyTypeSx, titleTypeSx } from "../../typography";
import dsSectionStyles from "../../sections/DesignSystemSection.module.scss";

const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;
const DESKTOP_UP_MQ = breakpointMediaQuery.desktopUp;

const EYEBROW_COLOR = "#1B3C90";
const TITLE_COLOR = "#111A27";
const BODY_COLOR = "#3F5266";
const ICON_BG = "#E8EEF6";
const ICON_COLOR = "#1B3C90";
const CARD_BORDER = "rgba(3, 19, 60, 0.08)";
const CARD_NUMBER_COLOR = "#E8910F";

function FutureWorkDirectionCard({ card }: { card: FutureWorkCard }) {
  const Icon = FUTURE_WORK_CARD_ICONS[card.icon];

  return (
    <Box
      component="article"
      sx={{
        bgcolor: "#ffffff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: { xs: 2, md: 3 },
        p: { xs: 2.5, md: 3 },
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            bgcolor: ICON_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 22, color: ICON_COLOR }} />
        </Box>
        <Typography
          component="span"
          aria-hidden
          sx={titleTypeSx("panelHeading", {
            m: 0,
            color: CARD_NUMBER_COLOR,
            fontWeight: 700,
            fontSize: { xs: "28px", md: "32px" },
            lineHeight: 1,
            letterSpacing: "-0.02em",
          })}
        >
          {card.number}
        </Typography>
      </Box>

      <Typography
        component="h3"
        sx={titleTypeSx("cardTitle", {
          m: 0,
          mb: 1.25,
          color: TITLE_COLOR,
          fontWeight: 700,
          textAlign: "left",
        })}
      >
        {card.title}
      </Typography>
      <Typography
        component="p"
        sx={bodyTypeSx("smallBody", {
          m: 0,
          color: BODY_COLOR,
          textAlign: "left",
          lineHeight: 1.45,
        })}
      >
        {card.description}
      </Typography>
    </Box>
  );
}

export function FutureWorkSection() {
  const { eyebrow, title, intro } = DEFAULT_FUTURE_WORK_COPY;

  return (
    <div
      className={dsSectionStyles.futureWorkBleed}
      aria-label="Future Work"
    >
      <div className={dsSectionStyles.futureWorkBleedInner}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.5,
            mb: { xs: 3.5, md: 4.5 },
            maxWidth: { xs: "100%", md: "46rem" },
          }}
        >
          <Typography
            component="p"
            sx={titleTypeSx("eyebrow", {
              m: 0,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: EYEBROW_COLOR,
              textAlign: "left",
            })}
          >
            {eyebrow}
          </Typography>
          <Typography
            component="h2"
            sx={titleTypeSx("sectionTitle", {
              m: 0,
              color: TITLE_COLOR,
              textAlign: "left",
            })}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={bodyTypeSx("bodyText", {
              m: 0,
              mt: 0.5,
              color: BODY_COLOR,
              textAlign: "left",
            })}
          >
            {intro}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: { xs: 2, md: 2.5 },
            [TABLET_UP_MQ]: {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
            [DESKTOP_UP_MQ]: {
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 3,
            },
          }}
        >
          {DEFAULT_FUTURE_WORK_CARDS.map((card) => (
            <FutureWorkDirectionCard key={card.number} card={card} />
          ))}
        </Box>
      </div>
    </div>
  );
}

export default FutureWorkSection;
