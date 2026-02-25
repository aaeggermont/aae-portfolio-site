'use client';
import './ProjectOverview.scss';
import MyRolesIcon from '../Images/MyRolesIcon.png';
import TimelineIcon from '../Images/TimelineIcon.png';
import CategoryIcon from '../Images/CategoryIcon.png';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';
import Image from 'next/image';

interface ProjectOverviewProps {
  title: string;
  [key: string]: unknown;
}

export function ProjectOverview({ title, ...props}: ProjectOverviewProps) {
    const screenDevice = useResponsive();

    if ( screenDevice.isDesktopOrLaptop ) {
        return (
            <div {...props} className='overview-container'>
                <div className='overview-title'> Project Overview</div>
                <div className='overview-columns'>
                    <div className="column-tier">
                        <div className='overview-row-icon'>
                            <div className='image-icon'>
                                <Image
                                    alt='My Roles Icon'
                                    src = { MyRolesIcon }
                                    style = {{
                                        width: "42px",
                                        height: "42px"
                                    }}
                                />
                            </div>
                            <div className='myroles-text'><span>My Roles</span></div>
                        </div>

                        <div className='overview-row-text '>
                            <span> Project Lead</span>
                            <span> UX/UI Designerr</span>
                            <span> Technology Research</span>
                        </div>
                    </div>
                    <div className="column-tier">
                        <div className='overview-row-icon'>
                            <div className='image-icon'>
                                <Image
                                    alt='My Roles Icon'
                                    src = { MyRolesIcon }
                                    style = {{
                                        width: "42px",
                                        height: "42px"
                                    }}
                                />
                            </div>
                            <div className='myroles-text'><span>Timeline</span> </div>
                        </div>

                        <div className='overview-row-text '>
                            <span> 9 Months </span>
                        </div>
                    </div>

                    <div className="column-tier">
                        <div className='overview-row-icon'>
                            <div className='image-icon'>
                                <Image
                                    alt='My Roles Icon'
                                    src = { MyRolesIcon }
                                    style = {{
                                        width: "42px",
                                        height: "42px"
                                    }}
                                />
                            </div>
                            <div className='myroles-text'><span>Category</span> </div>
                        </div>

                        <div className='overview-row-text'>
                            <span> Extended Reality (XR) </span>
                            <span> Entertainment </span>
                            <span> Computer Vision </span>
                            <span> iOS Mobile Development</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (  screenDevice.isMobile  ) {
        return (
            <div {...props} className='storyteller-overview-container-mobile'>
                <div className='overview-title'>  Project Overview</div>
                <div className='overview-row'>
                    <div className='overview-row-icon'>
                        <div className='image-icon'>
                            <Image
                                alt='My Roles Icon'
                                src = { MyRolesIcon }
                                style = {{
                                    width: "42px",
                                    height: "42px"
                                }}
                            />
                        </div>
                        <div> My Roles</div>
                    </div>
                    <div className='overview-row-text '>
                        <span> Project Lead</span>
                        <span> UX/UI Designer & Engineer</span>
                        <span> Technology Research</span>

                    </div>
                </div>

                <div className='overview-row'>
                    <div className='overview-row-icon'>
                        <div className='image-icon'>
                            <Image
                                alt='Timeline Icon'
                                className='image-icon'
                                src = { TimelineIcon }
                                style = {{
                                    width: "42px",
                                    height: "42px"
                                }}
                            />
                        </div>
                        <div> Time Line</div>
                    </div>
                    <div className='overview-row-text '>

                        <span> 9 Months </span>

                    </div>
                </div>

                <div className='overview-row'>
                    <div className='overview-row-icon'>
                        <div className='image-icon'>
                            <Image
                                alt='Category Icon'
                                className='image-icon'
                                src = { CategoryIcon }
                                style = {{
                                    width: "42px",
                                    height: "42px"
                                }}
                            />
                        </div>
                        <div> Category</div>
                    </div>
                    <div className='overview-row-text '>
                        <span> Extended Reality (XR) </span>
                        <span> Entertainment</span>
                        <span> Computer Vision</span>
                        <span> iOS Mobile Development</span>
                    </div>
                </div>
            </div>
        )

    } else if (  screenDevice.isTablet  ) {
        return (
            <div {...props} className='overview-container'>
                <div className='overview-title'>  Project Overview</div>
                <div className="row-overview">
                    <div className='column-content'>
                        <Image
                            alt='My Roles Icon'
                            src = { MyRolesIcon }
                            style = {{
                                width: "42px",
                                height: "42px"
                            }}
                        />
                    </div>
                    <div className='column-content'>
                        <Image
                            alt='My Roles Icon'
                            src = { MyRolesIcon }
                            style = {{
                                width: "42px",
                                height: "42px"
                            }}
                        />
                    </div>
                    <div className='column-content'>
                        <Image
                            alt='My Roles Icon'
                            src = { MyRolesIcon }
                            style = {{
                                width: "42px",
                                height: "42px"
                            }}
                        />
                    </div>
                </div>
                <div className="row-overview">
                    <div className='column-content'>
                        <div className='myroles-title'> My Roles</div>
                    </div>
                    <div className='column-content'>
                        <div className='myroles-title'> Timeline</div>
                    </div>
                    <div className='column-content'>
                        <div className='myroles-title'> Category</div>
                    </div>
                </div>
                <div className="row-overview">
                    <div className='column-content'>
                        <div className='myroles-text'> Project Lead</div>
                        <div className='myroles-text'> UX/UI Designer</div>
                        <div className='myroles-text'> User Research</div>
                    </div>
                    <div className='column-content'>
                        <div className='myroles-text'> 9 Months</div>
                    </div>
                    <div className='column-content'>
                        <div className='myroles-text'> Extended Reality (XR) </div>
                        <div className='myroles-text'> Entertainment</div>
                        <div className='myroles-text'> Computer Vision</div>
                        <div className='myroles-text'> iOS Mobile Development</div>
                    </div>
                </div>
            </div>
       );
    }
}
