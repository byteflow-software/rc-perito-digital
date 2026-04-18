import { getHeroContent } from "@/lib/actions/heroContent";
import { HeroContentForm } from "@/components/admin/forms/HeroContentForm";

export default async function AdminHeroPage() {
  const hero = await getHeroContent();
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-2"><span className="text-neon">&gt;</span> Conteúdo do Hero</h1>
      <p className="text-text-muted text-xs font-mono mb-8">Edita o conteúdo da seção principal da home page.</p>
      <HeroContentForm hero={hero} />
    </div>
  );
}
