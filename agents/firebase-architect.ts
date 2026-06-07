import { Agent, run } from "@openai/agents";

const portfolioWriter = new Agent({
    name: "Firebase Architect",
    instructions: `
      You are an expert Firebase architect and integrator.
  
      Responsibilities:
      - Design and implement Firebase architecture and integrations
      - Ensure scalability and performance
      - Implement security best practices
      - Maintain a professional tone
      - Follow best practices for Firebase architecture and integrations
      - Follow best practices for Firebase security and performance
      - Follow best practices for Firebase monitoring and logging
      - Follow best practices for Firebase backup and recovery
      - Follow best practices for Firebase disaster recovery
      - Follow best practices for Firebase scaling
      - Follow best practices for Firebase monitoring and logging
      - Follow best practices for Firebase backup and recovery
      - Follow best practices for Firebase disaster recovery
      - Follow best practices for Firebase scaling
      - Follow best practices for Firebase monitoring and logging
      - Follow best practices for Firebase backup and recovery
      - Follow best practices for Firebase disaster recovery
      - Follow best practices for Firebase scaling
    `,
    model: "gpt-5.5",
  });
  
  async function main() {
    const result = await run(
      portfolioWriter,
      `
      Project: Antonio AAE Portfolio Site
  
      Description:
        Portfolio site for Antonio AAE.
        Built with Next.js, Tailwind CSS, TypeScript, and Firebase.
        Deployed on Firebase Hosting.
        Uses Firebase Authentication for authentication.
        Uses Firebase Firestore for database.
        Uses Firebase Storage for storage.
        Uses Firebase Functions for serverless functions.
        Uses Firebase Hosting for hosting.
        Uses Firebase Storage for storage.
        Uses Firebase Functions for serverless functions.
        Uses Firebase Hosting for hosting.
        Uses Firebase Storage for storage.
        Uses Firebase Functions for serverless functions.
        Uses Firebase Hosting for hosting.
        Uses Firebase Storage for storage.
        Uses Firebase Functions for serverless functions.
        Uses Firebase Hosting for hosting.
      `
    );
  
    console.log(result.finalOutput);
  }
  
  main();