"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./contact-me.module.scss";
import Image from "next/image";
import { backgroundFloatImages } from "./background-float-images";
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import emailjs from '@emailjs/browser';

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


function ContactMe() {
  const [floaters, setFloaters] = useState<FloaterConfig[]>([]);
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs
        .sendForm('service_9vnb61i', 'template_4jckt0n', form.current, {
            publicKey: '3kQLMi8QAvKoYTabS',
        })
        .then(
            () => {
                alert('A contact request was submitted!');
                event.target.reset();
            },
            (error) => {
                alert('A contact request was FAILED!');
                console.log('FAILED...', error.text);
            },
        );
    /*
    setEmailError(false)
    if (email == '') {
        setEmailError(true)
    }
    if (email ) {
        console.log(email)
    }*/

    
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


  const handleLinkedIn = () => {
    window.location.href = 'https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/';
  };


  return (
    <section className={styles.contactMeSection} id="contact-me">
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
        <h2 className={styles.heading}>Contact Me</h2>
        <div className={styles.summarySection}>
          <span className={styles.summarySectionText}> I´m always open to discussing exploring new projects, developments, and partnerships. </span>
        </div>

        {/* Contact form and contact details */}
       
        <div className={styles.contactFormContainer}>
            <div>

            <div className={styles.writeMeContainer}>
                <span> Write Me </span>
                <form ref={form} onSubmit={handleSubmit}>
                    <div className={styles.formField}>
                      <TextField
                        sx={{
                            width: { xs: "300px", sm: "300px", md: "300px", lg: "300px" },
                        }}
                        required
                        type="text"
                        name="from_name"
                        label="Your name"
                        variant="filled"
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className='form-field'>
                    <TextField
                      required
                      sx={{
                          width: { xs: "300px", sm: "300px", md: "300px", lg: "300px" },
                      }}
                      id="outlined-required"
                      label="Your email"
                      type="email"
                      name="user_email"
                      defaultValue=""
                      variant="filled"
                      onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-field'>
                      <TextField
                        required
                        multiline
                        rows={4}
                        sx={{
                             width: { xs: "300px", sm: "300px", md: "300px", lg: "300px" },
                        }}
                        id="outlined-required"
                        label="Your message"
                        name="message"
                        defaultValue=""
                        variant="filled"
                        onChange={e => setMessage(e.target.value)}
                      />
                    </div>
                    <div className='form-field-submit'>
                      <Button type="submit" >Submit</Button>
                    </div>
                </form>
            </div>
            </div>
          <div className={styles.contactmeContainer}>
            <span>Contact Me</span>
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
        </div>
        
      </div>
  
    </section>
  );
}

export default ContactMe;
