/**
 * Biography chapter accordion content (TOC + expandable panels).
 * Seeded to Firestore at `about_page/biography_chapters`.
 */

export type BiographyChapterId =
  | "harvard"
  | "emerson"
  | "disney-animation"
  | "disney-emerging"
  | "beyond-work"
  | "closing";

export type BiographyChapterIcon =
  | "menuBook"
  | "school"
  | "lightbulb"
  | "devices"
  | "air"
  | "mail";

export type BiographyChapterCaptionColumn = {
  lines: string[];
};

export type BiographyChapterFigure = {
  /** Firebase Storage object path under the public `site/` prefix. */
  imageObjectPath: string;
  alt: string;
  captions: BiographyChapterCaptionColumn[];
  /** Optional centered publication-style title lines under the image */
  captionTitle?: string[];
  /** Optional centered credit line under captionTitle */
  captionCredit?: string;
};

/** Ordered body content inside an expanded chapter. */
export type BiographyChapterBlock =
  | {
      type: "copy";
      paragraphs: string[];
    }
  | {
      type: "figure";
      figure: BiographyChapterFigure;
    }
  | {
      type: "section";
      heading: string;
      paragraphs?: string[];
    }
  | {
      type: "mediaText";
      figure: BiographyChapterFigure;
      paragraphs: string[];
    };

export type BiographyChapter = {
  id: BiographyChapterId;
  /** Left TOC label */
  tocLabel: string;
  /** Optional orange eyebrow above the card title (e.g. "01 · HARVARD") */
  eyebrow?: string;
  /** Accordion card title */
  title: string;
  icon: BiographyChapterIcon;
  /** Expanded body — paragraphs, figures, and titled sections in order */
  blocks: BiographyChapterBlock[];
};

export type BiographyChaptersData = {
  version: number;
  chapters: BiographyChapter[];
};

export const biographyChaptersFallback: BiographyChaptersData = {
  version: 11,
  chapters: [
    {
      id: "harvard",
      tocLabel: "Chapter 1 — Harvard: Foundations",
      eyebrow: "01 · Harvard",
      title: "Foundations · Internet + Interactive Media",
      icon: "menuBook",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "While pursuing graduate studies in Computer Science at Harvard, I became fascinated by two areas that would shape much of my career: how the Internet worked and how people interacted with information through graphical interfaces.",
            "A graduate project combining Internet architecture, web programming, video, and interactive content caught the attention of my mentor, Dr. Henry Leitner, who was developing an early Distance Education initiative at Harvard. What began as a research project soon became an opportunity to help turn that idea into a working platform for online learning.",
            "What began as an interest in networks became something broader: an interest in how technology, media, and interfaces could come together to connect students from different backgrounds and geographic locations through new kinds of learning experiences.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter01/HenryAndAntonioProductionRoom.png",
            alt: "Henry Leitner and Antonio Aranda Eggermont in the Harvard production room",
            captions: [
              {
                lines: [
                  "Henry Leitner, PhD",
                  "Assistant Dean & Director of",
                  "Information Technology",
                  "Harvard University",
                ],
              },
              {
                lines: [
                  "Antonio Aranda Eggermont",
                  "Software Engineer",
                  "Harvard University",
                ],
              },
            ],
          },
        },
        {
          type: "section",
          heading: "Building the Platform",
          paragraphs: [
            "In the early 2000s, creating an Internet-based Distance Education platform meant building an entire production ecosystem—not just a website. The system integrated production management, live and on-demand video encoding, media publishing, event synchronization, and operator workflows into a unified platform that supported both lecture production and online learning.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter01/HarvardDistanceEdWebCastingProductionSystem.png",
            alt: "Harvard Distance Education web casting production system diagram",
            captions: [
              {
                lines: [
                  "Web Casting Production System — tools and workflows to transform classroom lectures into synchronized, interactive online presentations.",
                  "Harvard University — Division of Continuing Education, Distance Education Program.",
                ],
              },
            ],
          },
        },
        {
          type: "section",
          heading: "What Harvard Students Experienced",
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter01/DistaneEdVirtualClassroom.png",
            alt: "Harvard Distance Education virtual classroom interface",
            captions: [],
          },
        },
        {
          type: "section",
          heading: "A Turning Point in Harvard's History of Distance Education",
        },
        {
          type: "mediaText",
          figure: {
            imageObjectPath:
              "site/biography/chapter01/AntonioOriginalOffieceDCE.png",
            alt: "Antonio Aranda Eggermont working on early distance education videos at Harvard Extension School in 1999",
            captions: [],
            captionTitle: [
              "Distance Education",
              "at Harvard Extension School",
            ],
            captionCredit:
              "Top: Antonio Aranda Eggermont, CAS '99, works on the initial distance education videos in 1999.",
          },
          paragraphs: [
            "The Gates Unbarred: A History of University Extension at Harvard, 1910–2009 traces decades of experimentation with extending education beyond the physical classroom. The emergence of the Internet created a new opportunity to move beyond earlier approaches and develop a scalable model for online learning.",
          ],
        },
        {
          type: "copy",
          paragraphs: [
            "The book documents the early Distance Education program I helped build, including my work on its initial videos in 1999. During this period, we were also exploring emerging streaming-video technologies and working with technology companies including Sony Electronics and RealNetworks as the program developed.",
          ],
        },
        {
          type: "section",
          heading: "With Gratitude · Henry Leitner, PhD",
          paragraphs: [
            "Dr. Henry believed in my ideas and saw potential in my graduate research before I fully understood where it could lead. He became an important mentor and gave me the opportunity—and the trust—to help transform an emerging Distance Education initiative into a working system.",
            "That early experiment grew into a successful program, helping establish Internet-based Distance Education at Harvard and becoming part of the early wave of online learning programs in the United States. Henry's mentorship and willingness to take a chance on new ideas had a lasting influence on the direction of my career.",
          ],
        },
      ],
    },
    {
      id: "emerson",
      tocLabel: "Chapter 2 — Emerson: Storytelling",
      eyebrow: "Chapter 2",
      title: "Emerson: Storytelling Media Arts + Visual Storytelling",
      icon: "school",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "Placeholder: storytelling, media arts, and visual narrative craft developed at Emerson College.",
          ],
        },
      ],
    },
    {
      id: "disney-animation",
      tocLabel: "Chapter 3 — Disney Animation: Creative Tech",
      eyebrow: "Chapter 3",
      title: "Disney Animation: Creative Technology Engineering + Filmmaking",
      icon: "lightbulb",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "Placeholder: creative technology engineering and filmmaking work at Disney Animation.",
          ],
        },
      ],
    },
    {
      id: "disney-emerging",
      tocLabel: "Chapter 4 — Disney Emerging Tech",
      eyebrow: "Chapter 4",
      title: "Disney Emerging Tech · Immersive Experiences",
      icon: "devices",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "Placeholder: emerging technology and immersive experience work across Disney.",
          ],
        },
      ],
    },
    {
      id: "beyond-work",
      tocLabel: "Beyond Work",
      title: "Beyond Work",
      icon: "air",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "Placeholder: interests and pursuits beyond professional roles.",
          ],
        },
      ],
    },
    {
      id: "closing",
      tocLabel: "Closing",
      title: "Closing",
      icon: "mail",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "Placeholder: closing reflections and how to continue the conversation.",
          ],
        },
      ],
    },
  ],
};
