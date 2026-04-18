import { CourtCitationForm } from "@/components/admin/forms/CourtCitationForm";

export default function AdminCourtCitationNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Nova Citação de Tribunal</h1>
      <CourtCitationForm />
    </div>
  );
}
