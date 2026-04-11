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
              nação para um observador meticuloso.&rdquo;
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
              professor de OSINT. Mais de 15 anos de experiência em TI. Graduado em Gestão de
              TI pela UNIFANOR, pós-graduado em Auditoria de TI pela UNIFOR, pós-graduando em
              Direito Digital pelo IBMEC, MBA em Inteligência Artificial pela FIAP.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Perito em Computação Forense pela CertFOr, certificado em Fundamentos em
              Cibersegurança e Analista de Cibersegurança pela IBSEC, Fundamental and
              Advanced Technical Certification Axonius. Fundador da COBRA, organizador da
              #semanaOSINT, voluntário na ONG Marias da Internet e Projeto Justiceiras.
            </p>
          </div>
          <div className="shrink-0 relative">
            <div className="relative w-[70vw] max-w-[20rem] md:max-w-none md:w-[24rem] aspect-[4/3] rounded-lg overflow-hidden border border-neon/30 shadow-[0_0_30px_rgba(0,255,65,0.15)]">
              <Image
                src="/images/sobre.png"
                alt="Romullo Carvalho"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 70vw, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
