import { Stack, Typography } from "@mui/material";

import type { ResearchMethodCardData } from "../researchMethodTypes";
import { ResearchMethodBlockRenderer } from "./ResearchMethodBlockRenderer";

const cardTitleSx = {
  fontFamily: "'Poppins', Helvetica",
  fontWeight: "bold",
  color: "#ffffff",
  fontSize: "16px",
  textAlign: "center",
  lineHeight: "normal",
} as const;

const cardSubtitleSx = {
  ...cardTitleSx,
  fontWeight: 400,
  color: "#cfcccc",
  fontSize: "14px",
} as const;

type Props = {
  card: ResearchMethodCardData;
};

export const ResearchMethodCardShell = ({ card }: Props) => {
  return (
    <Stack spacing={2} p={2}>
      {card.title ? <Typography sx={cardTitleSx}>{card.title}</Typography> : null}
      {card.subtitle ? (
        <Typography sx={cardSubtitleSx}>{card.subtitle}</Typography>
      ) : null}
      {card.contentBlocks.map((block) => (
        <ResearchMethodBlockRenderer key={block.id} block={block} />
      ))}
    </Stack>
  );
};
