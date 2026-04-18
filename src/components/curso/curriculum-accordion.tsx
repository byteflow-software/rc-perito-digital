import { listModulesByTrack } from "@/lib/actions/courseModules";
import { CurriculumAccordionClient } from "./curriculum-accordion-client";

export async function CurriculumAccordion() {
  const [theoretical, practical] = await Promise.all([
    listModulesByTrack("THEORETICAL"),
    listModulesByTrack("PRACTICAL"),
  ]);

  const toModule = (m: { id: string; title: string; topics: unknown }) => ({
    id: m.id,
    title: m.title,
    topics: Array.isArray(m.topics) ? (m.topics as string[]) : [],
  });

  return (
    <CurriculumAccordionClient
      theoretical={theoretical.map(toModule)}
      practical={practical.map(toModule)}
    />
  );
}
