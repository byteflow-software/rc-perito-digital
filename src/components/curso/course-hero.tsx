import { getCourseInfo } from "@/lib/actions/courseInfo";
import { Button } from "@/components/ui/button";

export async function CourseHero() {
  const info = await getCourseInfo();

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-neon text-sm mb-3 tracking-widest uppercase">{info.tagline}</p>
        <h1 className="font-mono text-3xl md:text-5xl font-bold text-text-primary mb-4">
          {info.heroTitle}{" "}
          <span className="text-neon">{info.heroHighlight}</span>
        </h1>
        {info.description1 && (
          <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-4">{info.description1}</p>
        )}
        {info.description2 && (
          <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mb-6">{info.description2}</p>
        )}
        {info.description3 && (
          <p className="text-text-secondary text-xs leading-relaxed max-w-2xl mb-8 border-l-2 border-neon/40 pl-4">
            {info.description3}
          </p>
        )}

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="border border-neon/30 bg-neon/5 px-4 py-2">
            <span className="font-mono text-neon text-lg font-bold">{info.hoursLabel}</span>
            <span className="text-text-secondary text-xs ml-2">{info.hoursDescription}</span>
          </div>
          <div className="border border-border px-4 py-2">
            <span className="font-mono text-text-primary text-lg font-bold">{info.groupLabel}</span>
            <span className="text-text-secondary text-xs ml-2">{info.groupDescription}</span>
          </div>
          <div className="border border-border px-4 py-2">
            <span className="font-mono text-text-primary text-lg font-bold">{info.certificateLabel}</span>
            <span className="text-text-secondary text-xs ml-2">{info.certificateDescription}</span>
          </div>
        </div>

        {info.instructor && (
          <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">
            Instrutor: {info.instructor}
          </p>
        )}

        <a href={info.ctaUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="lg" terminal>{info.ctaLabel}</Button>
        </a>
      </div>
    </section>
  );
}
