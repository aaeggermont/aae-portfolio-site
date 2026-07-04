"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  getHomeNavHref,
  isHomeNavActive,
  type HomeNavKey,
} from "./homeAnchors";

export function useHomeNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return {
    pathname,
    hash,
    getHref: (key: HomeNavKey) => getHomeNavHref(pathname, key),
    isActive: (key: HomeNavKey) => isHomeNavActive(pathname, hash, key),
  };
}
