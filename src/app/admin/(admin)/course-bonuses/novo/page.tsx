import { CourseBonusForm } from "@/components/admin/forms/CourseBonusForm";

export default function AdminCourseBonusNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Bônus</h1>
      <CourseBonusForm />
    </div>
  );
}
