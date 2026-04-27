import { CourseLearningForm } from "@/components/admin/forms/CourseLearningForm";

export default function AdminCourseLearningNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Aprendizado</h1>
      <CourseLearningForm />
    </div>
  );
}
