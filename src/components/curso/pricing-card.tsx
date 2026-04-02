import { Button } from "@/components/ui/button";

const bonuses = [
  "Certificado de 60h",
  "Grupo WhatsApp exclusivo",
  "Atividades práticas por aula",
  "Desafios práticos",
  "Casos reais com professores",
];

export function PricingCard() {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-sm border border-neon/40 bg-bg-card p-8 text-center glow-border">
          <p className="font-mono text-xs text-neon uppercase tracking-widest mb-2">Primeiro Mês</p>
          <div className="mb-1">
            <span className="font-mono text-4xl font-bold text-neon">R$6,95</span>
          </div>
          <p className="text-text-muted text-xs mb-1">
            por mês <span className="line-through text-text-muted/60">R$14,90</span>
          </p>

          <div className="my-6 border-t border-border pt-4">
            <p className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-3">Bônus</p>
            <ul className="space-y-2 text-left">
              {bonuses.map((b) => (
                <li key={b} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="text-neon">+</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://go.hotmart.com/T77442903S"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" className="w-full" terminal>
              INSCREVER-SE AGORA
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
