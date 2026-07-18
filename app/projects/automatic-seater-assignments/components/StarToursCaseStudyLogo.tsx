"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import GatedImage from "@/lib/media/GatedImage";
import { layoutContentContainerSx } from "../layoutConfig";
import { AUTOMATIC_SEATER_PROJECT_KEY } from "../types/automaticSeaterAssignmentsContent";

/** Firebase Storage object for the Star Tours case-study header mark. */
export const STAR_TOURS_CASE_STUDY_LOGO_OBJECT_PATH =
  "projects/project_4/StarToursCaseStudyLogo.png";

/** Intrinsic ratio placeholder — image scales via CSS `height: auto`. */
const LOGO_INTRINSIC_WIDTH = 840;
const LOGO_INTRINSIC_HEIGHT = 420;

/**
 * Logo mark shown above the “Case Study: Star Tours” section title
 * inside the dark narrative band.
 */
export default function StarToursCaseStudyLogo() {
  return (
    <Container maxWidth={false} sx={layoutContentContainerSx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          "& img": {
            width: "100%",
            height: "auto",
            display: "block",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 260, sm: 340, md: 400 },
          }}
        >
          <GatedImage
            projectKey={AUTOMATIC_SEATER_PROJECT_KEY}
            objectPath={STAR_TOURS_CASE_STUDY_LOGO_OBJECT_PATH}
            alt="Star Tours"
            width={LOGO_INTRINSIC_WIDTH}
            height={LOGO_INTRINSIC_HEIGHT}
            sizes="(max-width: 600px) 260px, (max-width: 900px) 340px, 400px"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Container>
  );
}
