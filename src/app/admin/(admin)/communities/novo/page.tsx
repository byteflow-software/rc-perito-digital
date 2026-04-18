import { CommunityForm } from "@/components/admin/forms/CommunityForm";

export default function AdminCommunityNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Nova Comunidade</h1>
      <CommunityForm />
    </div>
  );
}
