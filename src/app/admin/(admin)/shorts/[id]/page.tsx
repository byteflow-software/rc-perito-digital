import { notFound } from "next/navigation";
import { getShort } from "@/lib/actions/shorts";
import { ShortForm } from "@/components/admin/forms/ShortForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminShortEditPage({ params }: Props) {
  const { id } = await params;
  const short = await getShort(id);
  if (!short) notFound();

  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Editar Short
      </h1>
      <ShortForm short={{ ...short, categoryTags: short.categoryTags as string[] }} id={id} isEdit />
    </div>
  );
}
