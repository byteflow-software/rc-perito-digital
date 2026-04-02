import { Button } from "@/components/ui/button";

export function CourseHero() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-neon text-sm mb-3 tracking-widest uppercase">#OSINT</p>
        <h1 className="font-mono text-3xl md:text-5xl font-bold text-text-primary mb-4">
          Curso Formação em{" "}
          <span className="text-neon">OSINT</span>
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-4">
          O curso de OSINT mais completo do mercado. Com mais de 60h de aula e
          muita atividade prática para treinar suas habilidades. Capacite-se para
          iniciar sua carreira em investigação digital.
        </p>
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-6">
          Um curso completo, voltado para a capacitação dos princípios de
          investigação no ambiente virtual, utilizando técnicas e metodologias
          comprovadas de OSINT.
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

        <div className="relative aspect-video max-w-3xl border border-border overflow-hidden bg-bg-card">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 border-2 border-neon flex items-center justify-center">
                <svg className="w-6 h-6 text-neon ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-mono text-text-muted text-xs">VIDEO DE APRESENTAÇÃO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
