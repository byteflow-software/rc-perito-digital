import { Button } from "@/components/ui/button";

const HOTMART_URL = "https://go.hotmart.com/T77442903S";

export function CourseHero() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-neon text-sm mb-3 tracking-widest uppercase">#OSINT — CURSO FORMAÇÃO EM OSINT</p>
        <h1 className="font-mono text-3xl md:text-5xl font-bold text-text-primary mb-4">
          Curso Formação em{" "}
          <span className="text-neon">OSINT</span>
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-4">
          O <strong className="text-text-primary">curso de OSINT mais completo do mercado</strong>, com
          mais de 60h de aula e muita atividade prática para treinar suas habilidades.
          Agora você terá acesso ao maior curso de OSINT do Brasil e poderá se
          capacitar para iniciar sua carreira ainda este ano.
        </p>
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-6">
          Um curso completo, voltado para a capacitação dos princípios de investigação
          no ambiente virtual, utilizando a metodologia de OSINT (fontes abertas).
          Possui material complementar, gravação das aulas disponibilizadas até 30 dias
          após o curso, e exercícios práticos para imergir e treinar as habilidades
          de investigação na prática.
        </p>
        <p className="text-text-secondary text-xs leading-relaxed max-w-2xl mb-8 border-l-2 border-neon/40 pl-4">
          Sem pré-requisitos — voltado para advogados, peritos, policiais, investigadores
          particulares, jornalistas, profissionais de TI, auditores e qualquer pessoa que
          deseje conhecer e iniciar uma carreira como analista OSINT.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="border border-neon/30 bg-neon/5 px-4 py-2">
            <span className="font-mono text-neon text-lg font-bold">60h+</span>
            <span className="text-text-secondary text-xs ml-2">de aula</span>
          </div>
          <div className="border border-border px-4 py-2">
            <span className="font-mono text-text-primary text-lg font-bold">5ª</span>
            <span className="text-text-secondary text-xs ml-2">turma</span>
          </div>
          <div className="border border-border px-4 py-2">
            <span className="font-mono text-text-primary text-lg font-bold">Certificado</span>
            <span className="text-text-secondary text-xs ml-2">de 60h</span>
          </div>
        </div>

        <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">
          Instrutor: Romullo Carvalho
        </p>

        <a href={HOTMART_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="lg" terminal>
            INSCREVA-SE AGORA
          </Button>
        </a>
      </div>
    </section>
  );
}
