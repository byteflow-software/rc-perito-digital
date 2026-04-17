import { getSettings } from "@/lib/actions/settings";
import { SettingsForm } from "./SettingsForm";

export default async function AdminConfiguracoesPage() {
  const config = await getSettings();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Configurações</h1>
        <p className="text-text-muted text-xs font-mono mt-1">Configurações globais do site</p>
      </div>
      <SettingsForm config={config} />
    </div>
  );
}
