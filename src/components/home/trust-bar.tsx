const partners = [
  "APECOF",
  "ISH Tecnologia",
  "Criminal Player",
  "COBRA",
  "Verifact",
  "Editora Literando",
  "Ed. Revista dos Tribunais",
  "UNIFOR",
  "MM Forense",
  "WB Educacional",
  "Search Perícia Digital",
  "ONG Marias da Internet",
  "Projeto Justiceiras",
];

export function TrustBar() {
  return (
    <section className="py-6 border-y border-border bg-bg-secondary/50 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <span
              key={i}
              className="mx-8 text-text-muted font-mono text-xs uppercase tracking-widest shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
