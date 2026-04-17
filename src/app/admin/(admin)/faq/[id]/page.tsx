import { notFound } from "next/navigation";
import { getFaq } from "@/lib/actions/faq";
import { FaqForm } from "@/components/admin/forms/FaqForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminFaqEditPage({ params }: Props) {
  const { id } = await params;
  const faq = await getFaq(id);
  if (!faq) notFound();

  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Editar FAQ
      </h1>
      <FaqForm faq={faq} id={id} isEdit />
    </div>
  );
}
