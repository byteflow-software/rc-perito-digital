import { listVideoFeatures } from "@/lib/actions/videoFeatures";
import { Plus } from "lucide-react";
import Link from "next/link";

const sectionLabel: Record<string, string> = {
  SEMANA_OSINT: "Semana OSINT",
  PALESTRAS_CONGRESSOS: "Palestras e Congressos",
};

export default async function AdminVideoFeaturesPage() {
  const items = await listVideoFeatures();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Vídeos em Destaque</h1>
          <p className="text-text-muted text-xs font-mono mt-1">{items.length} vídeos</p>
        </div>
        <Link href="/admin/video-features/novo" className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors"><Plus className="w-3.5 h-3.5" />NOVO</Link>
      </div>
      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead><tr className="border-b border-border bg-bg-card">
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Título</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-40">Seção</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-32">YouTube ID</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-20">Ordem</th>
          </tr></thead>
          <tbody>
            {items.length === 0 ? <tr><td colSpan={4} className="px-4 py-8 text-center text-text-muted">Nenhum vídeo cadastrado.</td></tr>
            : items.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                <td className="px-4 py-3"><Link href={`/admin/video-features/${item.id}`} className="text-text-primary hover:text-neon transition-colors line-clamp-1">{item.title}</Link></td>
                <td className="px-4 py-3 text-text-muted text-[10px] uppercase">{sectionLabel[item.section] ?? item.section}</td>
                <td className="px-4 py-3 text-text-muted">{item.youtubeId}</td>
                <td className="px-4 py-3 text-text-muted">{item.displayOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
