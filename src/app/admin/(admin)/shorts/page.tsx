import { listShorts } from "@/lib/actions/shorts";
import { Plus } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AdminShortsPage() {
  const shorts = await listShorts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Shorts</h1>
          <p className="text-text-muted text-xs font-mono mt-1">{shorts.length} shorts</p>
        </div>
        <Link href="/admin/shorts/novo" className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors">
          <Plus className="w-3.5 h-3.5" />NOVO SHORT
        </Link>
      </div>

      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Título</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Status</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-32">Adicionado</th>
            </tr>
          </thead>
          <tbody>
            {shorts.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-text-muted">Nenhum short adicionado.</td></tr>
            ) : (
              shorts.map((s) => (
                <tr key={s.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/shorts/${s.id}`} className="text-text-primary hover:text-neon transition-colors">{s.title}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-1.5 py-0.5 border font-mono text-[10px] ${s.status === "LIVE" ? "border-green-500/40 text-green-400" : "border-border text-text-muted"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{formatDate(s.dateAdded)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
