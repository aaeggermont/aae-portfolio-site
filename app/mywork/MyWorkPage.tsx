// app/mywork/MyWorkPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./mywork.module.scss";
import Image from "next/image";
import { backgroundFloatImages } from "./background-float-images";
import { collection, where, getDoc, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import Project from './Project';
import fsReference from '../../firebase';

const FLOAT_COUNT = 14;

type FloaterConfig = {
  img: any;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};


export default function MyWorkPageView() {
  const [floaters, setFloaters] = useState<FloaterConfig[]>([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState();

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
  
  useEffect(() => {
        const entriesQuery = query(
            collection(fsReference, 'projects_data'),
            orderBy('index', 'asc')
        );

        const unsubscribe = onSnapshot(
            entriesQuery,
            snapshot => {
                setProjects(snapshot.docs);
                setIsLoading(false);
            },
            error => {
                console.log(error);
                setIsLoading(false);
                setHasError(true);
            }
        )

        return () => unsubscribe();
    },[]);


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
            I build and contribute to end-to-end applications using technologies such as Angular, React, Node.js, and iOS, bridging UX design and engineering to deliver polished, scalable user experiences. I apply user-centered design methodologies—including Design Thinking, Human-Centered Design, and Human-Computer Interaction—while also leveraging AI/ML product development practices to create intelligent interfaces, improve decision-making workflows, and introduce meaningful automation.
            </span>
          </div>
          <div className={styles.portfolioProjectsContainer}>
           {projects.map((docSnap) => (
            <div key={docSnap.id}>
              <Project data={docSnap.data() as ProjectProps} />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
