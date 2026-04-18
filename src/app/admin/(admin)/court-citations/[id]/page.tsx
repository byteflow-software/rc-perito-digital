import { notFound } from "next/navigation";
import { getCourtCitation } from "@/lib/actions/courtCitations";
import { CourtCitationForm } from "@/components/admin/forms/CourtCitationForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminCourtCitationEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getCourtCitation(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Citação</h1>
      <CourtCitationForm item={item} id={id} isEdit />
    </div>
  );
}
