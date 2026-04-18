import { notFound } from "next/navigation";
import { getMilestone } from "@/lib/actions/milestones";
import { MilestoneForm } from "@/components/admin/forms/MilestoneForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminMilestoneEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getMilestone(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Marco</h1>
      <MilestoneForm item={item} id={id} isEdit />
    </div>
  );
}
