import type { StaticImageData } from "next/image";
import type { TimelinePeriodProps } from "@/components/Timeline";

import AkamaiLogo from "../images/akamai_technologies_logo.jpeg";
import CBSLogo from "../images/cbs_interactive_logo.jpeg";
import DisneyLogo from "../images/the_walt_disney_company_logo.jpeg";
import HarvardLogo from "../images/harvard-logo.jpeg";
import SonyLogo from "../images/sony_pictures_imageworks_logo.jpeg";
import EmersonLogo from "../images/emerson_college_logo.jpeg";
import UWLogo from "../images/university_of_washington_logo.jpeg";
import MITLogo from "../images/mit-logo.jpg";

import type {
  EducationEntryData,
  ExperienceEntryData,
  ExperienceLogoKey,
} from "./experience-training-data";

export const EXPERIENCE_LOGO_ASSETS: Record<ExperienceLogoKey, StaticImageData> =
  {
    disney: DisneyLogo,
    akamai: AkamaiLogo,
    cbs: CBSLogo,
    sony: SonyLogo,
    harvard: HarvardLogo,
    uw: UWLogo,
    emerson: EmersonLogo,
    mit: MITLogo,
  };

function resolveLogo(logoKey: ExperienceLogoKey): StaticImageData {
  return EXPERIENCE_LOGO_ASSETS[logoKey] ?? EXPERIENCE_LOGO_ASSETS.disney;
}

/** Map serializable experience entries → Timeline component props. */
export function toExperienceTimeline(
  entries: ExperienceEntryData[],
): TimelinePeriodProps[] {
  return entries.map((entry) => ({
    logo: resolveLogo(entry.logoKey),
    companyName: entry.companyName,
    ...(entry.year ? { year: entry.year } : {}),
    positions: entry.positions.map((position) => ({
      ...(position.year ? { year: position.year } : {}),
      location: position.location,
      position: position.position,
      details: position.details,
    })),
  }));
}

/** Map serializable education/cert entries → Education component props. */
export function toEducationTimeline(
  entries: EducationEntryData[],
): TimelinePeriodProps[] {
  return entries.map((entry) => ({
    logo: resolveLogo(entry.logoKey),
    year: entry.year,
    degree: entry.degree,
    location: entry.location,
    school: entry.school,
    details: entry.details,
  }));
}
