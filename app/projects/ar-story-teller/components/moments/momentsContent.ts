/**
 * AR journey moments for the Solution chapter (single-stage timeline).
 * V1 plays Nearby + Story Details; Selfie / Artifacts stay defined for V2.
 */

export type MomentDemoKind =
    | 'nearbyMockup'
    | 'mainDemo'
    | 'selfieMockup'
    | 'artifactsMockup';

export type MomentId =
    | 'nearby'
    | 'storyDetails'
    | 'selfie'
    | 'artifacts';

export type MomentDefinition = {
    id: MomentId;
    /** When false, omitted from MomentsChapter (still available for V2). */
    enabled: boolean;
    title: string;
    description: string;
    demo: MomentDemoKind;
    /** Used when `demo` is a static phone mockup. */
    mockup?: {
        objectPath: string;
        alt: string;
        intrinsicWidth: number;
        intrinsicHeight: number;
    };
};

const PHONE_MOCKUP_INTRINSIC = {
    width: 434,
    height: 884,
} as const;

export const AR_MOMENTS: MomentDefinition[] = [
    {
        id: 'nearby',
        enabled: true,
        title: 'Discover Nearby Attractions',
        description:
            'Browse nearby attractions where AR content is available.',
        demo: 'nearbyMockup',
        mockup: {
            objectPath: 'projects/project_1/ARNearbyAttractions.png',
            alt: 'Nearby Attractions AR screen',
            intrinsicWidth: PHONE_MOCKUP_INTRINSIC.width,
            intrinsicHeight: PHONE_MOCKUP_INTRINSIC.height,
        },
    },
    {
        id: 'storyDetails',
        enabled: true,
        title: 'Discovering Story Details',
        description:
            'Scan the environment to unlock location-based story elements.',
        demo: 'mainDemo',
    },
    {
        id: 'selfie',
        enabled: false,
        title: 'Taking a Selfie',
        description: 'Capture photos with integrated digital elements.',
        demo: 'selfieMockup',
        mockup: {
            objectPath: 'projects/project_1/ARTakingSelfie.png',
            alt: 'Taking a Selfie AR screen',
            intrinsicWidth: PHONE_MOCKUP_INTRINSIC.width,
            intrinsicHeight: PHONE_MOCKUP_INTRINSIC.height,
        },
    },
    {
        id: 'artifacts',
        enabled: false,
        title: 'Collecting Artifacts',
        description:
            "Collect digital artifacts tied to the attraction's narrative.",
        demo: 'artifactsMockup',
        mockup: {
            objectPath: 'projects/project_1/ARCollectingArtifacts.png',
            alt: 'Collecting Artifacts AR screen',
            intrinsicWidth: PHONE_MOCKUP_INTRINSIC.width,
            intrinsicHeight: PHONE_MOCKUP_INTRINSIC.height,
        },
    },
];

export const AR_MOMENTS_ACTIVE = AR_MOMENTS.filter((m) => m.enabled);
