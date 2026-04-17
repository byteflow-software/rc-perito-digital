"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, CheckCircle, AlertCircle, X } from "lucide-react";
import { saveSettings } from "@/lib/actions/settings";
import type { SiteConfig } from "@/types";

const schema = z.object({
  siteTitle: z.string().min(1),
  metaDescription: z.string(),
  primaryKeywords: z.array(z.string()),
  googleAnalyticsId: z.string().optional().or(z.literal("")),
  contactEmail: z.string().optional().or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
  timezone: z.string(),
  maintenanceMode: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function SettingsForm({ config }: { config: SiteConfig | null }) {
  const [serverError, setServerError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [kwInput, setKwInput] = useState("");

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      siteTitle: config?.siteTitle ?? "RC Perito Digital",
      metaDescription: config?.metaDescription ?? "",
      primaryKeywords: config?.primaryKeywords ?? [],
      googleAnalyticsId: config?.googleAnalyticsId ?? "",
      contactEmail: config?.contactEmail ?? "",
      whatsapp: config?.whatsapp ?? "",
      timezone: config?.timezone ?? "America/Fortaleza",
      maintenanceMode: config?.maintenanceMode ?? false,
    },
  });

  const keywords = watch("primaryKeywords") ?? [];

  function addKw(kw: string) {
    const trimmed = kw.trim();
    if (!trimmed || keywords.includes(trimmed)) return;
    setValue("primaryKeywords", [...keywords, trimmed]);
    setKwInput("");
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    setSaved(false);
    const res = await saveSettings(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const labelClass = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      {serverError && (
        <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs">
          <AlertCircle className="w-4 h-4" />{serverError}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 p-3 border border-green-500/30 bg-green-500/10 text-green-400 font-mono text-xs">
          <CheckCircle className="w-4 h-4" />Configurações salvas!
        </div>
      )}

      <div className="border border-border p-4 space-y-4">
        <p className="font-mono text-xs text-neon uppercase tracking-widest">Identidade</p>
        <div>
          <label className={labelClass}>Nome do Site</label>
          <input {...register("siteTitle")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Descrição padrão</label>
          <textarea {...register("metaDescription")} className={`${inputClass} resize-none`} rows={3} />
        </div>
        <div>
          <label className={labelClass}>Keywords principais</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {keywords.map((kw) => (
              <span key={kw} className="flex items-center gap-1 px-2 py-0.5 bg-bg-primary border border-border font-mono text-[10px] text-text-muted">
                {kw}
                <button type="button" onClick={() => setValue("primaryKeywords", keywords.filter(k => k !== kw))}><X className="w-2.5 h-2.5" /></button>
              </span>
            ))}
          </div>
          <input type="text" value={kwInput} onChange={(e) => setKwInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addKw(kwInput); } }}
            className={inputClass} placeholder="Keyword + Enter" />
        </div>
      </div>

      <div className="border border-border p-4 space-y-4">
        <p className="font-mono text-xs text-neon uppercase tracking-widest">Contato</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email de contato</label>
            <input {...register("contactEmail")} type="email" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp (com DDI)</label>
            <input {...register("whatsapp")} className={inputClass} placeholder="5585988405936" />
          </div>
        </div>
      </div>

      <div className="border border-border p-4 space-y-4">
        <p className="font-mono text-xs text-neon uppercase tracking-widest">Analytics</p>
        <div>
          <label className={labelClass}>Google Analytics ID</label>
          <input {...register("googleAnalyticsId")} className={inputClass} placeholder="G-XXXXXXXXXX" />
        </div>
      </div>

      <div className="border border-border p-4 space-y-4">
        <p className="font-mono text-xs text-neon uppercase tracking-widest">Sistema</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className={labelClass}>Timezone</label>
            <input {...register("timezone")} className={inputClass} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer mt-5">
            <input type="checkbox" {...register("maintenanceMode")} className="accent-neon" />
            <span className="font-mono text-xs text-text-secondary">Modo de manutenção</span>
          </label>
        </div>
      </div>

      <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50">
        <Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR CONFIGURAÇÕES"}
      </button>
    </form>
  );
}
