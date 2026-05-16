import AddIcon from "@mui/icons-material/Add";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import type { JSX } from "react";

export interface UserResearchMethodCardProps {
  title: string;
  summary?: string;
  actionLabel?: string;
}

export function UserResearchMethodCard({
  title,
  summary,
  actionLabel = "Read insights",
}: UserResearchMethodCardProps): JSX.Element {
  const summaryText = summary?.trim() ?? "";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Stack
        spacing={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          minHeight: 316,
          bgcolor: "#fff",
          borderRadius: "40px",
          overflow: "hidden",
          px: 4,
          pt: 6,
          pb: 4,
          boxSizing: "border-box",
        }}
      >
        <Typography
          component="h3"
          sx={{
            color: "#03133C",
            fontFamily:
              "var(--font-satoshi), var(--font-poppins), sans-serif",
            fontSize: { xs: "20px", sm: "22px", md: "24px" },
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {summaryText ? (
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "16px", sm: "16px", md: "16px" },
                fontFamily: "var(--font-source-sans-3), var(--font-montserrat), sans-serif",
                lineHeight: 1.45,
                fontWeight: 400,
                color: "#000",
                letterSpacing: 0,
              }}
            >
              {summaryText}
            </Typography>
          ) : null}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonBase
            aria-label={actionLabel}
            sx={{
              borderRadius: 999,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <AddIcon sx={{ color: "#fff", fontSize: 16 }} />
              </Box>
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: "16px", sm: "16px", md: "16px" },
                  fontFamily: "var(--font-source-sans-3), var(--font-montserrat), sans-serif",
                  lineHeight: 1.25,
                  fontWeight: 500,
                  color: "#000",
                  letterSpacing: 0,
                }}
              >
                {actionLabel}
              </Typography>
            </Stack>
          </ButtonBase>
        </Box>
      </Stack>
    </Box>
  );
}

export default UserResearchMethodCard;
