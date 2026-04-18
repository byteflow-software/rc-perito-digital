"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createLanguage, updateLanguage, deleteLanguage } from "@/lib/actions/languages";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  level: z.string().min(1, "Nível obrigatório"),
  skills: z.string(),
  percentage: z.number().int().min(0).max(100),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;
interface Props { item?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function LanguageForm({ item, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name ?? "",
      level: item?.level ?? "",
      skills: item?.skills ?? "",
      percentage: item?.percentage ?? 0,
      displayOrder: item?.displayOrder ?? 0,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = isEdit && id ? await updateLanguage(id, data) : await createLanguage(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.push("/admin/languages"); router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este idioma?")) return;
    await deleteLanguage(id);
    router.push("/admin/languages"); router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs"><AlertCircle className="w-4 h-4 shrink-0" />{serverError}</div>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Idioma *</label>
          <input {...register("name")} className={inp} placeholder="Ex: Português" />
          {errors.name && <p className={err}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={lbl}>Nível *</label>
          <input {...register("level")} className={inp} placeholder="Ex: Nativo, Avançado" />
          {errors.level && <p className={err}>{errors.level.message}</p>}
        </div>
      </div>
      <div>
        <label className={lbl}>Habilidades (separadas por vírgula)</label>
        <input {...register("skills")} className={inp} placeholder="Ex: Leitura, Escrita, Fala" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Percentual (0-100)</label>
          <input type="number" {...register("percentage", { valueAsNumber: true })} className={inp} min={0} max={100} />
          {errors.percentage && <p className={err}>{errors.percentage.message}</p>}
        </div>
        <div>
          <label className={lbl}>Ordem</label>
          <input type="number" {...register("displayOrder", { valueAsNumber: true })} className={inp} min={0} />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50"><Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}</button>
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-border text-text-muted font-mono text-sm hover:text-neon transition-colors">CANCELAR</button>
        {isEdit && <button type="button" onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" />EXCLUIR</button>}
      </div>
    </form>
  );
}
