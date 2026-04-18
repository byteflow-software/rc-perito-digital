import { PartnerForm } from "@/components/admin/forms/PartnerForm";

export default function AdminPartnerNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Parceiro</h1>
      <PartnerForm />
    </div>
  );
}
