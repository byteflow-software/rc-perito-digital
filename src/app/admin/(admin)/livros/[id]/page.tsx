import { notFound } from "next/navigation";
import { getLivro } from "@/lib/actions/livros";
import { LivroForm } from "@/components/admin/forms/LivroForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminLivroEditPage({ params }: Props) {
  const { id } = await params;
  const livro = await getLivro(id);
  if (!livro) notFound();

  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Editar Livro
      </h1>
      <LivroForm livro={livro} id={id} isEdit />
    </div>
  );
}
