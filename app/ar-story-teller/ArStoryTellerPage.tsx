"use client";

import { ProjectHeader } from './components/ProjectHeader';
import { OverviewSection } from './components/sections/OverviewSection';
import designChallenge from './data/designChallenge';
import theProblem from './data/theProblem';
import solution from './data/solution';
import team from './data/team';
import { TeamSection } from './components/sections/TeamSection';
import { CaseStudyOverviewSection } from './components/sections/CaseStudyOverviewSection';
import caseStudy from './data/caseStudy';
import { NotificationsSection } from './components/sections/NotificationsSection';
import { MagicExperiencesSection } from './components/sections/MagicExperiencesSection';
import { DesignSystemSection } from './components/sections/DesignSystemSection';
import { NextStepsSection } from './components/sections/NextStepsSection';
import nextSteps from './data/nextSteps';

export function ArStoryTellerPage() {
    return (
        <div style={{ paddingBottom: '200px' }}>
            <ProjectHeader />
            <OverviewSection data={{ designChallenge, theProblem, solution }} />
            <TeamSection data={{ team }} />
            <CaseStudyOverviewSection data={{ caseStudy }} />
            <NotificationsSection data={{ caseStudy }} />
            <MagicExperiencesSection data={{ caseStudy }} />
            <DesignSystemSection data={{ caseStudy }} />
            <NextStepsSection data={{ nextSteps, caseStudy }} />
        </div>
    )
}