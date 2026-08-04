import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import {
  DEFAULT_GAMEPLAY_MECHANIC_STEPS,
  DEFAULT_GAMEPLAY_MECHANICS_COPY,
  type GameplayMechanicStep,
} from "../../lib/gameplayMechanicsDefaults";
import { bodyTypeSx, titleTypeSx } from "../../typography";

const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;
const DESKTOP_UP_MQ = breakpointMediaQuery.desktopUp;

const EYEBROW_COLOR = "#1B3C90";
const TITLE_COLOR = "#111A27";
const BODY_COLOR = "#3F5266";
const ICON_BG = "#E8EEF6";
const ICON_COLOR = "#1B3C90";
const STEP_BG = "#F8E7D4";
const STEP_COLOR = "#E8910F";
const CARD_BORDER = "rgba(3, 19, 60, 0.08)";
const ARROW_COLOR = "#7B93C4";

const STEP_ICONS: Record<GameplayMechanicStep["icon"], SvgIconComponent> = {
  scan: CropFreeOutlinedIcon,
  discover: ExploreOutlinedIcon,
  unlock: LockOpenOutlinedIcon,
  badge: WorkspacePremiumOutlinedIcon,
};

function StepCard({ step }: { step: GameplayMechanicStep }) {
  const Icon = STEP_ICONS[step.icon];

  return (
    <Box
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
        flex: 1,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          mb: 2,
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
        <Box
          aria-hidden
          sx={{
            minWidth: 34,
            height: 34,
            px: 0.75,
            borderRadius: "999px",
            bgcolor: STEP_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            component="span"
            sx={titleTypeSx("eyebrow", {
              m: 0,
              color: STEP_COLOR,
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.02em",
            })}
          >
            {step.step}
          </Typography>
        </Box>
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
        {step.title}
      </Typography>
      <Typography
        component="p"
        sx={bodyTypeSx("panelBody", {
          m: 0,
          color: BODY_COLOR,
          textAlign: "left",
          [DESKTOP_UP_MQ]: {
            fontSize: "20px",
          },
        })}
      >
        {step.description}
      </Typography>
    </Box>
  );
}

function StepArrow() {
  return (
    <Box
      aria-hidden
      sx={{
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        px: { md: 0.5, lg: 1 },
        color: ARROW_COLOR,
        [DESKTOP_UP_MQ]: {
          display: "flex",
        },
      }}
    >
      <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
    </Box>
  );
}

export default function GameplayMechanics() {
  const headingId = "gameplay-mechanics-heading";
  const { eyebrow, title, description } = DEFAULT_GAMEPLAY_MECHANICS_COPY;
  const steps = DEFAULT_GAMEPLAY_MECHANIC_STEPS;

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={{ width: "100%" }}
    >
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
            color: EYEBROW_COLOR,
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
            color: BODY_COLOR,
            textAlign: "left",
          })}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 2,
          width: "100%",
          [TABLET_UP_MQ]: {
            gridTemplateColumns: "1fr 1fr",
            gap: 2.5,
          },
          [DESKTOP_UP_MQ]: {
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: 0,
          },
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={step.id}
            sx={{
              display: "contents",
              [DESKTOP_UP_MQ]: {
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                flex: 1,
                minWidth: 0,
              },
            }}
          >
            <StepCard step={step} />
            {index < steps.length - 1 ? <StepArrow /> : null}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
