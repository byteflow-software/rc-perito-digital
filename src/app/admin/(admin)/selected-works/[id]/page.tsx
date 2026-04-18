import { notFound } from "next/navigation";
import { getSelectedWork } from "@/lib/actions/selectedWorks";
import { SelectedWorkForm } from "@/components/admin/forms/SelectedWorkForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminSelectedWorkEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getSelectedWork(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Trabalho</h1>
      <SelectedWorkForm item={{ ...item, previewUrl: item.previewUrl ?? undefined }} id={id} isEdit />
    </div>
  );
}
