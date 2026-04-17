import { FaqForm } from "@/components/admin/forms/FaqForm";

export default function AdminFaqNovoPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-8">
        <span className="text-neon">&gt;</span> Nova FAQ
      </h1>
      <FaqForm />
    </div>
  );
}
