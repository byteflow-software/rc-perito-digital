import { PresentationForm } from "@/components/admin/forms/PresentationForm";

export default function AdminPresentationNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Nova Apresentação</h1>
      <PresentationForm />
    </div>
  );
}
