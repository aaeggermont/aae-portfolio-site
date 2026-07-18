import type { ReactNode } from "react";
import ClientProviders from "@/lib/ClientProviders";
import { LayoutMainComponent } from './layout-main-component';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <ClientProviders>
      <LayoutMainComponent>{children}</LayoutMainComponent>
    </ClientProviders>
  );
}