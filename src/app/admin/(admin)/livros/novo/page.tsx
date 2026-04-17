import { LivroForm } from "@/components/admin/forms/LivroForm";

export default function AdminLivrosNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Novo Livro
      </h1>
      <LivroForm />
    </div>
  );
}
