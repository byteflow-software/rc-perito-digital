import { LanguageForm } from "@/components/admin/forms/LanguageForm";

export default function AdminLanguageNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8"><span className="text-neon">&gt;</span> Novo Idioma</h1>
      <LanguageForm />
    </div>
  );
}
