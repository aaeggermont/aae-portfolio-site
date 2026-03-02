import type { ReactNode } from "react";
import ClientProviders from "@/app/lib/ClientProviders";
import Header from "@/components/Header"; // optional, if you want a shared header
import { LayoutMainComponent } from './layout-main-component';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <ClientProviders>
      <div className="min-h-screen flex flex-col">
        {/* Optional shared header */}
        {/* <Header /> */}

        <LayoutMainComponent>
          {children}
        </LayoutMainComponent>
      </div>
    </ClientProviders>
  );
}
