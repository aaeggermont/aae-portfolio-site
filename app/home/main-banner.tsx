"use client";

import React from 'react';
import "./main-banner.scss";
import Image from "next/image";
//import AOS from 'aos';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function MainBanner() {

    const handleLinkedIn = () => {
        window.location.href = 'https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/';
    };

    return(
        <section className='container'>
            <div className="main-baner-area">
                <div className="aae-banner">
                    <div
                        className="banner-photo"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        >
                        <Image
                            src="/images/AE-Front-Page-Photo.png"
                            alt="Antonio Aranda Eggermont"
                            width={400}
                            height={400}
                            id="banner-image-dimension"
                        />
                    </div>  
                    <div className="heading-info">
                        <div  className="sphere-shape"></div>
                        <span
                            className="heading-primary-intro"
                            data-aos="fade-up"
                            data-aos-duration="1000">Hello, I am Antonio</span>
                        <span
                            className="heading-primary-main"
                            data-aos="fade-up"
                            data-aos-duration="1000"> UX Engineer, Applications Developer & Designer</span>
                        <span
                            className="heading-primary-sub"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        > I design and engineer experiences from inception to completion, and adopt emerging technologies through Human -Centered Design and Design Thinking. </span>

                        <div className="contact-area">
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleLinkedIn}>
                                <input hidden accept="image/*" type="file" />
                                <LinkedInIcon />
                            </IconButton>
                            <span> Linkedin </span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
export default MainBanner;
