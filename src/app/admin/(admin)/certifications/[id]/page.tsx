import { notFound } from "next/navigation";
import { getCertification } from "@/lib/actions/certifications";
import { CertificationForm } from "@/components/admin/forms/CertificationForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminCertificationEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getCertification(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Certificação</h1>
      <CertificationForm item={{ ...item, issuer: item.issuer ?? undefined }} id={id} isEdit />
    </div>
  );
}
