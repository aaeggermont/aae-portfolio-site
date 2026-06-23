import { Box, Stack, Typography } from "@mui/material";
import { SectionTitle } from "./SectionTitle";
import { PANEL_BLOCK_PADDINGS } from "../layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { TeamData, TeamMember } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";
import { bodyTypeSx } from "../typography";

const DESKTOP_BREAKPOINT_MQ = breakpointMediaQuery.desktopUp;
const TABLET_STACKED_MQ = breakpointMediaQuery.tabletOnly;
const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;

const panelBodySx = bodyTypeSx("panelBody");

interface TeamProps {
  data: TeamData;
}

function memberKey(member: TeamMember) {
  return `${member.name}-${member.role}`;
}

/** Consecutive pairs per row — preserves mockup column alignment (right / left). */
function chunkRowPairs(members: TeamMember[]): { left: TeamMember; right?: TeamMember }[] {
  const rows: { left: TeamMember; right?: TeamMember }[] = [];
  for (let i = 0; i < members.length; i += 2) {
    rows.push({ left: members[i], right: members[i + 1] });
  }
  return rows;
}

function MemberBlock({
  member,
  align,
  stacked = false,
}: {
  member: TeamMember;
  align: "left" | "right";
  /** Mobile list: name above role, no row gutters */
  stacked?: boolean;
}) {
  const isRight = align === "right";

  return (
    <Box sx={{ textAlign: stacked ? "center" : align, width: stacked ? "100%" : undefined }}>
      <Typography
        component="p"
        sx={{
          m: 0,
          pt: stacked ? 0 : 2,
          pr: stacked || !isRight ? 0 : 2,
          pl: stacked || isRight ? 0 : 2,
          ...panelBodySx,
          fontWeight: 600,
        }}
      >
        {member.name}
      </Typography>
      <Typography
        component="p"
        sx={{
          m: 0,
          mt: stacked ? 0.5 : 0,
          pr: stacked || !isRight ? 0 : 2,
          pl: stacked || isRight ? 0 : 2,
          ...panelBodySx,
        }}
      >
        {member.role}
      </Typography>
    </Box>
  );
}

function MemberRow({
  left,
  right,
}: {
  left: TeamMember;
  right?: TeamMember;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems={{ xs: "center", sm: "center", md: "flex-start", lg: "flex-start" }}
      sx={{ width: "100%" }}
    >
      <Box sx={{ width: "40%", flexShrink: 0 }}>
        <MemberBlock member={left} align="right" />
      </Box>
      <Box sx={{ width: "40%", flexShrink: 0 }}>
        {right ? <MemberBlock member={right} align="left" /> : null}
      </Box>
    </Stack>
  );
}

const Team = ({ data }: TeamProps) => {
  const { title, members } = data;
  const headingId = "team-heading";
  const memberRows = chunkRowPairs(members);

  return (
    <section aria-labelledby={headingId}>
      <SectionTitle id={headingId} title={title} paddingBottom="2rem" />
      <Box
        sx={{
          bgcolor: "#f4f5f6",
          borderRadius: { xs: 4, md: "30px" },
          overflow: "hidden",
          px: PANEL_BLOCK_PADDINGS.x.mobile,
          py: PANEL_BLOCK_PADDINGS.y.mobile,
          [TABLET_STACKED_MQ]: {
            px: PANEL_BLOCK_PADDINGS.x.tablet,
            py: PANEL_BLOCK_PADDINGS.y.tablet,
          },
          [DESKTOP_BREAKPOINT_MQ]: {
            px: PANEL_BLOCK_PADDINGS.x.desktop,
            py: PANEL_BLOCK_PADDINGS.y.desktop,
          },
          width: "100%",
        }}
      >
        {/* Mobile: single column — name stacked above role per member */}
        <Stack
          spacing={3}
          alignItems="center"
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: "100%",
            [TABLET_UP_MQ]: { display: "none" },
          }}
        >
          {members.map((member) => (
            <MemberBlock
              key={memberKey(member)}
              member={member}
              align="left"
              stacked
            />
          ))}
        </Stack>

        {/* Tablet+: paired rows — left right-aligned, right left-aligned */}
        <Stack
          sx={{
            display: "none",
            width: "100%",
            maxWidth: "100%",
            mx: "auto",
            [TABLET_UP_MQ]: { display: "flex" },
          }}
        >
          {memberRows.map(({ left, right }) => (
            <MemberRow key={memberKey(left)} left={left} right={right} />
          ))}
        </Stack>
      </Box>
    </section>
  );
};

export default Team;
