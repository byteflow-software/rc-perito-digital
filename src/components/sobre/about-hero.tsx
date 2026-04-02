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
              &ldquo;Mesmo uma imprensa regimentada repetidamente traira os interesses de sua
              nacao para um observador meticuloso&rdquo;
              <cite className="block mt-1 text-text-muted not-italic">&mdash; William Donovan</cite>
            </blockquote>
            <p className="text-text-secondary text-sm leading-relaxed">
              Especialista em computação forense e perícia digital, com foco em OSINT,
              inteligência de ameaças cibernéticas (CTI) e perícia em áudio/imagem.
              Autor de dois livros, palestrante, professor e CEO da RC Perito Digital,
              com mais de 15 anos de experiência em TI e segurança da informação.
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
