import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import {
  AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
  AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
  bodyTypeSx,
  titleTypeSx,
} from "../typography";

const MY_CONTRIBUTIONS_CARD_BACKGROUND =
  "linear-gradient(109deg, rgba(230, 233, 238, 0.25) 13.84%, rgba(188, 197, 207, 0.25) 56.92%, rgba(142, 152, 164, 0.30) 78.46%, rgba(188, 197, 207, 0.60) 89.23%, #F2F4F7 100%)";

export type MyContributionsData = {
  title: string;
  items: string[];
};

type Props = {
  data: MyContributionsData;
};

export default function MyContributions({ data }: Props) {
  const { title, items } = data;

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: 660,
        minHeight: 355,
        mx: "auto",
        px: { xs: 3, sm: 5, md: 6 },
        py: { xs: 4, sm: 5, md: 6 },
        borderRadius: "32px",
        overflow: "hidden",
        borderTop: "1px solid transparent",
        background: MY_CONTRIBUTIONS_CARD_BACKGROUND,
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      }}
    >
      <Typography
        component="h2"
        align="center"
        sx={titleTypeSx("introCardTitle", {
          color: AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
          mb: { xs: 4, sm: 5, md: 6 },
        })}
      >
        {title}
      </Typography>
      <List
        disablePadding
        sx={{
          maxWidth: 420,
          mx: "auto",
          listStyleType: "decimal",
          pl: 4,
          color: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
        }}
      >
        {items.map((item) => (
          <ListItem
            key={item}
            disableGutters
            sx={{
              display: "list-item",
              py: 0.25,
            }}
          >
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                sx: bodyTypeSx("introCardBody", {
                  color: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
