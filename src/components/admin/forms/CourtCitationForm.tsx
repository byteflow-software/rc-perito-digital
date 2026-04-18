"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createCourtCitation, updateCourtCitation, deleteCourtCitation } from "@/lib/actions/courtCitations";

const schema = z.object({
  court: z.enum(["STJ", "STF", "TST", "TSE", "OUTRO"]),
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  documentUrl: z.string().url("URL inválida"),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;
interface Props { item?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function CourtCitationForm({ item, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      court: item?.court ?? "STJ",
      title: item?.title ?? "",
      description: item?.description ?? "",
      documentUrl: item?.documentUrl ?? "",
      displayOrder: item?.displayOrder ?? 0,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = isEdit && id ? await updateCourtCitation(id, data) : await createCourtCitation(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.push("/admin/court-citations"); router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir esta citação?")) return;
    await deleteCourtCitation(id);
    router.push("/admin/court-citations"); router.refresh();
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
        <label className={lbl}>Descrição / Ementa *</label>
        <textarea {...register("description")} className={`${inp} resize-none`} rows={4} />
        {errors.description && <p className={err}>{errors.description.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Tribunal</label>
          <select {...register("court")} className={inp}>
            <option value="STJ">STJ</option>
            <option value="STF">STF</option>
            <option value="TST">TST</option>
            <option value="TSE">TSE</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>
        <div>
          <label className={lbl}>Ordem</label>
          <input type="number" {...register("displayOrder", { valueAsNumber: true })} className={inp} min={0} />
        </div>
      </div>
      <div>
        <label className={lbl}>URL do Documento / Acórdão *</label>
        <input {...register("documentUrl")} className={inp} placeholder="https://" />
        {errors.documentUrl && <p className={err}>{errors.documentUrl.message}</p>}
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50"><Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}</button>
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-border text-text-muted font-mono text-sm hover:text-neon transition-colors">CANCELAR</button>
        {isEdit && <button type="button" onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" />EXCLUIR</button>}
      </div>
    </form>
  );
}
