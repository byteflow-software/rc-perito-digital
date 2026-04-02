"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Eye, Shield, Wrench, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTICLE_CATEGORIES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Search,
  Eye,
  Shield,
  Wrench,
  Video,
};

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <Link
        href="/artigos"
        className={cn(
          "flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors",
          !active
            ? "border-neon text-neon bg-neon/10"
            : "border-border text-text-secondary hover:border-neon/40 hover:text-neon"
        )}
      >
        Todos
      </Link>
      {ARTICLE_CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon];
        const isActive = active === cat.value;
        return (
          <Link
            key={cat.value}
            href={`/artigos?category=${cat.value}`}
            className={cn(
              "flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors",
              isActive
                ? "border-neon text-neon bg-neon/10"
                : "border-border text-text-secondary hover:border-neon/40 hover:text-neon"
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
