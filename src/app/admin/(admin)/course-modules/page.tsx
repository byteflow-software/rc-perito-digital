import { listCourseModules } from "@/lib/actions/courseModules";
import { Plus } from "lucide-react";
import Link from "next/link";

const trackLabel: Record<string, string> = {
  THEORETICAL: "Teórica",
  PRACTICAL: "Prática",
};

export default async function AdminCourseModulesPage() {
  const items = await listCourseModules();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Curso — Módulos</h1>
          <p className="text-text-muted text-xs font-mono mt-1">{items.length} módulos</p>
        </div>
        <Link href="/admin/course-modules/novo" className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors">
          <Plus className="w-3.5 h-3.5" />NOVO
        </Link>
      </div>
      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-28">Trilha</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Título</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Tópicos</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Ordem</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-text-muted">Nenhum módulo cadastrado.</td></tr>
            ) : items.map((item) => {
              const topics = Array.isArray(item.topics) ? item.topics : [];
              return (
                <tr key={item.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`px-1.5 py-0.5 border font-mono text-[10px] ${item.track === "THEORETICAL" ? "border-neon/40 text-neon" : "border-amber-400/40 text-amber-400"}`}>
                      {trackLabel[item.track]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/course-modules/${item.id}`} className="text-text-primary hover:text-neon transition-colors">{item.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{topics.length}</td>
                  <td className="px-4 py-3 text-text-muted">{item.displayOrder}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
