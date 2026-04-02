import { Shield, Lock, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

const values = [
  {
    icon: Shield,
    title: "Verdade Digital",
    description: "Compromisso com a verdade dos fatos digitais, fundamentado em metodologias rigorosas de investigação e análise forense.",
  },
  {
    icon: Lock,
    title: "Ética e Segurança",
    description: "Atuação pautada pela ética profissional e respeito à legislação de segurança, com compromisso com a privacidade e LGPD.",
  },
  {
    icon: Cpu,
    title: "Inovação Contínua",
    description: "Busca constante por novas tecnologias, ferramentas e metodologias para aprimorar a investigação digital e a cibersegurança.",
  },
];

export function MissionValues() {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>MISSÃO E VALORES</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <Card key={v.title} hover>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-neon/30 bg-neon/5">
                  <v.icon className="w-6 h-6 text-neon" />
                </div>
                <h3 className="font-mono text-sm font-bold text-text-primary mb-2">{v.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{v.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
