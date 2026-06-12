import { Stack, Typography } from "@mui/material";

import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";

export type SectionParagraphProps = {
  /** Optional section heading (IBM Plex Sans / section title scale). */
  title?: string;
  /** Body copy — one or more paragraphs (Source Sans 3 / section description scale). */
  body: string | string[];
};

function normalizeBodyParagraphs(body: string | string[]): string[] {
  return Array.isArray(body) ? body : [body];
}

export default function SectionParagraph({ title, body }: SectionParagraphProps) {
  const paragraphs = normalizeBodyParagraphs(body);

  return (
    <Stack spacing={{ xs: 3, md: 4.5 }}>
      {title ? (
        <Typography
          component="h2"
          sx={titleTypeSx("sectionTitle", {
            color: "common.black",
            fontWeight: 700,
            lineHeight: 1.1,
          })}
        >
          {title}
        </Typography>
      ) : null}
      <Stack spacing={{ xs: 2.5, md: 3 }}>
        {paragraphs.map((paragraph, index) => (
          <Typography
            key={index}
            component="p"
            sx={bodyTypeSx("sectionDescription", {
              color: "common.black",
              fontWeight: 400,
              lineHeight: 1.5,
              m: 0,
            })}
          >
            {paragraph}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
