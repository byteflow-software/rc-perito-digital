import { getAboutContent } from "@/lib/actions/aboutContent";
import { AboutContentForm } from "@/components/admin/forms/AboutContentForm";

export default async function AdminAboutContentPage() {
  const about = await getAboutContent();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-2"><span className="text-neon">&gt;</span> Conteúdo da Página Sobre</h1>
      <p className="text-text-muted text-xs font-mono mb-8">Edita textos e foto do perfil na página /sobre.</p>
      <AboutContentForm about={about} />
    </div>
  );
}
