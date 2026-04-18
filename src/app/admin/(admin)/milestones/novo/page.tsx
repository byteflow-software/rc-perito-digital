import { MilestoneForm } from "@/components/admin/forms/MilestoneForm";

export default function AdminMilestoneNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Marco</h1>
      <MilestoneForm />
    </div>
  );
}
