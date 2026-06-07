import type { ReactElement } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Stack, Typography } from "@mui/material";
import { breakpointPx } from "@/lib/responsive/breakpoints";
import { aosFadeRight } from "../aosProps";

export type ProjectOverviewColumnIcon =
  | "designServices"
  | "formatListBulleted"
  | "category";

export type ProjectOverviewColumnData = {
  icon: ProjectOverviewColumnIcon;
  label: string;
  items: string[];
};

export type ProjectOverviewCardData = {
  title: string;
  background: string;
  columns: ProjectOverviewColumnData[];
};

const COLUMN_ICONS: Record<ProjectOverviewColumnIcon, ReactElement> = {
  designServices: <DesignServicesIcon sx={{ fontSize: 32, color: "#fff" }} />,
  formatListBulleted: (
    <FormatListBulletedIcon sx={{ fontSize: 32, color: "#fff" }} />
  ),
  category: <CategoryIcon sx={{ fontSize: 32, color: "#fff" }} />,
};

type Props = {
  data: ProjectOverviewCardData;
};

export const ProjectOverviewCard = ({ data }: Props) => {
  const { title, background, columns } = data;

  return (
    <Box
      {...aosFadeRight({ delay: 80 })}
      sx={{
        [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
          maxHeight: 386,
          height: 300,
        },
        [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
          width: 500,
          height: 300,
        },
        [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
          width: 500,
          height: 370,
        },

        borderRadius: "32px",
        overflow: "hidden",
        borderTop: "1px solid #a8a8a8",
        background,
        pt: 2.5,
        pb: 2.5,
        px: 1,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Typography
          component="h2"
          sx={{
            fontFamily: "'Poppins', Helvetica",
            fontWeight: 600,
            color: "#fff",
            pb: "16px",
            fontSize: 24,
            [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
              fontSize: 20,
            },
            lineHeight: "normal",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
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
              <Stack alignItems="center" spacing={2} sx={{ py: 0.25 }}>
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
                      width: 30,
                      height: 30,
                    },
                    borderRadius: "50%",
                    backgroundColor: "rgba(30, 40, 120, 0.75)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {COLUMN_ICONS[col.icon]}
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', Helvetica",
                    fontWeight: 600,
                    color: "#fff",
                    fontSize: 18,
                    [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
                      fontSize: 16,
                    },
                    textAlign: "center",
                    lineHeight: "normal",
                  }}
                >
                  {col.label}
                </Typography>
              </Stack>
              <Stack alignItems="center" spacing={0.5} sx={{ width: "100%" }}>
                {col.items.map((item) => (
                  <Typography
                    key={item}
                    sx={{
                      fontFamily: "'Poppins', Helvetica",
                      fontWeight: 400,
                      color: "#fff",
                      fontSize: 16,
                      [`@media (min-width: ${breakpointPx.mobileMin}px)`]: {
                        fontSize: 14,
                      },
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
