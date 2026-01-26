import AkamaiLogo from '../images/akamai_technologies_logo.jpeg';
import CBSLogo from '../images/cbs_interactive_logo.jpeg';
import DisneyLogo from '../images/the_walt_disney_company_logo.jpeg';
import HarvardLogo from '../images/harvard-logo.jpeg';
import SonyLogo from '../images/sony_pictures_imageworks_logo.jpeg';
import EmersonLogo from '../images/emerson_college_logo.jpeg';
import UWLogo from '../images/university_of_washington_logo.jpeg';
import MITLogo from '../images/mit-logo.jpg';
import AAEPhoto from '../images/AAEPhoto.png';
import { TimelinePeriodProps } from '@/components/Timeline';

export const AboutMeData  =  {
  pageTitle: "Hello, I'm Antonio",
  profilePhoto: AAEPhoto,
  pageParagraphs: [
   "As a software developer and UX engineer with a  multidisciplinary background, I design and engineer experiences from inception to completion, and adopt emerging technologies through Human - Centered Design methodologies. In collaboration with diverse teams, I harness emerging technologies to push the boundaries of what’s possible, aiming to create immersive and intelligent solutions that resonate with users.",
   "I have a passion for learning new trends in innovative design and emerging technologies for the building of human empathetic applications."
  ],
  skills: {
    design: [
      {
        name: "Human Centered Design",
        skillPercent: "95",
      },
      {
        name: "Human Computer Interaction",
        skillPercent: "70",
      },
      {
        name: "Figma",
        skillPercent: "95",
      },
      {
        name: "Adobe Photoshop",
        skillPercent: "95",
      },
      {
        name: "Adobe Premier",
        skillPercent: "95",
      },

      {
        name: "Adobe After Effects",
        skillPercent: "95",
      },
      {
        name: "Miro",
        skillPercent: "90",
      }
    ],
    engineering: [
      {
        name: "Angular",
        skillPercent: "95",
      },
      {
        name: "React.Js",
        skillPercent: "80",
      },
      {
        name: "Django",
        skillPercent: "90",
      },
      {
        name: "AI/ML",
        skillPercent: "90",
      },
      {
        name: "iO/Swift",
        skillPercent: "70",
      },
      {
        name: "Python",
        skillPercent: "70",
      },
      {
        name: "Typecript",
        skillPercent: "90",
      },
      {
        name: "JavaScript",
        skillPercent: "90",
      },
      {
        name: "Java",
        skillPercent: "90",
      },
    ]
  },
};

export const TimelineData: {
  experience: TimelinePeriodProps[];
  education: TimelinePeriodProps[];
  certification: TimelinePeriodProps[];
} = {
  experience: [
    {
      logo: DisneyLogo,
      companyName: "The Walt Disney Company",
      positions: [
        {
          year: "2017 - Present",
          position: "Lead Engineer",
          location: "Seattle, WA",
          details: `Develops front-end applications and provides technical leadership to a UI team
                    to adopt best software development practices and modern UI frameworks for the implementation of Web
                    base interactive dashboards, Web sites, and Web APIs integrations with back-end databases,
                    Machine Learning systems, and revenue management systems.`,
        },
        {
          year: "2013 - 2017",
          position: "Senior Software Engineer",
          location: "Palo Alto, CA",
          details: `Developed Web applications in content management systems and data access systems, tools
                    for data exploration, data visualizations, backend services, and proof of concepts to
                    define requirements for data driven workflows.

          `,
        },
      ],
    },
    {
      logo: AkamaiLogo,
      companyName: "Akamai Technologies",
      year: "2013 - 2013",
      positions: [
        {
          position: "Senior Applications Developer",
          location: "Boston, MA",
          details: `Developed web applications and an API for the support of the GNET project which visualizes global
                    traffic patterns among Akamai customers. The GNET project provides with a suite of 3D interactive
                    visualization applications in WebGL to visualize Internet traffic patterns for content delivery,
                    streaming media, firewall web applications, and static media assets storage on Akamai distributed network`,
        }
      ]
    },
    {
      logo: CBSLogo,
      companyName: "CBS Corporation",
      positions: [
        {
          year: "2011 - 2012",
          position: "Staff Engineer",
          location: "San Francisco, CA",
          details: `Architecting and implementing workflows for the acquisition, encoding, transcoding, and publishing of video
                    content and metadata from external partners to public sites and CBS video players. Workflow components included
                    a Java API to interface with a external video publisher (thePlatform/MPX ), job schedulers, and
                    a content management system.`,
        }
      ]
    },
    {
      logo: DisneyLogo,
      companyName: "The Walt Disney Company",
      positions: [
        {
          year: "2008 - 2010",
          position: "Technical Director",
          location: "San Francisco, CA",
          details: `Developed and engineered media file based workflows for the production of
                    stereoscopic imagery. Projects involved developing applications APIs to
                    extend and implement features for 3D animation, bitmap manipulation, encoding
                    of media and integration of queuing systems and management controls of
                    high-performance server enclosures for the rendering of stereoscopic imagery.`,
        }
      ]
    },
    {
      logo: SonyLogo,
      companyName: "Sony Pictures Imageworks",
      positions: [
        {
          year: "2008 - 2008",
          position: "Production Services Techician",
          location: "Los Angeles, CA",
          details: `Assisted in the technical aspects for the production of the motion picture “Valkyrie”, directed by Bryan Singer. Main
                    projects and activities included visual quality assurance on all outputs before they go to film and prepared daily reports for reviews,
                    processing image conversions from all supported formats at Sony Imageworks for testing and pre-visualization of shots, and
                    monitoring, troubleshooting and verification for the completion of renders in the rendering queue.`,
        }
      ],
    },

    {
      logo: HarvardLogo,
      companyName: "Harvard University",
      positions: [
        {
          year: "1999 - 2006",
          position: "Software Engineer",
          location: "Cambridge, MA",
          details: `development and integration of an innovative system architecture for the production of digital video
                    and multimedia content for the first distance education project at Harvard University. The project gained
                    national acclaim in the fields of digital video technology, distance education and streaming media`,
        }
      ]
    },
  ],
  education: [
    {
      year: "2022",
      degree: "MS - Human Centered Design",
      logo: UWLogo,
      location: "Seattle, WA",
      school: "UNIVERSITY OF WASHINGTOWN",
      details: `Research and course work includes Human Centered Design, Design Thinking,
                User Interaction Design and Prototyping, Visual Communication, VR/AR prototyping,
                Usability Studies, Digital Fabrication, IoT and Physical Computing, Information Design,
                Design and Management of Complex Systems.`,
    },
    {
      year: "2019",
      degree: "GRADUATE CERTIFICATE -  User Centered Design",
      logo: UWLogo,
      location: "Seattle, WA",
      school: "UNIVERSITY OF WASHINGTOWN",
      details: `Research and course work includes Human Centered Design, Design Thinking,
                User Interaction Design and Prototyping, Visual Communication, VR/AR prototyping,
                Usability Studies, Digital Fabrication, IoT and Physical Computing, Information Design,
                Design and Management of Complex Systems.`,
    },
    {
      year: "2007",
      degree: "MA - Media Arts",
      logo: EmersonLogo,
      location: "Boston, MA",
      school: "EMERSON COLLEGE",
      details: `My course work included television studio production, graduate film production,
                computer animation using Maya, digital compositing, research methods in media arts,
                and traditional cinematography. `,
    },
    {
      year: "2003",
      degree: "GRADUATE CERTIFICATE APPLIED SCIENCES",
      logo: HarvardLogo,
      location: "Cambridge, MA",
      school: "HARVARD UNIVERSITY",
      details: `My course work included introduction to computer science using C and C++,
      data structures and algorithms, communication systems and technology, Web programming in Perl,
      Unix systems programming, Java for distributed systems, communication protocols and
      Internet architectures, and the study of computer network systems and the development of
      multimedia applications over high speed networking systems.
      `,
    },
  ],
  certification: [
    {
      year: "2025",
      degree: "Designing and Building AI Products and Services",
      logo: MITLogo,
      location: "Cambridge, Massachusetts - on-line",
      school: "MIT xPro",
      details: `Study of the design principles and applications  of different artificial intelligence (AI) technologies across different industries. Topics included the four stages of AI product design, study of different machine learning algorithms, applying machine learning methods to practical problems, design of intelligent human-machine interfaces, analysis of technical and operational requirements to build AI models, and the Lawler Model for defining an AI problem and identify hey steps to build an organization case.`,
    },
    {
      year: "2025",
      degree: "Designing and Building AR Applications",
      logo: MITLogo,
      location: "Cambridge, Massachusetts - on-line",
      school: "MIT xPro",
      details: `Study of the design principles and applications  of different artificial intelligence (AI) technologies across different industries. Topics included the four stages of AI product design, study of different machine learning algorithms, applying machine learning methods to practical problems, design of intelligent human-machine interfaces, analysis of technical and operational requirements to build AI models, and the Lawler Model for defining an AI problem and identify hey steps to build an organization case.`,
    },
    {
      year: "2019",
      degree: "Graduate Certificate - User Centered Design",
      logo: UWLogo,
      location: "Seattle, Washington",
      school: "University of Washington",
      details: `My course work included television studio production, graduate film production,
                computer animation using Maya, digital compositing, research methods in media arts,
                and traditional cinematography. `,
    },
  ]
} as const;
