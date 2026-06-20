import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";

/** Fixed card width — consistent across mobile, tablet, and desktop. */
const CARD_WIDTH_PX = 324;
const DEFAULT_CARD_HEIGHT_PX = 344;
export const CHALLENGES_CARD_HEIGHT_PX = 280;
export const PRIMARY_USERS_CARD_HEIGHT_PX = 320;
export const PRIMARY_USERS_CARD_WIDTH_PX = 340;

export type ContentCardProps = {
  title: string;
  description: string | string[];
  /** Card width in px; defaults to 324. */
  widthPx?: number;
  /** Card height in px; defaults to 344. */
  heightPx?: number;
  /** KPI-style surface, shadow, and hover lift (Defining Success cards). */
  interactive?: boolean;
};

export default function ContentCard({
  title,
  description,
  widthPx = CARD_WIDTH_PX,
  heightPx = DEFAULT_CARD_HEIGHT_PX,
  interactive = false,
}: ContentCardProps) {
  const bulletItems = Array.isArray(description) ? description : null;

  return (
    <Card
      elevation={0}
      sx={{
        width: widthPx,
        minWidth: widthPx,
        maxWidth: widthPx,
        height: heightPx,
        minHeight: heightPx,
        maxHeight: heightPx,
        flexGrow: 0,
        flexShrink: 0,
        boxSizing: "border-box",
        borderRadius: "20px",
        bgcolor: "#fff",
        border: "1px solid transparent",
        ...(interactive
          ? {
              ...interactiveCardHoverSx,
              "&:hover": {
                ...interactiveCardHoverSx["&:hover"],
                bgcolor: "#fff",
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
              textAlign: "left",
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
