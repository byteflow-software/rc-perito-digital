import { SectionTitle } from "@/components/ui/section-title";

const milestones = [
  { year: "2012", title: "Início na Carreira de TI", desc: "Suporte Técnico na FANOR — Faculdade Nordeste (09/2012 – 03/2013)." },
  { year: "2013", title: "SEJUS", desc: "Suporte Técnico na Secretaria de Justiça e Cidadania (05/2013 – 05/2016)." },
  { year: "2017", title: "Segurança da Informação", desc: "SAP — Secretaria de Administração Penitenciária (10/2017 – 06/2021)." },
  { year: "2019", title: "Graduação em Gestão de TI", desc: "Graduado em Gestão de Tecnologia da Informação pela UNIFANOR Wyden." },
  { year: "2020", title: "Pós-graduação & Docência", desc: "Audio and Image Forensics pela BLUEAD. Professor de Forense em Imagem e Internet na The Forense." },
  { year: "2021", title: "RC Perito Digital & Apura", desc: "Fundação da RC Perito Digital. Cybersecurity Analyst Sales Engineer e CTI Analyst na Apura Cyber Intelligence. Professor na MM Forense e WB Educacional." },
  { year: "2022", title: "ISH Tecnologia", desc: "Especialista de Inteligência de Ameaças na ISH Tecnologia. Fundação da COBRA — Comunidade de OSINT Brasileira." },
  { year: "2024", title: "Reconhecimento & Ciberseg Ofensiva", desc: "Obras citadas por Ministros do STJ e STF. Pós-graduação em Cibersegurança Ofensiva pela ACADI-TI. 5ª turma do Curso de Formação em OSINT." },
];

export function Timeline() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>LINHA DO TEMPO PROFISSIONAL</SectionTitle>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <h3 className="font-mono text-sm font-bold text-text-primary">{m.title}</h3>
                  <p className="text-text-secondary text-xs mt-1">{m.desc}</p>
                </div>

                {/* Year dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-bg-primary border-2 border-neon flex items-center justify-center z-10">
                    <span className="font-mono text-[10px] text-neon font-bold">{m.year.slice(2)}</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
