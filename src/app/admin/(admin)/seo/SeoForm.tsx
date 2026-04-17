"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, CheckCircle, AlertCircle } from "lucide-react";
import { saveSeo } from "@/lib/actions/seo";
import type { PageSeo } from "@/types";

const schema = z.object({
  pageKey: z.string(),
  title: z.string().min(5).max(70),
  description: z.string().min(10).max(160),
  ogTitle: z.string().max(70).optional().or(z.literal("")),
  ogDesc: z.string().max(160).optional().or(z.literal("")),
  noIndex: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function SeoForm({ page }: { page: PageSeo }) {
  const [serverError, setServerError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pageKey: page.pageKey,
      title: page.title,
      description: page.description,
      ogTitle: page.ogTitle ?? "",
      ogDesc: page.ogDesc ?? "",
      noIndex: page.noIndex,
    },
  });

  const title = watch("title") ?? "";
  const desc = watch("description") ?? "";

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    setSaved(false);
    const res = await saveSeo(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const labelClass = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="flex items-center gap-2 p-2 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs">
          <AlertCircle className="w-3.5 h-3.5" />{serverError}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 p-2 border border-green-500/30 bg-green-500/10 text-green-400 font-mono text-xs">
          <CheckCircle className="w-3.5 h-3.5" />Salvo!
        </div>
      )}

      <input type="hidden" {...register("pageKey")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Título SEO * <span className={title.length > 60 ? "text-yellow-500" : "text-text-muted"}>({title.length}/70)</span></label>
          <input {...register("title")} className={inputClass} maxLength={70} />
          {errors.title && <p className="text-xs font-mono text-red-400 mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Descrição * <span className={desc.length > 145 ? "text-yellow-500" : "text-text-muted"}>({desc.length}/160)</span></label>
          <textarea {...register("description")} className={`${inputClass} resize-none`} rows={3} maxLength={160} />
          {errors.description && <p className="text-xs font-mono text-red-400 mt-1">{errors.description.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>OG Title <span className="text-text-muted">(opcional)</span></label>
          <input {...register("ogTitle")} className={inputClass} placeholder="Deixe vazio para usar o título SEO" maxLength={70} />
        </div>
        <div>
          <label className={labelClass}>OG Description <span className="text-text-muted">(opcional)</span></label>
          <input {...register("ogDesc")} className={inputClass} placeholder="Deixe vazio para usar a descrição SEO" maxLength={160} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register("noIndex")} className="accent-neon" />
          <span className="font-mono text-xs text-text-secondary">noIndex (impede indexação desta página)</span>
        </label>
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-1.5 bg-neon/10 border border-neon/40 text-neon font-mono text-xs hover:bg-neon/20 transition-colors disabled:opacity-50">
          <Save className="w-3.5 h-3.5" />{saving ? "SALVANDO..." : "SALVAR"}
        </button>
      </div>
    </form>
  );
}
