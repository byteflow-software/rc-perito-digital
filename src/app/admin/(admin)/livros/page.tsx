import { listLivros } from "@/lib/actions/livros";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminLivrosPage() {
  const livros = await listLivros();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Livros</h1>
          <p className="text-text-muted text-xs font-mono mt-1">{livros.length} livros</p>
        </div>
        <Link href="/admin/livros/novo" className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors">
          <Plus className="w-3.5 h-3.5" />NOVO LIVRO
        </Link>
      </div>

      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Título</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Autor</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Categoria</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Status</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-20">Home</th>
            </tr>
          </thead>
          <tbody>
            {livros.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">Nenhum livro adicionado.</td></tr>
            ) : (
              livros.map((l) => (
                <tr key={l.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/livros/${l.id}`} className="text-text-primary hover:text-neon transition-colors">{l.title}</Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{l.author}</td>
                  <td className="px-4 py-3 text-text-muted uppercase text-[10px]">{l.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-1.5 py-0.5 border font-mono text-[10px] ${l.status === "SHOW" ? "border-green-500/40 text-green-400" : "border-border text-text-muted"}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{l.showOnHomepage ? "Sim" : "Não"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
