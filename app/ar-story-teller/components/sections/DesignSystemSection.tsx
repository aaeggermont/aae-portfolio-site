'use client';
import ParagraphBlock from '../ParagraphBlock';
import ParagraphImg from '../ParagraphImg';
import BulletPoints from '../BulletPoints';
import IlllustrationGallery from '../IllustrationGallery';
import IllustrationDiagram from '../IllustrationDiagram';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';

import DesignSystemBackground from '../../Images/DesignSystemBackground.png';

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

interface DevelopingSpecs {
    title: string;
    paragraphs: string[];
    methods: SpecMethod[];
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

interface WireframeMethod {
    title: string;
    alt: string;
    paragraphs?: string[];
    description?: string;
    images: StaticImageData[];
}

interface Wireframes {
    title: string;
    methods: WireframeMethod[];
}

interface SoftwarePrototypes {
    title: string;
    paragraphs: string[];
}

interface ProcessSection {
    title: string;
    bulletpoints: BulletPointItem[];
}

interface UsabilityTesting {
    title: string;
    paragraphs: string[];
    theProcess: ProcessSection;
    dataAnalysis: ProcessSection;
}

interface DesignSystem {
    title: string;
    paragraphs: string[];
    alt: string;
    images: StaticImageData[];
    description: string;
    userResearchJourney: UserResearchJourney;
    developingSpecs: DevelopingSpecs;
    scenarioBaseDesign: ScenarioBaseDesign;
    wireframes: Wireframes;
    softwarePrototypes: SoftwarePrototypes;
    usabilityTesting: UsabilityTesting;
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
        wireframes,
        softwarePrototypes,
        usabilityTesting,
    } = designSystem;

    return (
        <section className={styles['project-container']}>

            {/* Design System intro con fondo decorativo */}
            <div
                style={{
                    backgroundImage: `url(${DesignSystemBackground.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'auto',
                }}
            >
                <div className="design-systemsection-desktop">
                    <ParagraphBlock
                        title={designSystem.title}
                        paragraphs={designSystem.paragraphs}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="top-center"
                        showReadMore={true}
                        wordsLimit={43}
                    />
                </div>

                <ParagraphImg
                    imagesSrc={designSystem.images}
                    alt={designSystem.alt}
                    description={designSystem.description}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-center"
                />
            </div>

            {/* User Research Journey */}
            <ParagraphBlock
                subTitle1={userResearchJourney.title}
                paragraphs={userResearchJourney.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphImg
                imagesSrc={userResearchJourney.images}
                alt={userResearchJourney.alt}
                description={userResearchJourney.imagesDescription}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {/* Methods [0..2]: solo texto */}
            {([0, 1, 2] as const).map((i) => (
                <ParagraphBlock
                    key={i}
                    subTitle2={userResearchJourney.methods[i].title}
                    paragraphs={userResearchJourney.methods[i].paragraphs}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-center"
                    showReadMore={true}
                    wordsLimit={i === 2 ? 22 : 43}
                />
            ))}

            {/* Method [3]: texto + bullets */}
            <ParagraphBlock
                subTitle2={userResearchJourney.methods[3].title}
                paragraphs={userResearchJourney.methods[3].paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
                showReadMore={true}
                wordsLimit={20}
            />
            <BulletPoints
                bulletPoints={userResearchJourney.methods[3].bulletpoints }
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {/* Method [4]: texto + bullets */}
            <ParagraphBlock
                subTitle2={userResearchJourney.methods[4].title}
                paragraphs={userResearchJourney.methods[4].paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <BulletPoints
                bulletPoints={userResearchJourney.methods[4].bulletpoints}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {/* Method [5]: texto + imagen */}
            <ParagraphBlock
                subTitle2={userResearchJourney.methods[5].title}
                paragraphs={userResearchJourney.methods[5].paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphImg
                imagesSrc={userResearchJourney.methods[5].images}
                alt={userResearchJourney.methods[5].alt}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {/* Developing Specs */}
            <ParagraphBlock
                subTitle1={developingSpecs.title}
                paragraphs={developingSpecs.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
                showReadMore={true}
                wordsLimit={43}
            />
            <ParagraphBlock
                subTitle2={developingSpecs.methods[0].title}
                paragraphs={[]}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <BulletPoints
                bulletPoints={developingSpecs.methods[0].bulletpoints}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphBlock
                subTitle2={developingSpecs.methods[1].title}
                paragraphs={developingSpecs.methods[1].paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <div style={{ width: '100%', textAlign: 'center' }}>
                <ParagraphImg
                    imagesSrc={developingSpecs.methods[1].images}
                    alt={developingSpecs.methods[1].alt}
                    description={developingSpecs.methods[1].description}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-center"
                />
            </div>

            {/* Scenario-Based Design */}
            <ParagraphBlock
                subTitle1={scenarioBaseDesign.title}
                paragraphs={scenarioBaseDesign.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphImg
                imagesSrc={scenarioBaseDesign.images}
                alt={scenarioBaseDesign.alt}
                description={scenarioBaseDesign.alt}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <IlllustrationGallery
                title={scenarioBaseDesign.storyboarding.title}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {/* Wireframes */}
            <ParagraphBlock
                subTitle1={wireframes.title}
                paragraphs={[]}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphBlock
                subTitle2={wireframes.methods[0].title}
                paragraphs={wireframes.methods[0].paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphImg
                imagesSrc={wireframes.methods[0].images}
                alt='wireframes'
                description={wireframes.methods[0].description}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphImg
                description={wireframes.methods[1].title}
                alt={wireframes.methods[1].alt}
                imagesSrc={wireframes.methods[1].images}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphBlock
                subTitle2={wireframes.methods[2].title}
                paragraphs={wireframes.methods[2].paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <IllustrationDiagram
                alt={wireframes.methods[2].alt}
                images={wireframes.methods[2].images}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {/* Software Prototypes */}
            <ParagraphBlock
                subTitle2={softwarePrototypes.title}
                paragraphs={softwarePrototypes.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
                showReadMore={true}
                wordsLimit={28}
            />

            {/* Usability Testing */}
            <ParagraphBlock
                title={usabilityTesting.title}
                paragraphs={usabilityTesting.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphBlock
                subTitle1={usabilityTesting.theProcess.title}
                paragraphs={[]}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <BulletPoints
                bulletPoints={usabilityTesting.theProcess.bulletpoints}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <ParagraphBlock
                subTitle1={usabilityTesting.dataAnalysis.title}
                paragraphs={[]}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
            <BulletPoints
                bulletPoints={usabilityTesting.dataAnalysis.bulletpoints}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
        </section>
    );
}
