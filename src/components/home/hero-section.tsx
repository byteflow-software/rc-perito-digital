import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative py-2 md:py-24 overflow-hidden">
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
              Autor de dois livros, palestrante, Diretor de Comunicação da APECOF,
              CEO da RC Perito Digital. 15+ anos de experiência em TI, cibersegurança
              e investigação digital.
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
          <div className="flex-shrink-0">
            <Image
              src="/images/perfil_glitched.png"
              alt="Romullo Carvalho - Perito Digital"
              width={400}
              height={400}
              className="w-[90vw] h-[90vw] max-w-[24rem] md:max-w-none md:w-[34rem] md:h-[34rem] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
