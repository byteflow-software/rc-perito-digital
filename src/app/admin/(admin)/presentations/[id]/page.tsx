import { notFound } from "next/navigation";
import { getPresentation } from "@/lib/actions/presentations";
import { PresentationForm } from "@/components/admin/forms/PresentationForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminPresentationEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getPresentation(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Apresentação</h1>
      <PresentationForm item={{ ...item, url: item.url ?? undefined }} id={id} isEdit />
    </div>
  );
}
