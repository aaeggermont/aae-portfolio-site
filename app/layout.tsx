// app/layout.tsx
import type { ReactNode } from "react";
import { AppProviders } from "./providers";
import "../styles/globals.scss";
import { PAGE_CANVAS } from "@/lib/theme/pageCanvas";
import { Poppins, Montserrat, Figtree } from "next/font/google";
import localFont from "next/font/local";
import Header from '@/components/Header';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { Aos } from '@/aos';


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

/* Satoshi — static cuts from `Fonts/WEB/fonts` (same as your design package), not Variable. */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Satoshi-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
    { path: "./fonts/Satoshi-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
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
      className={`${poppins.variable} ${montserrat.variable} ${figtree.variable} ${satoshi.variable}`}
      style={{ ["--page-canvas" as string]: PAGE_CANVAS }}
    >
      <Aos/>
      <body>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <AppProviders>
            <Header />
            {children}
            <ConditionalFooter />
          </AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
