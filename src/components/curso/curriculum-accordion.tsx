"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

const theoretical = [
  { title: "Apresentação e Forense Digital", topics: ["Conceitos fundamentais", "Marco legal", "Cenário brasileiro"] },
  { title: "Fundamentação Teórica e Jurídica", topics: ["Legislação aplicada", "Cadeia de custódia", "Provas digitais"] },
  { title: "Verificação de Fatos (Verifact)", topics: ["Metodologia Verifact", "Ferramentas de verificação", "Estudos de caso"] },
  { title: "Consultas Processuais", topics: ["Bases de dados públicas", "Tribunais", "Registros oficiais"] },
  { title: "Prospecção de Clientes e Formalização", topics: ["Mercado de perícia", "Propostas técnicas", "Formalização de demandas"] },
];

const practical = [
  { title: "OPSEC, Buscas Online e Cyber", topics: ["Segurança operacional", "Técnicas de busca avançada", "Cyber intelligence"] },
  { title: "Investigação de Governo, Pessoas e Empresas", topics: ["Bases governamentais", "Perfis pessoais", "Due diligence"] },
  { title: "Criptomoedas e HUMINT", topics: ["Rastreamento blockchain", "Inteligência humana", "Engenharia social"] },
  { title: "Telecomunicações e SOCMINT", topics: ["Análise de telecom", "Redes sociais", "Monitoramento"] },
  { title: "Deep/Dark Web, IMINT e GEOINT", topics: ["Navegação segura", "Análise de imagens", "Geolocalização"] },
  { title: "Atuação e Entregáveis Periciais", topics: ["Laudos técnicos", "Relatórios", "Apresentação de resultados"] },
];

export function CurriculumAccordion() {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>CURRICULUM</SectionTitle>

        <div className="space-y-8">
          <div>
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">Trilha Teórica</h3>
            <Accordion>
              {theoretical.map((m) => (
                <AccordionItem key={m.title} title={m.title}>
                  <ul className="space-y-1">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="text-neon text-xs">-</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">Trilha Prática</h3>
            <Accordion>
              {practical.map((m) => (
                <AccordionItem key={m.title} title={m.title}>
                  <ul className="space-y-1">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="text-neon text-xs">-</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
