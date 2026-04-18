import { notFound } from "next/navigation";
import { getVideoFeature } from "@/lib/actions/videoFeatures";
import { VideoFeatureForm } from "@/components/admin/forms/VideoFeatureForm";

interface Props { params: Promise<{ id: string }> }

export default async function AdminVideoFeatureEditPage({ params }: Props) {
  const { id } = await params;
  const item = await getVideoFeature(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Editar Vídeo</h1>
      <VideoFeatureForm item={item} id={id} isEdit />
    </div>
  );
}
