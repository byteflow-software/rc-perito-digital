import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ArticleBody } from "@/components/artigos/article-body";
import { TableOfContents } from "@/components/artigos/table-of-contents";
import { ShareButtons } from "@/components/artigos/share-buttons";
import { RelatedArticles } from "@/components/artigos/related-articles";
import { NewsletterCta } from "@/components/shared/newsletter-cta";
import { JsonLd } from "@/components/shared/json-ld";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { getPublishedArtigoBySlug, getRelatedArtigos } from "@/lib/actions/artigos";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArtigoBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const keywords = Array.isArray(article.seoKeywords)
    ? (article.seoKeywords as string[])
    : [];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${title} | RC Perito Digital`,
      description,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author],
      images: article.featuredImage ? [{ url: article.featuredImage }] : undefined,
    },
  };
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rcperitodigital.com.br";

export default async function ArtigoDetalhePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArtigoBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArtigos(slug, article.category, 3);
  const articleUrl = `${siteUrl}/artigos/${article.slug}`;

  const breadcrumbs = [
    { name: "Artigos", href: "/artigos" },
    { name: article.title, href: `/artigos/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={buildArticleJsonLd(article)} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      <article className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{article.category}</Badge>
            <span className="flex items-center gap-1 text-text-muted text-xs font-mono">
              <Clock className="w-3 h-3" />
              {article.readingTime} min de leitura
            </span>
          </div>

          <h1 className="font-mono text-2xl md:text-4xl font-bold text-text-primary mb-4">
            {article.title}
          </h1>

          <p className="text-text-secondary text-sm md:text-base mb-4 max-w-3xl">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-4 text-text-muted text-xs font-mono">
              <span>{article.author}</span>
              {article.publishedAt && (
                <time
                  dateTime={article.publishedAt.toISOString()}
                  className="flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.publishedAt)}
                </time>
              )}
            </div>
            <ShareButtons url={articleUrl} title={article.title} />
          </div>
        </header>

        {article.featuredImage && (
          <div className="relative aspect-[16/9] mb-10 border border-border overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        )}

        <div className="lg:hidden">
          <TableOfContents content={article.content} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10">
          <ArticleBody content={article.content} />
          <aside className="hidden lg:block">
            <TableOfContents content={article.content} />
          </aside>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex justify-end">
          <ShareButtons url={articleUrl} title={article.title} />
        </div>

        <RelatedArticles articles={related} />

        <div className="mt-16">
          <NewsletterCta />
        </div>
      </article>
    </>
  );
}
