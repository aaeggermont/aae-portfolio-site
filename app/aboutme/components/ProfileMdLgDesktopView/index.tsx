
//import { AboutMeData } from '../../data/aboutme-data/aboutme-data'
//import Skills from '../../Skills'
import { MaspMdLg } from './Maps'
//import { MoreAboutMe } from '../../MoreAboutMe'
import { ProfileIntroMdLg } from './ProfileIntro'

export function ProfileMdLgDesktopView() {
  return <>

      <ProfileIntroMdLg />

      <MaspMdLg />
    {/*
      <div className="qualifications">
        <h3 className="qualifications-title">Engineering Skills</h3>
        <div className="qualifications-wrapper">
          <Skills data={aboutData.skills.engineering} />
        </div>
      </div>

      <div className="qualifications">
        <h3 className="qualifications-title">Design Skills</h3>
        <div className="qualifications-wrapper">
          <Skills data={aboutData.skills.design} />
        </div>
      </div>

      <MoreAboutMe />
      */}
  </>
}