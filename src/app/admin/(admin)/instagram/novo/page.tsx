import { InstagramForm } from "@/components/admin/forms/InstagramForm";

export default function AdminInstagramNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Novo Post Instagram
      </h1>
      <InstagramForm />
    </div>
  );
}
