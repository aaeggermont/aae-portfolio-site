"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

/** Home embeds `<Footer />` in the last scroll panel so it stays in view — skip the global footer there. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer />;
}
