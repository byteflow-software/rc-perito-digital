import Image from "next/image";

export function AboutHero() {
  return (
    <section className="py-4 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-mono text-3xl md:text-5xl font-bold text-text-primary mb-2 md:mb-4">
              Romullo Carvalho
            </h1>
            <blockquote className="border-l-2 border-neon pl-4 mb-3 md:mb-6 italic text-text-secondary text-sm">
              &ldquo;Mesmo uma imprensa regimentada repetidamente trairá os interesses de sua
              nação para um observador mais bem informado.&rdquo;
              <cite className="block mt-1 text-text-muted not-italic">&mdash; William Donovan</cite>
            </blockquote>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Cristão, casado, pai. Autor dos livros &ldquo;OSINT do zero à Investigação
              Profissional&rdquo; (Editora Literando) e &ldquo;Manual Prático de Provas
              Digitais&rdquo; (Editora Revista dos Tribunais). Palestrante, perito e Diretor
              de Comunicação na APECOF. Expert na Criminal Player, Especialista de
              Inteligência de Ameaças, CEO na RC Perito Digital.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Professor do curso de Segurança Cibernética com Foco em DEVOPS da UNIFOR e
              professor de OSINT. Graduado em Gestão de TI pela UNIFANOR, pós-graduado em
              Audio and Image Forensics pela BLUEAD, pós-graduando em Cibersegurança
              Ofensiva pela ACADI-TI.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Possui certificações CNSE, CSAE, White Belt, Fundamentos LGPD, e certificações
              Axonius. Fundador da Comunidade de OSINT Brasileira (COBRA), organizador da
              #semanaOSINT, voluntário na ONG Marias da Internet e projeto Justiceiras.
            </p>
          </div>
          <div className="shrink-0">
            <Image
              src="/images/perfil.png"
              alt="Romullo Carvalho"
              width={400}
              height={400}
              className="w-[85vw] h-[85vw] max-w-[22rem] md:max-w-none md:w-[30rem] md:h-[30rem] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
