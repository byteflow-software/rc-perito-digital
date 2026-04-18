import { SelectedWorkForm } from "@/components/admin/forms/SelectedWorkForm";

export default function AdminSelectedWorkNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Trabalho Selecionado</h1>
      <SelectedWorkForm />
    </div>
  );
}
