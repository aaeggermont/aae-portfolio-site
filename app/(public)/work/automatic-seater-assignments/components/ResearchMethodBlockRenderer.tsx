"use client";

import { Box, Stack, Typography } from "@mui/material";

import type {
  ResearchCardContentBlock,
  RichParagraphSegment,
} from "../researchMethodTypes";
import { ResearchMethodImageBlock } from "./ResearchMethodImageBlock";
import { ReusableComponent } from "./ReusableComponent";
import UserPersonas from "./UserPersonas";

const bodyTextBaseSx = {
  color: "#ffffff",
  lineHeight: 1.6,
  fontFamily: "'Poppins', Helvetica",
} as const;

const paragraphSx = {
  ...bodyTextBaseSx,
  fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
} as const;

const bulletTextSx = {
  ...bodyTextBaseSx,
  fontSize: "inherit",
  minWidth: 0,
} as const;

const bulletRowFontSx = {
  fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
} as const;

type Props = {
  block: ResearchCardContentBlock;
};

const renderRichParagraphSegment = (
  segment: RichParagraphSegment,
  key: string,
  emphasisColor: string,
) => {
  const isEmphasis = segment.style === "emphasis";
  return (
    <Box
      key={key}
      component="span"
      sx={
        isEmphasis
          ? {
              color: emphasisColor,
              fontWeight: 600,
            }
          : undefined
      }
    >
      {segment.text}
    </Box>
  );
};

export const ResearchMethodBlockRenderer = ({ block }: Props) => {
  switch (block.type) {
    case "paragraphs": {
      const paragraphColor = block.textColors?.paragraph ?? "#ffffff";
      const emphasisColor = block.textColors?.emphasis ?? "#EDD84A";
      return (
        <Stack spacing={1.5} py={2}>
          {block.paragraphs.map((paragraph, i) => (
            <Typography
              key={`${block.id}-p-${i}`}
              sx={{ ...paragraphSx, color: paragraphColor }}
            >
              {typeof paragraph === "string"
                ? paragraph
                : paragraph.map((segment, j) =>
                    renderRichParagraphSegment(
                      segment,
                      `${block.id}-p-${i}-seg-${j}`,
                      emphasisColor,
                    ),
                  )}
            </Typography>
          ))}
        </Stack>
      );
    }
    case "bullets": {
      const marker = block.marker ?? "square";
      return (
        <Stack spacing={1.5} px={0.5}>
          {block.items.map((text, index) => (
            <Box
              key={`${block.id}-b-${index}`}
              sx={{
                ...bulletRowFontSx,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "13px",
                alignItems: "start",
              }}
            >
              {marker === "square" ? (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    minWidth: 12,
                    bgcolor: "#e2e3e8",
                    borderRadius: "4px",
                    mt: "0.35em",
                  }}
                />
              ) : marker === "dot" ? (
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    minWidth: 8,
                    borderRadius: "50%",
                    bgcolor: "#e2e3e8",
                    mt: "0.45em",
                  }}
                />
              ) : (
                <Typography
                  component="span"
                  sx={{ ...bulletTextSx, minWidth: "1em", mt: "0.2em" }}
                >
                  —
                </Typography>
              )}
              <Typography
                sx={{
                  ...bulletTextSx,
                  fontSize: { xs: "0.9rem", md: "1rem", lg: "1rem" },
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Stack>
      );
    }
    case "image":
      return <ResearchMethodImageBlock block={block} />;
    case "reusableComponent":
      return (
        <ReusableComponent
          title={block.title}
          description={block.description}
          objectPath={block.objectPath}
          alt={block.alt}
          projectKey={block.projectKey}
          sizes={block.sizes}
          textColors={block.textColors}
        />
      );
    case "userPersonas":
      return <UserPersonas personas={block.personas} />;
    case "custom":
      return <Box sx={{ px: 2 }}>{block.node}</Box>;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
};
