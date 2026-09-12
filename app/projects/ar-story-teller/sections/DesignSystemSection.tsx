'use client';
import ParagraphBlock from '../components/ParagraphBlock';
import ParagraphImg from '../components/ParagraphImg';
import styles from '../ArStoryTeller.module.scss';
import dsSectionStyles from './DesignSystemSection.module.scss';
import { SectionSubTitle } from '../components/SectionSubTitle';
import { PanelSubTitle } from '../components/PanelSubTitle';
import { UserResearchMethodsCarousel } from '../components/UserResearchMethodsCarousel';
import { InteractionDesignPrinciples } from '../components/InteractionDesignPrinciples';
import { UserModeInteractions } from '../components/UserModeInteractions';
import { Storyboard } from '../components/Storyboard';
import { PrototypingMethodPanel } from '../components/PrototypingMethodPanel';
import { FieldOfViewExperiment } from '../components/FieldOfViewExperiment';
import {
    UsabilityTestingPanel,
    type UsabilityTestingPanelBulletPoint,
} from '../components/UsabilityTestingPanel';
import { UsabilityFindingsInsights } from '../components/UsabilityFindingsInsights';
import { GuestNeedsQuadrants } from '../components/GuestNeedsQuadrants';
import type { DesignSystemSectionData } from '../types/arStoryTellerContent';
import type { StoryboardSlide } from '../types/designSystemTypes';
import { resolveSoftwarePrototypesAccordionSections } from '../lib/softwarePrototypesAccordion';
import { HCD_XR_PROCESS_DESKTOP_OBJECT_PATH } from '../lib/criticalAssets';
import { Box, Typography } from '@mui/material';
import { titleTypeSx } from '../typography';

interface DesignSystemSectionProps {
    data: DesignSystemSectionData;
}

const DESIGN_SYSTEM_EYEBROW = 'Methodology';
const DESIGN_SYSTEM_TITLE = 'Human-Centered XR Design';
const RESEARCH_EYEBROW = 'Research';
const DEFINE_EYEBROW = 'Define';
const ENVISION_EYEBROW = 'Envision';
const PROTOTYPE_EYEBROW = 'Prototype';
const EVALUATE_EYEBROW = 'Evaluate';
const HCD_XR_PROCESS_IMAGE_TITLE =
    'Human-Centered XR Design Process\n(MIT Digital Media & Artificial Intelligence laboratories).';
const EYEBROW_COLOR = '#1B3C90';
const TITLE_COLOR = '#111A27';

const sectionEyebrowSx = titleTypeSx('eyebrow', {
    m: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: EYEBROW_COLOR,
    textAlign: 'left',
});

const bandEyebrowSx = titleTypeSx('eyebrow', {
    m: 0,
    mb: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: EYEBROW_COLOR,
    textAlign: 'left',
});

function BandSectionHeading({
    eyebrow,
    title,
}: {
    eyebrow: string;
    title: string;
}) {
    return (
        <Box>
            <Typography component="p" sx={bandEyebrowSx}>
                {eyebrow}
            </Typography>
            <SectionSubTitle title={title} />
        </Box>
    );
}

/** Same desktop process diagram for desktop / tablet / mobile (`ParagraphImg` indices 0–2). */
const HCD_XR_PROCESS_IMAGES = [
    HCD_XR_PROCESS_DESKTOP_OBJECT_PATH,
    HCD_XR_PROCESS_DESKTOP_OBJECT_PATH,
    HCD_XR_PROCESS_DESKTOP_OBJECT_PATH,
] as const;

export function DesignSystemSection({ data }: DesignSystemSectionProps) {
    const { designSystem } = data.caseStudy;
    const {
        userResearchJourney,
        developingSpecs,
        prototyping,
        usabilityTesting,
        researchMethods,
        envisionUseCase,
    } = designSystem;

    const interactionModeSpecs =
        developingSpecs.interactionDesignModeSpecifications;

    const prototypingMethod0 = prototyping?.methods?.[0];
    // Wire-Flow — temporarily hidden
    // const prototypingMethod1 = prototyping?.methods?.[1];
    const prototypingMethod2 = prototyping?.methods?.[2];

    const usabilityProcessBullets = (
        usabilityTesting?.theProcess?.bulletpoints ?? []
    ).map((item): UsabilityTestingPanelBulletPoint =>
        typeof item === 'string' ? { text: item } : { text: item.text },
    );

    const storyboard = envisionUseCase?.storyboard;
    const storyboardSlides: StoryboardSlide[] = (
        storyboard?.storyboardSlides ?? []
    ).map((slide) => ({
        title: slide.title,
        description: slide.description,
        image: {
            objectPath: slide.image,
            alt: slide.alt || slide.title,
        },
    }));

    const headingId = 'design-system-heading';

    return (
        <section className={styles['project-container']} aria-labelledby={headingId}>
            {/* Methodology / Human-Centered XR Design — full-bleed band */}
            <div
                className={dsSectionStyles.methodologyBleed}
                aria-label="Human-Centered XR Design"
            >
                <div className={dsSectionStyles.methodologyBleedInner}>
                    <div className={styles['content-group']}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 1.5,
                            }}
                        >
                            <Typography component="p" sx={sectionEyebrowSx}>
                                {DESIGN_SYSTEM_EYEBROW}
                            </Typography>
                            <Typography
                                id={headingId}
                                component="h2"
                                sx={titleTypeSx('sectionTitle', {
                                    m: 0,
                                    color: TITLE_COLOR,
                                    textAlign: 'left',
                                })}
                            >
                                {DESIGN_SYSTEM_TITLE}
                            </Typography>
                        </Box>
                        <ParagraphBlock
                            paragraphs={designSystem.paragraphs}
                        />
                    </div>
                    <ParagraphImg
                        imagesSrc={[...HCD_XR_PROCESS_IMAGES]}
                        alt={designSystem.alt}
                        title={HCD_XR_PROCESS_IMAGE_TITLE}
                    />
                </div>
            </div>

            {/* Understanding Guest Needs — full-bleed background band */}
            <div
                className={dsSectionStyles.guestNeedsBleed}
                aria-label="Understanding Guest Needs"
            >
                <div className={dsSectionStyles.guestNeedsBleedInner}>
                    <div className={styles['content-group']}>
                        <Box>
                            <Typography component="p" sx={bandEyebrowSx}>
                                {RESEARCH_EYEBROW}
                            </Typography>
                            <SectionSubTitle title={userResearchJourney.title} />
                        </Box>
                        <ParagraphBlock
                            paragraphs={userResearchJourney.paragraphs.slice(0, 1)}
                        />
                    </div>
                    {researchMethods?.length ? (
                        <div className={dsSectionStyles.guestNeedsCarouselStrip}>
                            <UserResearchMethodsCarousel methods={researchMethods} />
                        </div>
                    ) : null}
                    <ParagraphBlock
                        paragraphs={userResearchJourney.paragraphs.slice(1, 2)}
                    />
                    <GuestNeedsQuadrants />
                </div>
            </div>

            {/* Developing Specifications — full-bleed white band */}
            <div
                className={dsSectionStyles.developingSpecsBleed}
                aria-label="Developing Specifications"
            >
                <div className={dsSectionStyles.developingSpecsBleedInner}>
                    <div className={styles['content-group']}>
                        <BandSectionHeading
                            eyebrow={DEFINE_EYEBROW}
                            title={developingSpecs.title}
                        />
                        <ParagraphBlock paragraphs={developingSpecs.paragraphs} />
                    </div>
                    {developingSpecs.featuresAndSpecifications
                        ?.featuresAndSpecifications?.length ? (
                        <InteractionDesignPrinciples
                            title={
                                developingSpecs.featuresAndSpecifications.title
                            }
                            features={
                                developingSpecs.featuresAndSpecifications
                                    .featuresAndSpecifications
                            }
                            images={developingSpecs.images}
                        />
                    ) : null}
                    {interactionModeSpecs?.modes?.length ? (
                        <UserModeInteractions
                            title={interactionModeSpecs.title}
                            modes={interactionModeSpecs.modes}
                        />
                    ) : null}
                </div>
            </div>

            {/* Envision the Use Case — full-bleed grey band (same as Guest Needs) */}
            <div
                className={dsSectionStyles.envisionUseCaseBleed}
                aria-label="Envision the Use Case"
            >
                <div className={dsSectionStyles.envisionUseCaseBleedInner}>
                    <div className={styles['content-group']}>
                        <BandSectionHeading
                            eyebrow={ENVISION_EYEBROW}
                            title={envisionUseCase?.title ?? 'Envision the Use Case'}
                        />
                        {envisionUseCase?.paragraphs?.length ? (
                            <ParagraphBlock paragraphs={envisionUseCase.paragraphs} />
                        ) : null}
                    </div>
                    {storyboardSlides.length > 0 ? (
                        <div className={dsSectionStyles.envisionStoryboard}>
                            <Storyboard
                                title={
                                    storyboard?.title ??
                                    'Story Boarding the A.R. Experience'
                                }
                                slides={storyboardSlides}
                            />
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Prototyping — full-bleed white band (`designSystem.prototyping`) */}
            <div
                className={dsSectionStyles.prototypingBleed}
                aria-label="Wireframe and Software Prototypes"
            >
                <div className={dsSectionStyles.prototypingBleedInner}>
                    <div className={styles['content-group']}>
                        <BandSectionHeading
                            eyebrow={PROTOTYPE_EYEBROW}
                            title={
                                prototyping?.title ??
                                'High-Fidelity Experience Screens & Software Prototypes'
                            }
                        />
                        {prototyping?.paragraphs?.length ? (
                            <ParagraphBlock paragraphs={prototyping.paragraphs} />
                        ) : null}
                    </div>
                    {prototypingMethod0 ? (
                        <div className={styles['panel-subsection']}>
                            <div className={styles['content-group']}>
                                <PanelSubTitle title={prototypingMethod0.title} />
                                {prototypingMethod0.paragraphs?.length ? (
                                    <ParagraphBlock
                                        paragraphs={prototypingMethod0.paragraphs}
                                    />
                                ) : null}
                            </div>
                            <PrototypingMethodPanel
                                primaryImage={prototypingMethod0.images?.[0]}
                            />
                        </div>
                    ) : null}
                    {prototyping?.fieldOfViewExperiment ? (
                        <div className={styles['panel-subsection']}>
                            <FieldOfViewExperiment
                                data={prototyping.fieldOfViewExperiment}
                            />
                        </div>
                    ) : null}
                    {prototyping?.arSelfieExperience ? (
                        <div className={styles['panel-subsection']}>
                            <div className={styles['content-group']}>
                                <PanelSubTitle
                                    title={prototyping.arSelfieExperience.title}
                                />
                                {prototyping.arSelfieExperience.paragraphs
                                    ?.length ? (
                                    <ParagraphBlock
                                        paragraphs={
                                            prototyping.arSelfieExperience
                                                .paragraphs
                                        }
                                    />
                                ) : null}
                            </div>
                            <PrototypingMethodPanel
                                primaryImage={
                                    prototyping.arSelfieExperience.images?.[0]
                                }
                                annotatedCallouts={{
                                    left: prototyping.arSelfieExperience
                                        .leftCallouts,
                                    right: prototyping.arSelfieExperience
                                        .rightCallouts,
                                }}
                                annotatedAriaLabel="AR Selfie Experience screen with annotations"
                            />
                        </div>
                    ) : null}
                    {prototyping?.arStoryDetailsExperience ? (
                        <div className={styles['panel-subsection']}>
                            <div className={styles['content-group']}>
                                <PanelSubTitle
                                    title={
                                        prototyping.arStoryDetailsExperience
                                            .title
                                    }
                                />
                                {prototyping.arStoryDetailsExperience
                                    .paragraphs?.length ? (
                                    <ParagraphBlock
                                        paragraphs={
                                            prototyping.arStoryDetailsExperience
                                                .paragraphs
                                        }
                                    />
                                ) : null}
                            </div>
                            <PrototypingMethodPanel
                                primaryImage={
                                    prototyping.arStoryDetailsExperience
                                        .images?.[0]
                                }
                                annotatedCallouts={{
                                    left: prototyping.arStoryDetailsExperience
                                        .leftCallouts,
                                    right: prototyping.arStoryDetailsExperience
                                        .rightCallouts,
                                }}
                                annotatedAriaLabel="AR Story Details About screen with annotations"
                            />
                        </div>
                    ) : null}
                    {prototyping?.arCollectingArtifactsExperience ? (
                        <div className={styles['panel-subsection']}>
                            <div className={styles['content-group']}>
                                <PanelSubTitle
                                    title={
                                        prototyping
                                            .arCollectingArtifactsExperience
                                            .title
                                    }
                                />
                                {prototyping.arCollectingArtifactsExperience
                                    .paragraphs?.length ? (
                                    <ParagraphBlock
                                        paragraphs={
                                            prototyping
                                                .arCollectingArtifactsExperience
                                                .paragraphs
                                        }
                                    />
                                ) : null}
                            </div>
                            <PrototypingMethodPanel
                                primaryImage={
                                    prototyping.arCollectingArtifactsExperience
                                        .images?.[0]
                                }
                                annotatedCallouts={{
                                    left: prototyping
                                        .arCollectingArtifactsExperience
                                        .leftCallouts,
                                    right: prototyping
                                        .arCollectingArtifactsExperience
                                        .rightCallouts,
                                }}
                                annotatedAriaLabel="AR Collecting Artifacts Share screen with annotations"
                            />
                        </div>
                    ) : null}
                    {prototyping?.arNearbyAttractionsExperience ? (
                        <div className={styles['panel-subsection']}>
                            <div className={styles['content-group']}>
                                <PanelSubTitle
                                    title={
                                        prototyping.arNearbyAttractionsExperience
                                            .title
                                    }
                                />
                                {prototyping.arNearbyAttractionsExperience
                                    .paragraphs?.length ? (
                                    <ParagraphBlock
                                        paragraphs={
                                            prototyping
                                                .arNearbyAttractionsExperience
                                                .paragraphs
                                        }
                                    />
                                ) : null}
                            </div>
                            <PrototypingMethodPanel
                                primaryImage={
                                    prototyping.arNearbyAttractionsExperience
                                        .images?.[0]
                                }
                                annotatedCallouts={{
                                    left: prototyping
                                        .arNearbyAttractionsExperience
                                        .leftCallouts,
                                    right: prototyping
                                        .arNearbyAttractionsExperience
                                        .rightCallouts,
                                }}
                                annotatedAriaLabel="AR Nearby Attractions Discover screen with annotations"
                            />
                        </div>
                    ) : null}
                    {/* Wire-Flow — temporarily hidden
                    {prototypingMethod1 ? (
                        <div className={styles['panel-subsection']}>
                            <PanelSubTitle title={prototypingMethod1.title} />
                            <PrototypingMethodPanel
                                paragraphs={prototypingMethod1.paragraphs}
                                copyImage={prototypingMethod1.images?.[0]}
                            />
                        </div>
                    ) : null}
                    */}
                    {prototypingMethod2 ? (
                        <div className={styles['panel-subsection']}>
                            <PanelSubTitle title={prototypingMethod2.title} />
                            <PrototypingMethodPanel
                                accordionSections={resolveSoftwarePrototypesAccordionSections(
                                    prototypingMethod2.accordionSections,
                                )}
                                carouselImages={prototypingMethod2.images}
                            />
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Usability Testing & Evaluation — full-bleed grey band */}
            {usabilityTesting ? (
                <div
                    className={dsSectionStyles.usabilityTestingBleed}
                    aria-label="Usability Testing and Evaluation"
                >
                    <div className={dsSectionStyles.usabilityTestingBleedInner}>
                        <div className={styles['content-group']}>
                            <BandSectionHeading
                                eyebrow={EVALUATE_EYEBROW}
                                title={
                                    usabilityTesting.title ??
                                    'Usability Testing & Evaluation'
                                }
                            />
                            {usabilityTesting.paragraphs?.length ? (
                                <ParagraphBlock
                                    paragraphs={usabilityTesting.paragraphs}
                                />
                            ) : null}
                        </div>
                        {usabilityTesting.theProcess ? (
                            <div className={styles['panel-subsection']}>
                                <SectionSubTitle
                                    title={usabilityTesting.theProcess.title}
                                />
                                {usabilityProcessBullets.length ? (
                                    <UsabilityTestingPanel
                                        bulletPoints={usabilityProcessBullets}
                                    />
                                ) : null}
                            </div>
                        ) : null}
                        {usabilityTesting.FindingsInsights ? (
                            <div className={styles['panel-subsection']}>
                                <SectionSubTitle
                                    title={
                                        usabilityTesting.FindingsInsights.title
                                    }
                                />
                                {usabilityTesting.FindingsInsights.insights
                                    ?.length ? (
                                    <UsabilityFindingsInsights
                                        insights={
                                            usabilityTesting.FindingsInsights
                                                .insights
                                        }
                                    />
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
