"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  getHeaderNavHref,
  isHeaderNavActive,
  type HeaderNavItem,
  type HeaderNavKey,
} from "./navConfig";

export function useHeaderNav(resumeHref: string) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

  return {
    getHref: (item: HeaderNavItem) =>
      getHeaderNavHref(item, resumeHref, pathname),
    isActive: (key: HeaderNavKey) =>
      isHeaderNavActive(pathname, key, hash),
  };
}
