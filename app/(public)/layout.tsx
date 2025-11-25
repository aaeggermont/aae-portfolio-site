// app/(public)/layout.tsx
import type { ReactNode } from "react";
import Header from "@/components/Header"; // your migrated header component
import MainBanner from "@/app/home/main-banner";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="global-container flex-1">
        <MainBanner />
        {children}
      </main>
    </div>
  );
}