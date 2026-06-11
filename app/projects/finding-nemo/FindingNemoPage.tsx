"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function FindingNemoPage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 8,
      }}
    >
      <Typography variant="h4" component="h1" color="text.secondary">
        Finding Nemo
      </Typography>
    </Box>
  );
}
