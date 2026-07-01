import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import {
  myContributionsCardSx,
  myContributionsListSx,
} from "../layoutConfig";
import {
  AUTOMATIC_SEATER_CONTRIBUTIONS_BODY_COLOR,
  AUTOMATIC_SEATER_CONTRIBUTIONS_TITLE_COLOR,
  bodyTypeSx,
  titleTypeSx,
} from "../typography";

export type MyContributionsData = {
  title: string;
  background: string;
  items: string[];
};

type Props = {
  data: MyContributionsData;
};

export default function MyContributions({ data }: Props) {
  const { title, background, items } = data;

  return (
    <Box component="section" sx={myContributionsCardSx(background)}>
      <Typography
        component="h2"
        align="center"
        sx={titleTypeSx("contributionsTitle", {
          color: AUTOMATIC_SEATER_CONTRIBUTIONS_TITLE_COLOR,
          mb: { xs: 4, sm: 5, md: 6 },
        })}
      >
        {title}
      </Typography>
      <List
        disablePadding
        sx={{
          ...myContributionsListSx,
          color: AUTOMATIC_SEATER_CONTRIBUTIONS_BODY_COLOR,
        }}
      >
        {items.map((item) => (
          <ListItem
            key={item}
            disableGutters
            sx={{
              display: "list-item",
              py: 0.25,
              color: "inherit",
            }}
          >
            <ListItemText
              primary={item}
              slotProps={{
                primary: {
                  sx: bodyTypeSx("contributionsItem", {
                    color: AUTOMATIC_SEATER_CONTRIBUTIONS_BODY_COLOR,
                  }),
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
