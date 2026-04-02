import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionTitle } from "@/components/ui/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedArticle } from "@/components/artigos/featured-article";
import { CategoryFilter } from "@/components/artigos/category-filter";
import { ArticleCard } from "@/components/artigos/article-card";
import { Pagination } from "@/components/ui/pagination";
import { NewsletterCta } from "@/components/shared/newsletter-cta";
import { JsonLd } from "@/components/shared/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Artigos sobre Forense Digital, OSINT, CTI e Cibersegurança por Romullo Carvalho.",
  openGraph: {
    title: "Artigos | RC Perito Digital",
    description:
      "Artigos sobre Forense Digital, OSINT, CTI e Cibersegurança por Romullo Carvalho.",
  },
};

// Mock data until DB is connected
const mockArticles = [
  {
    title: "Introdução à Forense Digital: Conceitos Fundamentais",
    slug: "introducao-forense-digital",
    excerpt:
      "Entenda os conceitos básicos da forense digital e como essa disciplina é essencial para investigações modernas.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 8,
    publishedAt: new Date("2024-12-15"),
  },
  {
    title: "OSINT para Investigações Corporativas",
    slug: "osint-investigacoes-corporativas",
    excerpt:
      "Como utilizar técnicas de inteligência de fontes abertas para due diligence e investigações empresariais.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "osint",
    readingTime: 12,
    publishedAt: new Date("2024-11-20"),
  },
  {
    title: "Ferramentas Essenciais para Análise de Metadados",
    slug: "ferramentas-analise-metadados",
    excerpt:
      "Guia prático das principais ferramentas para extração e análise de metadados em investigações digitais.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "ferramentas",
    readingTime: 6,
    publishedAt: new Date("2024-10-05"),
  },
  {
    title: "Cyber Threat Intelligence: Frameworks e Metodologias",
    slug: "cti-frameworks-metodologias",
    excerpt:
      "Panorama dos principais frameworks de CTI e como aplicá-los na prática de inteligência cibernética.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "cti",
    readingTime: 15,
    publishedAt: new Date("2024-09-18"),
  },
  {
    title: "Cadeia de Custódia Digital: Boas Práticas",
    slug: "cadeia-custodia-digital",
    excerpt:
      "A importância da cadeia de custódia em evidências digitais e como manter a integridade das provas.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 10,
    publishedAt: new Date("2024-08-22"),
  },
  {
    title: "Investigação em Redes Sociais: SOCMINT na Prática",
    slug: "investigacao-redes-sociais-socmint",
    excerpt:
      "Técnicas e ferramentas para investigação em redes sociais com foco em inteligência e evidências.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "osint",
    readingTime: 9,
    publishedAt: new Date("2024-07-30"),
  },
];

const breadcrumbs = [{ name: "Artigos", href: "/artigos" }];

interface Props {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}

export default async function ArtigosPage({ searchParams }: Props) {
  const { category, page, q } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1"));

  // TODO: Replace with Prisma query
  let filtered = mockArticles;
  if (category) {
    filtered = filtered.filter((a) => a.category === category);
  }
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query)
    );
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const featured = !category && !q && currentPage === 1 ? paged[0] : null;
  const articles = featured ? paged.slice(1) : paged;

  const searchParamsObj: Record<string, string> = {};
  if (category) searchParamsObj.category = category;
  if (q) searchParamsObj.q = q;

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <SectionTitle>ARTIGOS</SectionTitle>

        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <CategoryFilter />
        </Suspense>

        {featured && <FeaturedArticle article={featured} />}

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border">
            <p className="font-mono text-text-muted text-sm">
              Nenhum artigo encontrado.
            </p>
          </div>
        )}

        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/artigos"
            searchParams={searchParamsObj}
          />
        </div>

        <div className="mt-16">
          <NewsletterCta />
        </div>
      </div>
    </>
  );
}
