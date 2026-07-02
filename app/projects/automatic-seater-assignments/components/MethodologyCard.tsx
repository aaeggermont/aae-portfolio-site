import AddIcon from "@mui/icons-material/Add";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";

import { bodyTypeSx, mergeSx, titleTypeSx } from "../typography";
import {
  METHODOLOGY_CARD_BACKGROUND,
  methodologyCardDescriptionMaxWidthSx,
  methodologyCardDimensionsSx,
  methodologyCardReadInsightsGlyphSx,
  methodologyCardReadInsightsIconSx,
  methodologyCardReadInsightsRowSx,
} from "../layoutConfig";

export type MethodologyCardProps = {
  title: string;
  description: string;
  readInsightsLabel?: string;
  onReadInsights?: () => void;
};

export const MethodologyCard = ({
  title,
  description,
  readInsightsLabel = "Read insights",
  onReadInsights,
}: MethodologyCardProps) => {
  return (
    <Box
      component="article"
      sx={mergeSx(methodologyCardDimensionsSx, {
        bgcolor: METHODOLOGY_CARD_BACKGROUND,
        borderRadius: 4,
        boxShadow: "0px 8px 18px rgba(0,0,0,0.18)",
        overflow: "hidden",
      })}
    >
      <Stack
        justifyContent="space-between"
        sx={{
          height: "100%",
          boxSizing: "border-box",
          px: 4,
          pt: 6,
          pb: 4,
        }}
      >
        <Stack spacing={0}>
          <Typography
            component="h2"
            sx={titleTypeSx("methodologyCardTitle", { letterSpacing: 0 })}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          component="p"
          sx={mergeSx(bodyTypeSx("methodologyCardBody", { m: 0 }), methodologyCardDescriptionMaxWidthSx, {
            letterSpacing: 0,
            alignSelf: "flex-start",
          })}
        >
          {description}
        </Typography>
        <ButtonBase
          focusRipple
          onClick={onReadInsights}
          sx={{
            alignSelf: "center",
            borderRadius: 999,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={methodologyCardReadInsightsRowSx}
          >
            <Box sx={methodologyCardReadInsightsIconSx}>
              <AddIcon sx={methodologyCardReadInsightsGlyphSx} />
            </Box>
            <Typography
              component="span"
              sx={bodyTypeSx("methodologyCardAction", { letterSpacing: 0 })}
            >
              {readInsightsLabel}
            </Typography>
          </Stack>
        </ButtonBase>
      </Stack>
    </Box>
  );
};

export default MethodologyCard;
