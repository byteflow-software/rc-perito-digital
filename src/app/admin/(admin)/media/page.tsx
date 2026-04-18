import { listMediaAppearances } from "@/lib/actions/mediaAppearances";
import { Plus } from "lucide-react";
import Link from "next/link";

const typeLabel: Record<string, string> = {
  TV: "TV", ARTICLE: "Artigo", INTERVIEW: "Entrevista", PODCAST: "Podcast", PRESENTATION: "Apresentação",
};

export default async function AdminMediaPage() {
  const items = await listMediaAppearances();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Aparições na Mídia</h1>
          <p className="text-text-muted text-xs font-mono mt-1">{items.length} aparições</p>
        </div>
        <Link href="/admin/media/novo" className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors"><Plus className="w-3.5 h-3.5" />NOVA</Link>
      </div>
      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead><tr className="border-b border-border bg-bg-card">
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Título</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-32">Fonte</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-28">Tipo</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-20">Ordem</th>
          </tr></thead>
          <tbody>
            {items.length === 0 ? <tr><td colSpan={4} className="px-4 py-8 text-center text-text-muted">Nenhuma aparição cadastrada.</td></tr>
            : items.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                <td className="px-4 py-3"><Link href={`/admin/media/${item.id}`} className="text-text-primary hover:text-neon transition-colors line-clamp-1">{item.title}</Link></td>
                <td className="px-4 py-3 text-text-muted">{item.source}</td>
                <td className="px-4 py-3 text-text-muted uppercase text-[10px]">{typeLabel[item.type] ?? item.type}</td>
                <td className="px-4 py-3 text-text-muted">{item.displayOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
