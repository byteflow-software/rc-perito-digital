import { VideoFeatureForm } from "@/components/admin/forms/VideoFeatureForm";

export default function AdminVideoFeatureNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Vídeo em Destaque</h1>
      <VideoFeatureForm />
    </div>
  );
}
