import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Pick<
    Article,
    "title" | "slug" | "excerpt" | "featuredImage" | "featuredImageAlt" | "category" | "readingTime" | "publishedAt"
  >;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/artigos/${article.slug}`} className="group block">
      <Card hover className="h-full flex flex-col">
        <div className="relative aspect-[16/9] bg-bg-secondary overflow-hidden">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-text-muted text-xs">SEM IMAGEM</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge>{article.category}</Badge>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-mono text-sm font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-neon transition-colors">
            {article.title}
          </h3>
          <p className="text-text-secondary text-xs line-clamp-3 mb-4 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-text-muted text-xs font-mono">
            {article.publishedAt && (
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime} min
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
