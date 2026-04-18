import { notFound } from "next/navigation";
import { getPartner } from "@/lib/actions/partners";
import { PartnerForm } from "@/components/admin/forms/PartnerForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminPartnerEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getPartner(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Parceiro</h1>
      <PartnerForm partner={{ ...item, logoUrl: item.logoUrl ?? undefined, url: item.url ?? undefined }} id={id} isEdit />
    </div>
  );
}
