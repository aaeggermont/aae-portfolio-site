"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./contact-page.module.scss";
import Image from "next/image";
import { backgroundFloatImages } from "../home/background-float-images";
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import emailjs from '@emailjs/browser';
import QrFloatingCard from "@/components/QrFloatingCard/QrFloatingCard";

//import QrFloatingCard from "@/app/";

const FLOAT_COUNT = 14;

type FloaterConfig = {
  img: any;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

function AnimatedCardWrapper({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.cardWrapper} ${inView ? styles.cardInView : ""}`}
      style={{
        transitionDelay: inView ? `${index * 90}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}


function ContactMePage() {
  const [floaters, setFloaters] = useState<FloaterConfig[]>([]);
  const form = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSending) return; // guard for double-clicks

      if (!form.current) return;

      try {
        setIsSending(true);
        setToast(null);

        await emailjs.sendForm(
          "service_9vnb61i",
          "template_4jckt0n",
          form.current,
          { publicKey: "vF8vNTkUpDVRI5ITP" }
        );

        setToast({
          message: "Thanks! Your message was sent successfully.",
          type: "success",
        });

        // reset form + local state
        form.current.reset();
        setName("");
        setEmail("");
        setMessage("");
      } catch (error: any) {
        console.error("FAILED…", error?.text || error);
        setToast({
          message:
            "Oops, something went wrong. Please try again in a moment.",
          type: "error",
        });
      } finally {
        setIsSending(false);
      }
    };


  useEffect(() => {
    // This runs ONLY in the browser, after hydration ✅
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
          size: `${40 + Math.random() * 120}px`, // 40–160px
          delay: `${Math.random() * 5}s`,
          duration: `${10 + Math.random() * 10}s`,
        };
      }
    );

    setFloaters(generated);
  }, []);


  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);


  const handleLinkedIn = () => {
    window.location.href = 'https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/';
  };


  return (
    <section className={styles.contactMeSection}>
       {/* Decorative floating images – render only after we have client-side config */}
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
        <h2 className={styles.heading}>Get in Touch</h2>
        <div className={styles.summarySection}>
          <span className={styles.summarySectionText}> I´m always open to discussing exploring new projects, developments, and partnerships. </span>
        </div>

        {/* Contact form and contact details */}
       
        <div className={styles.contactInfoContainer}>
          <div className={styles.contacMeContainer}>
            <div className={styles.contactRow}>
              <PhoneIphoneIcon sx={{ color: '#02232c' }} style={{ fontSize: 40 }} />
               <div><span> USA: +206 556 8918</span></div>    
            </div>
            <div className={styles.contactRow}>
              <PhoneIphoneIcon sx={{ color: '#02232c' }} style={{ fontSize: 40 }} />
              <div><span> Mexico: +52 55 36 71 57 12</span></div>
            </div>
            <div className={styles.contactRow}>
              <AlternateEmailIcon sx={{ color: '#02232c' }} style={{ fontSize: 40 }}/>
              <div><span> aaeggermont@outlook.com</span></div>
            </div>
            <div className={styles.contactRow}>
              <LinkedInIcon onClick={handleLinkedIn} sx={{ color: '#02232c' }} style={{ fontSize: 40 }} /> 
              <div><span onClick={handleLinkedIn}> LinkedIn</span></div>
            </div>
          </div>

          <QrFloatingCard
            src="/images/qr/AAEQRImage.png"
            title="Scan me"
            subtitle="Open my portfolio on mobile"
          />

        </div>

        {/* Contact Form */}
        <div className={styles.contactFormContainer}>
            <span> Write Me </span>
            <form ref={form} onSubmit={handleSubmit}>
                <div className={styles.formFields}>
                  <TextField
                    sx={{
                        width: { xs: "300px", sm: "300px", md: "300px", lg: "350px" },
                    }}
                    required
                    type="text"
                    name="from_name"
                    label="Your name"
                    variant="filled"
                    onChange={e => setName(e.target.value)}
                  />
                
                  <TextField
                    required
                    sx={{
                        width: { xs: "300px", sm: "300px", md: "300px", lg: "350px" },
                    }}
                    id="outlined-required"
                    label="Your email"
                    type="email"
                    name="user_email"
                    defaultValue=""
                    variant="filled"
                    onChange={e => setEmail(e.target.value)}
                      />
            
                  <TextField
                    required
                    multiline
                    rows={4}
                    sx={{
                          width: { xs: "300px", sm: "300px", md: "300px", lg: "350px" },
                    }}
                    id="outlined-required"
                    label="Your message"
                    name="message"
                    defaultValue=""
                    variant="filled"
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>
                <div className={styles.formActions}>
                  <button
                    type="submit"
                      disabled={isSending}
                    className={styles.submitButton}
                  >

                  {isSending && (
                    <span className={styles.spinner} aria-hidden="true" />
                  )}

                    <span className={styles.submitLabel}>
                      {isSending ? "Sending…" : "Send message"}
                    </span>
                  </button>
                </div>
            </form>
      </div>

        
      </div>
      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === "success"
              ? styles.toastSuccess
              : styles.toastError
          } ${styles.toastVisible}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </section>
  );
}

export default ContactMePage;
