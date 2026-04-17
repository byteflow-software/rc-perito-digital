"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle, X } from "lucide-react";
import { createShort, updateShort, deleteShort } from "@/lib/actions/shorts";
import type { Short } from "@/types";

const schema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  description: z.string(),
  youtubeUrl: z.string().url("URL inválida"),
  thumbnailUrl: z.string().optional(),
  categoryTags: z.array(z.string()),
  status: z.enum(["LIVE", "HIDDEN"]),
});

type FormData = z.infer<typeof schema>;

interface Props { short?: Short; id?: string; isEdit?: boolean }

export function ShortForm({ short, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: short?.title ?? "",
      description: short?.description ?? "",
      youtubeUrl: short?.youtubeUrl ?? "",
      thumbnailUrl: short?.thumbnailUrl ?? "",
      categoryTags: (short?.categoryTags as string[]) ?? [],
      status: (short?.status as FormData["status"]) ?? "LIVE",
    },
  });

  const categoryTags = watch("categoryTags") ?? [];

  function addTag(name: string) {
    const trimmed = name.trim();
    if (!trimmed || categoryTags.includes(trimmed)) return;
    setValue("categoryTags", [...categoryTags, trimmed]);
    setTagInput("");
  }

  function removeTag(name: string) {
    setValue("categoryTags", categoryTags.filter((t) => t !== name));
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    const res = isEdit && id ? await updateShort(id, data) : await createShort(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro ao salvar"); return; }
    router.push("/admin/shorts");
    router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este short?")) return;
    await deleteShort(id);
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
        <label className={labelClass}>Título *</label>
        <input {...register("title")} className={inputClass} placeholder="Título do short" />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div>
        <label className={labelClass}>URL do YouTube *</label>
        <input {...register("youtubeUrl")} className={inputClass} placeholder="https://youtube.com/shorts/..." />
        {errors.youtubeUrl && <p className={errorClass}>{errors.youtubeUrl.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Thumbnail URL</label>
        <input {...register("thumbnailUrl")} className={inputClass} placeholder="https://i.ytimg.com/..." />
      </div>

      <div>
        <label className={labelClass}>Descrição</label>
        <textarea {...register("description")} className={`${inputClass} resize-none`} rows={3} />
      </div>

      <div>
        <label className={labelClass}>Tags de Categoria</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {categoryTags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-neon/10 border border-neon/30 font-mono text-[10px] text-neon">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}><X className="w-2.5 h-2.5" /></button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); }
          }}
          className={inputClass}
          placeholder="Tag + Enter"
        />
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <select {...register("status")} className={inputClass}>
          <option value="LIVE">Ativo</option>
          <option value="HIDDEN">Oculto</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" />
          {saving ? "SALVANDO..." : "SALVAR"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-border text-text-muted font-mono text-sm hover:text-neon transition-colors">
          CANCELAR
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />EXCLUIR
          </button>
        )}
      </div>
    </form>
  );
}
