import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { getUsableLayoutWidth } from "../layoutConfig";

/* The card caps at the project's desktop usable width (`1260 − 2 × 80 = 1100px`) and
   centers in any viewport wider than that. Inside `.project-content` the parent already
   constrains it on desktop, so this `maxWidth` is mostly defensive — it keeps the
   component looking right if it's ever rendered outside the page wrapper. */
const CONTEXT_NOTIFICATIONS_MAX_WIDTH = getUsableLayoutWidth("desktop");

/* Inline iPhone notification mockup (Figma export). Kept as a data URI so this component
   stays self-contained and doesn't require an asset import; if we end up generating more
   than one variant, it's worth promoting to a dedicated PNG under `Images/`. */
const NOTIFICATION_IMAGE_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbQAAAFpCAYAAAB9dZYkAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nO3de5BU9Z3/8c+QwGQm2TQkWJQm2bJg0C1uWJYJbQ1hK6m0m1ZrQf0xqv1VdW9q+6L9VdVZrW0n5p6qK3m0sYwG2y0hTQhA0g0m0mQmGQmCwQmA0E0mQmJm7j+e7zv3fPec+5957n3nPec+59z3nPec+59z3n3n1m2p2mQAAAPg6r6cAAABg1z5wAAAA0J0BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAA6E4BAAAAuG6m4v0f9v7r9w0AAHh3v7+fT9x8+fLly9fX18fHR0dGxsbFxcXKysrIyMjPz8/f39/////8X7eAAAgH6vV6vV6vX6vX6vV6vV6vV6vV6vV6vV6vV6vV6vV6vV6vV6vV6vV6vV6vV6vV6vX4fQAAQJ8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT0+AABAn+Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLj4wAAQJ+qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq+gAAQJ+ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqaPgAAQJ+tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2trf4AAECf8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/MTAABAn9bW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1g8AAECfzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozw8AAECf4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4wAAQJ/T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTEwAAQJ+2trYAAADg4V7S8cZ7v9f2y7l8c3mK1m8q9m9n4N1m3mYzv8l6m9q2b3y7Y5m4v1xk5b5m7c8m7h0mYvV1e7n9+8uLq7u9vJ3G8Zr8+qf6P2k8Z2M3Y0N3l8s6o9h8tYv8o9QwAAaH0o1QAAANCdAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOhOAQAAAOj+F2xP2r4m3QkAAAAASUVORK5CYII=";

const navigationButtons = [
  {
    key: "previous",
    label: "Previous notification",
    icon: <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "next",
    label: "Next notification",
    icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} />,
  },
];

export interface ContextualNotificationsProps {
  title: string;
  /* Optional + defaulted in the component because Firestore data is loosely typed and
     the field may not be present on every document. Same pattern as `ArAsNarrative`. */
  paragraphs?: string[];
}

export const ContextualNotifications = ({
  title,
  paragraphs = [],
}: ContextualNotificationsProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: CONTEXT_NOTIFICATIONS_MAX_WIDTH,
        mx: "auto",
        bgcolor: "#f5f5f7",
        borderRadius: { xs: 4, md: "30px" },
        px: { xs: 3, sm: 5, md: 6 },
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Typography
              component="h2"
              variant="h4"
              sx={{
                color: "#03133c",
                fontWeight: 800,
                fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.75rem" },
                lineHeight: 1.2,
                letterSpacing: 0,
              }}
            >
              {title}
            </Typography>
            {paragraphs.map((paragraph, idx) => (
              <Typography
                key={idx}
                component="p"
                sx={{
                  color: "#010a24",
                  fontSize: { xs: "1.5rem", sm: "1.2rem", md: "1.5rem" },
                  lineHeight: 1.45,
                  letterSpacing: 0,
                  maxWidth: 760,
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Stack>
          <Stack spacing={3} alignItems="center">
            <Box
              component="img"
              src={NOTIFICATION_IMAGE_SRC}
              alt="Contextual notification example"
              sx={{
                width: "100%",
                maxWidth: 434,
                height: "auto",
                display: "block",
              }}
            />
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ width: "100%" }}
            >
              {navigationButtons.map((button, index) => (
                <IconButton
                  key={button.key}
                  aria-label={button.label}
                  disabled={index === 0}
                  size="small"
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: "#f1f1f3",
                    color: "#11255f",
                    "&.Mui-disabled": {
                      bgcolor: "#f1f1f3",
                      color: "rgba(17, 37, 95, 0.28)",
                    },
                    "&:hover": {
                      bgcolor: "#e8e8ec",
                    },
                  }}
                >
                  {button.icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContextualNotifications;
