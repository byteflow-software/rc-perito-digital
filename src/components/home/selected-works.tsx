import Image from "next/image";
import { FileText, ExternalLink } from "lucide-react";
import { listSelectedWorks } from "@/lib/actions/selectedWorks";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

export async function SelectedWorks() {
  const works = await listSelectedWorks();

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>TRABALHOS SELECIONADOS</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {works.map((work) => (
            <a key={work.id} href={work.url} target="_blank" rel="noopener noreferrer" className="group block">
              <Card hover className="overflow-hidden h-full">
                {work.previewUrl && (
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
                )}
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-3 h-3 text-neon" />
                    <span className="font-mono text-[10px] text-neon uppercase tracking-wider">{work.type}</span>
                  </div>
                  <h3 className="font-mono text-sm text-text-primary group-hover:text-neon transition-colors line-clamp-2">{work.title}</h3>
                  <p className="text-text-muted text-xs mt-1 line-clamp-2">{work.description}</p>
                  {work.author && <p className="text-text-muted text-[10px] font-mono mt-2">{work.author}</p>}
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
