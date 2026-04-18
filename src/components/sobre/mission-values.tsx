import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { listActiveMissionValues } from "@/lib/actions/missionValues";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? icons["Shield"];
}

export async function MissionValues() {
  const values = await listActiveMissionValues();

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>MISSÃO E VALORES</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = getIcon(v.icon);
            return (
              <Card key={v.id} hover>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-neon/30 bg-neon/5">
                    <Icon className="w-6 h-6 text-neon" />
                  </div>
                  <h3 className="font-mono text-sm font-bold text-text-primary mb-2">{v.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{v.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
