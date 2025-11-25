// app/(public)/layout.tsx
import type { ReactNode } from "react";
import Header from "@/components/Header"; // your migrated header component
import MainBanner from "@/app/home/main-banner";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Shared top navigation */}
      <Header />
      <MainBanner />

      {/* Page content */}
     

      {/* Optional footer */}
      {/* <Footer /> */}
    </div>
  );
}