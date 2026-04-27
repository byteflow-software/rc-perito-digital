import { CourseModuleForm } from "@/components/admin/forms/CourseModuleForm";

export default function AdminCourseModuleNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Módulo</h1>
      <CourseModuleForm />
    </div>
  );
}
