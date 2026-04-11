import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative py-2 md:pt-10 md:pb-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-3 md:gap-16">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="font-mono text-neon text-sm mb-1 md:mb-3 tracking-widest">&gt; WELCOME</p>
            <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-2 md:mb-4">
              ROMULLO{" "}
              <span className="text-neon">CARVALHO</span>
            </h1>
            <p className="text-text-secondary text-base md:text-xl mb-2 md:mb-3 font-mono uppercase tracking-wide">
              Perito Digital e Especialista em Forense, OSINT e CTI
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 md:mb-8 max-w-lg mx-auto md:mx-0">
              Autor dos livros &ldquo;OSINT do zero à Investigação Profissional&rdquo; e
              &ldquo;Manual Prático de Provas Digitais&rdquo;, palestrante, Diretor de
              Comunicação da APECOF, CEO da RC Perito Digital, professor de OSINT e
              Segurança Cibernética. 15+ anos de experiência em TI, cibersegurança e
              investigação digital. Fundador da COBRA e organizador da #semanaOSINT.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" terminal>
                  CONTATO
                </Button>
              </a>
              <a href="/sobre">
                <Button variant="secondary" size="lg" terminal>
                  SAIBA MAIS
                </Button>
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-[70vw] max-w-[18rem] md:max-w-none md:w-[26rem] aspect-[3/4] rounded-lg overflow-hidden border border-neon/30 shadow-[0_0_30px_rgba(0,255,65,0.15)]">
              <Image
                src="/images/hero.png"
                alt="Romullo Carvalho - Perito Digital"
                fill
                className="object-cover object-top"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 70vw, 416px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
