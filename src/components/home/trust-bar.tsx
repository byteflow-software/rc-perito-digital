import { listActivePartners } from "@/lib/actions/partners";

export async function TrustBar() {
  const partners = await listActivePartners();
  const names = partners.length > 0
    ? partners.map((p) => p.name)
    : ["APECOF", "ISH Tecnologia", "COBRA", "Verifact", "Editora Literando", "UNIFOR"];

  return (
    <section className="py-6 border-y border-border bg-bg-secondary/50 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...names, ...names].map((name, i) => (
            <span
              key={i}
              className="mx-8 text-text-secondary font-mono text-xs uppercase tracking-widest shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
