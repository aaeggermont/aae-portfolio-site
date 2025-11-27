// app/(public)/layout.tsx
import type { ReactNode } from "react";
import ClientProviders from "@/app/lib/ClientProviders";
import Header from "@/components/Header"; // your migrated header component
import MainBanner from "@/app/home/main-banner";
import MyBackground from "@/app/home/my-background";
import LatestProjects from "@/app/home/latest-projects";
import ContactMe from "@/app/home/contact-me";
import HomePanels from "@/app/home/home-panels";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <ClientProviders>
      <div className="min-h-screen flex flex-col">
        <main className="global-container flex-1">
          <HomePanels />;
            {children}
        </main>
      </div>
    </ClientProviders>
  );
}