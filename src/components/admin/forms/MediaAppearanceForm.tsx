"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createMediaAppearance, updateMediaAppearance, deleteMediaAppearance } from "@/lib/actions/mediaAppearances";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  source: z.string().min(1, "Fonte obrigatória"),
  url: z.string().url("URL inválida"),
  type: z.enum(["TV", "ARTICLE", "INTERVIEW", "PODCAST", "PRESENTATION"]),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;
interface Props { item?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function MediaAppearanceForm({ item, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title ?? "",
      source: item?.source ?? "",
      url: item?.url ?? "",
      type: item?.type ?? "TV",
      displayOrder: item?.displayOrder ?? 0,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = isEdit && id ? await updateMediaAppearance(id, data) : await createMediaAppearance(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.push("/admin/media"); router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir esta aparição?")) return;
    await deleteMediaAppearance(id);
    router.push("/admin/media"); router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  const typeLabels: Record<string, string> = {
    TV: "TV",
    ARTICLE: "Artigo",
    INTERVIEW: "Entrevista",
    PODCAST: "Podcast",
    PRESENTATION: "Apresentação",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs"><AlertCircle className="w-4 h-4 shrink-0" />{serverError}</div>}
      <div>
        <label className={lbl}>Título *</label>
        <input {...register("title")} className={inp} />
        {errors.title && <p className={err}>{errors.title.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Fonte / Veículo *</label>
          <input {...register("source")} className={inp} placeholder="Ex: TV Globo, G1" />
          {errors.source && <p className={err}>{errors.source.message}</p>}
        </div>
        <div>
          <label className={lbl}>Tipo</label>
          <select {...register("type")} className={inp}>
            {Object.entries(typeLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={lbl}>URL *</label>
        <input {...register("url")} className={inp} placeholder="https://" />
        {errors.url && <p className={err}>{errors.url.message}</p>}
      </div>
      <div>
        <label className={lbl}>Ordem</label>
        <input type="number" {...register("displayOrder", { valueAsNumber: true })} className={inp} min={0} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50"><Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}</button>
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-border text-text-muted font-mono text-sm hover:text-neon transition-colors">CANCELAR</button>
        {isEdit && <button type="button" onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" />EXCLUIR</button>}
      </div>
    </form>
  );
}
