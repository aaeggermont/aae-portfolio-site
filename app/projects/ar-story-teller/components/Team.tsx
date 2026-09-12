import { Box, Typography } from "@mui/material";

import type {
  TeamData,
  TeamMember,
} from "@/app/projects/ar-story-teller/types/arStoryTellerContent";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import { DEFAULT_TEAM_COPY } from "../lib/teamDefaults";
import { bodyTypeSx, titleTypeSx } from "../typography";

const DESKTOP_UP_MQ = breakpointMediaQuery.desktopUp;

const ROLE_COLOR = "#E8910F";
const AVATAR_BG = "#E8EEF6";
const CARD_BORDER = "rgba(3, 19, 60, 0.08)";

interface TeamProps {
  data: TeamData;
}

function memberKey(member: TeamMember) {
  return `${member.name}-${member.role}`;
}

/** First + last name initials (e.g. Antonio Aranda Eggermont → AE). */
function memberInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: { xs: 2, md: 3 },
        p: { xs: 1.75, md: 3 },
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: AVATAR_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Typography
          component="span"
          sx={titleTypeSx("cardTitle", {
            m: 0,
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: 1,
          })}
        >
          {memberInitials(member.name)}
        </Typography>
      </Box>
      <Typography
        component="h3"
        sx={titleTypeSx("cardTitle", {
          m: 0,
          mb: 0.75,
          fontWeight: 700,
          textAlign: "left",
        })}
      >
        {member.name}
      </Typography>
      <Typography
        component="p"
        sx={bodyTypeSx("smallBody", {
          m: 0,
          mb: member.description ? 1.25 : 0,
          color: ROLE_COLOR,
          fontWeight: 600,
          textAlign: "left",
        })}
      >
        {member.role}
      </Typography>
      {member.description ? (
        <Typography
          component="p"
          sx={bodyTypeSx("panelBody", {
            m: 0,
            color: "#3F5266",
            textAlign: "left",
          })}
        >
          {member.description}
        </Typography>
      ) : null}
    </Box>
  );
}

const Team = ({ data }: TeamProps) => {
  const headingId = "team-heading";
  const eyebrow = data.eyebrow?.trim() || DEFAULT_TEAM_COPY.eyebrow;
  const rawTitle = data.title?.trim() || "";
  const title =
    !rawTitle || rawTitle === "The Team." || rawTitle === "The Team"
      ? DEFAULT_TEAM_COPY.title
      : rawTitle;
  const description = data.description?.trim() || DEFAULT_TEAM_COPY.description;
  const { members } = data;

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
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
            color: "#1B3C90",
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
            textAlign: "left",
          })}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          sx={bodyTypeSx("bodyText", {
            m: 0,
            textAlign: "left",
            color: "#3F5266",
          })}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: { xs: 1.5, md: 2.5 },
          width: "100%",
          [DESKTOP_UP_MQ]: {
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          },
        }}
      >
        {members.map((member) => (
          <MemberCard key={memberKey(member)} member={member} />
        ))}
      </Box>
    </Box>
  );
};

export default Team;
