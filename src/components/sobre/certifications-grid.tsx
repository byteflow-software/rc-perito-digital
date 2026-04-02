import { Award } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

const certGroups = [
  {
    area: "Investigação & OSINT",
    certs: [
      "Cyberwarfare (ESA OAB-SP)",
      "Threat Intelligence Starter (AFD)",
      "Google Hacking Basics (XPSEC)",
      "Inteligência Cibernética OSINT (Daryus)",
      "Inteligência Cibernética e Contrainteligência (Daryus)",
      "Crimes Cibernéticos",
    ],
  },
  {
    area: "Cybersecurity",
    certs: [
      "CNSE (Certified Network Security Expert)",
      "CSAE (Certified Security Architecture Expert)",
      "Cybersecurity Fundamentals (IBSEC)",
      "Cybersecurity Analyst (IBSEC)",
      "Axonius Technical Certifications",
    ],
  },
  {
    area: "Compliance & Gestão",
    certs: [
      "LGPD Fundamentals",
      "Combate à Fraude (CAF Academy)",
      "Fraudes e Investigação Corporativa (Gloobal)",
      "White Belt (EDTI)",
    ],
  },
];

export function CertificationsGrid() {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>CERTIFICAÇÕES E FORMAÇÃO</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certGroups.map((group) => (
            <div key={group.area} className="border border-border p-5">
              <h3 className="font-mono text-xs text-neon uppercase tracking-wider mb-4">
                {group.area}
              </h3>
              <ul className="space-y-2">
                {group.certs.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-xs text-text-secondary">
                    <Award className="w-3 h-3 text-neon shrink-0 mt-0.5" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
