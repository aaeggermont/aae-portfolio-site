import { Card, CardContent, Typography } from "@mui/material";

import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";

/** Fixed card size — consistent across mobile, tablet, and desktop. */
const CARD_WIDTH_PX = 324;
const CARD_HEIGHT_PX = 344;

export type BusinessChallengeCardProps = {
  title: string;
  description: string;
};

export default function BusinessChallengeCard({
  title,
  description,
}: BusinessChallengeCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        width: CARD_WIDTH_PX,
        minWidth: CARD_WIDTH_PX,
        maxWidth: CARD_WIDTH_PX,
        height: CARD_HEIGHT_PX,
        minHeight: CARD_HEIGHT_PX,
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
      </CardContent>
    </Card>
  );
}
