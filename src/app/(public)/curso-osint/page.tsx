import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { buildCourseJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { CourseHero } from "@/components/curso/course-hero";
import { CurriculumAccordion } from "@/components/curso/curriculum-accordion";
import { LearningGrid } from "@/components/curso/learning-grid";
import { PricingCard } from "@/components/curso/pricing-card";
import { CourseContact } from "@/components/curso/course-contact";
import { NewsletterCta } from "@/components/shared/newsletter-cta";

export const metadata: Metadata = {
  title: "Curso OSINT",
  description:
    "Formação em OSINT - Domine a Investigação Digital. Mais de 60 horas de conteúdo prático e teórico em inteligência de fontes abertas.",
  openGraph: {
    title: "Curso OSINT | RC Perito Digital",
    description:
      "Formação em OSINT - Domine a Investigação Digital. Mais de 60 horas de conteúdo prático e teórico.",
  },
};

const breadcrumbs = [{ name: "Curso OSINT", href: "/curso-osint" }];

export default function CursoOsintPage() {
  return (
    <>
      <JsonLd data={buildCourseJsonLd()} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <CourseHero />
      <LearningGrid />
      <CurriculumAccordion />
      <PricingCard />
      <CourseContact />

      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterCta />
        </div>
      </section>
    </>
  );
}
