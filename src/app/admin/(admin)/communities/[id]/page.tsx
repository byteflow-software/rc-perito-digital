import { notFound } from "next/navigation";
import { getCommunity } from "@/lib/actions/communities";
import { CommunityForm } from "@/components/admin/forms/CommunityForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminCommunityEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getCommunity(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Comunidade</h1>
      <CommunityForm item={{ ...item, url: item.url ?? undefined }} id={id} isEdit />
    </div>
  );
}
