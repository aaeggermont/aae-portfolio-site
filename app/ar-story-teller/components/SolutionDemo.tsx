'use client';
import {useRef} from 'react';
import './SolutionDemo.scss';
import ARTowerofTerrorDemo from '../Images/ARTowerofTerrorDemo.gif';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import Image from 'next/image';


export function SolutionDemo ({...attrs}) {
    const screenDevice = useResponsive();
    const ref1 = useRef<HTMLDivElement>(null);
    const alt = 'AR Test';

    if ( screenDevice.isDesktopOrLaptop ) {
        return (
            <div {...attrs} className='solution-demo-container'>
                <div ref={ref1} className='laptop-demo-animation'>
                    <div className='mobile-ar-image'>
                        <Image
                            src={ARTowerofTerrorDemo}
                            alt={alt}
                            style={{
                                width: '100%',
                                height: '100%',
                                paddingTop: '100px',
                            }}
                        />
                        {/* <SlideshowLightbox
                            iconColor="silver"
                            theme="lightbox"
                            className='container grid grid-cols-3 gap-2 mx-auto'
                            showMagnificationIcons={false}
                            fullScreen={false}
                            imgAnimation="fade"
                            showThumbnails={false}>
                            <img
                                className='object-fit_fill'
                                src={ARTowerofTerrorDemo}
                                alt = { alt }
                                style = {{
                                    maxWidth: '100%',
                                    minWidth: '100%',
                                    paddingTop: '100px',

                                }} />
                        </SlideshowLightbox> */}

                    </div>
                </div>
            </div>
        );

    } else if ( screenDevice.isTablet ) {
        return (
            <>
                <div {...attrs} className='solution-demo-container'>
                    <Image
                        alt="AR Test"
                        src = { ARTowerofTerrorDemo }
                        style = {{
                            paddingTop: '3rem',
                            width: '80%'
                        }}
                    />
                </div>
         </>
        )

    } else if ( screenDevice.isMobile ) {
        return (
            <>
                <div {...attrs} className='solutiondemo-smxs-container'>
                        <div ref={ref1} className='mobile-demo-animation'>
                            <div className='mobile-ar-image'>
                                <Image
                                    alt="AR Test"
                                    src = { ARTowerofTerrorDemo }
                                    style = {{
                                        paddingTop: '3rem',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                                {/* <SlideshowLightbox
                                    iconColor="silver"
                                    theme="lightbox"
                                    className='container grid grid-cols-3 gap-2 mx-auto'
                                    showMagnificationIcons={false}
                                    fullScreen={false}
                                    imgAnimation="fade"
                                    showThumbnails={false}>
                                    <img
                                        className='object-fit_fill'
                                        src= {ARTowerofTerrorDemo}
                                        alt = { alt }
                                        style = {{
                                            maxWidth: '100%',
                                            minWidth: '100%',
                                            paddingTop: '3rem'

                                        }} />
                                </SlideshowLightbox> */}

                            </div>
                        </div>
                </div>
            </>
        )
    }
}
