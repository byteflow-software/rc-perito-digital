import { listMilestones } from "@/lib/actions/milestones";
import { SectionTitle } from "@/components/ui/section-title";

export async function Timeline() {
  const milestones = await listMilestones();

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>LINHA DO TEMPO PROFISSIONAL</SectionTitle>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div
                key={m.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <h3 className="font-mono text-sm font-bold text-text-primary">{m.title}</h3>
                  <p className="text-text-secondary text-xs mt-1">{m.description}</p>
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-bg-primary border-2 border-neon flex items-center justify-center z-10">
                    <span className="font-mono text-[10px] text-neon font-bold">{m.year.slice(-2)}</span>
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
