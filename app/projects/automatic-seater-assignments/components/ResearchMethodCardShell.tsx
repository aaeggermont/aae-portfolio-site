import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { researchMethodSectionGapSx } from "../layoutConfig";
import { mergeSx } from "../typography";
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

/** Default gap between consecutive card blocks (matches prior `Stack spacing={2}`). */
const DEFAULT_BLOCK_GAP_SX: SxProps<Theme> = { marginTop: "16px" };
/** Gap between consecutive reusable component blocks. */
const REUSABLE_COMPONENT_GAP_SX: SxProps<Theme> = { marginTop: "32px" };

type Props = {
  card: ResearchMethodCardData;
};

export const ResearchMethodCardShell = ({ card }: Props) => {
  const blocks = card.contentBlocks;

  return (
    <Stack p={2}>
      {card.title ? <Typography sx={cardTitleSx}>{card.title}</Typography> : null}
      {card.subtitle ? (
        <Typography sx={mergeSx(cardSubtitleSx, DEFAULT_BLOCK_GAP_SX)}>
          {card.subtitle}
        </Typography>
      ) : null}
      {blocks.map((block, index) => {
        const isFirstElement = index === 0 && !card.title && !card.subtitle;
        const previousBlock = index > 0 ? blocks[index - 1] : undefined;
        /** Consecutive illustrations use the standard research-method section gap. */
        const useSectionGap =
          block.type === "image" && previousBlock?.type === "image";
        /** Consecutive reusable components use a 32px gap. */
        const useReusableComponentGap =
          block.type === "reusableComponent" &&
          previousBlock?.type === "reusableComponent";
        const gapSx = isFirstElement
          ? undefined
          : useSectionGap
            ? researchMethodSectionGapSx
            : useReusableComponentGap
              ? REUSABLE_COMPONENT_GAP_SX
              : DEFAULT_BLOCK_GAP_SX;

        return (
          <Box key={block.id} sx={gapSx}>
            <ResearchMethodBlockRenderer block={block} />
          </Box>
        );
      })}
    </Stack>
  );
};
