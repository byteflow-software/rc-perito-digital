import { Award } from "lucide-react";
import { listCertificationsGrouped } from "@/lib/actions/certifications";
import { SectionTitle } from "@/components/ui/section-title";

const areaLabel: Record<string, string> = {
  osint: "Investigação & OSINT",
  forense: "Análise Forense",
  segurança: "Cybersecurity & Tecnologia",
  cti: "CTI",
  analise: "Análise",
  geral: "Geral",
};

export async function CertificationsGrid() {
  const groups = await listCertificationsGrouped();

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>CERTIFICAÇÕES E FORMAÇÃO</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.area} className="border border-border p-5">
              <h3 className="font-mono text-xs text-neon uppercase tracking-wider mb-4">
                {areaLabel[group.area] ?? group.area}
              </h3>
              <ul className="space-y-2">
                {group.certs.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-2 text-xs text-text-secondary">
                    <Award className="w-3 h-3 text-neon shrink-0 mt-0.5" />
                    {cert.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
