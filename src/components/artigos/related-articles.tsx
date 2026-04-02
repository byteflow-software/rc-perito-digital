import { SectionTitle } from "@/components/ui/section-title";
import { ArticleCard } from "./article-card";
import type { Article } from "@/types";

interface RelatedArticlesProps {
  articles: Pick<
    Article,
    "title" | "slug" | "excerpt" | "featuredImage" | "featuredImageAlt" | "category" | "readingTime" | "publishedAt"
  >[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <SectionTitle>ARTIGOS RELACIONADOS</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
