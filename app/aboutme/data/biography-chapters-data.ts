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
  /** When true, the first line is the caption title and renders in bold. */
  boldFirstLine?: boolean;
};

/** One still in a shot carousel (previous, next, and dot pagination). */
export type BiographyChapterShot = {
  imageObjectPath: string;
  alt: string;
  /** Shown under the image. The first line is the bold title. */
  captionLines?: string[];
};

/** One green-screen / composite pair for the compare carousel. */
export type BiographyChapterComparePair = {
  fromImageObjectPath: string;
  toImageObjectPath: string;
  fromAlt?: string;
  toAlt?: string;
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
  /**
   * Optional left-aligned annotation under the image
   * (12px / line-height 1.625).
   */
  annotation?: string;
  /**
   * When set, the figure shows only the top of a tall image. Clicking the
   * image or the labeled control opens the full image in a scrollable page.
   */
  fullPagePreview?: {
    label: string;
  };
  /**
   * Optional stills carousel: previous, next, and dot pagination, using the
   * same controls as the compare carousel.
   */
  shotCarousel?: {
    slides: BiographyChapterShot[];
  };
  /**
   * Optional compare carousel: each pair holds on green screen, wipes
   * right→left to the composite, then unlocks a scrubber. Prev/next + dots
   * move between pairs.
   */
  compareCarousel?: {
    pairs: BiographyChapterComparePair[];
    /** Milliseconds to hold the first image before the wipe. Default 3000. */
    holdMs?: number;
    /** Auto wipe duration in milliseconds. Default 1400. */
    durationMs?: number;
  };
  /**
   * Intrinsic pixel size of the file. Used so a portrait screenshot is not
   * framed as 16:9.
   */
  pixelWidth?: number;
  pixelHeight?: number;
  /**
   * Centered preview width in pixels. The image still opens in the lightbox.
   */
  previewWidth?: number;
  /**
   * Desktop image height in pixels. Width stays proportional, and the image
   * still opens in the lightbox. Inside a two-column row, this image instead
   * matches its neighbor's height until `previewMaxWidth` is reached.
   */
  previewHeight?: number;
  /** Largest rendered width in pixels. Height stays proportional. */
  previewMaxWidth?: number;
  /**
   * When a figure row stacks to one column, render this image at this
   * fraction of the column width. `0.7` is thirty percent smaller.
   */
  stackedScale?: number;
  /**
   * Show only the top of the file, in source pixels. Used when the bottom
   * of the asset is transparent and would reveal the figure placeholder.
   * The lightbox still opens the full file.
   */
  visibleHeight?: number;
  /**
   * Optional Vimeo playback: keep `imageObjectPath` as the poster and start
   * the embed only after the user presses play.
   */
  vimeo?: {
    videoId: string;
    /** Accessible label for the play control / iframe. */
    title?: string;
    /** Default true. */
    muted?: boolean;
    /** Default false. */
    loop?: boolean;
  };
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
      type: "figureRow";
      figures: BiographyChapterFigure[];
      /**
       * When the row stacks to one column, show the last figure first.
       * Side-by-side order stays as written.
       */
      stackOrder?: "reverse";
    }
  | {
      type: "section";
      heading: string;
      /** Optional title under the orange section label. */
      subheading?: string;
      paragraphs?: string[];
    }
  | {
      type: "mediaText";
      figure: BiographyChapterFigure;
      /** Optional orange heading above the copy. */
      heading?: string;
      paragraphs: string[];
      /**
       * Which side the figure sits on at desktop.
       * `start` is the image-left layout used by earlier chapters.
       */
      figurePosition?: "start" | "end";
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
  version: 36,
  chapters: [
    {
      id: "harvard",
      tocLabel: "01 · Harvard University",
      eyebrow: "01 · Harvard University",
      title: "Foundations · Internet + Interactive Media",
      icon: "menuBook",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "During my graduate studies at Harvard, two final course projects—one for Communication Protocols and Internet Architectures and another for Web Programming—allowed me to explore complementary aspects of Internet technology, interactive media, and video. Bringing those ideas together led to a larger vision for a webcasting environment that could deliver lectures live and on demand through the web.",
            "The two projects caught the attention of my mentor, Dr. Henry Leitner, who was developing an early Distance Education initiative at Harvard. What began as ideas I had explored in those two courses soon became an opportunity to help turn that vision into a working platform for online learning.",
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
      tocLabel: "02 · Emerson College",
      eyebrow: "02 · Emerson College",
      title: "Storytelling · Media Arts + Visual Effects",
      icon: "school",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "My work at Harvard had started with software and Internet technologies, but building the Distance Education platform also introduced me to audiovisual production. I became increasingly interested in multimedia, visual effects, and the creative process of filmmaking, which eventually led me to Emerson College and the M.A. in Media Arts program.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter02/EmersonOnSetIllustration.png",
            alt: "Illustration of live-action production, green screen, CGI, and visual effects on set",
            captions: [],
            annotation:
              "Discovering the Filmmaking Process. Bringing together live-action production, green screen, CGI, and visual effects on set.",
          },
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
            alt: "Poster for Garrick, a short film by Antonio Aranda Eggermont",
            captions: [],
            annotation:
              "Poster for Garrick, a short film by Antonio Aranda Eggermont.",
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
            annotation:
              "Behind the scenes on the Garrick set — a green-screen stage with period set dressing, captured during a production time-lapse.",
            vimeo: {
              videoId: "1229728518",
              title: "Play Garrick on-set time-lapse",
              muted: true,
              loop: false,
            },
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
            imageObjectPath: "site/biography/chapter02/GarrickShot-01.png",
            alt: "Garrick finished frames — live-action performance composited into digitally created environments",
            captions: [],
            annotation:
              "From set to screen — the finished scene from Garrick, combining live-action foreground with a computer-generated environment.",
            compareCarousel: {
              holdMs: 3000,
              durationMs: 1400,
              pairs: [
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-01.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-01.png",
                  fromAlt:
                    "Garrick shot 01 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 01 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-02.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-02.png",
                  fromAlt:
                    "Garrick shot 02 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 02 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-03.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-03.png",
                  fromAlt:
                    "Garrick shot 03 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 03 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-04.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-04.png",
                  fromAlt:
                    "Garrick shot 04 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 04 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-05.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-05.png",
                  fromAlt:
                    "Garrick shot 05 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 05 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-06.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-06.png",
                  fromAlt:
                    "Garrick shot 06 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 06 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-07.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-07.png",
                  fromAlt:
                    "Garrick shot 07 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 07 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-08.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-08.png",
                  fromAlt:
                    "Garrick shot 08 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 08 finished composite with virtual environment",
                },
                {
                  fromImageObjectPath:
                    "site/biography/chapter02/GarrickShotGS-09.png",
                  toImageObjectPath:
                    "site/biography/chapter02/GarrickShot-09.png",
                  fromAlt:
                    "Garrick shot 09 on-set green screen plate before compositing",
                  toAlt:
                    "Garrick shot 09 finished composite with virtual environment",
                },
              ],
            },
          },
        },
        {
          type: "copy",
          paragraphs: [
            "Garrick became a bridge between the technical and creative sides of my work. Directing and producing the film gave me the opportunity to lead a collaborative production while exploring how digital technologies could support a larger creative vision and bring a fictional world to the screen.",
          ],
        },
        {
          type: "section",
          heading: "With Gratitude · Jan Roberts-Breslin",
          paragraphs: [
            "As Graduate Program Director, Jan Roberts-Breslin was an important source of support throughout my time at Emerson. She encouraged my exploration of filmmaking and visual effects and helped make many of the resources needed to produce Garrick available to me.",
            "Her support gave me the opportunity to pursue an ambitious capstone project that brought together filmmaking, technology, and visual effects at a scale I could not have accomplished on my own.",
            "I'm also deeply grateful to the cast and crew whose talent and collaboration helped bring Garrick to life.",
          ],
        },
        {
          type: "section",
          heading: "Where the Two Worlds Met",
          paragraphs: [
            "Garrick became the point where the technical and creative sides of my work truly came together. Directing and producing the film gave me the opportunity to lead a collaborative production while exploring how digital technologies could support a larger artistic vision.",
            "By the end of the project, I had begun to see a direction that brought those interests together: visual effects and creative technology within the entertainment industry.",
          ],
        },
      ],
    },
    {
      id: "disney-animation",
      tocLabel: "03 · Disney Animation - IMD",
      eyebrow: "03 · Disney Animation - IMD",
      title: "Disney Animation: Creative Technology Engineering + Filmmaking",
      icon: "lightbulb",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "After completing my graduate work at Emerson, the technical and creative sides of my career came together professionally at ImageMovers Digital, a Disney animation studio led by filmmaker Robert Zemeckis and created around the exploration of CGI and performance-capture filmmaking.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath: "site/biography/chapter03/DisneyIMDCrew.png",
            alt: "Disney ImageMovers Digital Art Department with the Art and Matte Painting team",
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "Disney ImageMovers Digital Art Department",
                  "With the Art and Matte Painting team during my time at the studio.",
                ],
              },
            ],
          },
        },
        {
          type: "copy",
          paragraphs: [
            "I joined the Art and Matte Painting Department as a Technical Director and Applications Developer, working within the team led by Doug Chiang. Before environments became fully realized digital sets were built through low-fidelity miniature sets and previsualization to understand composition, scale, and how the worlds of the films might look and feel.",
            "It was an unusual place for a software engineer to work. I was surrounded by artists, helping build miniature sets while also developing software that supported their digital work. That experience gave me a very different perspective on the relationship between engineering and the creative process.",
          ],
        },
        {
          type: "section",
          heading: "A New Kind of Filmmaking",
          paragraphs: [
            "ImageMovers Digital was built around performance-capture filmmaking. Actors performed on a capture stage surrounded by cameras and sensors, with their performances becoming the foundation for the digital characters created for the film.",
            "Working in this environment gave me a close look at how filmmaking, animation, software, and emerging technologies were beginning to come together in completely new ways.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter03/DisneyIMDMotionCaptureSet.png",
            alt: "Motion capture set for A Christmas Carol, directed by Robert Zemeckis",
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "Motion Capture Set",
                  "A Christmas Carol directed by Robert Zemeckis",
                ],
              },
            ],
          },
        },
        {
          type: "section",
          heading: "Behind the Films",
          paragraphs: [
            "The work was highly collaborative. Production meetings brought together people from across the studio to review ideas and follow the films as they developed. For me, these meetings were an opportunity to see firsthand how creative and technical decisions evolved together throughout production.",
          ],
        },
        {
          type: "figureRow",
          figures: [
            {
              imageObjectPath:
                "site/biography/chapter03/DisneyIMDProductionMeeting1.png",
              alt: "Doug Chiang meeting with the production team at ImageMovers Digital",
              captions: [
                {
                  boldFirstLine: true,
                  lines: [
                    "Production Meeting · Doug Chiang",
                    "Doug Chiang meeting with the production team.",
                  ],
                },
              ],
            },
            {
              imageObjectPath:
                "site/biography/chapter03/DisneyIMDProductionMeeting2.png",
              alt: "Robert Zemeckis meeting with the production team at ImageMovers Digital",
              captions: [
                {
                  boldFirstLine: true,
                  lines: [
                    "Production Meeting · Robert Zemeckis",
                    "Robert Zemeckis meeting with the production team.",
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "section",
          heading: "From Artwork to Digital Worlds",
          paragraphs: [
            "My work in the Art and Matte Painting Department moved between physical and digital production. I helped build the low-fidelity miniature sets we used to explore environments and compositions, while also developing software tools that helped artists bring their work into the 3D environment.",
            "On the digital side, I developed tools that supported the mapping of image-based artwork onto CGI geometry, helping transform two-dimensional imagery into the virtual environments created for the films. I also worked on tools for the stereoscopic rendering pipeline, helping optimize the construction and rendering of large, complex frames that required significant computing time.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter03/SampleComposite01.png",
            alt: "Sample composite 01",
            captions: [],
            annotation:
              "An example of the digital environments produced by the Art and Matte Painting Department at ImageMovers Digital. Film imagery © Disney. Shown here to document my professional work as a member of the ImageMovers Digital production team.",
            shotCarousel: {
              slides: [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
              ].map((shot) => ({
                imageObjectPath: `site/biography/chapter03/SampleComposite${shot}.png`,
                alt: `Sample composite ${shot}`,
              })),
            },
          },
        },
        {
          type: "section",
          heading: "With Gratitude · Jonathan Egstad",
          paragraphs: [
            "Jonathan Egstad became an important mentor from the beginning of my time at ImageMovers Digital. He helped me navigate an industry that was still relatively new to me and remained a source of guidance throughout my time at the studio.",
            "That guidance became especially important in 2010, when Disney announced that ImageMovers Digital would be closing. The country was still emerging from the Great Recession, unemployment in California was exceptionally high, and opportunities across the film and visual effects industry were difficult to find. I had entered the industry hoping to build a career in filmmaking and visual effects, and suddenly I had to reconsider a path I had worked hard to pursue.",
            "Jonathan encouraged me to look beyond the film industry and recognize that my background in software engineering, web technologies, and digital media gave me other directions I could pursue. Changing direction wasn't what I had planned, but his advice helped me see that the different parts of my background could become a strength rather than separate career paths.",
          ],
        },
      ],
    },
    {
      id: "disney-emerging",
      tocLabel: "04 · CBS Interactive - TV.com",
      eyebrow: "04 · CBS Interactive - TV.com",
      title: "Digital Media · Web Development + Video Publishing",
      icon: "devices",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "After ImageMovers Digital closed, I moved from the film industry back into web development, joining CBS Interactive as an engineer working on TV.com. It was an unexpected change in direction, but one that brought me back to some of the technologies I had worked with earlier in my career.",
            "TV.com was an online destination for television, bringing together show and episode guides, news and editorial content, fan communities, and online video in one experience.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath: "site/biography/chapter04/TV.COMPage.png",
            alt: "The TV.com homepage during Antonio Aranda Eggermont's time at CBS Interactive",
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "TV.com · CBS Interactive",
                  "The TV.com experience during my time at CBS Interactive.",
                  "Source: TV.com / CBS Interactive, archived via the Internet Archive Wayback Machine.",
                ],
              },
            ],
            fullPagePreview: {
              label: "Explore full page →",
            },
          },
        },
        {
          type: "copy",
          paragraphs: [
            "At TV.com, my work focused on the systems behind online video publishing. I developed web applications for content management, integrated front-end applications with back-end services, and worked with APIs and external publishing platforms to support video ingestion and distribution.",
          ],
        },
        {
          type: "section",
          heading: "Behind the Publishing Experience",
          paragraphs: [
            "Much of my work at TV.com focused on the applications and services behind the site's video publishing experience. I developed front-end applications for content management and integrated them with REST APIs and back-end services used to ingest, manage, and publish video across the site.",
            "I also developed automated workflows for acquiring content and data from television partners through RSS feeds and integrating it with ThePlatform, an external content management system used for video publishing on TV.com. Together, these systems helped move media and its associated data from external sources through the publishing workflow and into the experiences available to TV.com users.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath: "site/biography/chapter04/TV.COMVideosPage.png",
            alt: "The TV.com videos page during Antonio Aranda Eggermont's time at CBS Interactive",
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "Video Publishing · TV.com",
                  "TV.com's dedicated video experience brought together full episodes, clips, previews, and video content published across the platform.",
                  "Source: TV.com / CBS Interactive, archived via the Internet Archive Wayback Machine.",
                ],
              },
            ],
            fullPagePreview: {
              label: "Explore full page →",
            },
          },
        },
        {
          type: "copy",
          paragraphs: [
            "My time at CBS Interactive brought me back to web development while allowing me to apply what I had learned from working with media and production. It also expanded my experience with large-scale digital platforms, content systems, and the workflows behind publishing media online.",
            "My earlier experience at Disney had left a lasting impression on me, and when the opportunity came to return to the company, I was excited to return, this time from a very different professional direction. I joined Disney as a Business Intelligence Engineer, developing web applications for data visualization and working with large-scale data—beginning another new chapter in my career.",
          ],
        },
      ],
    },
    {
      id: "beyond-work",
      tocLabel: "05 · The Walt Disney Company",
      eyebrow: "05 · The Walt Disney Company",
      title: "Data · Emerging Technology + Human Centered Design",
      icon: "air",
      blocks: [
        {
          type: "copy",
          paragraphs: [
            "Returning to Disney marked the beginning of a much longer chapter in my career. I joined Disney Interactive as an Applications Developer, building data visualization tools and data access applications used to understand the performance of mobile and social games. Over the years, my work expanded into emerging technologies, operational tools, immersive guest experiences, and revenue management systems, with human-centered design becoming an increasingly important part of how I approached the work.",
          ],
        },
        {
          type: "section",
          heading: "Data + Business Intelligence",
          subheading: "Making Large-Scale Data Understandable",
        },
        {
          type: "mediaText",
          figurePosition: "end",
          figure: {
            imageObjectPath: "site/biography/chapter05/DIsneyInteractiveImage.png",
            alt: "Disney Infinity artwork featuring characters from Disney and Marvel",
            captions: [],
          },
          paragraphs: [
            "My early work at Disney Interactive focused on building applications that helped teams access, explore, and understand large amounts of data generated by mobile and social games.",
            "One of the main products our Business Intelligence group supported was Disney Infinity, a cross-platform video game franchise that brought together characters and worlds from Disney, Pixar, Marvel, and Star Wars. I developed web-based tools for data visualization and data access that helped teams explore player activity and game performance across console, mobile, and PC platforms.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter05/INFINITYTrafficAllPlatformsDAUs.png",
            alt: "Disney Infinity daily active users across all platforms",
            captions: [],
            shotCarousel: {
              slides: [
                {
                  imageObjectPath:
                    "site/biography/chapter05/INFINITYTrafficAllPlatformsDAUs.png",
                  alt: "Disney Infinity daily active users across all platforms",
                  captionLines: [
                    "All Platforms · Daily Active Users",
                    "Player activity across the Disney Infinity ecosystem",
                  ],
                },
                {
                  imageObjectPath:
                    "site/biography/chapter05/INFINITYTrafficConsoleTotalTImeSpentinApp.png",
                  alt: "Disney Infinity total time spent on console",
                  captionLines: [
                    "Console · Total Time Spent",
                    "Engagement across Disney Infinity console platforms.",
                  ],
                },
                {
                  imageObjectPath:
                    "site/biography/chapter05/INFINITYTrafficMobileDAUs.png",
                  alt: "Disney Infinity daily active users on mobile",
                  captionLines: [
                    "Mobile · Daily Active Users",
                    "Player activity across iOS and Android devices.",
                  ],
                },
              ],
            },
          },
        },
        {
          type: "copy",
          paragraphs: [
            "I also developed a Django-based data access system that provided a common interface for working with data from Vertica, MySQL, and Google BigQuery. The system maintained a repository of queries certified by data scientists, allowing teams to run trusted queries on demand or access their results through an API. A caching layer stored the results of computationally expensive queries so they could be reused throughout the day without repeatedly querying the underlying data sources.",
          ],
        },
        {
          type: "section",
          heading: "Emerging Technology",
          subheading: "Exploring New Forms of Interaction",
          paragraphs: [
            "My work at Disney eventually led me into the Emerging Technology group within Disney Parks, Experiences and Resorts, where I began exploring how new technologies could be applied to guest experiences and operational challenges across Disney's parks and resorts.",
            "The work was much more experimental, ranging from computer vision and machine learning to new tools for supporting Cast Members and interactive experiences for guests.",
          ],
        },
        {
          type: "section",
          heading: "AI + Computer Vision · 2019 Datathon",
          subheading: "Finding Nemo: Shark Scenes",
          paragraphs: [
            "One of the early experiences that shaped this direction came through Disney's 2019 Datathon. Our team explored how artificial intelligence and computer vision could be used to identify potential safety incidents in the parks, developing a prototype that detected and tracked people entering restricted areas and surfaced potential incidents for review.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath: "site/biography/chapter05/ParkWatchIncidentMobile.png",
            alt: "Incident summary for a possible unauthorized entry during the Finding Nemo shark scenes prototype",
            pixelWidth: 171,
            pixelHeight: 372,
            previewWidth: 224,
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "Finding Nemo · Incident Summary",
                  "Bringing together camera evidence and incident context to help Cast Members review potential safety events.",
                ],
              },
            ],
          },
        },
        {
          type: "copy",
          paragraphs: [
            "My growing background in human-computer interaction gave me another perspective to bring to the project: not only what the technology could detect, but how people might interact with and make sense of the information it produced.",
            "The project won first place, but for me its longer-term impact was realizing how interested I had become in the intersection of artificial intelligence, machine learning, and human-computer interaction.",
          ],
        },
        {
          type: "section",
          heading: "Human-Centered Design & Engineering",
          subheading: "Understanding the People Behind the Technology",
          paragraphs: [
            "The Datathon helped clarify a direction I was becoming increasingly excited about. I could see the potential for artificial intelligence and machine learning to create entirely new kinds of systems, but I was equally interested in how people would understand, interact with, and ultimately use those technologies.",
            "That intersection between technology and human experience became an important part of what I wanted to explore through the master's program in Human Centered Design & Engineering at the University of Washington. The program gave me a more formal foundation in human-computer interaction, user research, and human-centered design methods that I could begin applying directly to my work at Disney.",
          ],
        },
        {
          type: "section",
          heading: "Human-Centered Operations · Computer Vision",
          subheading: "Rethinking Attraction Track Walks",
          paragraphs: [
            "Track Walk was one of the projects where I began applying this human-centered perspective directly to an operational problem. The project explored how computer vision and automation could support the procedures Cast Members use to inspect attractions before opening and during periods of downtime.",
            "I analyzed the existing Track Walk experience from the user's perspective, mapping the procedures Cast Members followed and identifying pain points around repetitive inspections, checklists, communication, and notifications. That analysis helped identify opportunities for a more intelligent workflow that could combine automated monitoring with better information and communication for the people responsible for operating the attraction.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter05/ExperienceJourneyMapTrackWalkProcedures.png",
            alt: "Experience journey map of Track Walk procedures, showing Cast Member gains and pain points across pre-opening procedures and monitoring",
            pixelWidth: 1100,
            pixelHeight: 460,
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "Experience Journey Map · Track Walk Procedures",
                  "Mapping Cast Member workflows, pain points, and opportunities across pre-opening procedures, monitoring, and communication.",
                ],
              },
            ],
          },
        },
        {
          type: "copy",
          paragraphs: [
            "The technical proof of concept explored how computer vision and sensing could help validate track conditions, identify potential obstructions, monitor safety equipment and signage, and create digital records of attraction conditions. The goal was to investigate where automation could reduce repetitive work and support safer, more efficient operational procedures.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath: "site/biography/chapter05/CVInfraredTrackWalk.png",
            alt: "Infrared computer vision sample from an early Track Walk prototype for automated attraction monitoring",
            pixelWidth: 1091,
            pixelHeight: 404,
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "Computer Vision · Track Walk Sample",
                  "Exploring infrared imaging and computer vision as part of an early prototype for automated attraction monitoring.",
                ],
              },
            ],
          },
        },
        {
          type: "section",
          heading: "Human-Centered Operations",
          subheading: "Reducing Complexity During the COVID Pandemic",
          paragraphs: [
            "During the COVID-19 pandemic, new physical-distancing requirements created an unexpected operational challenge for attraction Cast Members. Seating Guests now required considerably more mental calculation as Cast Members had to determine how parties of different sizes could be distributed across available seating while following the new distancing rules.",
            "**Automatic Seating Assignments** was developed in response to that problem. The goal was to move much of that computational burden away from the Cast Member, allowing the application to calculate seating assignments while presenting the result through an interface that could be understood and acted on quickly in a fast-moving operational environment.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter05/CoDeisgnWorkshopIllustration.png",
            alt: "Progression from a physical seating chart, through an early digital seating screen, to automatic seating assignments",
            pixelWidth: 740,
            pixelHeight: 435,
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "Physical Seating Process → Early Digital Exploration → Automatic Seating Assignments",
                ],
              },
            ],
          },
        },
        {
          type: "copy",
          paragraphs: [
            "What began as an emergency response to pandemic operating conditions eventually evolved into a production tool, used both for Cast Member training and to support seating operations at the attraction.",
          ],
        },
        {
          type: "section",
          heading: "Immersive Experiences · Human-Centered Design",
          subheading: "Bringing Research and Practice Together",
          paragraphs: [
            "As my work at Disney continued alongside my master's studies at the University of Washington, I had an opportunity to bring the two worlds together through AR Magic Tours, a research project exploring how augmented reality could transform the time Guests spend waiting for an attraction into an interactive storytelling experience.",
          ],
        },
        {
          type: "figureRow",
          figures: [
            {
              imageObjectPath:
                "site/biography/chapter05/LongLineofPeopleWaitingInLine.png",
              alt: "Guests waiting in a long line outside the Tower of Terror attraction",
              pixelWidth: 512,
              pixelHeight: 516,
              stackedScale: 0.7,
              captions: [
                {
                  boldFirstLine: true,
                  lines: [
                    "Designing for the Wait Experience",
                    "Exploring how the attraction environment and time spent in line could become part of the Guest experience.",
                  ],
                },
              ],
            },
            {
              imageObjectPath:
                "site/biography/chapter05/ARDicoveringStoryDetails.png",
              alt: "AR Magic Tours phone screen revealing a story detail about the Tower of Terror attraction",
              pixelWidth: 259,
              pixelHeight: 527,
              previewHeight: 337,
              previewMaxWidth: 224,
              captions: [
                {
                  boldFirstLine: true,
                  lines: [
                    "AR Magic Tours · Augmented Reality Experience",
                    "An interactive story designed to reveal hidden narratives throughout the attraction environment.",
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "copy",
          paragraphs: [
            "The original challenge came from Disney, while the project became the focus of my academic research at UW under the guidance of my faculty advisor. Using human-centered design methods, I explored the experience from the Guest's perspective and developed a concept that used the attraction environment itself as part of a self-guided augmented reality story.",
            "AR Magic Tours became one of the clearest examples of how my work in software, emerging technology, storytelling, and human-centered design were beginning to converge. It also reinforced something that had become increasingly important to me: technology was most interesting when it began with an understanding of the people and experiences it was intended to support.",
          ],
        },
        {
          type: "section",
          heading: "Disney Cruise Line · Human-Centered Design",
          subheading: "Designing for Complex Decision-Making",
          paragraphs: [
            "My work eventually brought me to the Disney Cruise Line Revenue Management System (DCL RMS), a large enterprise application supporting the teams responsible for planning voyages and managing pricing, promotions, and stateroom inventory across Disney Cruise Line's ships.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath:
              "site/biography/chapter05/DCLRMSInformationArchitecture.png",
            alt: "Information architecture diagram of the DCL RMS landing page, branching into Admin, Science Admin, Configuration, and Sailing workflows",
            pixelWidth: 1100,
            pixelHeight: 837,
            visibleHeight: 785,
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "DCL RMS · Information Architecture",
                  "Mapping the major workflows and capabilities across a large-scale revenue management platform.",
                ],
              },
            ],
          },
        },
        {
          type: "copy",
          paragraphs: [
            "As Lead Software Engineer, my role brought together many of the disciplines that had shaped my career. I worked across software engineering, front-end architecture, user experience, and data visualization while helping modernize a legacy application that needed to remain operational throughout the transition.",
            "Human-centered design and design thinking became an important part of that work. Through interviews, journey mapping, and analysis of existing workflows, I worked to understand how Revenue Managers made decisions, identify pain points and opportunities, and explore where the application could better support their work. Those insights helped shape the organization of the experience and the design of data-intensive interfaces used throughout the system.",
          ],
        },
        {
          type: "figure",
          figure: {
            imageObjectPath: "site/biography/chapter05/DCLRMSJourneyMAP.png",
            alt: "Journey map of a Disney Cruise Line revenue manager across UI features, application performance, and science and data, marking gains, pain points, and opportunities",
            pixelWidth: 913,
            pixelHeight: 452,
            captions: [
              {
                boldFirstLine: true,
                lines: [
                  "DCL RMS · Revenue Manager Journey Map",
                  "Mapping user gains, pain points, and opportunities across UI features, application performance, and science and data.",
                ],
              },
            ],
          },
        },
        {
          type: "copy",
          paragraphs: [
            "The scale of DCL RMS made understanding the Revenue Manager experience particularly important. Using human-centered design and design thinking, I analyzed the application from the user's perspective, looking across UI features, performance, and the science and data used to support revenue decisions. The journey map helped surface existing strengths, pain points, and opportunities for improving both the interface and the decision-making experience.",
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
