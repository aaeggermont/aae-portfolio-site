// app/mywork/MyWorkPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./mywork.module.scss";
import Image from "next/image";
import { backgroundFloatImages } from "./background-float-images";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Project, { type ProjectProps } from "./Project";
import fsReference from "../../firebase";

const FLOAT_COUNT = 14;

type FloaterConfig = {
  img: any;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

type ProjectDoc = {
  id: string;
  data: ProjectProps;
};

export default function MyWorkPageView() {
  const [floaters, setFloaters] = useState<FloaterConfig[]>([]);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // floating bg images
  useEffect(() => {
    const generated: FloaterConfig[] = Array.from({ length: FLOAT_COUNT }).map(
      () => {
        const img =
          backgroundFloatImages[
            Math.floor(Math.random() * backgroundFloatImages.length)
          ];

        return {
          img,
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          size: `${40 + Math.random() * 120}px`,
          delay: `${Math.random() * 5}s`,
          duration: `${10 + Math.random() * 10}s`,
        };
      }
    );

    setFloaters(generated);
  }, []);

  // Firestore subscription
  useEffect(() => {
    const entriesQuery = query(
      collection(fsReference, "projects_data"),
      orderBy("index", "asc")
    );

    const unsubscribe = onSnapshot(
      entriesQuery,
      (snapshot) => {
        const mapped: ProjectDoc[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          data: docSnap.data() as ProjectProps,
        }));

        setProjects(mapped);
        setIsLoading(false);
        setHasError(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setIsLoading(false);
        setHasError(true);
        setError(err as Error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className={styles.myWorkSection} id="my-work">
      <div className="global-container">
        {/* Decorative floating images */}
        <div className={styles.floatLayer}>
          {floaters.map((f, i) => (
            <Image
              key={i}
              src={f.img}
              alt=""
              aria-hidden="true"
              className={styles.floatImg}
              width={150}
              height={150}
              style={{
                top: f.top,
                left: f.left,
                width: f.size,
                height: "auto",
                animationDelay: f.delay,
                animationDuration: f.duration,
              }}
            />
          ))}
        </div>

        <div className={styles.content}>
          <h2 className={styles.heading}>My Work</h2>

          <div className={styles.summarySection}>
            <span className={styles.summarySectionText}>
              I build and contribute to end-to-end applications using technologies
              such as Angular, React, Node.js, and iOS, bridging UX design and
              engineering to deliver polished, scalable user experiences. I apply
              user-centered design methodologies—including Design Thinking,
              Human-Centered Design, and Human-Computer Interaction—while also
              leveraging AI/ML product development practices to create intelligent
              interfaces, improve decision-making workflows, and introduce
              meaningful automation.
            </span>
          </div>

          {/* simple error/loading handling */}
          {hasError && (
            <p className={styles.errorText}>
              Something went wrong loading projects. Please try again later.
            </p>
          )}
          {isLoading && !hasError && (
            <p className={styles.loadingText}>Loading projects…</p>
          )}

          {!isLoading && !hasError && (
            <div className={styles.portfolioProjectsContainer}>
              {projects.map((project) => (
                <div key={project.id}>
                  <Project data={project.data} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
