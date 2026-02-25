import React, { useContext } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './IllustrationGallery.scss';

import StoryBoard1 from '../Images/Storyboard/StoryBoard_1.jpg';
import StoryBoard2 from '../Images/Storyboard/StoryBoard_2.jpg';
import StoryBoard3 from '../Images/Storyboard/StoryBoard_3.jpg';
import StoryBoard4 from '../Images/Storyboard/StoryBoard_4.jpg';
import StoryBoard5 from '../Images/Storyboard/StoryBoard_5.jpg';
import StoryBoard6 from '../Images/Storyboard/StoryBoard_6.jpg';
import StoryBoard7 from '../Images/Storyboard/StoryBoard_7.jpg';
import StoryBoard8 from '../Images/Storyboard/StoryBoard_8.jpg';
import StoryBoard9 from '../Images/Storyboard/StoryBoard_9.jpg';
import StoryBoard10 from '../Images/Storyboard/StoryBoard_10.jpg';
import StoryBoard11 from '../Images/Storyboard/StoryBoard_11.jpg';
import StoryBoard12 from '../Images/Storyboard/StoryBoard_12.jpg';
import StoryBoard13 from '../Images/Storyboard/StoryBoard_13.jpg';
import StoryBoard14 from '../Images/Storyboard/StoryBoard_14.jpg';
import StoryBoard15 from '../Images/Storyboard/StoryBoard_15.jpg';
import StoryBoard16 from '../Images/Storyboard/StoryBoard_16.jpg';
import StoryBoard17 from '../Images/Storyboard/StoryBoard_17.jpg';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface IlllustrationGalleryProps {
    title?: string;
    [key: string]: unknown;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SLIDES: { src: string; legend: string }[] = [
    { src: StoryBoard1 as unknown as string, legend: "Nick arrives with his friends at the main gate, and shows his tickets he purchased online using his phone." },
    { src: StoryBoard2 as unknown as string, legend: `As he enters the park, he opens the Disney World app to make sure he has access to experience enhancers he has purchased are active in his account. He confirms that "Your Disney Memories", an A.R. enhancer is active in his account.` },
    { src: StoryBoard3 as unknown as string, legend: `Later on. as Nick walks around the park he gets closer to the "Tower of Terror" attraction. Since he and his friends are interested in doing the ride, they head out to the attraction.` },
    { src: StoryBoard4 as unknown as string, legend: `Nick arrives at the attraction area with his friends and they get in line to take the ride. A notification is sent to his mobile phone letting him know that they are at the "Tower of Terror."` },
    { src: StoryBoard5 as unknown as string, legend: "There is a sign that informs of a 120 minute wait time in line. The sign also informs guests that A.R. features are available while waiting in line." },
    { src: StoryBoard6 as unknown as string, legend: "Nick opens the notification in his phone to launch the A.R. magic tour app with the introductory story and facts about the attraction." },
    { src: StoryBoard7 as unknown as string, legend: "Later on while while waiting in line, another notification is sent and tells Nick to point his camera to find a CUE around in the environment." },
    { src: StoryBoard8 as unknown as string, legend: "Nick pointing his phone towards one of the sides above the line fence. A.R. Overlays show up with  elements gravitating  in space coming out from an old TV set." },
    { src: StoryBoard9 as unknown as string, legend: "Nick and his fiends take selfies with the capture A.R. content overlays." },
    { src: StoryBoard10 as unknown as string, legend: "The line continues to move and when Nick arrives to the entrance of the Hollywood Hotel attraction, he encounters a monument stone at the gate on his way into the main entrance. A notification is sent to Nick's phone." },
    { src: StoryBoard11 as unknown as string, legend: "Nick grabs his phone, the notification tells Nick to look for the monument stone sign and point the camera to it. An RQ code is also available on of the sides of the monument stone for scanning as well." },
    { src: StoryBoard12 as unknown as string, legend: `Nick points his phone's camera towards the monument stone. An A.R. overlay morphing image superimposes the "Hollywood Tower of Terror" with a sign legend "The Twilight Zone Tower of Terror"` },
    { src: StoryBoard13 as unknown as string, legend: "Nick and his friends continue in line and once the Tower of Terror building becomes more visible on its front, a notification is sent to Nick." },
    { src: StoryBoard14 as unknown as string, legend: "The notification tells him to point his phone's camera to the Hollywood Hotel building to find the a silhouette of a girl standing in the window. He finds the silhouette in A.R. with animated content." },
    { src: StoryBoard15 as unknown as string, legend: "Nick and his friends finally enter the ride. No more notifications are sent during the ride." },
    { src: StoryBoard16 as unknown as string, legend: "Nick and his friends finish the ride and visit other attractions. Some of those attractions have the A.R. capabilities so they continue using the A.R. Magic Tour app." },
    { src: StoryBoard17 as unknown as string, legend: "Later in the day, Nick and his friends leave the park and go back home. The Magic Tours app has recorded Nick's viewed A.R. experiences in the \"Disney Memories\" feature for later viewing at home." },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function IlllustrationGallery({ title, ...props }: IlllustrationGalleryProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div {...props} className="storyteller-carouselgallery">
                <span className="storyboard-title">Discovering A.R. Content and Learning about Tower of Terror Storyboard</span>
                <Carousel emulateTouch centerMode={false} useKeyboardArrows showThumbs={false}>
                    {SLIDES.map((slide, i) => (
                        <div key={i}>
                            <img src={slide.src} style={{ paddingTop: '120px', paddingBottom: '80px', width: '80%' }} />
                            <p className="legend">{slide.legend}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    } else if (screenDevice.isTablet) {
        return (
            <div {...props} className="storyteller-carouselgallery">
                <span className="board-title">Discovering A.R. Content and Learning about Tower of Terror Storyboard</span>
                <Carousel emulateTouch centerMode={false} useKeyboardArrows showThumbs={false}>
                    {SLIDES.map((slide, i) => (
                        <div key={i}>
                            <img src={slide.src} style={{ paddingTop: '80px', paddingBottom: '80px', width: '80%' }} />
                            <p className="legend">{slide.legend}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    } else if (screenDevice.isMobile) {
        return (
            <div {...props} className="storyteller-carouselgallery-smxs">
                <span className="storyboard-title">Discovering A.R. Content and Learning about Tower of Terror Storyboard</span>
                <Carousel emulateTouch centerMode={false} useKeyboardArrows showThumbs={false} showIndicators showArrows={false}>
                    {SLIDES.map((slide, i) => (
                        <div key={i}>
                            <img
                                src={slide.src}
                                style={{ paddingTop: '40px', paddingBottom: '40px', height: '300px', width: '100%', objectFit: 'contain' }}
                            />
                            <p className="legend">{slide.legend}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        );
    }

    return null;
}

export default IlllustrationGallery;
