"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, AlertCircle } from "lucide-react";
import { updateCourseInfo } from "@/lib/actions/courseInfo";

const schema = z.object({
  tagline: z.string(),
  heroTitle: z.string(),
  heroHighlight: z.string(),
  description1: z.string(),
  description2: z.string(),
  description3: z.string(),
  hoursLabel: z.string(),
  hoursDescription: z.string(),
  groupLabel: z.string(),
  groupDescription: z.string(),
  certificateLabel: z.string(),
  certificateDescription: z.string(),
  instructor: z.string(),
  ctaUrl: z.string().url("URL inválida"),
  ctaLabel: z.string(),
  priceLabel: z.string(),
  priceValue: z.string(),
  priceOriginal: z.string(),
  priceSuffix: z.string(),
});
type FormData = z.infer<typeof schema>;

interface Props {
  course: FormData;
}

export function CourseInfoForm({ course }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: course,
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = await updateCourseInfo(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      {serverError && <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs"><AlertCircle className="w-4 h-4 shrink-0" />{serverError}</div>}

      <fieldset className="border border-border p-4 space-y-4">
        <legend className="px-2 font-mono text-[10px] text-neon uppercase tracking-widest">Hero</legend>
        <div>
          <label className={lbl}>Tagline</label>
          <input {...register("tagline")} className={inp} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Título do Hero</label>
            <input {...register("heroTitle")} className={inp} />
          </div>
          <div>
            <label className={lbl}>Destaque (em verde)</label>
            <input {...register("heroHighlight")} className={inp} />
          </div>
        </div>
        <div>
          <label className={lbl}>Descrição 1</label>
          <textarea {...register("description1")} className={`${inp} resize-none`} rows={3} />
        </div>
        <div>
          <label className={lbl}>Descrição 2</label>
          <textarea {...register("description2")} className={`${inp} resize-none`} rows={3} />
        </div>
        <div>
          <label className={lbl}>Descrição 3</label>
          <textarea {...register("description3")} className={`${inp} resize-none`} rows={3} />
        </div>
        <div>
          <label className={lbl}>Instrutor</label>
          <input {...register("instructor")} className={inp} />
        </div>
      </fieldset>

      <fieldset className="border border-border p-4 space-y-4">
        <legend className="px-2 font-mono text-[10px] text-neon uppercase tracking-widest">Destaques (cards)</legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Horas — Valor</label>
            <input {...register("hoursLabel")} className={inp} />
          </div>
          <div>
            <label className={lbl}>Horas — Descrição</label>
            <input {...register("hoursDescription")} className={inp} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Turma — Valor</label>
            <input {...register("groupLabel")} className={inp} />
          </div>
          <div>
            <label className={lbl}>Turma — Descrição</label>
            <input {...register("groupDescription")} className={inp} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Certificado — Valor</label>
            <input {...register("certificateLabel")} className={inp} />
          </div>
          <div>
            <label className={lbl}>Certificado — Descrição</label>
            <input {...register("certificateDescription")} className={inp} />
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-border p-4 space-y-4">
        <legend className="px-2 font-mono text-[10px] text-neon uppercase tracking-widest">CTA / Preço</legend>
        <div>
          <label className={lbl}>URL do CTA (Hotmart) *</label>
          <input {...register("ctaUrl")} className={inp} placeholder="https://" />
          {errors.ctaUrl && <p className={err}>{errors.ctaUrl.message}</p>}
        </div>
        <div>
          <label className={lbl}>Texto do CTA</label>
          <input {...register("ctaLabel")} className={inp} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Preço — Rótulo</label>
            <input {...register("priceLabel")} className={inp} />
          </div>
          <div>
            <label className={lbl}>Preço — Sufixo</label>
            <input {...register("priceSuffix")} className={inp} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Preço — Valor</label>
            <input {...register("priceValue")} className={inp} />
          </div>
          <div>
            <label className={lbl}>Preço — Original (riscado)</label>
            <input {...register("priceOriginal")} className={inp} />
          </div>
        </div>
      </fieldset>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}
        </button>
      </div>
    </form>
  );
}
