import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page > 1) params.set("page", String(page));
    else params.delete("page");
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav aria-label="Paginacao" className="flex items-center justify-center gap-1 font-mono text-sm">
      <Link
        href={buildHref(currentPage - 1)}
        className={cn(
          "p-2 transition-colors",
          currentPage <= 1
            ? "pointer-events-none text-text-muted"
            : "text-text-secondary hover:text-neon"
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      {pages.map((page, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev && page - prev > 1;

        return (
          <span key={page} className="flex items-center">
            {showEllipsis && <span className="px-2 text-text-muted">...</span>}
            <Link
              href={buildHref(page)}
              className={cn(
                "px-3 py-1 transition-colors",
                page === currentPage
                  ? "bg-neon text-bg-primary font-bold"
                  : "text-text-secondary hover:text-neon hover:bg-neon/5"
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildHref(currentPage + 1)}
        className={cn(
          "p-2 transition-colors",
          currentPage >= totalPages
            ? "pointer-events-none text-text-muted"
            : "text-text-secondary hover:text-neon"
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}
