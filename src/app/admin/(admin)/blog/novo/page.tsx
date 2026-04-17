import { ArtigoForm } from "@/components/admin/forms/ArtigoForm";

export default function AdminBlogNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Novo Artigo
      </h1>
      <ArtigoForm />
    </div>
  );
}
