import CategoryIcon from "@mui/icons-material/Category";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Stack, Typography } from "@mui/material";

const columns = [
  {
    icon: <DesignServicesIcon sx={{ fontSize: 32, color: "#fff" }} />,
    label: "My Roles",
    items: ["UX/UI Designer", "Frontend Developer", "User Research"],
  },
  {
    icon: <FormatListBulletedIcon sx={{ fontSize: 32, color: "#fff" }} />,
    label: "Timeline",
    items: ["6 Months"],
  },
  {
    icon: <CategoryIcon sx={{ fontSize: 32, color: "#fff" }} />,
    label: "Category",
    items: ["Operation automation", "Entertainment"],
  },
];

export const ProjectOverviewCard = () => {
  return (
    <Box
      sx={{
        width: 500,
        height: 350,
        borderRadius: "32px",
        overflow: "hidden",
        borderTop: "1px solid #a8a8a8",
        background:
          "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
        pt: 2.5,
        pb: 2.5,
        px: 1,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        {/* Title */}
        <Typography
          component="h2"
          sx={{
            fontFamily: "'Poppins', Helvetica",
            fontWeight: 600,
            color: "#fff",
            pb: "16px",
            fontSize: 24,
            lineHeight: "normal",
            textAlign: "center",
          }}
        >
          Project Overview
        </Typography>
        {/* Three columns */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          {columns.map((col) => (
            <Stack
              key={col.label}
              alignItems="center"
              spacing={2.5}
              sx={{ flex: 1 }}
            >
              {/* Icon + Label */}
              <Stack alignItems="center" spacing={2} sx={{ py: .25 }}>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    backgroundColor: "rgba(30, 40, 120, 0.75)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {col.icon}
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', Helvetica",
                    fontWeight: 600,
                    color: "#fff",
                    fontSize: 18,
                    textAlign: "center",
                    lineHeight: "normal",
                  }}
                >
                  {col.label}
                </Typography>
              </Stack>
              {/* Items */}
              <Stack alignItems="center" spacing={0.5} sx={{ width: "100%" }}>
                {col.items.map((item) => (
                  <Typography
                    key={item}
                    sx={{
                      fontFamily: "'Poppins', Helvetica",
                      fontWeight: 400,
                      color: "#fff",
                      fontSize: 16,
                      textAlign: "center",
                      lineHeight: "normal",
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectOverviewCard;
