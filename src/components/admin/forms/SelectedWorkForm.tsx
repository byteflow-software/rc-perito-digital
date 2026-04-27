"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createSelectedWork, updateSelectedWork, deleteSelectedWork } from "@/lib/actions/selectedWorks";
import { PdfUpload } from "@/components/admin/pdf-upload";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  type: z.string(),
  author: z.string(),
  url: z.string().url("URL inválida"),
  previewUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;
interface Props { item?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function SelectedWorkForm({ item, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title ?? "",
      description: item?.description ?? "",
      type: item?.type ?? "Documento",
      author: item?.author ?? "",
      url: item?.url ?? "",
      previewUrl: item?.previewUrl ?? "",
      displayOrder: item?.displayOrder ?? 0,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const payload = { ...data, previewUrl: data.previewUrl || undefined };
    const res = isEdit && id ? await updateSelectedWork(id, payload) : await createSelectedWork(payload);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.push("/admin/selected-works"); router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este trabalho?")) return;
    await deleteSelectedWork(id);
    router.push("/admin/selected-works"); router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs"><AlertCircle className="w-4 h-4 shrink-0" />{serverError}</div>}
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Tipo</label>
          <input {...register("type")} className={inp} placeholder="Ex: Artigo, Monografia, Documento" />
        </div>
        <div>
          <label className={lbl}>Autor</label>
          <input {...register("author")} className={inp} />
        </div>
      </div>
      <div>
        <label className={lbl}>URL do Documento / PDF *</label>
        <input {...register("url")} className={inp} placeholder="https:// ou faça upload abaixo" />
        {errors.url && <p className={err}>{errors.url.message}</p>}
        <div className="mt-2">
          <PdfUpload
            value={watch("url") || null}
            onChange={(url) => setValue("url", url ?? "", { shouldValidate: true })}
            bucket="selected-works"
          />
        </div>
      </div>
      <div>
        <label className={lbl}>URL de Preview (opcional)</label>
        <input {...register("previewUrl")} className={inp} placeholder="https://" />
        {errors.previewUrl && <p className={err}>{errors.previewUrl.message}</p>}
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
