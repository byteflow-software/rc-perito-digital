import { Mic } from "lucide-react";
import { listPresentations } from "@/lib/actions/presentations";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

export async function Presentations() {
  const items = await listPresentations();

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>PALESTRAS EM EVENTOS</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <Card key={p.id} hover>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-neon/30 bg-neon/5">
                  <Mic className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold text-text-primary leading-tight">{p.event}</h3>
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
