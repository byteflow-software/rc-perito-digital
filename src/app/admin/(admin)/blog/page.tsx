import { listArtigos } from "@/lib/actions/artigos";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { DeleteArticleButton } from "./DeleteArticleButton";

const statusVariant: Record<string, "published" | "draft" | "pending"> = {
  PUBLISHED: "published",
  DRAFT: "draft",
  SCHEDULED: "pending",
  ARCHIVED: "draft",
};

export default async function AdminBlogPage() {
  const articles = await listArtigos();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary">
            <span className="text-neon">&gt;</span> Artigos
          </h1>
          <p className="text-text-muted text-xs font-mono mt-1">{articles.length} artigos</p>
        </div>
        <Link
          href="/admin/blog/novo"
          className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          NOVO ARTIGO
        </Link>
      </div>

      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Título</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-28">Categoria</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-28">Status</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-32">Publicação</th>
              <th className="text-right px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-16">Views</th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-text-muted">Nenhum artigo criado ainda.</td>
              </tr>
            ) : (
              articles.map((a) => (
                <tr key={a.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${a.id}`} className="text-text-primary hover:text-neon transition-colors">
                      {a.title}
                      {a.featured && <span className="ml-2 text-[10px] text-neon opacity-70">[DESTAQUE]</span>}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted uppercase text-[10px]">{a.category}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[a.status] ?? "default"}>{a.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {a.publishedAt ? formatDate(a.publishedAt) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-text-muted">{a.viewsCount}</td>
                  <td className="px-4 py-3 text-right">
                    <DeleteArticleButton id={a.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
