import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

interface FeaturedArticleProps {
  article: Pick<
    Article,
    "title" | "slug" | "excerpt" | "featuredImage" | "featuredImageAlt" | "category" | "readingTime" | "publishedAt"
  >;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link href={`/artigos/${article.slug}`} className="group block mb-10">
      <div className="relative border border-border overflow-hidden bg-bg-card hover:border-neon/40 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[16/9] md:aspect-auto bg-bg-secondary overflow-hidden">
            {article.featuredImage ? (
              <Image
                src={article.featuredImage}
                alt={article.featuredImageAlt || article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-text-muted text-sm">ARTIGO DESTAQUE</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{article.category}</Badge>
              <span className="flex items-center gap-1 text-text-muted text-xs font-mono">
                <Clock className="w-3 h-3" />
                {article.readingTime} min
              </span>
            </div>
            <h2 className="font-mono text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-neon transition-colors line-clamp-2">
              {article.title}
            </h2>
            <p className="text-text-secondary text-sm line-clamp-3 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              {article.publishedAt && (
                <time
                  dateTime={new Date(article.publishedAt).toISOString()}
                  className="text-text-muted text-xs font-mono"
                >
                  {formatDate(article.publishedAt)}
                </time>
              )}
              <span className="flex items-center gap-1 text-neon text-xs font-mono group-hover:gap-2 transition-all">
                LER MAIS <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
