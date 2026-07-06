import { Box, Stack, Typography } from "@mui/material";

import GatedImage from "@/lib/media/GatedImage";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

import {
  operationalPersonaAvatarSx,
  operationalPersonaBulletListSx,
  operationalPersonaCardSx,
  operationalPersonaDescriptionLineHeightSx,
  operationalPersonaBulletLineHeightSx,
} from "../layoutConfig";
import type { OperationalPersonaData } from "../researchMethodTypes";
import { bodyTypeSx, mergeSx, titleTypeSx } from "../typography";

const DEFAULT_MEDIA_PROJECT_KEY = "project_4";

export type OperationalPersonaProps = OperationalPersonaData;

export const OperationalPersona = ({
  title,
  description,
  responsibilities,
  objectPath,
  alt,
  projectKey = DEFAULT_MEDIA_PROJECT_KEY,
}: OperationalPersonaProps) => {
  return (
    <Box component="article" sx={operationalPersonaCardSx}>
      <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ height: "100%" }}>
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 2.5 }}
          alignItems="flex-start"
        >
          {objectPath ? (
            <Box sx={operationalPersonaAvatarSx}>
              <GatedImage
                mode="fill"
                projectKey={projectKey}
                objectPath={objectPath}
                alt={alt ?? title}
                sizes="(max-width: 767px) 68px, (max-width: 1023px) 76px, 84px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ) : null}
          <Stack spacing={1.25} sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              component="h3"
              sx={titleTypeSx("operationalPersonaTitle")}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              sx={mergeSx(
                bodyTypeSx("operationalPersonaDescription", { m: 0 }),
                operationalPersonaDescriptionLineHeightSx,
              )}
            >
              {description}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1.5} sx={{ flex: 1, minHeight: 0 }}>
          <Typography
            component="h4"
            sx={bodyTypeSx("operationalPersonaSectionTitle", { m: 0 })}
          >
            Key Responsibilities
          </Typography>
          <Box
            component="ul"
            sx={mergeSx(
              {
                m: 0,
                pl: 2.5,
                // Mobile & tablet: let the list grow with content (card height is auto).
                // Only the fixed-height desktop card scrolls its overflow.
                overflowY: "visible",
                flex: "0 0 auto",
                minHeight: 0,
                [breakpointMediaQuery.desktopUp]: {
                  overflowY: "auto",
                  flex: 1,
                },
              },
              operationalPersonaBulletListSx,
            )}
          >
            {responsibilities.map((item) => (
              <Box
                component="li"
                key={item}
                sx={mergeSx(operationalPersonaBulletLineHeightSx, {
                  "&::marker": {
                    color: "inherit",
                  },
                })}
              >
                <Typography
                  component="span"
                  sx={mergeSx(
                    bodyTypeSx("operationalPersonaBullet", { display: "block", m: 0 }),
                    operationalPersonaBulletLineHeightSx,
                  )}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OperationalPersona;
