import { MissionValueForm } from "@/components/admin/forms/MissionValueForm";

export default function AdminMissionValueNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Valor</h1>
      <MissionValueForm />
    </div>
  );
}
