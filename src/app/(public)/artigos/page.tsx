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

// Real articles from romullocarvalho.com.br
const mockArticles = [
  {
    title: "Hash, pra que te quero?",
    slug: "hash-pra-que-te-quero",
    excerpt:
      "O termo hash é cada vez mais presente em laudos periciais, decisões judiciais e documentos técnicos. Compreender o que significa e como se aplica esse conceito é essencial para interpretar evidências digitais.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 10,
    publishedAt: new Date("2025-03-15"),
  },
  {
    title: "Metadados e a Prova Digital",
    slug: "metadados-e-a-prova-digital",
    excerpt:
      "No universo da prova digital, compreender e analisar metadados é tão importante quanto entender o conteúdo principal de um arquivo. Muitas vezes, eles são a chave para confirmar a autenticidade de uma evidência.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 8,
    publishedAt: new Date("2025-02-20"),
  },
  {
    title: "POP SENASP 2013",
    slug: "pop-senasp-2013",
    excerpt:
      "O POP — Procedimento Operacional Padrão é um documento da SENASP que padroniza as ações das forças de segurança pública no Brasil, incluindo apreensão e custódia de evidências digitais.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 6,
    publishedAt: new Date("2025-01-10"),
  },
  {
    title: "POP SENASP 2024",
    slug: "pop-senasp-2024",
    excerpt:
      "O POP SENASP 2024 é a atualização do Procedimento Operacional Padrão, incorporando inovações tecnológicas e atualizando diretrizes de preservação de evidências digitais à luz da Lei 13.964/2019.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 5,
    publishedAt: new Date("2025-01-05"),
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
