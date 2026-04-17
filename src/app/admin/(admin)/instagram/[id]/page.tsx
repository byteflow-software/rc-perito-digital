import { notFound } from "next/navigation";
import { getInstagram } from "@/lib/actions/instagram";
import { InstagramForm } from "@/components/admin/forms/InstagramForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminInstagramEditPage({ params }: Props) {
  const { id } = await params;
  const post = await getInstagram(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Editar Post Instagram
      </h1>
      <InstagramForm post={{ ...post, categoryTags: post.categoryTags as string[] }} id={id} isEdit />
    </div>
  );
}
