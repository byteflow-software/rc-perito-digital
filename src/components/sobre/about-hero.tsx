import Image from "next/image";
import { getAboutContent } from "@/lib/actions/aboutContent";

export async function AboutHero() {
  const about = await getAboutContent();

  const photoUrl = about.photoUrl || "/images/sobre.png";
  const photoAlt = about.photoAlt || "Romullo Carvalho";

  return (
    <section className="py-4 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-mono text-3xl md:text-5xl font-bold text-text-primary mb-2 md:mb-4">
              {about.title}
            </h1>
            {about.quote && (
              <blockquote className="border-l-2 border-neon pl-4 mb-3 md:mb-6 italic text-text-secondary text-sm">
                &ldquo;{about.quote}&rdquo;
                {about.quoteAuthor && (
                  <cite className="block mt-1 text-text-muted not-italic">&mdash; {about.quoteAuthor}</cite>
                )}
              </blockquote>
            )}
            {about.paragraph1 && (
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{about.paragraph1}</p>
            )}
            {about.paragraph2 && (
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{about.paragraph2}</p>
            )}
            {about.paragraph3 && (
              <p className="text-text-secondary text-sm leading-relaxed">{about.paragraph3}</p>
            )}
          </div>
          <div className="shrink-0 relative">
            <div className="relative w-[70vw] max-w-[20rem] md:max-w-none md:w-[24rem] aspect-[4/3] rounded-lg overflow-hidden border border-neon/30 shadow-[0_0_30px_rgba(0,255,65,0.15)]">
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 70vw, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
