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
      tocLabel: "05 · Disney Parks, Experiences & Resorts",
      eyebrow: "05 · Disney Parks, Experiences & Resorts",
      title: "Emerging Technology · Human-Centered Design + Immersive Experiences",
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
