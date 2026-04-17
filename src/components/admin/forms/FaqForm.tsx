"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createFaq, updateFaq, deleteFaq } from "@/lib/actions/faq";
import type { Faq } from "@/types";

const schema = z.object({
  question: z.string().min(5, "Pergunta muito curta"),
  answer: z.string().min(5, "Resposta muito curta"),
  category: z.string().min(1),
  displayOrder: z.number().int().min(0),
  published: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface Props { faq?: Faq; id?: string; isEdit?: boolean }

export function FaqForm({ faq, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
      category: faq?.category ?? "general",
      displayOrder: faq?.displayOrder ?? 0,
      published: faq?.published ?? true,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    const res = isEdit && id ? await updateFaq(id, data) : await createFaq(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro ao salvar"); return; }
    router.push("/admin/faq");
    router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir esta FAQ?")) return;
    await deleteFaq(id);
  }

  const labelClass = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inputClass = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const errorClass = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && (
        <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />{serverError}
        </div>
      )}

      <div>
        <label className={labelClass}>Pergunta *</label>
        <input {...register("question")} className={inputClass} />
        {errors.question && <p className={errorClass}>{errors.question.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Resposta *</label>
        <textarea {...register("answer")} className={`${inputClass} resize-none`} rows={6} />
        {errors.answer && <p className={errorClass}>{errors.answer.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Categoria</label>
          <select {...register("category")} className={inputClass}>
            <option value="general">Geral</option>
            <option value="osint">OSINT</option>
            <option value="forense">Forense</option>
            <option value="cti">CTI</option>
            <option value="curso">Curso</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Ordem</label>
          <input type="number" {...register("displayOrder", { valueAsNumber: true })} className={inputClass} min={0} />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" {...register("published")} className="accent-neon" />
        <span className="font-mono text-xs text-text-secondary">Publicado</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-border text-text-muted font-mono text-sm hover:text-neon transition-colors">CANCELAR</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />EXCLUIR
          </button>
        )}
      </div>
    </form>
  );
}
