'use client';
import ParagraphBlock from '../components/ParagraphBlock';
import ParagraphImg from '../components/ParagraphImg';
import BulletPoints from '../components/BulletPoints';
import IlllustrationGallery from '../components/IllustrationGallery';
import IllustrationDiagram from '../components/IllustrationDiagram';
import { StaticImageData } from 'next/image';
import styles from '../ArStoryTeller.module.scss';
import dsSectionStyles from './DesignSystemSection.module.scss';
import { SectionTitle } from '../components/SectionTitle';
import { SectionSubTitle } from '../components/SectionSubTitle';
import { UserResearchMethodsCarousel } from '../components/UserResearchMethodsCarousel';
import type { ResearchMethodCardData } from '../types/researchMethodCard';
import DesignSystemBackground from '../Images/DesignSystemBackground.png';
import {InteractionDesignPrinciples} from '../components/InteractionDesignPrinciples';
import { UserModeInteractions } from '../components/UserModeInteractions';
import { Storyboard } from '../components/Storyboard';
import { PrototypingMethodPanel } from '../components/PrototypingMethodPanel';
import { UsabilityTestingPanel } from '../components/UsabilityTestingPanel';
import { UsabilityFindingsInsights } from '../components/UsabilityFindingsInsights';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BulletPointItem {
    icon: StaticImageData;
    text: string;
}

interface ResearchMethod {
    title: string;
    paragraphs?: string[];
    bulletpoints?: BulletPointItem[];
    alt?: string;
    images?: StaticImageData[];
}

interface UserResearchJourney {
    title: string;
    paragraphs: string[];
    alt: string;
    imagesDescription: string;
    images: StaticImageData[];
    methods: ResearchMethod[];
}

interface SpecMethod {
    title: string;
    bulletpoints?: BulletPointItem[];
    paragraphs?: string[];
    alt?: string;
    images?: StaticImageData[];
    description?: string;
}

interface FeatureSpecification {
    title: string;
    description?: string;
    /** Legacy seed typo — prefer `description`. */
    desciption?: string;
}

interface FeaturesAndSpecificationsBlock {
    title: string;
    featuresAndSpecifications: FeatureSpecification[];
}

interface DevelopingSpecs {
    title: string;
    paragraphs: string[];
    images?: { objectPath: string; alt: string }[];
    featuresAndSpecifications?: FeaturesAndSpecificationsBlock;
    interactionDesignModeSpecifications?: InteractionModeSpecs;
    methods?: SpecMethod[];
}

/** Firestore: `envisionUseCase.storyboard.storyboardSlides[]` */
interface StoryboardSlideInput {
    alt: string;
    title: string;
    image: string;
    description: string;
}

/** Mapped for `Storyboard` carousel (`ProjectImage` expects `objectPath` + `alt`). */
export interface StoryboardSlide {
    title: string;
    description: string;
    image: { objectPath: string; alt: string };
}

interface EnvisionUseCase {
    title: string;
    paragraphs?: string[];
    storyboard?: {
        title: string;
        storyboardSlides: StoryboardSlideInput[];
    };
}

interface Storyboarding {
    title: string;
}

interface ScenarioBaseDesign {
    title: string;
    paragraphs: string[];
    storyboarding: Storyboarding;
    images: StaticImageData[];
    alt: string;
}

interface PrototypingImage {
    objectPath: string;
    alt: string;
    annotation?: string;
    annotationInstruction?: string;
}

interface PrototypingMethod {
    title: string;
    alt: string;
    paragraphs?: string[];
    images: PrototypingImage[];
}

/** Firestore: `designSystem.prototyping` (see seed). */
interface Prototyping {
    title: string;
    paragraphs?: string[];
    methods?: PrototypingMethod[];
}

interface SoftwarePrototypes {
    title: string;
    paragraphs: string[];
}

interface ProcessSection {
    title: string;
    /** Firestore seed uses plain strings; legacy entries may use `{ text, icon }`. */
    bulletpoints?: Array<string | BulletPointItem>;
}

interface UsabilityInsight {
    insightTitle: string;
    insightDescription: string;
}

interface FindingsInsights {
    title: string;
    insights?: UsabilityInsight[];
}

/** Firestore: `designSystem.usabilityTesting` (see seed). */
interface UsabilityTesting {
    title: string;
    paragraphs?: string[];
    theProcess?: ProcessSection;
    /** Seed field name: `FindingsInsights`. */
    FindingsInsights?: FindingsInsights;
    dataAnalysis?: ProcessSection;
}

interface DesignSystem {
    title: string;
    paragraphs: string[];
    alt: string;
    imageTitle: string;
    imageDescription: string;
    images: StaticImageData[];
    description: string;
    userResearchJourney: UserResearchJourney;
    developingSpecs: DevelopingSpecs;
    scenarioBaseDesign: ScenarioBaseDesign;
    prototyping?: Prototyping;
    softwarePrototypes: SoftwarePrototypes;
    usabilityTesting?: UsabilityTesting;
    researchMethods?: ResearchMethodCardData[];
    envisionUseCase?: EnvisionUseCase;
}

interface InteractionModeSpecs {
    title: string;
    modes: InteractionModeSpec[];
}

interface InteractionModeSpec {
    title: string;
    description: string;
    image: { objectPath: string; alt: string; };
}

interface InteractionDesignPrinciples {
    title: string;
    paragraphs: string[];
    images: { objectPath: string; alt: string; }[];
    featuresAndSpecifications: FeaturesAndSpecifications[];
}

interface FeaturesAndSpecifications {
    title: string;
    description: string;
}




interface DesignSystemSectionProps {
    data: {
        caseStudy: {
            designSystem: DesignSystem;
        };
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DesignSystemSection({ data }: DesignSystemSectionProps) {
    const { designSystem } = data.caseStudy;
    const {
        userResearchJourney,
        developingSpecs,
        scenarioBaseDesign,
        prototyping,
        softwarePrototypes,
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
    ).map((item) =>
        typeof item === 'string' ? { text: item } : item,
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
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="top-center"
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
