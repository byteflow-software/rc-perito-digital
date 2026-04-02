import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

export function StjStfCitations() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>OBRAS CITADAS POR MINISTROS DO STJ E STF</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-neon/30 glow-border">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-neon/40 bg-neon/5 font-mono text-neon text-sm">
                  STJ
                </div>
                <div>
                  <h3 className="font-mono text-sm text-text-primary mb-2">
                    Citação em Acórdão do STJ
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Trabalhos sobre cadeia de custódia e provas digitais foram
                    referenciados em decisões de ministros do Superior Tribunal de Justiça.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neon/30 glow-border">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-neon/40 bg-neon/5 font-mono text-neon text-sm">
                  STF
                </div>
                <div>
                  <h3 className="font-mono text-sm text-text-primary mb-2">
                    Referência em Decisão do STF
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Publicações sobre investigação digital e OSINT citadas em
                    fundamentações do Supremo Tribunal Federal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
