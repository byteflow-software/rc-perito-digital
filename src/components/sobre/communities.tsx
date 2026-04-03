import { Users } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";

const orgs = [
  { name: "APECOF", role: "Diretor de Comunicação", desc: "Associação Nacional dos Peritos em Computação Forense" },
  { name: "COBRA", role: "Fundador", desc: "Comunidade de OSINT Brasileira" },
  { name: "#semanaOSINT", role: "Organizador", desc: "Série de eventos e vídeos educacionais sobre OSINT" },
  { name: "Criminal Player", role: "Expert", desc: "Comunidade de profissionais de investigação e forense" },
  { name: "Verifact", role: "Membro", desc: "Plataforma de captura e preservação de provas digitais" },
  { name: "Search Perícia Digital", role: "Membro", desc: "Rede de peritos digitais" },
  { name: "ONG Marias da Internet", role: "Perito Voluntário", desc: "Segurança digital para mulheres" },
  { name: "Projeto Justiceiras", role: "Perito Voluntário", desc: "Combate à violência contra a mulher" },
];

export function Communities() {
  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>COMUNIDADES E VOLUNTARIADO</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orgs.map((org) => (
            <Card key={org.name} hover>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-neon/30 bg-neon/5">
                  <Users className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold text-text-primary">{org.name}</h3>
                  <p className="text-neon text-[10px] font-mono uppercase">{org.role}</p>
                  <p className="text-text-muted text-[11px] mt-1">{org.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
