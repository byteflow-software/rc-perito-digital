"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createMilestone, updateMilestone, deleteMilestone } from "@/lib/actions/milestones";

const schema = z.object({
  year: z.string().min(1, "Ano obrigatório"),
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;
interface Props { item?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function MilestoneForm({ item, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      year: item?.year ?? "",
      title: item?.title ?? "",
      description: item?.description ?? "",
      displayOrder: item?.displayOrder ?? 0,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = isEdit && id ? await updateMilestone(id, data) : await createMilestone(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.push("/admin/milestones"); router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este marco?")) return;
    await deleteMilestone(id);
    router.push("/admin/milestones"); router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs"><AlertCircle className="w-4 h-4 shrink-0" />{serverError}</div>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Ano *</label>
          <input {...register("year")} className={inp} placeholder="2024" />
          {errors.year && <p className={err}>{errors.year.message}</p>}
        </div>
        <div>
          <label className={lbl}>Ordem</label>
          <input type="number" {...register("displayOrder", { valueAsNumber: true })} className={inp} min={0} />
        </div>
      </div>
      <div>
        <label className={lbl}>Título *</label>
        <input {...register("title")} className={inp} />
        {errors.title && <p className={err}>{errors.title.message}</p>}
      </div>
      <div>
        <label className={lbl}>Descrição *</label>
        <textarea {...register("description")} className={`${inp} resize-none`} rows={3} />
        {errors.description && <p className={err}>{errors.description.message}</p>}
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50"><Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}</button>
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-border text-text-muted font-mono text-sm hover:text-neon transition-colors">CANCELAR</button>
        {isEdit && <button type="button" onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" />EXCLUIR</button>}
      </div>
    </form>
  );
}
