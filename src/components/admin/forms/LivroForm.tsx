"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createLivro, updateLivro, deleteLivro } from "@/lib/actions/livros";
import { ImageUploader } from "@/components/admin/upload/ImageUploader";
import { BOOK_CATEGORIES } from "@/lib/constants";
import type { Book } from "@/types";

const schema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  author: z.string().min(2, "Autor obrigatório"),
  coverImage: z.string().optional(),
  affiliateLink: z.string().optional(),
  category: z.string(),
  description: z.string(),
  showOnHomepage: z.boolean(),
  status: z.enum(["SHOW", "HIDDEN"]),
});

type FormData = z.infer<typeof schema>;

interface Props { livro?: Book; id?: string; isEdit?: boolean }

export function LivroForm({ livro, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: livro?.title ?? "",
      author: livro?.author ?? "",
      coverImage: livro?.coverImage ?? "",
      affiliateLink: livro?.affiliateLink ?? "",
      category: livro?.category ?? "osint",
      description: livro?.description ?? "",
      showOnHomepage: livro?.showOnHomepage ?? true,
      status: (livro?.status as FormData["status"]) ?? "SHOW",
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    const res = isEdit && id ? await updateLivro(id, data) : await createLivro(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro ao salvar"); return; }
    router.push("/admin/livros");
    router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este livro?")) return;
    await deleteLivro(id);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Título *</label>
          <input {...register("title")} className={inputClass} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Autor *</label>
          <input {...register("author")} className={inputClass} />
          {errors.author && <p className={errorClass}>{errors.author.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Capa</label>
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <ImageUploader value={field.value} onChange={(url) => field.onChange(url ?? "")} folder="livros" />
          )}
        />
      </div>

      <div>
        <label className={labelClass}>Link afiliado</label>
        <input {...register("affiliateLink")} className={inputClass} placeholder="https://amzn.to/..." />
      </div>

      <div>
        <label className={labelClass}>Categoria</label>
        <select {...register("category")} className={inputClass}>
          {BOOK_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Descrição</label>
        <textarea {...register("description")} className={`${inputClass} resize-none`} rows={4} />
      </div>

      <div className="flex items-center gap-6">
        <div>
          <label className={labelClass}>Status</label>
          <select {...register("status")} className={inputClass}>
            <option value="SHOW">Exibindo</option>
            <option value="HIDDEN">Oculto</option>
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer mt-5">
          <input type="checkbox" {...register("showOnHomepage")} className="accent-neon" />
          <span className="font-mono text-xs text-text-secondary">Exibir na Home</span>
        </label>
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
