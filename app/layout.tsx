// app/layout.tsx
import type { ReactNode } from "react";
import { AppProviders } from "./providers"; // your provider wrapper
import "../styles/globals.scss";
import { Poppins, Montserrat, Figtree } from "next/font/google";

// Primary UI font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Headings / Hero sections
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// Body text / fine UI / microcopy
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});


export const metadata = {
  title: "Antonio Eggermont – Portfolio",
  description: "Full-stack UX Engineer & AI/ML Specialist",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html 
        lang="en"
          className={`${poppins.variable} ${montserrat.variable} ${figtree.variable}`}
        >
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
