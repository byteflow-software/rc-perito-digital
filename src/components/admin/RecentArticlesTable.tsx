"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Article = {
  id: string;
  title: string;
  status: string;
  publishedAt: Date | null;
  viewsCount: number;
};

const statusVariant: Record<string, "published" | "draft" | "pending"> = {
  PUBLISHED: "published",
  DRAFT: "draft",
  SCHEDULED: "pending",
  ARCHIVED: "draft",
};

interface Props {
  articles: Article[];
}

export function RecentArticlesTable({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <div className="border border-border bg-bg-card p-8 text-center">
        <p className="font-mono text-text-muted text-sm">Nenhum artigo criado ainda.</p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-bg-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-mono text-[10px] text-text-muted uppercase tracking-widest">
              Título
            </th>
            <th className="px-4 py-3 text-left font-mono text-[10px] text-text-muted uppercase tracking-widest w-28">
              Status
            </th>
            <th className="px-4 py-3 text-left font-mono text-[10px] text-text-muted uppercase tracking-widest w-32">
              Publicação
            </th>
            <th className="px-4 py-3 text-right font-mono text-[10px] text-text-muted uppercase tracking-widest w-20">
              Views
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border last:border-b-0 transition-colors hover:bg-neon/5"
            >
              <td className="px-4 py-3 text-text-secondary">
                <Link
                  href={`/admin/blog/${item.id}`}
                  className="font-mono text-text-primary text-xs hover:text-neon transition-colors"
                >
                  {item.title}
                </Link>
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant[item.status] ?? "default"}>{item.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <span className="font-mono text-xs text-text-muted">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString("pt-BR")
                    : "—"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="font-mono text-xs text-text-muted">{item.viewsCount}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
