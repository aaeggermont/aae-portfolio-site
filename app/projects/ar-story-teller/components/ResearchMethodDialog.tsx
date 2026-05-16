"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const sections = [
  {
    title: "Overview",
    content: [
      "Co-design workshops were conducted with a mix of Cast Members and frequent park visitors to collaboratively explore opportunities for enhancing the queue experience. Sessions were held remotely using Miro and structured around guided activities focused on how the physical environment could become part of the attraction while guests wait in line.",
      "Participants were also introduced to an early AR prototype, enabling collaborative ideation around features and interactions. These sessions helped surface guest expectations, pain points, and opportunities for integrating storytelling into the queue experience.",
    ],
  },
  {
    title: "Approach",
    content: [
      "Workshops were structured into two phases. The first focused on understanding how guests currently experience wait times and how the surrounding environment could be leveraged as part of the attraction. The second phase introduced a preliminary prototype to prompt discussion and generate ideas for AR-driven interactions.",
    ],
  },
  {
    title: "Key Insights",
    bullets: [
      "Limited understanding of attraction narratives.",
      "Desire for accessible, digital storytelling",
      "Guests prefer in-context, digital ways to learn about attractions rather than relying on external sources like blogs or printed materials.",
      "Idle wait time creates unmet engagement opportunities",
      "Extended wait times leave guests unsure how to spend their time, highlighting a need for meaningful engagement while in queue.",
      "Some guests reported difficulty understanding the narrative while on the ride, suggesting an opportunity to introduce story elements beforehand.",
      "Openness to guided, contextual interactions.",
      "Guests responded positively to prompts or cues that guide them to interact with their environment using their devices.",
      "Interest in shareable, memory-driven experiences.",
      "Participants showed strong interest in capturing AR-enhanced photos and sharing them as part of their visit.",
    ],
  },
  {
    title: "Key Takeaway",
    content: [
      "These insights directly informed the design of AR features that transform waiting into an interactive experience. This includes introducing location-based discovery, contextual notifications, and shareable AR moments—ensuring that engagement is both meaningful and aligned with guest behavior.",
    ],
  },
  {
    title: "Design Implications",
    content: [
      "These insights directly informed the design of AR features that transform waiting into an interactive experience. This includes introducing location-based discovery, contextual notifications, and shareable AR moments—ensuring that engagement is both meaningful and aligned with guest behavior.",
    ],
  },
];

export interface ResearchMethodDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ResearchMethodDialog = ({
  open,
  onClose,
}: ResearchMethodDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      scroll="paper"
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: "100%",
            maxWidth: 770,
            borderRadius: "30px",
            backgroundColor: "#ffffff",
            margin: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        component="header"
        sx={{
          flexShrink: 0,
          px: 5,
          pt: 5,
          pb: 0,
          backgroundColor: "#ffffff",
        }}
      >
        <Stack spacing={4}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              aria-label="Close"
              onClick={onClose}
              size="small"
              sx={{
                width: 37,
                height: 37,
                backgroundColor: "#E8E8EC",
                color: "#6E6E73",
                "&:hover": {
                  backgroundColor: "#E0E0E5",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{
              fontSize: { xs: 20, sm: 20, md: 24 ,lg: 24},
              fontFamily:
                "var(--font-satoshi), var(--font-poppins), sans-serif",
              fontStyle: "normal",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.2,
            }}
          >
            Co-design Workshops
          </Typography>
        </Stack>
      </Box>
      <DialogContent
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          /* `scroll` keeps the bar visible when content overflows (vs `auto`, which can
             hide overlay scrollbars on macOS). Styled track/thumb match the close button grey. */
          overflowY: "scroll",
          scrollbarGutter: "stable",
          scrollbarWidth: "thin",
          scrollbarColor: "#A8A8AD #E8E8EC",
          px: 5,
          pt: 4,
          pb: 5,
          backgroundColor: "#ffffff",
          "&::-webkit-scrollbar": {
            width: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#E8E8EC",
            borderRadius: 5,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#A8A8AD",
            borderRadius: 5,
            border: "2px solid #E8E8EC",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#6E6E73",
          },
        }}
      >
        <Stack component="main" spacing={3.5}>
            {sections.map((section) => (
              <Box component="section" key={section.title}>
                <Stack spacing={1.5}>
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#111111",
                      lineHeight: 1.3,
                    }}
                  >
                    {section.title}
                  </Typography>
                  {section.content?.map((paragraph) => (
                    <Typography
                      key={paragraph}
                      component="p"
                      sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#111111",
                        lineHeight: 1.5,
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}

                  {section.bullets && (
                    <Box component="ul" sx={{ m: 0, pl: 3 }}>
                      {section.bullets.map((item) => (
                        <Box component="li" key={item} sx={{ mb: 0.25 }}>
                          <Typography
                            component="span"
                            sx={{
                              fontSize: 16,
                              fontWeight: 400,
                              color: "#111111",
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Stack>
              </Box>
            ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ResearchMethodDialog;
