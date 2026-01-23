
"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./send-message.module.scss"
import TextField from '@mui/material/TextField';

export default function SendMessage() {
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


  return (
    <div className={styles.contactMeSection}>
      <div className={styles.content}>
        {/* Contact Form */}
        <div className={styles.contactFormContainer}>
          <span> Send me a Message </span>
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
    </div>
  );
}