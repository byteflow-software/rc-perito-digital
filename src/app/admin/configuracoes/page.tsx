"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/admin/tag-input";
import { ImageUpload } from "@/components/admin/image-upload";
import { Toggle } from "@/components/ui/toggle";

export default function AdminConfiguracoesPage() {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"seo" | "social" | "geral">("seo");

  const [seo, setSeo] = useState({
    siteTitle: "RC Perito Digital",
    metaDescription: "Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI.",
    primaryKeywords: ["forense digital", "osint", "perito digital", "cti", "ciberseguranca"],
    googleAnalyticsId: "",
  });

  const [social, setSocial] = useState({
    linkedin: "https://linkedin.com/in/romullocarvalho",
    instagram: "https://instagram.com/romullo_carvalho",
    youtube: "https://youtube.com/c/RomulloCarvalho",
    x: "https://x.com/romullo_c",
    facebook: "https://facebook.com/romullo.carvalho",
  });

  const [geral, setGeral] = useState({
    logoUrl: null as string | null,
    faviconUrl: null as string | null,
    contactEmail: "contato@rcperitodigital.com.br",
    timezone: "America/Fortaleza",
    maintenanceMode: false,
  });

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...seo,
          socialLinks: social,
          ...geral,
          googleAnalyticsId: seo.googleAnalyticsId || null,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Configurações salvas");
    } catch {
      toast.error("Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { key: "seo" as const, label: "SEO" },
    { key: "social" as const, label: "Social" },
    { key: "geral" as const, label: "Geral" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary">
            <span className="text-neon">&gt;</span> Configurações
          </h1>
          <p className="text-text-muted text-xs font-mono mt-1">Configurações do site</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} terminal>
          {saving ? "SALVANDO..." : "SALVAR"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "text-neon border-neon"
                : "text-text-muted border-transparent hover:text-text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Título do site</label>
              <Input value={seo.siteTitle} onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Meta descrição</label>
              <Textarea value={seo.metaDescription} onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Keywords primárias</label>
              <TagInput tags={seo.primaryKeywords} onChange={(tags) => setSeo({ ...seo, primaryKeywords: tags })} />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Google Analytics ID</label>
              <Input value={seo.googleAnalyticsId} onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })} placeholder="G-XXXXXXXXXX" />
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === "social" && (
          <div className="space-y-6">
            {Object.entries(social).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">{key}</label>
                <Input
                  value={value}
                  onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
                  placeholder={`URL do ${key}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Geral Tab */}
        {activeTab === "geral" && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Logo</label>
              <ImageUpload value={geral.logoUrl} onChange={(url) => setGeral({ ...geral, logoUrl: url })} bucket="logos" aspectRatio="aspect-[3/1]" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Favicon</label>
              <ImageUpload value={geral.faviconUrl} onChange={(url) => setGeral({ ...geral, faviconUrl: url })} bucket="logos" aspectRatio="aspect-square" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Email de contato</label>
              <Input value={geral.contactEmail} onChange={(e) => setGeral({ ...geral, contactEmail: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Timezone</label>
              <Input value={geral.timezone} onChange={(e) => setGeral({ ...geral, timezone: e.target.value })} />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Toggle checked={geral.maintenanceMode} onChange={(v) => setGeral({ ...geral, maintenanceMode: v })} />
              <label className="text-xs font-mono text-text-secondary">Modo manutenção</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
