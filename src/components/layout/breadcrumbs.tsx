import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/shared/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(allItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1 text-xs font-mono text-text-muted">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              {i === allItems.length - 1 ? (
                <span className="text-text-secondary">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-neon transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
