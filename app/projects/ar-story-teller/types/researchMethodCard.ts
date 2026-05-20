/** Card + dialog payload for `designSystem.researchMethods` (see seed / Firestore). */
export interface ResearchMethodCardData {
  title: string;
  overview?: string[];
  summary?: string;
  approach?: string;
  keyTakeaway?: string;
  designImplications?: string;
  keyInsights?: string[];
}

export interface ResearchMethodDialogSection {
  title: string;
  content?: string[];
  bullets?: string[];
}

/** Maps `ResearchMethodCardData` fields to the dialog section layout. */
export function buildResearchMethodDialogSections(
  method: ResearchMethodCardData,
): ResearchMethodDialogSection[] {
  const sections: ResearchMethodDialogSection[] = [];

  const overview = method.overview?.map((p) => p.trim()).filter(Boolean);
  if (overview?.length) {
    sections.push({ title: "Overview", content: overview });
  }

  const approach = method.approach?.trim();
  if (approach) {
    sections.push({ title: "Approach", content: [approach] });
  }

  const keyInsights = method.keyInsights?.map((b) => b.trim()).filter(Boolean);
  if (keyInsights?.length) {
    sections.push({ title: "Key Insights", bullets: keyInsights });
  }

  const keyTakeaway = method.keyTakeaway?.trim();
  if (keyTakeaway) {
    sections.push({ title: "Key Takeaway", content: [keyTakeaway] });
  }

  const designImplications = method.designImplications?.trim();
  if (designImplications) {
    sections.push({ title: "Design Implications", content: [designImplications] });
  }

  return sections;
}
