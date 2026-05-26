"use client";

import ParagraphBlock from "../ParagraphBlock";
import { SectionTitle } from "../SectionTitle";
import type { ConclusionsAndImpactSectionData } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";
import dsSectionStyles from "../../sections/DesignSystemSection.module.scss";

interface ConclusionsAndImpactSectionProps {
  data: ConclusionsAndImpactSectionData;
}

export function ConclusionsAndImpactSection({
  data,
}: ConclusionsAndImpactSectionProps) {
  const items = data.caseStudy?.conclusionsAndImpact ?? [];

  if (!items.length) {
    return null;
  }

  return (
    <div
      className={dsSectionStyles.conclusionsImpactBleed}
      aria-label="Conclusions And Impact"
    >
      <div className={dsSectionStyles.conclusionsImpactBleedInner}>
        {items.map((item, idx) => (
          <div key={`${item.title}-${idx}`}>
            <SectionTitle title={item.title} paddingTop={0} paddingBottom={16}/>
            {item.paragraphs?.length ? (
              <ParagraphBlock paragraphs={item.paragraphs} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConclusionsAndImpactSection;

