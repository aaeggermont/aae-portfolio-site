import { Box, Stack, Typography } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";

interface ArAsNarrativeProps {
  title: string;
  /* Optional + defaulted in the component because Firestore data is loosely typed and the
     field may not be present on every document. */
  paragraphs?: string[];
  imageSrc: string;
  alt: string;
}

/* Intrinsic ratio for the right-column image — used by `next/image` (via `ProjectImage`)
   to reserve layout space and avoid first-paint shift. CSS overrides the rendered size
   to be fluid (`width: 100%; height: auto`), so the actual displayed aspect follows the
   loaded asset. Update if your asset is significantly off this ratio. */
const AR_NARRATIVE_IMAGE_INTRINSIC_WIDTH = 1280;
const AR_NARRATIVE_IMAGE_INTRINSIC_HEIGHT = 960;

/* The "row" layout kicks in at the project's desktop boundary (1024px) rather than MUI's
   default `md` breakpoint (900px). Tablet sizes (768–1023px) stay column-stacked because
   the right-column image would otherwise crowd the title/description in that range.
   See `lib/responsive/breakpoints.ts` for the source-of-truth boundaries. */
const DESKTOP_BREAKPOINT_MQ = "@media (min-width: 1024px)";

const ArAsNarrative = ({
  title,
  paragraphs = [],
  imageSrc,
  alt,
}: ArAsNarrativeProps) => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#f4f5f6",
        borderRadius: { xs: 4, md: "30px" },
        overflow: "hidden",
        px: { xs: 3, sm: 4, md: 6 },
        py: { xs: 3, sm: 4, md: 6 },
        width: "100%",
      }}
    >
      <Stack
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
          [DESKTOP_BREAKPOINT_MQ]: {
            flexDirection: "row",
            gap: 8,
          },
        }}
      >
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            maxWidth: "100%",
            [DESKTOP_BREAKPOINT_MQ]: {
              maxWidth: "628.5px",
            },
          }}
        >
          <Typography
            component="h2"
            sx={{
              color: "#03133c",
              fontWeight: 800,
              fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
              lineHeight: 1.1,
              textAlign: "center",
              [DESKTOP_BREAKPOINT_MQ]: {
                textAlign: "left",
              },
            }}
          >
            {title}
          </Typography>
          {paragraphs.map((paragraph, idx) => (
            <Typography
              key={idx}
              component="p"
              sx={{
                color: "#002464",
                fontWeight: 500,
                fontSize: { xs: "1.5rem", sm: "1.2rem", md: "1.3rem" },
                lineHeight: 1.35,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Stack>
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: "100%",
            [DESKTOP_BREAKPOINT_MQ]: {
              maxWidth: "628.5px",
            },
          }}
        >
          <ProjectImage
            objectPath={imageSrc}
            alt={alt}
            width={AR_NARRATIVE_IMAGE_INTRINSIC_WIDTH}
            height={AR_NARRATIVE_IMAGE_INTRINSIC_HEIGHT}
            borderRadius="24px"
            /* `sizes` mirrors the layout: full viewport width while the image sits in its
               own row (column-stacked), capped near the column max once it shares a row
               with the text at the desktop boundary. */
            sizes="(max-width: 1023px) 100vw, 628px"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ArAsNarrative;