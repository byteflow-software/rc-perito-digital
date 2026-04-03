import Image from "next/image";
import { FileText, ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

const works = [
  {
    title: "A Importância da Cadeia de Custódia",
    desc: "Visão geral sobre Cadeia de Custódia no âmbito de evidências informáticas, baseado no Código de Processo Penal.",
    href: "https://drive.google.com/file/d/1KvZdhbk8bdM-BKS4mxGqf0Od_xHSVKW0/view",
    previewUrl: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/works/cadeia-custodia-preview.jpg",
    type: "PDF Acadêmico",
    author: "Romullo Wheryko Rodrigues de Carvalho",
  },
  {
    title: "O que a internet sabe sobre você",
    desc: "Entrevista com Romullo Carvalho sobre OSINT, privacidade digital e o que suas informações públicas revelam sobre você.",
    href: "https://cepediufsm.wordpress.com/2021/05/20/o-que-a-internet-sabe-sobre-voce-entrevista-com-romullo-carvalho-perito-digital/",
    previewUrl: "https://cepediufsm.wordpress.com/wp-content/uploads/2021/05/2021-05-27-thumbnail-cepedi-webinario.png?w=1080",
    type: "Webinário — CEPEDI",
    author: "Romullo Carvalho",
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
                  <Image
                    src={work.previewUrl}
                    alt={work.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
