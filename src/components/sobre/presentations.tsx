import { Mic } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

const presentations = [
  { event: "IX Congresso Brasileiro de Direito Penal", year: "2024" },
  { event: "Media Week 2023 | SMD (UFC)", year: "2023" },
  { event: "TDIXP 2023 — Técnicas de Invasão", year: "2023" },
  { event: "Media Week 2022 | SMD (UFC)", year: "2022" },
  { event: "Congresso Nacional de Direito Informático e Novas Tecnologias | OAB-MS", year: "2022" },
  { event: "Webinário | Laforense", year: "2022" },
  { event: "Webinário | CEPEDI", year: "2022" },
  { event: "Webinário | DACLOBE", year: "2022" },
  { event: "I Cybersecurity Week | CEUPI", year: "2022" },
  { event: "Bootcamp de Proteção à Criança Online | TechKids Day", year: "2022" },
  { event: "I Taller Básico de Búsqueda de Información en Fuentes Abiertas | Policía Nacional Perú", year: "2022" },
];

export function Presentations() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>PALESTRAS EM EVENTOS</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presentations.map((p) => (
            <Card key={p.event} hover>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-neon/30 bg-neon/5">
                  <Mic className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold text-text-primary leading-tight">
                    {p.event}
                  </h3>
                  <p className="text-neon text-[10px] font-mono uppercase mt-1">{p.year}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
