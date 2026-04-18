"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createVideoFeature, updateVideoFeature, deleteVideoFeature } from "@/lib/actions/videoFeatures";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  youtubeId: z.string().min(1, "ID do YouTube obrigatório"),
  section: z.enum(["SEMANA_OSINT", "PALESTRAS_CONGRESSOS"]),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;
interface Props { item?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function VideoFeatureForm({ item, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item?.title ?? "",
      youtubeId: item?.youtubeId ?? "",
      section: item?.section ?? "SEMANA_OSINT",
      displayOrder: item?.displayOrder ?? 0,
    },
  });

  const youtubeId = watch("youtubeId");

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = isEdit && id ? await updateVideoFeature(id, data) : await createVideoFeature(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.push("/admin/video-features"); router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este vídeo?")) return;
    await deleteVideoFeature(id);
    router.push("/admin/video-features"); router.refresh();
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>ID do YouTube *</label>
          <input {...register("youtubeId")} className={inp} placeholder="Ex: dQw4w9WgXcQ" />
          {errors.youtubeId && <p className={err}>{errors.youtubeId.message}</p>}
        </div>
        <div>
          <label className={lbl}>Seção</label>
          <select {...register("section")} className={inp}>
            <option value="SEMANA_OSINT">Semana OSINT</option>
            <option value="PALESTRAS_CONGRESSOS">Palestras e Congressos</option>
          </select>
        </div>
      </div>
      {youtubeId && (
        <div className="aspect-video border border-border overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
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
