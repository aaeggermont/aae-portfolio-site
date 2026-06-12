import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";

/** Fixed card width — consistent across mobile, tablet, and desktop. */
const CARD_WIDTH_PX = 324;
const DEFAULT_CARD_HEIGHT_PX = 344;
export const CHALLENGES_CARD_HEIGHT_PX = 280;

export type BusinessChallengeCardProps = {
  title: string;
  description: string | string[];
  /** Card height in px; defaults to 344 (Business Opportunities). */
  heightPx?: number;
};

export default function BusinessChallengeCard({
  title,
  description,
  heightPx = DEFAULT_CARD_HEIGHT_PX,
}: BusinessChallengeCardProps) {
  const bulletItems = Array.isArray(description) ? description : null;

  return (
    <Card
      elevation={0}
      sx={{
        width: CARD_WIDTH_PX,
        minWidth: CARD_WIDTH_PX,
        maxWidth: CARD_WIDTH_PX,
        height: heightPx,
        minHeight: heightPx,
        flex: `0 0 ${CARD_WIDTH_PX}px`,
        boxSizing: "border-box",
        borderRadius: "20px",
        bgcolor: "#fff",
        border: "1px solid transparent",
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
          sx={titleTypeSx("cardTitle", {
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
                    bodyTypeSx("bodyText", {
                      lineHeight: 1.6,
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
            sx={bodyTypeSx("bodyText", {
              width: "100%",
              color: "common.black",
              lineHeight: 1.6,
              textAlign: "left",
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
