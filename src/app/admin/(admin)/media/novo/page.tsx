import { MediaAppearanceForm } from "@/components/admin/forms/MediaAppearanceForm";

export default function AdminMediaNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Nova Aparição na Mídia</h1>
      <MediaAppearanceForm />
    </div>
  );
}
