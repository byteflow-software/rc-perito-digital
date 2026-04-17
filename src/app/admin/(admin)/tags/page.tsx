import { listTags } from "@/lib/actions/tags";
import { formatDate } from "@/lib/utils";

export default async function AdminTagsPage() {
  const tags = await listTags();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Tags</h1>
        <p className="text-text-muted text-xs font-mono mt-1">{tags.length} tags — criadas automaticamente ao salvar artigos</p>
      </div>

      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Nome</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Slug</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-32">Criada em</th>
            </tr>
          </thead>
          <tbody>
            {tags.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-text-muted">Nenhuma tag criada ainda.</td></tr>
            ) : (
              tags.map((t) => (
                <tr key={t.id} className="border-b border-border">
                  <td className="px-4 py-3 text-text-primary">{t.name}</td>
                  <td className="px-4 py-3 text-text-muted">{t.slug}</td>
                  <td className="px-4 py-3 text-text-muted">{formatDate(t.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
