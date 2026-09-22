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
      /** Optional orange heading above the right-column copy */
      heading?: string;
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
  version: 19,
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
      eyebrow: "02 · Emerson College",
      title: "Storytelling · Media Arts + Visual Effects",
      icon: "school",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "My work at Harvard had taken me beyond software engineering and into audiovisual production. Building the webcasting facility meant working not only with software, networks, and interfaces, but with video, audio, production equipment, and the workflows behind digital media.",
            "That experience strengthened an interest I already had in multimedia and visual effects. I became increasingly curious about the creative side of the technologies I was working with—how images, sound, editing, and visual effects could be used not simply to deliver information, but to create experiences and tell stories.",
            "That curiosity led me to Emerson College, where I pursued a Master of Arts in Media Arts and began exploring filmmaking and visual storytelling more deeply.",
          ],
        },
        {
          type: "section",
          heading: "Garrick · From Technology to Storytelling",
          paragraphs: [
            "For my final master’s capstone at Emerson, I directed and produced Garrick, an original short fictional narrative that brought together live-action performance captured in high-definition video with CGI and classical animation. Working with a full production crew, the project allowed me to explore filmmaking while continuing to build on the technical interests that had brought me to Media Arts.",
          ],
        },
        {
          type: "mediaText",
          figure: {
            imageObjectPath: "site/biography/chapter02/GarrickFilmPoster.png",
            alt: "Garrick film poster — a film by Ricardo Curbelo Villalobos",
            captions: [],
          },
          heading: "The Story Behind Garrick",
          paragraphs: [
            "The story of Garrick had been with me since childhood. Growing up in Mexico, my grandfather, a Belgian immigrant, told me the tale of a late-18th-century British street actor with an extraordinary ability to make people laugh, while privately struggling with depression and searching for meaning in his own life.",
            "I was captivated by the character long before I fully understood the meaning of the story. As a child, I retold it to anyone who would listen, and even composed music in my head for a film adaptation. Years later, Garrick gave me the opportunity to return to that childhood memory and transform it into something tangible on screen.",
          ],
        },
        {
          type: "section",
          heading: "Behind the Story · On Set",
          paragraphs: [
            "Garrick was produced with a full film crew and combined traditional set production with green screen photography and digital modeling. This time-lapse captures the production-in-progress, from preparing the set and equipment to filming the live-action performances that would later become part of the film's digital environments.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter02/GarrickTimeLapseImage.png",
            alt: "Time-lapse of the Garrick film set with green screen and crew",
            captions: [],
          },
        },
        {
          type: "section",
          heading: "From Set to Screen · Building the World of Garrick",
          paragraphs: [
            "A central goal of Garrick was to develop photorealistic virtual environments and explore their integration with live-action footage. The project also explored production and post-production workflows for pre-visualization and the automation of rendering processes.",
            "Much of Garrick was filmed on partial sets surrounded by green screen, with the larger environment created digitally in post-production. The process required the live-action photography and virtual environments to be planned as parts of the same image, allowing physical performances and sets to become part of a much larger fictional world.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath: "site/biography/chapter02/GarrckSampleShot.png",
            alt: "Garrick finished frame — live-action performer at a desk in a digitally created library environment",
            captions: [],
          },
        },
        {
          type: "copy",
          paragraphs: [
            "Garrick became a bridge between the technical and creative sides of my work. Directing and producing the film gave me the opportunity to lead a collaborative production while exploring how digital technologies could support a larger creative vision and bring a fictional world to the screen.",
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
