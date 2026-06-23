import type { FeatureSpecification } from "../types/designSystemTypes";

/** Default copy for the Software Prototypes accordion when CMS data omits `accordionSections`. */
export const SOFTWARE_PROTOTYPES_ACCORDION_SECTIONS: FeatureSpecification[] = [
  {
    title: "Mobile Platform Architecture",
    description:
      "The prototype was developed for the iOS platform using ARKit and integrated machine learning powered by a convolutional neural network (CNN), a deep-learning algorithm for image recognition. The system architecture was designed to support future on-demand model delivery, enabling the application to fetch new or updated models from a publishing service without requiring app updates. This approach allows the AR experience to scale across multiple attractions by dynamically adapting models to each context.",
  },
  {
    title: "Machine Learning Models",
    description:
      "The underlying machine learning model is MobileNetV2, a CNN architecture optimized for mobile devices. It processes image inputs through multiple layers, learning to identify and differentiate visual features with high accuracy. The model was trained on a dataset of images through iterative training to achieve strong precision and recall. Final model outputs were formatted for platform compatibility, including Core ML for iOS and ONNX for cross-platform use in Unity.",
  },
  {
    title: "User Experience Interface",
    description:
      "Apple's iOS and ARKit frameworks were used as the front-end platform to deliver augmented reality experiences, with Core ML models integrated to enable real-time recognition and interaction with elements embedded in the attraction environment.",
  },
];

export function resolveSoftwarePrototypesAccordionSections(
  accordionSections?: FeatureSpecification[],
): FeatureSpecification[] {
  if (accordionSections?.length) {
    return accordionSections;
  }
  return SOFTWARE_PROTOTYPES_ACCORDION_SECTIONS;
}
