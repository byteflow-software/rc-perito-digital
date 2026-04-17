import { listPageSeo } from "@/lib/actions/seo";
import { SeoForm } from "./SeoForm";

const PAGE_LABELS: Record<string, string> = {
  home: "Home (/)",
  artigos: "Artigos (/artigos)",
  sobre: "Sobre (/sobre)",
  "curso-osint": "Curso OSINT (/curso-osint)",
};

export default async function AdminSeoPage() {
  const pages = await listPageSeo();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> SEO</h1>
        <p className="text-text-muted text-xs font-mono mt-1">Configure o título e descrição de cada página</p>
      </div>

      <div className="space-y-6">
        {pages.map((page) => (
          <div key={page.id} className="border border-border">
            <div className="px-4 py-3 border-b border-border bg-bg-card">
              <span className="font-mono text-xs font-bold text-neon">
                {PAGE_LABELS[page.pageKey] ?? page.pageKey}
              </span>
            </div>
            <div className="p-4">
              <SeoForm page={page} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
