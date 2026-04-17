import { ShortForm } from "@/components/admin/forms/ShortForm";

export default function AdminShortsNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Novo Short
      </h1>
      <ShortForm />
    </div>
  );
}
