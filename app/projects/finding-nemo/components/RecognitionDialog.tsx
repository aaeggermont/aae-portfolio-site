"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImageLightbox from "@/lib/media/ProjectImageLightbox";

const RECOGNITION_CERTIFICATE_LIGHTBOX_ID = "finding-nemo-recognition-certificate";

export type RecognitionDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  data: NonNullable<FindingNemoDataProjectDocument["projectHeader"]["recognition"]>;
};

const recognitionLinkSx = {
  color: "#02305d",
  cursor: "pointer",
  border: "none",
  background: "none",
  padding: 0,
  font: "inherit",
  textAlign: "inherit",
  "&:hover": {
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  "&:focus-visible": {
    outline: "2px solid #02305d",
    outlineOffset: 3,
    borderRadius: "4px",
  },
} as const;

const recognitionAwardButtonSx = {
  ...recognitionLinkSx,
  "&:hover": {
    opacity: 0.82,
    textDecoration: "none",
  },
} as const;

export { recognitionAwardButtonSx, recognitionLinkSx };

const recognitionSectionTitleFontSx = {
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: 1.3,
  [breakpointMediaQuery.tabletUp]: {
    fontSize: "22px",
  },
  [breakpointMediaQuery.desktopUp]: {
    fontSize: "24px",
  },
} as const;

export default function RecognitionDialog({
  open,
  onClose,
  title,
  data,
}: RecognitionDialogProps) {
  const { dialogDescription, certificateImage, teamMembers } = data;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      scroll="paper"
      aria-labelledby="finding-nemo-recognition-dialog-title"
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: "100%",
            maxWidth: 720,
            borderRadius: "24px",
            backgroundColor: "#edf3f8",
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
          px: { xs: 3, md: 5 },
          pt: { xs: 3, md: 4 },
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "37px 1fr 37px",
            alignItems: "start",
            columnGap: 1,
            width: "100%",
          }}
        >
          <Box aria-hidden />
          <Typography
            id="finding-nemo-recognition-dialog-title"
            component="h2"
            sx={{
              width: "100%",
              textAlign: "center",
              color: "#02305d",
              mx: "auto",
              ...recognitionSectionTitleFontSx,
            }}
          >
            {title}
          </Typography>
          <IconButton
            aria-label="Close recognition dialog"
            onClick={onClose}
            size="small"
            sx={{
              width: 37,
              height: 37,
              justifySelf: "end",
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
      </Box>
      <DialogContent
        sx={{
          px: { xs: 3, md: 5 },
          pt: 3,
          pb: { xs: 4, md: 5 },
          backgroundColor: "#edf3f8",
        }}
      >
        <Stack spacing={4.5} alignItems="center">
          <Stack spacing={1.5} alignItems="center" width="100%">
            <Box
              sx={{
                width: "100%",
                maxWidth: 420,
              }}
            >
              <ProjectImageLightbox
                objectPath={certificateImage.objectPath}
                alt={certificateImage.alt}
                lightboxId={RECOGNITION_CERTIFICATE_LIGHTBOX_ID}
                width={certificateImage.width}
                height={certificateImage.height}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
            <Typography
              component="p"
              align="center"
              sx={{
                color: "text.primary",
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.5,
                maxWidth: 560,
              }}
            >
              {dialogDescription}
            </Typography>
          </Stack>
          <Stack spacing={1.5} alignItems="center">
            <Typography
              component="h3"
              align="center"
              sx={{
                color: "text.primary",
                width: "100%",
                textAlign: "center",
                ...recognitionSectionTitleFontSx,
              }}
            >
              Datathon Team Members
            </Typography>
            <List dense disablePadding sx={{ listStyleType: "disc", pl: 3 }}>
              {teamMembers.map((member) => (
                <ListItem
                  key={member}
                  sx={{
                    display: "list-item",
                    py: 0,
                    px: 0,
                  }}
                >
                  <ListItemText
                    primary={member}
                    primaryTypographyProps={{
                      sx: {
                        color: "text.primary",
                        fontSize: "1rem",
                        fontWeight: 400,
                        lineHeight: 1.4,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
