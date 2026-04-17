"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle, X } from "lucide-react";
import { createInstagram, updateInstagram, deleteInstagram } from "@/lib/actions/instagram";
import { ImageUploader } from "@/components/admin/upload/ImageUploader";
import type { InstagramPost } from "@/types";

const schema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  description: z.string(),
  instagramUrl: z.string().url("URL inválida"),
  imageUrl: z.string().optional(),
  captionOverride: z.string().optional(),
  categoryTags: z.array(z.string()),
  status: z.enum(["LIVE", "HIDDEN"]),
});

type FormData = z.infer<typeof schema>;

interface Props { post?: InstagramPost; id?: string; isEdit?: boolean }

export function InstagramForm({ post, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title ?? "",
      description: post?.description ?? "",
      instagramUrl: post?.instagramUrl ?? "",
      imageUrl: post?.imageUrl ?? "",
      captionOverride: post?.captionOverride ?? "",
      categoryTags: (post?.categoryTags as string[]) ?? [],
      status: (post?.status as FormData["status"]) ?? "LIVE",
    },
  });

  const categoryTags = watch("categoryTags") ?? [];

  function addTag(name: string) {
    const trimmed = name.trim();
    if (!trimmed || categoryTags.includes(trimmed)) return;
    setValue("categoryTags", [...categoryTags, trimmed]);
    setTagInput("");
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    const res = isEdit && id ? await updateInstagram(id, data) : await createInstagram(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro ao salvar"); return; }
    router.push("/admin/instagram");
    router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este post?")) return;
    await deleteInstagram(id);
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
        <input {...register("title")} className={inputClass} />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div>
        <label className={labelClass}>URL do Instagram *</label>
        <input {...register("instagramUrl")} className={inputClass} placeholder="https://instagram.com/p/..." />
        {errors.instagramUrl && <p className={errorClass}>{errors.instagramUrl.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Imagem</label>
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <ImageUploader value={field.value} onChange={(url) => field.onChange(url ?? "")} folder="instagram" />
          )}
        />
      </div>

      <div>
        <label className={labelClass}>Descrição</label>
        <textarea {...register("description")} className={`${inputClass} resize-none`} rows={3} />
      </div>

      <div>
        <label className={labelClass}>Caption override</label>
        <textarea {...register("captionOverride")} className={`${inputClass} resize-none`} rows={4} placeholder="Substitui a legenda padrão no site (opcional)" />
      </div>

      <div>
        <label className={labelClass}>Tags de Categoria</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {categoryTags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-neon/10 border border-neon/30 font-mono text-[10px] text-neon">
              {tag}<button type="button" onClick={() => setValue("categoryTags", categoryTags.filter(t => t !== tag))}><X className="w-2.5 h-2.5" /></button>
            </span>
          ))}
        </div>
        <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); } }}
          className={inputClass} placeholder="Tag + Enter" />
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
