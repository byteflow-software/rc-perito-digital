import { listLanguages } from "@/lib/actions/languages";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminLanguagesPage() {
  const items = await listLanguages();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Idiomas</h1>
          <p className="text-text-muted text-xs font-mono mt-1">{items.length} idiomas</p>
        </div>
        <Link href="/admin/languages/novo" className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors"><Plus className="w-3.5 h-3.5" />NOVO</Link>
      </div>
      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead><tr className="border-b border-border bg-bg-card">
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Idioma</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-36">Nível</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Proficiência</th>
            <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-20">Ordem</th>
          </tr></thead>
          <tbody>
            {items.length === 0 ? <tr><td colSpan={4} className="px-4 py-8 text-center text-text-muted">Nenhum idioma cadastrado.</td></tr>
            : items.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                <td className="px-4 py-3"><Link href={`/admin/languages/${item.id}`} className="text-text-primary hover:text-neon transition-colors">{item.name}</Link></td>
                <td className="px-4 py-3 text-text-muted">{item.level}</td>
                <td className="px-4 py-3 text-neon">{item.percentage}%</td>
                <td className="px-4 py-3 text-text-muted">{item.displayOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
