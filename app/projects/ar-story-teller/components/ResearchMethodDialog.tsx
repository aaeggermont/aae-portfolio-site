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
import {
  buildResearchMethodDialogSections,
  type ResearchMethodCardData,
} from "../types/researchMethodCard";
import { bodyTypeSx, titleTypeSx } from "../typography";

const DIALOG_TITLE_SX = titleTypeSx("cardTitle", {
  textAlign: "center",
  lineHeight: 1.2,
});

const DIALOG_SECTION_HEADING_SX = titleTypeSx("panelHeading", {
  lineHeight: 1.3,
});

const DIALOG_BODY_SX = bodyTypeSx("smallBody", {
  lineHeight: 1.5,
});

export interface ResearchMethodDialogProps {
  open: boolean;
  onClose: () => void;
  method: ResearchMethodCardData;
}

export const ResearchMethodDialog = ({
  open,
  onClose,
  method,
}: ResearchMethodDialogProps) => {
  const sections = buildResearchMethodDialogSections(method);

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
          <Typography component="h1" sx={DIALOG_TITLE_SX}>
            {method.title}
          </Typography>
        </Stack>
      </Box>
      <DialogContent
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
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
                <Typography component="h2" sx={DIALOG_SECTION_HEADING_SX}>
                  {section.title}
                </Typography>
                {section.content?.map((paragraph) => (
                  <Typography key={paragraph} component="p" sx={DIALOG_BODY_SX}>
                    {paragraph}
                  </Typography>
                ))}

                {section.bullets && (
                  <Box component="ul" sx={{ m: 0, pl: 3 }}>
                    {section.bullets.map((item) => (
                      <Box component="li" key={item} sx={{ mb: 0.25 }}>
                        <Typography component="span" sx={DIALOG_BODY_SX}>
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
