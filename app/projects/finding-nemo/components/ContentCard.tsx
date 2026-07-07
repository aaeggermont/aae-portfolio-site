import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/** Fixed card width — consistent across mobile, tablet, and desktop. */
const CARD_WIDTH_PX = 324;
const DEFAULT_CARD_HEIGHT_PX = 344;
export const CHALLENGES_CARD_HEIGHT_PX = 280;
export const PRIMARY_USERS_CARD_HEIGHT_PX = 320;
export const PRIMARY_USERS_CARD_WIDTH_PX = 340;

export type ContentCardDimensions = {
  width: number;
  height: number;
};

export type ContentCardProps = {
  title: string;
  description: string | string[];
  /** Card width in px; defaults to 324. Ignored when `fluid` or `responsiveDimensions` is set. */
  widthPx?: number;
  /** Card height in px; defaults to 344. Ignored when `fluid` or `responsiveDimensions` is set. */
  heightPx?: number;
  /** KPI-style surface, shadow, and hover lift (Defining Success cards). */
  interactive?: boolean;
  /** Fill the grid/flex cell (`width: 100%`, auto height). */
  fluid?: boolean;
  /** Card surface color; defaults to `#fff`. */
  backgroundColor?: string;
  /** Body copy alignment inside the card. */
  descriptionTextAlign?: "left" | "center";
  /** Breakpoint-specific fixed dimensions (overrides `widthPx` / `heightPx` / `fluid`). */
  responsiveDimensions?: {
    mobile: ContentCardDimensions;
    tablet: ContentCardDimensions;
    desktop: ContentCardDimensions;
  };
};

export default function ContentCard({
  title,
  description,
  widthPx = CARD_WIDTH_PX,
  heightPx = DEFAULT_CARD_HEIGHT_PX,
  interactive = false,
  fluid = false,
  backgroundColor = "#fff",
  descriptionTextAlign = "left",
  responsiveDimensions,
}: ContentCardProps) {
  const bulletItems = Array.isArray(description) ? description : null;
  const hoverBackgroundColor =
    backgroundColor === "#fff" ? "#fff" : backgroundColor;

  const sizeSx = responsiveDimensions
    ? {
        width: responsiveDimensions.mobile.width,
        minWidth: responsiveDimensions.mobile.width,
        maxWidth: responsiveDimensions.mobile.width,
        height: responsiveDimensions.mobile.height,
        minHeight: responsiveDimensions.mobile.height,
        maxHeight: responsiveDimensions.mobile.height,
        [breakpointMediaQuery.tabletUp]: {
          width: responsiveDimensions.tablet.width,
          minWidth: responsiveDimensions.tablet.width,
          maxWidth: responsiveDimensions.tablet.width,
          height: responsiveDimensions.tablet.height,
          minHeight: responsiveDimensions.tablet.height,
          maxHeight: responsiveDimensions.tablet.height,
        },
        [breakpointMediaQuery.desktopUp]: {
          width: responsiveDimensions.desktop.width,
          minWidth: responsiveDimensions.desktop.width,
          maxWidth: responsiveDimensions.desktop.width,
          height: responsiveDimensions.desktop.height,
          minHeight: responsiveDimensions.desktop.height,
          maxHeight: responsiveDimensions.desktop.height,
        },
      }
    : {
        width: fluid ? "100%" : widthPx,
        minWidth: fluid ? 0 : widthPx,
        maxWidth: fluid ? "100%" : widthPx,
        height: fluid ? "auto" : heightPx,
        minHeight: fluid ? CHALLENGES_CARD_HEIGHT_PX : heightPx,
        maxHeight: fluid ? "none" : heightPx,
      };

  return (
    <Card
      elevation={0}
      sx={{
        ...sizeSx,
        flexGrow: fluid ? 1 : 0,
        flexShrink: 0,
        boxSizing: "border-box",
        borderRadius: "20px",
        bgcolor: backgroundColor,
        border: "1px solid transparent",
        ...(interactive
          ? {
              ...interactiveCardHoverSx,
              "&:hover": {
                ...interactiveCardHoverSx["&:hover"],
                bgcolor: hoverBackgroundColor,
              },
            }
          : {}),
      }}
    >
      <CardContent
        sx={{
          px: 4,
          pt: 6,
          pb: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Typography
          component="h3"
          align="center"
          sx={titleTypeSx("contentCardTitle", {
            width: "100%",
            color: "common.black",
            fontWeight: 700,
            lineHeight: 1.1,
          })}
        >
          {title}
        </Typography>
        {bulletItems ? (
          <List
            sx={{
              width: "100%",
              my: 0,
              p: 0,
              listStyleType: "disc",
              listStylePosition: "outside",
              pl: 2.5,
            }}
          >
            {bulletItems.map((item) => (
              <ListItem
                key={item}
                disableGutters
                sx={
                  [
                    {
                      display: "list-item",
                      py: 0.25,
                      color: "common.black",
                    },
                    bodyTypeSx("contentCardBody", {
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }),
                  ] as SxProps<Theme>
                }
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    color: "inherit",
                    fontFamily: "inherit",
                    fontWeight: 400,
                  }}
                >
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            component="p"
            sx={bodyTypeSx("contentCardBody", {
              width: "100%",
              color: "common.black",
              lineHeight: 1.6,
              textAlign: descriptionTextAlign,
              fontWeight: 400,
              m: 0,
            })}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
