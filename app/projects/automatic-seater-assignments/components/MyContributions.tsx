import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

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
        sx={{
          color: "#003366",
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          lineHeight: 1.2,
          mb: { xs: 4, sm: 5, md: 6 },
        }}
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
                sx: {
                  color: "#1f2937",
                  fontWeight: 500,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  lineHeight: 1.4,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
