import { notFound } from "next/navigation";
import { getCourseModule } from "@/lib/actions/courseModules";
import { CourseModuleForm } from "@/components/admin/forms/CourseModuleForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminCourseModuleEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getCourseModule(id);
  if (!item) notFound();
  const topics = Array.isArray(item.topics) ? (item.topics as string[]) : [];
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Módulo</h1>
      <CourseModuleForm module={{ ...item, topics }} id={id} isEdit />
    </div>
  );
}
