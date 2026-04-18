import { notFound } from "next/navigation";
import { getMissionValue } from "@/lib/actions/missionValues";
import { MissionValueForm } from "@/components/admin/forms/MissionValueForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminMissionValueEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getMissionValue(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Valor</h1>
      <MissionValueForm item={item} id={id} isEdit />
    </div>
  );
}
