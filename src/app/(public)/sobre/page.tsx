import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AboutHero } from "@/components/sobre/about-hero";
import { Timeline } from "@/components/sobre/timeline";
import { CertificationsGrid } from "@/components/sobre/certifications-grid";
import { Communities } from "@/components/sobre/communities";
import { Presentations } from "@/components/sobre/presentations";
import { Languages } from "@/components/sobre/languages";

import { JsonLd } from "@/components/shared/json-ld";
import { buildPersonJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Romullo Carvalho - Perito Digital, especialista em OSINT, Forense Digital e CTI com 15+ anos de experiencia. Autor, palestrante e professor.",
};

export default function SobrePage() {
  return (
    <>
      <JsonLd data={buildPersonJsonLd()} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Sobre", href: "/sobre" }])} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ name: "Sobre", href: "/sobre" }]} />
      </div>

      <AboutHero />
      <Timeline />
      <CertificationsGrid />
      <Communities />
      <Presentations />
      <Languages />
    </>
  );
}
