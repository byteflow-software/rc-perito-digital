"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

interface Module {
  id: string;
  title: string;
  topics: string[];
}

interface Props {
  theoretical: Module[];
  practical: Module[];
}

export function CurriculumAccordionClient({ theoretical, practical }: Props) {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>CURRICULUM</SectionTitle>
        <div className="space-y-8">
          {theoretical.length > 0 && (
            <div>
              <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">Trilha Teórica</h3>
              <Accordion>
                {theoretical.map((m) => (
                  <AccordionItem key={m.id} title={m.title}>
                    <ul className="space-y-1">
                      {m.topics.map((t, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-neon text-xs">-</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
          {practical.length > 0 && (
            <div>
              <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">Trilha Prática</h3>
              <Accordion>
                {practical.map((m) => (
                  <AccordionItem key={m.id} title={m.title}>
                    <ul className="space-y-1">
                      {m.topics.map((t, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-neon text-xs">-</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
