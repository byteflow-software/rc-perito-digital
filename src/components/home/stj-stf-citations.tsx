import { ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

const citations = [
  {
    court: "STJ",
    title: "Citação em Acórdão do STJ",
    description:
      "AgRg no RECURSO EM HABEAS CORPUS Nº 143.169 — Decisão do Ministro Ribeiro Dantas sobre grave quebra da cadeia de custódia em provas digitais.",
    documentUrl: "https://drive.google.com/file/d/1QNch6PKcCPba0ldFp5U0tvu56dBZjpS1/view",
  },
  {
    court: "STF",
    title: "Referência em Decisão do STF",
    description:
      "AG.REG. NO HABEAS CORPUS 171.557 PARANÁ — Referência em decisão do Supremo Tribunal Federal sobre provas digitais e investigação.",
    documentUrl: "https://drive.google.com/file/d/1D69ca1eESYsRFT7YIntQ_LNLpY_LwbkX/view",
  },
];

export function StjStfCitations() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>OBRAS CITADAS POR MINISTROS DO STJ E STF</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {citations.map((cite) => (
            <a
              key={cite.court}
              href={cite.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="border-neon/30 glow-border h-full hover:border-neon/60 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-neon/40 bg-neon/5 font-mono text-neon text-sm">
                      {cite.court}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono text-sm text-text-primary mb-2 group-hover:text-neon transition-colors">
                        {cite.title}
                      </h3>
                      <p className="text-text-secondary text-xs leading-relaxed mb-3">
                        {cite.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neon uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-3 h-3" />
                        VER DOCUMENTO
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
