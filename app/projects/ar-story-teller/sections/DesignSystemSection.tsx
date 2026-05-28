'use client';
import ParagraphBlock from '../components/ParagraphBlock';
import ParagraphImg from '../components/ParagraphImg';
import styles from '../ArStoryTeller.module.scss';
import dsSectionStyles from './DesignSystemSection.module.scss';
import { SectionTitle } from '../components/SectionTitle';
import { SectionSubTitle } from '../components/SectionSubTitle';
import { UserResearchMethodsCarousel } from '../components/UserResearchMethodsCarousel';
import { InteractionDesignPrinciples } from '../components/InteractionDesignPrinciples';
import { UserModeInteractions } from '../components/UserModeInteractions';
import { Storyboard } from '../components/Storyboard';
import { PrototypingMethodPanel } from '../components/PrototypingMethodPanel';
import {
    UsabilityTestingPanel,
    type UsabilityTestingPanelBulletPoint,
} from '../components/UsabilityTestingPanel';
import { UsabilityFindingsInsights } from '../components/UsabilityFindingsInsights';
import type { DesignSystemSectionData } from '../types/arStoryTellerContent';
import type { StoryboardSlide } from '../types/designSystemTypes';

interface DesignSystemSectionProps {
    data: DesignSystemSectionData;
}

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
    const prototypingMethod1 = prototyping?.methods?.[1];
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

    return (
        <section className={styles['project-container']}>
            <SectionTitle title={designSystem.title} />
            <ParagraphBlock
                paragraphs={designSystem.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphImg
                imagesSrc={designSystem.images}
                alt={designSystem.alt}
                title={designSystem.imageTitle}
                description={designSystem.imageDescription}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
                style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            />

            {/* Understanding Guest Needs — full-bleed background band */}
            <div
                className={dsSectionStyles.guestNeedsBleed}
                aria-label="Understanding Guest Needs"
            >
                <div className={dsSectionStyles.guestNeedsBleedInner}>
                    <SectionSubTitle title={userResearchJourney.title} />
                    <ParagraphBlock
                        paragraphs={userResearchJourney.paragraphs.slice(0, 1)}
                    />
                     {researchMethods?.length ? (
                    <div className={dsSectionStyles.guestNeedsCarouselStrip}>
                        <UserResearchMethodsCarousel methods={researchMethods} />
                    </div>
                ) : null}

                    <ParagraphBlock
                        paragraphs={userResearchJourney.paragraphs.slice(1, 2)}
                    />

                    <ParagraphImg
                        imagesSrc={userResearchJourney.images}
                        alt={designSystem.alt}
                        widthPercent={80}
                        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
                    />
                </div>
            </div>

            {/* Developing Specifications — full-bleed white band */}
            <div
                className={dsSectionStyles.developingSpecsBleed}
                aria-label="Developing Specifications"
            >
                <div className={dsSectionStyles.developingSpecsBleedInner}>
                    <SectionSubTitle title={developingSpecs.title} />
                    <ParagraphBlock paragraphs={developingSpecs.paragraphs} />
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
                    <SectionSubTitle
                        title={envisionUseCase?.title ?? 'Envision the Use Case'}
                    />
                    {envisionUseCase?.paragraphs?.length ? (
                        <ParagraphBlock paragraphs={envisionUseCase.paragraphs} />
                    ) : null}
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
                    <SectionSubTitle
                        title={
                            prototyping?.title ??
                            'Wireframe & Software Prototypes'
                        }
                    />
                    {prototyping?.paragraphs?.length ? (
                        <ParagraphBlock paragraphs={prototyping.paragraphs} />
                    ) : null}
                    {prototypingMethod0 ? (
                        <>
                            <SectionSubTitle title={prototypingMethod0.title} />
                            {prototypingMethod0.paragraphs?.length ? (
                                <ParagraphBlock
                                    paragraphs={prototypingMethod0.paragraphs}
                                />
                            ) : null}
                            <PrototypingMethodPanel
                                primaryImage={
                                    prototypingMethod0.images?.[0]
                                }
                                secondaryImage={
                                    prototypingMethod0.images?.[1]
                                }
                            />
                        </>
                    ) : null}
                    {prototypingMethod1 ? (
                        <>
                            <SectionSubTitle title={prototypingMethod1.title} />
                            <PrototypingMethodPanel
                                paragraphs={prototypingMethod1.paragraphs}
                                copyImage={prototypingMethod1.images?.[0]}
                            />
                        </>
                    ) : null}
                    {prototypingMethod2 ? (
                        <>
                            <SectionSubTitle title={prototypingMethod2.title} />
                            <PrototypingMethodPanel
                                paragraphs={prototypingMethod2.paragraphs}
                                carouselImages={prototypingMethod2.images}
                            />
                        </>
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
                        <SectionSubTitle
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
                        {usabilityTesting.theProcess ? (
                            <>
                                <SectionSubTitle
                                    title={usabilityTesting.theProcess.title}
                                />
                                {usabilityProcessBullets.length ? (
                                    <UsabilityTestingPanel
                                        bulletPoints={usabilityProcessBullets}
                                    />
                                ) : null}
                            </>
                        ) : null}
                        {usabilityTesting.FindingsInsights ? (
                            <>
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
                            </>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
