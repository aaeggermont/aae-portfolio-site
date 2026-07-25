"use client";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import styles from "./contact-me.module.scss";
import SendMessage from "@/components/SendMessage/SendMessage";
import { SectionTypewriterHeading } from "./components/SectionTypewriterHeading";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/";

function ContactMe() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className={styles.contactMeSection} id="contact-me">
      <div className={styles.ctaCard}>
        <SectionTypewriterHeading
          text="Let's build something"
          className={styles.heading}
        />
        <p className={styles.summary}>
          Have a project in mind, or just want to say hello? I&apos;m always
          open to talking through ideas and opportunities.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => setIsFormOpen(true)}
          >
            <MailOutlineIcon className={styles.buttonIcon} aria-hidden />
            <span>Get in touch</span>
            <NorthEastIcon className={styles.buttonIconEnd} aria-hidden />
          </button>

          <a
            className={styles.secondaryButton}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className={styles.buttonIcon} aria-hidden />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="contact-form-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          id="contact-form-title"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            pr: 6,
          }}
        >
          Get in touch
          <IconButton
            aria-label="Close contact form"
            onClick={() => setIsFormOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <SendMessage compact />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default ContactMe;
