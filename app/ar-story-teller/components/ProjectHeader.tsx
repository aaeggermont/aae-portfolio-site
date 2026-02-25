'use client';
import './ProjectHeader.scss';
import CloudsLayer1 from '../Images/cloud-1.png';
import CloudsLayer2 from '../Images/cloud-2.png';
import CloudsLayer3 from '../Images/cloud-3.png';
import CloudsLayer4 from '../Images/cloud-4.png';
import CloudsLayerMobile1 from '../Images/cloud-mobile-1.png';
import CloudsLayerMobile2 from '../Images/cloud-mobile-2.png';
import CloudsLayerMobile3 from '../Images/cloud-mobile-3.png';
import CloudsLayerMobile4 from '../Images/cloud-mobile-4.png';
import CrowdsWaitingDesktop from '../Images/CrowdsWaiting-Desktop.png';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import Image from 'next/image';

function ProjectHeaderDesktop() {
    return (
        <div className="storyteller-banner">
            <div className="banner-titles">
                <div className='container'>
                    <h1
                        data-aos="fade-up"
                        className="banner-text-title">
                        Augmented Reality Magic Tours
                    </h1>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="banner-text-subtitle">
                        Exploring storytelling throught computer vision, machine learning and Augmented Reality at Walt Disney World.
                    </p>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="banner-text-subtitle">
                        A graduate research project at University of Washington Human Centered Design & Engineering.
                    </p>
                </div>
            </div>
            <ParallaxBanner
                style={{
                    backgroundColor: '#153077',
                    height: '60vh'
                }}
            >
                <ParallaxBannerLayer expanded={true} speed={4}>
                    <Image
                        alt='Clouds Layer 4'
                        src={CloudsLayer4}
                        style={{ width: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={2}>
                    <Image
                        alt='Clouds Layer 3'
                        src={CloudsLayer3}
                        style={{ width: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={0}>
                    <Image
                        alt='Clouds Layer 2'
                        src={CloudsLayer2}
                        style={{ width: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={-2}>
                    <Image
                        alt='Clouds Layer 1'
                        src={CloudsLayer1}
                        style={{ width: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
            </ParallaxBanner>
            <div className="people-in-line">
                <Image
                    alt='Crowds Waiting Desktop'
                    src={CrowdsWaitingDesktop}
                    style = {{
                        width: '60%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                />
            </div>
        </div>
    );
}

function ProjectHeaderTablet () {
    return (
        <div className="storyteller-banner">
            <div className="banner-titles">
                <div className='container'>
                    <h1
                        data-aos="fade-up"
                        className="banner-text-title">
                        Augmented Reality Magic Tours
                    </h1>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="banner-text-subtitle">
                        Exploring storytelling throught computer vision, machine learning and Augmented Reality at Walt Disney World.
                    </p>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="banner-text-subtitle">
                        A graduate research project at University of Washington Human Centered Design & Engineering.
                    </p>
                </div>
            </div>
            <ParallaxBanner
                style={{
                    backgroundColor: '#153077',
                    height: '60vh'
                }}
            >
                <ParallaxBannerLayer expanded={true} speed={4}>
                    <Image
                        alt='Clouds Layer 4'
                        src={CloudsLayer4}
                        style={{ width: 'auto', height: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={2}>
                    <Image
                        alt='Clouds Layer 3'
                        src={CloudsLayer3}
                        style={{ width: 'auto', height: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={0}>
                    <Image
                        alt='Clouds Layer 2'
                        src={CloudsLayer2}
                        style={{ width: 'auto', height: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={-2}>
                    <Image
                        alt='Clouds Layer 1'
                        src={CloudsLayer1}
                        style={{ width: 'auto', height: '100%', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="600"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
            </ParallaxBanner>
            <div className="people-in-line">
                <Image
                    alt='Crowds Waiting Desktop'
                    src={CrowdsWaitingDesktop}
                    style = {{
                        width: '60%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                />
            </div>
        </div>
    );
}

function ProjectHeaderMobile () {
    return (
        <div className="storyteller-banner">
            <div className="banner-titles">
                <div className='container'>
                    <h1
                        data-aos="fade-up"
                        className="banner-text-title">
                        Augmented Reality Magic Tours
                    </h1>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="banner-text-subtitle">
                        Exploring storytelling throught computer vision, machine learning and Augmented Reality at Walt Disney World.
                    </p>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="banner-text-subtitle">
                        A graduate research project at University of Washington Human Centered Design & Engineering.
                    </p>
                </div>
            </div>
            <ParallaxBanner
                className='parallax-banner'
                style={{
                    backgroundColor: '#153077',
                    height: '50vh',
                }}
            >
                <ParallaxBannerLayer expanded={true} speed={4}>
                    <Image
                        alt='Clouds Layer Mobile 4'
                        src={CloudsLayerMobile4}
                        style={{ width: '100%', maxHeight: '550px', objectPosition: 'top', objectFit: 'cover', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={2}>
                    <Image
                        alt='Clouds Layer Mobile 3'
                        src={CloudsLayerMobile3}
                        style={{ width: '100%', maxHeight: '550px', objectPosition: 'top', objectFit: 'cover', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={0}>
                    <Image
                        alt='Clouds Layer Mobile 2'
                        src={CloudsLayerMobile2}
                        style={{ width: '100%', maxHeight: '550px', objectPosition: 'top', objectFit: 'cover', bottom: 0, position: 'absolute' }}
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-anchor=".banner-titles"
                    />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer expanded={true} speed={-2}>
                    <Image
                        alt='Clouds Layer Mobile 1'
                        src={CloudsLayerMobile1}
                        style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', bottom: 0, position: 'absolute' }}
                    />
                </ParallaxBannerLayer>
            </ParallaxBanner>
            <div className="people-in-line">
                <Image
                    alt='Crowds Waiting Desktop'
                    src={CrowdsWaitingDesktop}
                    style = {{
                        width: '90%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                    }}
                    data-aos="fade"
                />
            </div>
        </div>
    );
}

export function ProjectHeader() {
    const screenDevice = useResponsive();

    if (screenDevice.isMobile) {
        return <ProjectHeaderMobile />;
    }

    if (screenDevice.isTablet) {
        return <ProjectHeaderTablet />
    }

    return <ProjectHeaderDesktop />;
}

