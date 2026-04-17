import { notFound } from "next/navigation";
import { getArtigo } from "@/lib/actions/artigos";
import { ArtigoForm } from "@/components/admin/forms/ArtigoForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  const artigo = await getArtigo(id);
  if (!artigo) notFound();

  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Editar Artigo
      </h1>
      <ArtigoForm
        artigo={{
          ...artigo,
          seoKeywords: Array.isArray(artigo.seoKeywords) ? (artigo.seoKeywords as string[]) : [],
        }}
        id={id}
        isEdit
      />
    </div>
  );
}
