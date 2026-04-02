import { Award } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

const certGroups = [
  {
    area: "Investigação & OSINT",
    certs: [
      "Cyberwarfare (ESA OAB-SP)",
      "Threat Intelligence Starter (AFD)",
      "Combate à Fraude e Compliance em Transações Digitais (CAF Academy)",
      "Fraudes e Investigação Corporativa (Gloobal Compliance)",
      "Google Hacking Basics (XPSEC)",
      "Inteligência Cibernética em Fontes Abertas OSINT (Daryus)",
      "Inteligência Cibernética e Contrainteligência para Agentes Investigativos (Daryus)",
      "Crimes Cibernéticos: Riscos e Técnicas de Prevenção (Acadepol PCMG)",
      "Investigações Digitais: OSINT para Jornalistas e Ativistas (Open Knowledge Brasil)",
      "Inteligência e Investigação Criminal em Fontes Abertas (Revista Eletrônica Direito & TI)",
    ],
  },
  {
    area: "Análise Forense",
    certs: [
      "Expert na Comunidade Criminal Player",
      "Forense Áudio, Imagem e Vídeo Forense (Marcos Monteiro)",
      "Perito Computacional Forense (Marcos Monteiro)",
      "Investigação Forense na Internet (MM Forense)",
      "The Cyber | Congresso The Cyber Security & Forensic",
      "Curso Pedofilia: Definição e Proteção (Acadepol PCMG)",
    ],
  },
  {
    area: "Cybersecurity & Tecnologia",
    certs: [
      "CNSE — Certified Network Security Expert (ACADITI)",
      "CSAE — Certified Security Architecture Expert (ACADITI)",
      "Fundamental and Advanced Technical Certification Axonius",
      "Analista de Cibersegurança — Governança (IBSEC)",
      "Fundamentos em Cibersegurança (IBSEC)",
      "Fundamentos LGPD (CertProf)",
      "White Belt (EDTI)",
      "Segurança em Tecnologia da Informação (Fundação Bradesco)",
      "Gestão de Processos — BPM (Fundação Bradesco)",
      "Modelagem de Banco de Dados (Fundação Bradesco)",
    ],
  },
];

export function CertificationsGrid() {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>CERTIFICAÇÕES E FORMAÇÃO</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certGroups.map((group) => (
            <div key={group.area} className="border border-border p-5">
              <h3 className="font-mono text-xs text-neon uppercase tracking-wider mb-4">
                {group.area}
              </h3>
              <ul className="space-y-2">
                {group.certs.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-xs text-text-secondary">
                    <Award className="w-3 h-3 text-neon shrink-0 mt-0.5" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
