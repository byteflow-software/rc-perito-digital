import { notFound } from "next/navigation";
import { getCourseBonus } from "@/lib/actions/courseBonuses";
import { CourseBonusForm } from "@/components/admin/forms/CourseBonusForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminCourseBonusEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getCourseBonus(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Bônus</h1>
      <CourseBonusForm bonus={item} id={id} isEdit />
    </div>
  );
}
