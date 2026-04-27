import { getCourseInfo } from "@/lib/actions/courseInfo";
import { CourseInfoForm } from "@/components/admin/forms/CourseInfoForm";

export default async function AdminCursoPage() {
  const course = await getCourseInfo();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-2"><span className="text-neon">&gt;</span> Curso OSINT</h1>
      <p className="text-text-muted text-xs font-mono mb-8">Edita os dados gerais da landing page do curso.</p>
      <CourseInfoForm course={course} />
    </div>
  );
}
