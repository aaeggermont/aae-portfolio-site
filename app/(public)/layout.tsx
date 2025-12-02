// app/(public)/layout.tsx
import type { ReactNode } from "react";
import ClientProviders from "@/app/lib/ClientProviders";
import Header from "@/components/Header"; // optional, if you want a shared header

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <ClientProviders>
      <div className="min-h-screen flex flex-col">
        {/* Optional shared header */}
        {/* <Header /> */}

        <main className="global-container flex-1">
          {children} 
        </main>
      </div>
    </ClientProviders>
  );
}
