"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function TestGSAP() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.to(boxRef.current, {
      x: 200,
      duration: 1,
      backgroundColor: "#4DA3FF",
    });
  }, []);

  return (
    <div>
      <h1>GSAP Test</h1>
      <div
        ref={boxRef}
        style={{
          width: "100px",
          height: "100px",
          background: "red",
          marginTop: "40px",
        }}
      />
    </div>
  );
}
