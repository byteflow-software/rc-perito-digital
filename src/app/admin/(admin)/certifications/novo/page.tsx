import { CertificationForm } from "@/components/admin/forms/CertificationForm";

export default function AdminCertificationNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Nova Certificação</h1>
      <CertificationForm />
    </div>
  );
}
