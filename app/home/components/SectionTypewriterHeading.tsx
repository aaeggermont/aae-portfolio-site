"use client";

import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type SectionTypewriterHeadingProps = {
  text: string;
  className?: string;
  as?: "h2" | "div";
};

export function SectionTypewriterHeading({
  text,
  className,
  as: Tag = "h2",
}: SectionTypewriterHeadingProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const typewriterRef = useRef<{
    typeString: (s: string) => { pauseFor: (n: number) => { start: () => void } };
  } | null>(null);
  const hasStarted = useRef(false);
  const [inView, setInView] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.2, rootMargin: "0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !inView || hasStarted.current || !typewriterRef.current) {
      return;
    }
    hasStarted.current = true;
    typewriterRef.current.typeString(text).pauseFor(2500).start();
  }, [inView, prefersReducedMotion, text]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={wrapperRef as React.RefObject<HTMLHeadingElement>} className={className}>
      <Typewriter
        options={{
          autoStart: false,
          loop: false,
          deleteSpeed: 50,
        }}
        onInit={(tw) => {
          typewriterRef.current = tw;
        }}
      />
    </Tag>
  );
}
