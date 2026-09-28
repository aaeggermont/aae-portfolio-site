"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { backgroundFloatImages } from "../background-float-images";
import styles from "./landing-float-layer.module.scss";

const FLOAT_COUNT = 24;

type Floater = {
  img: (typeof backgroundFloatImages)[number];
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

export function LandingFloatLayer() {
  const [floaters, setFloaters] = useState<Floater[]>([]);

  useEffect(() => {
    const generated: Floater[] = Array.from({ length: FLOAT_COUNT }, () => {
      const img =
        backgroundFloatImages[Math.floor(Math.random() * backgroundFloatImages.length)];
      return {
        img,
        top: `${4 + Math.random() * 88}%`,
        left: `${4 + Math.random() * 88}%`,
        size: `${48 + Math.random() * 88}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${14 + Math.random() * 10}s`,
      };
    });
    setFloaters(generated);
  }, []);

  return (
    <div className={styles.layer} aria-hidden="true">
      {floaters.map((floater, index) => (
        <Image
          key={`landing-float-${index}-${floater.top}-${floater.left}`}
          src={floater.img}
          alt=""
          aria-hidden="true"
          className={styles.image}
          width={150}
          height={150}
          style={{
            top: floater.top,
            left: floater.left,
            width: floater.size,
            height: "auto",
            animationDelay: floater.delay,
            animationDuration: floater.duration,
          }}
        />
      ))}
    </div>
  );
}
