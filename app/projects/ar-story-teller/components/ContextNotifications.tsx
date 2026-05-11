import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HotelIcon from "@mui/icons-material/Hotel";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { getUsableLayoutWidth } from "../layoutConfig";

const CONTEXT_NOTIFICATIONS_MAX_WIDTH = getUsableLayoutWidth("desktop");

export const ContextualNotifications = () => {
  const title = "Contextual Notifications";
  const description =
    "Contextual notifications are designed to align with the attraction’s narrative arc, gradually increasing in intensity as guests progress through the queue. Triggered by location and timing, these notifications guide exploration, surface story elements, and reinforce the escalating tone of the experience.";

  const notification = {
    title: "Hollywood Tower of Terror",
    time: "1m ago",
    message:
      "You are entering the Twiling Zone\nAs you walk and wait in line, find objects from the 5th dimension",
    action: "View AR",
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#f5f5f7",
        borderRadius: { xs: 4, md: "40px" },
        px: { xs: 3, sm: 5, md: 6 },
        py: { xs: 4, md: 6 },
        overflow: "hidden",
        width: "100%",
        maxWidth: CONTEXT_NOTIFICATIONS_MAX_WIDTH,
        mx: "auto",
      }}
    >
      <Stack spacing={{ xs: 4, md: 8 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#03133c",
            fontSize: { xs: "1.9rem", md: "2.1rem" },
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          sx={{
            color: "#010a24",
            fontSize: { xs: "1.15rem", md: "1.35rem" },
            lineHeight: 1.45,
            maxWidth: 760,
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            minHeight: { xs: 360, md: 420 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 670,
              minHeight: { xs: 320, md: 420 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: { xs: "8%", md: "18%" },
                bottom: { xs: 0, md: 10 },
                width: { xs: 120, md: 150 },
                height: { xs: 230, md: 290 },
              }}
            >
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: "30%",
                    top: 0,
                    width: "34%",
                    height: "12%",
                    bgcolor: "#111",
                    borderRadius: "40% 60% 35% 65%",
                    transform: "skew(-8deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "33%",
                    top: "7%",
                    width: "26%",
                    height: "10%",
                    bgcolor: "#d9a88d",
                    borderRadius: "40% 40% 45% 45%",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "20%",
                    top: "16%",
                    width: "48%",
                    height: "22%",
                    bgcolor: "#7fa0c8",
                    borderRadius: "35% 35% 20% 20%",
                    transform: "rotate(-2deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "16%",
                    top: "22%",
                    width: "12%",
                    height: "18%",
                    bgcolor: "#7fa0c8",
                    borderRadius: "999px",
                    transform: "rotate(10deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "60%",
                    top: "22%",
                    width: "11%",
                    height: "18%",
                    bgcolor: "#7fa0c8",
                    borderRadius: "999px",
                    transform: "rotate(18deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "66%",
                    top: "20%",
                    width: "11%",
                    height: "8%",
                    bgcolor: "#d9a88d",
                    borderRadius: "999px",
                    transform: "rotate(16deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "71%",
                    top: "18%",
                    width: "9%",
                    height: "10%",
                    bgcolor: "#1e3a6d",
                    borderRadius: "3px",
                    transform: "rotate(22deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "29%",
                    top: "38%",
                    width: "11%",
                    height: "20%",
                    bgcolor: "#d9a88d",
                    borderRadius: "999px",
                    transform: "rotate(-12deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "31%",
                    top: "52%",
                    width: "7%",
                    height: "12%",
                    bgcolor: "#d9a88d",
                    borderRadius: "999px",
                    transform: "rotate(-12deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "26%",
                    top: "58%",
                    width: "18%",
                    height: "3%",
                    bgcolor: "#4b1436",
                    borderRadius: "999px",
                    transform: "rotate(20deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "29%",
                    top: "38%",
                    width: "15%",
                    height: "52%",
                    bgcolor: "#4b1436",
                    borderRadius: "12px 12px 6px 6px",
                    transform: "rotate(4deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "46%",
                    top: "38%",
                    width: "14%",
                    height: "52%",
                    bgcolor: "#3a0f2d",
                    borderRadius: "12px 12px 6px 6px",
                    transform: "rotate(-3deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "27%",
                    bottom: "2%",
                    width: "13%",
                    height: "5%",
                    bgcolor: "#6aa0d8",
                    borderRadius: "10px 10px 6px 6px",
                    border: "2px solid #23324f",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "47%",
                    bottom: "2%",
                    width: "14%",
                    height: "5%",
                    bgcolor: "#6aa0d8",
                    borderRadius: "10px 10px 6px 6px",
                    border: "2px solid #23324f",
                  }}
                />
              </Box>
            </Box>
            <Card
              elevation={0}
              sx={{
                position: "absolute",
                top: { xs: 10, md: 20 },
                left: { xs: "36%", md: "34%" },
                width: { xs: 280, sm: 320, md: 390 },
                bgcolor: "#8a8a8a",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1.25} alignItems="flex-start">
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: "#d4af37",
                        mt: 0.25,
                      }}
                    >
                      <HotelIcon sx={{ fontSize: 18, color: "#fff" }} />
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={1}
                        alignItems="flex-start"
                      >
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            lineHeight: 1.2,
                            color: "#f5f5f5",
                          }}
                        >
                          {notification.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            lineHeight: 1.2,
                            color: "#d8d8d8",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {notification.time}
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          mt: 0.25,
                          fontSize: "0.78rem",
                          lineHeight: 1.25,
                          color: "#ffffff",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {notification.message}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ViewInArIcon sx={{ fontSize: 14 }} />}
                      sx={{
                        minWidth: 0,
                        px: 1,
                        py: 0.3,
                        bgcolor: "#1e88ff",
                        textTransform: "none",
                        fontSize: "0.62rem",
                        borderRadius: "2px",
                        lineHeight: 1,
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#1976d2",
                          boxShadow: "none",
                        },
                      }}
                    >
                      {notification.action}
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <IconButton
            aria-label="Previous"
            size="small"
            sx={{
              bgcolor: "#efeff2",
              color: "#9ea3b3",
              width: 30,
              height: 30,
              "&:hover": { bgcolor: "#e7e7eb" },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <IconButton
            aria-label="Next"
            size="small"
            sx={{
              bgcolor: "#efeff2",
              color: "#03133c",
              width: 30,
              height: 30,
              "&:hover": { bgcolor: "#e7e7eb" },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContextualNotifications;
