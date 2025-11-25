// app/layout.tsx
import type { ReactNode } from "react";
//import "./globals.css";
import { AppProviders } from "./providers"; // your provider wrapper

export const metadata = {
  title: "Antonio Eggermont – Portfolio",
  description: "Full-stack UX Engineer & AI/ML Specialist",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
