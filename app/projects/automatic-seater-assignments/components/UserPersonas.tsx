import { Box, Stack, Typography } from "@mui/material";
import GatedImage from "@/lib/media/GatedImage";
import type { ResearchUserPersona } from "../researchMethodTypes";

type Props = {
  personas: ResearchUserPersona[];
  projectKey?: string;
};

const UserPersonas = ({ personas, projectKey = "project_4" }: Props) => {
  return (
    <Box
      component="section"
      sx={{
        px: 2,
        py: 1.5,
        bgcolor: "transparent",
      }}
    >
      <Stack spacing={6}>
        {personas.map((persona) => (
          <Stack
            key={persona.title}
            direction={{ xs: "column",  sm: "column", md: "row", lg: "row", xl: "row" }}
            spacing={4}
            alignItems={{ xs: "center", sm: "center", md: "flex-start", lg: "flex-start", xl: "flex-start" }}
          >
            <Box
              sx={{
                width: 116,
                height: 116,
                flexShrink: 0,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                bgcolor: "#d6d6d6",
              }}
            >
              <GatedImage
                mode="fill"
                projectKey={projectKey}
                objectPath={persona.objectPath}
                alt={persona.alt}
                sizes="116px"
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Stack spacing={0.5} sx={{ pt: 0.5, maxWidth: 860 }}>
              <Typography
                component="h2"
                sx={{
                  color: "#e0c63a",
                  fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1.2rem" },
                  lineHeight: 1.1,
                  fontWeight: 800,
                  textAlign: { xs: "center", sm: "center", md: "left", lg: "left", xl: "left" },
                }}
              >
                {persona.title}
              </Typography>
              <Box sx={{ 
                maxWidth: { xs: "50%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
               
               }}>
                <Typography
                    component="p"
                    sx={{
                    color: "#ffffff",
                    fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1.2rem" },
                    lineHeight: 1.28,
                    fontWeight: 400,
                    width: { xs: "80", sm: "80%", md: "100%", lg: "100%", xl: "100%" },
                    }}
                >
                    {persona.description}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default UserPersonas;
