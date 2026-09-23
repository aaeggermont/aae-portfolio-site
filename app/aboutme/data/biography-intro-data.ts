export type BiographyIntroData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
};

export const biographyIntroFallback: BiographyIntroData = {
  eyebrow: 'Biography',
  title: 'My Journey',
  subtitle: 'Where design, engineering, and technology came together',
  paragraphs: [
    "My career has never followed a single discipline. I've moved between software engineering, digital media, human-centered design, data, and emerging technologies—often working in the spaces where those fields overlap.",
    'What has remained constant is my curiosity about the relationship between people and technology: how complex systems work, how people experience them, and how design and engineering can come together to make those experiences more useful, intuitive, and meaningful.',
    'This is the story of how those interests evolved—from my early work with Internet technologies and digital media to designing and engineering human-centered applications, immersive experiences, and intelligent systems.',
  ],
};
