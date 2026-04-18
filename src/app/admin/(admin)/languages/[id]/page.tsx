import { notFound } from "next/navigation";
import { getLanguage } from "@/lib/actions/languages";
import { LanguageForm } from "@/components/admin/forms/LanguageForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminLanguageEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getLanguage(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Idioma</h1>
      <LanguageForm item={item} id={id} isEdit />
    </div>
  );
}
