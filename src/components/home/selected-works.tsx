import { FileText, ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

const works = [
  {
    title: "A Importância da Cadeia de Custódia",
    desc: "Visão geral sobre Cadeia de Custódia no âmbito de evidências informáticas, baseado no Código de Processo Penal.",
    href: "https://drive.google.com/file/d/1KvZdhbk8bdM-BKS4mxGqf0Od_xHSVKW0/view",
    previewUrl: "https://drive.google.com/file/d/1KvZdhbk8bdM-BKS4mxGqf0Od_xHSVKW0/preview",
    type: "PDF Acadêmico",
    author: "Romullo Wheryko Rodrigues de Carvalho",
  },
];

export function SelectedWorks() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>TRABALHOS SELECIONADOS</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <a key={work.title} href={work.href} target="_blank" rel="noopener noreferrer" className="group block">
              <Card hover className="overflow-hidden h-full">
                <div className="relative aspect-[4/3] bg-bg-card border-b border-border">
                  <iframe
                    src={work.previewUrl}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    title={work.title}
                  />
                  <div className="absolute inset-0 bg-neon/0 group-hover:bg-neon/10 transition-colors duration-300 z-10 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary/80 border border-neon px-3 py-1.5 flex items-center gap-2">
                      <ExternalLink className="w-3 h-3 text-neon" />
                      <span className="font-mono text-xs text-neon">ABRIR</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-3 h-3 text-neon" />
                    <span className="font-mono text-[10px] text-neon uppercase tracking-wider">
                      {work.type}
                    </span>
                  </div>
                  <h3 className="font-mono text-sm text-text-primary group-hover:text-neon transition-colors line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="text-text-muted text-xs mt-1 line-clamp-2">{work.desc}</p>
                  <p className="text-text-muted text-[10px] font-mono mt-2">{work.author}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
