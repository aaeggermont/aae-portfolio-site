import { Box, Stack, Typography } from "@mui/material";

import type { ResearchCardContentBlock } from "../researchMethodTypes";

const bulletRowSx = {
  color: "#ffffff",
  fontSize: "14px",
  lineHeight: 1.6,
  fontFamily: "'Poppins', Helvetica",
} as const;

const paragraphSx = {
  ...bulletRowSx,
};

type Props = {
  block: ResearchCardContentBlock;
};

export const ResearchMethodBlockRenderer = ({ block }: Props) => {
  switch (block.type) {
    case "paragraphs":
      return (
        <Stack spacing={1.5} px={2}>
          {block.paragraphs.map((text, i) => (
            <Typography key={`${block.id}-p-${i}`} sx={paragraphSx}>
              {text}
            </Typography>
          ))}
        </Stack>
      );
    case "bullets": {
      const marker = block.marker ?? "square";
      return (
        <Stack spacing={2}>
          {block.items.map((text, index) => (
            <Stack
              key={`${block.id}-b-${index}`}
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              px={2}
            >
              {marker === "square" ? (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    minWidth: 12,
                    bgcolor: "#e2e3e8",
                    borderRadius: "4px",
                    mt: "4px",
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
                    mt: "6px",
                  }}
                />
              ) : (
                <Typography
                  component="span"
                  sx={{ ...bulletRowSx, minWidth: "1em", mt: "2px" }}
                >
                  —
                </Typography>
              )}
              <Typography sx={bulletRowSx}>{text}</Typography>
            </Stack>
          ))}
        </Stack>
      );
    }
    case "image": {
      const ratio = block.aspectRatio ?? "16 / 9";
      return (
        <Stack spacing={1} px={2}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: ratio,
              borderRadius: "8px",
              overflow: "hidden",
              bgcolor: "rgba(0,0,0,0.2)",
            }}
          >
            <Box
              component="img"
              src={block.src}
              alt={block.alt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: block.objectFit ?? "cover",
                display: "block",
              }}
            />
          </Box>
          {block.caption ? (
            <Typography
              sx={{
                color: "#cfcccc",
                fontSize: "12px",
                lineHeight: 1.5,
                fontFamily: "'Poppins', Helvetica",
                textAlign: "center",
              }}
            >
              {block.caption}
            </Typography>
          ) : null}
        </Stack>
      );
    }
    case "custom":
      return <Box sx={{ px: 2 }}>{block.node}</Box>;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
};
