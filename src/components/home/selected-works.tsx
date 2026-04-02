import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";

const works = [
  {
    title: "A Importancia da Cadeia de Custodia",
    image: "/images/hero/work-1.webp",
    href: "#",
  },
  {
    title: "Entrevista CEPED UFSM - O que a internet sabe sobre voce",
    image: "/images/hero/work-2.webp",
    href: "#",
  },
  {
    title: "Relatorio de Investigacao Digital",
    image: "/images/hero/work-3.webp",
    href: "#",
  },
];

export function SelectedWorks() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>TRABALHOS SELECIONADOS</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <a key={work.title} href={work.href} className="group block">
              <Card hover className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <div className="absolute inset-0 bg-bg-card flex items-center justify-center">
                    <span className="font-mono text-text-muted text-xs">[ IMG ]</span>
                  </div>
                  <div className="absolute inset-0 bg-neon/0 group-hover:bg-neon/10 transition-colors duration-300 z-10" />
                </div>
                <div className="p-4">
                  <h3 className="font-mono text-sm text-text-primary group-hover:text-neon transition-colors line-clamp-2">
                    {work.title}
                  </h3>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
