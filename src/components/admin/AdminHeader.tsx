"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  admin: "Admin",
  blog: "Artigos",
  tags: "Tags",
  shorts: "Shorts",
  instagram: "Instagram",
  livros: "Livros",
  faq: "FAQ",
  newsletter: "Newsletter",
  seo: "SEO",
  configuracoes: "Configurações",
  novo: "Novo",
  nova: "Nova",
};

export function AdminHeader({ userName }: { userName: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = LABELS[seg] ?? seg;
    const isLast = i === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-bg-primary/80 backdrop-blur-md border-b border-border">
      <nav className="flex items-center gap-1.5 text-xs font-mono">
        {crumbs.map(({ href, label, isLast }, i) => (
          <span key={href} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="w-3 h-3 text-text-muted" />
            )}
            {isLast ? (
              <span className="text-neon font-semibold">{label}</span>
            ) : (
              <Link href={href} className="text-text-muted hover:text-text-secondary transition-colors">
                {label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-neon/20 border border-neon/40 flex items-center justify-center">
          <span className="font-mono text-[10px] font-bold text-neon">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="font-mono text-xs text-text-secondary hidden sm:block">{userName}</span>
      </div>
    </header>
  );
}
