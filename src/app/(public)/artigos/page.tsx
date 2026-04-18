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
import { SelectedWorks } from "@/components/home/selected-works";
import { StjStfCitations } from "@/components/home/stj-stf-citations";
import { JsonLd } from "@/components/shared/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { listPublishedArtigos } from "@/lib/actions/artigos";

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

const breadcrumbs = [{ name: "Artigos", href: "/artigos" }];

interface Props {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}

export default async function ArtigosPage({ searchParams }: Props) {
  const { category, page, q } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1"));
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const { items, total } = await listPublishedArtigos({
    category,
    query: q,
    skip,
    take: ITEMS_PER_PAGE,
  });

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const featured = !category && !q && currentPage === 1 ? items[0] : null;
  const articles = featured ? items.slice(1) : items;

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

      <SelectedWorks />
      <StjStfCitations />
    </>
  );
}
