import { getCourseInfo } from "@/lib/actions/courseInfo";
import { listCourseBonuses } from "@/lib/actions/courseBonuses";
import { Button } from "@/components/ui/button";

export async function PricingCard() {
  const [info, bonuses] = await Promise.all([getCourseInfo(), listCourseBonuses()]);

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-sm border border-neon/40 bg-bg-card p-8 text-center glow-border">
          <p className="font-mono text-xs text-neon uppercase tracking-widest mb-2">{info.priceLabel}</p>
          <div className="mb-1">
            <span className="font-mono text-4xl font-bold text-neon">{info.priceValue}</span>
          </div>
          <p className="text-text-muted text-xs mb-1">
            {info.priceSuffix}{" "}
            {info.priceOriginal && <span className="line-through text-text-muted/60">{info.priceOriginal}</span>}
          </p>

          {bonuses.length > 0 && (
            <div className="my-6 border-t border-border pt-4">
              <p className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-3">Bônus</p>
              <ul className="space-y-2 text-left">
                {bonuses.map((b) => (
                  <li key={b.id} className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="text-neon">+</span>
                    {b.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a href={info.ctaUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" className="w-full" terminal>
              {info.ctaLabel}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
