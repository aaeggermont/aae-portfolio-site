"use client";

import React from "react";
import styles from "./contact-me.module.scss";

function ContactMe() {
  return (
    <section className={styles.contactMeSection} id="contact-me">
      <div className={styles.content}>
        <h2 className={styles.heading}>Contact Me</h2>
        <p className={styles.placeholder}>
          This is a placeholder section for your contact details or form. Content coming soon.
        </p>
      </div>
    </section>
  );
}

export default ContactMe;
