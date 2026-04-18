import { Globe } from "lucide-react";
import { listLanguages } from "@/lib/actions/languages";
import { SectionTitle } from "@/components/ui/section-title";

export async function Languages() {
  const languages = await listLanguages();

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>IDIOMAS</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <div key={lang.id} className="border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-neon" />
                <h3 className="font-mono text-sm font-bold text-text-primary">{lang.name}</h3>
              </div>
              <p className="text-neon text-[10px] font-mono uppercase tracking-wider mb-1">{lang.level}</p>
              {lang.skills && <p className="text-text-muted text-[11px] mb-3">{lang.skills}</p>}
              <div className="h-1 bg-border">
                <div className="h-full bg-neon transition-all" style={{ width: `${lang.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
