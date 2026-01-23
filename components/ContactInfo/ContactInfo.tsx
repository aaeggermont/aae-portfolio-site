"use client";
import React from "react";
import styles from "./contactInfo.module.scss"
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ContactInfo() {
    
    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/antonio-eggermont-a6b7244b/', '_blank');
    };

    return (
        <div className={styles.ContacMeContainer}>
            <div className={styles.contactRow}>
                <PhoneIphoneIcon sx={{ color: '#02232c' }} style={{ fontSize: 40 }} />
                <div><span> USA: +206 556 8918</span></div>    
            </div>
            <div className={styles.contactRow}>
                <PhoneIphoneIcon sx={{ color: '#02232c' }} style={{ fontSize: 40 }} />
                <div><span> Mexico: +55 36 71 57 12</span></div>
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
    );
}
