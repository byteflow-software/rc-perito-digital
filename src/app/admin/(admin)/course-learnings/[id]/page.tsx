import { notFound } from "next/navigation";
import { getCourseLearning } from "@/lib/actions/courseLearnings";
import { CourseLearningForm } from "@/components/admin/forms/CourseLearningForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminCourseLearningEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getCourseLearning(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Aprendizado</h1>
      <CourseLearningForm learning={item} id={id} isEdit />
    </div>
  );
}
