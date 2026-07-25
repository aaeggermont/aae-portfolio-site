"use client";

import React, { useRef, useState } from "react";
import styles from "./send-message.module.scss";
import TextField from "@mui/material/TextField";
import emailjs from "@emailjs/browser";

type SendMessageProps = {
  /** Compact layout for modal / embedded use (no full-page chrome). */
  compact?: boolean;
};

export default function SendMessage({ compact = false }: SendMessageProps) {
  const form = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    if (!form.current) return;

    try {
      setIsSending(true);
      setToast(null);

      await emailjs.sendForm(
        "service_9vnb61i",
        "template_4jckt0n",
        form.current,
        { publicKey: "vF8vNTkUpDVRI5ITP" },
      );

      setToast({
        message: "Thanks! Your message was sent successfully.",
        type: "success",
      });

      form.current.reset();
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: unknown) {
      console.error("FAILED…", error);
      setToast({
        message: "Oops, something went wrong. Please try again in a moment.",
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`${styles.contactMeSection} ${compact ? styles.compact : ""}`}
    >
      <div className={styles.content}>
        <div className={styles.contactFormContainer}>
          {!compact && <span> Send me a Message </span>}
          <form ref={form} onSubmit={handleSubmit}>
            <div className={styles.formFields}>
              <TextField
                sx={{
                  width: { xs: "100%", sm: "300px", md: "300px", lg: "350px" },
                  maxWidth: "100%",
                }}
                required
                type="text"
                name="from_name"
                label="Your name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                required
                sx={{
                  width: { xs: "100%", sm: "300px", md: "300px", lg: "350px" },
                  maxWidth: "100%",
                }}
                id="contact-email"
                label="Your email"
                type="email"
                name="user_email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                required
                multiline
                rows={4}
                sx={{
                  width: { xs: "100%", sm: "300px", md: "300px", lg: "350px" },
                  maxWidth: "100%",
                }}
                id="contact-message"
                label="Your message"
                name="message"
                variant="filled"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
