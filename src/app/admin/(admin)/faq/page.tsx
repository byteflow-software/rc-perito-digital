import { listFaqs } from "@/lib/actions/faq";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminFaqPage() {
  const faqs = await listFaqs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> FAQ</h1>
          <p className="text-text-muted text-xs font-mono mt-1">{faqs.length} perguntas</p>
        </div>
        <Link href="/admin/faq/novo" className="flex items-center gap-2 px-3 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors">
          <Plus className="w-3.5 h-3.5" />NOVA FAQ
        </Link>
      </div>

      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Pergunta</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-28">Categoria</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-16">Ordem</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Status</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-text-muted">Nenhuma FAQ cadastrada.</td></tr>
            ) : (
              faqs.map((f) => (
                <tr key={f.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/faq/${f.id}`} className="text-text-primary hover:text-neon transition-colors line-clamp-1">{f.question}</Link>
                  </td>
                  <td className="px-4 py-3 text-text-muted uppercase text-[10px]">{f.category}</td>
                  <td className="px-4 py-3 text-text-muted">{f.displayOrder}</td>
                  <td className="px-4 py-3">
                    <span className={`px-1.5 py-0.5 border font-mono text-[10px] ${f.published ? "border-green-500/40 text-green-400" : "border-border text-text-muted"}`}>
                      {f.published ? "ATIVO" : "OCULTO"}
                    </span>
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
