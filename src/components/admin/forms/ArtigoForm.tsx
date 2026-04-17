"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle, Eye, X } from "lucide-react";
import { slugify } from "@/lib/utils";
import { createArtigo, updateArtigo, deleteArtigo } from "@/lib/actions/artigos";
import { RichTextEditor } from "@/components/admin/editor/RichTextEditor";
import { ImageUploader } from "@/components/admin/upload/ImageUploader";
import { ArtigoPreview } from "@/components/admin/previews/ArtigoPreview";
import { ARTICLE_CATEGORIES } from "@/lib/constants";

const schema = z.object({
  title: z.string().min(3, "Título muito curto"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Apenas letras, números e hífens"),
  excerpt: z.string().min(10, "Resumo muito curto").max(500),
  content: z.string().min(1, "Conteúdo obrigatório"),
  category: z.string(),
  tagNames: z.array(z.string()),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),
  featured: z.boolean(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
  scheduledAt: z.string().optional(),
  author: z.string(),
  seoKeywords: z.array(z.string()),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
});

type FormData = z.infer<typeof schema>;

interface ArtigoData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  featured: boolean;
  status: string;
  scheduledAt: Date | null;
  author: string;
  seoKeywords: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  tags: { id: string; name: string }[];
}

interface Props {
  artigo?: ArtigoData;
  id?: string;
  isEdit?: boolean;
}

export function ArtigoForm({ artigo, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const {
    register, handleSubmit, setValue, watch, control,
    formState: { errors }, getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: artigo?.title ?? "",
      slug: artigo?.slug ?? "",
      excerpt: artigo?.excerpt ?? "",
      content: artigo?.content ?? "",
      category: artigo?.category ?? "osint",
      tagNames: artigo?.tags?.map((t) => t.name) ?? [],
      featuredImage: artigo?.featuredImage ?? "",
      featuredImageAlt: artigo?.featuredImageAlt ?? "",
      featured: artigo?.featured ?? false,
      status: (artigo?.status as FormData["status"]) ?? "DRAFT",
      scheduledAt: artigo?.scheduledAt ? new Date(artigo.scheduledAt).toISOString().slice(0, 16) : "",
      author: artigo?.author ?? "Romullo Carvalho",
      seoKeywords: (artigo?.seoKeywords as string[]) ?? [],
      metaTitle: artigo?.metaTitle ?? "",
      metaDescription: artigo?.metaDescription ?? "",
    },
  });

  const title = watch("title");
  const tagNames = watch("tagNames") ?? [];
  const status = watch("status");
  const metaTitle = watch("metaTitle") ?? "";
  const metaDescription = watch("metaDescription") ?? "";

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue("title", val);
    if (!isEdit) setValue("slug", slugify(val));
  }

  function addTag(name: string) {
    const trimmed = name.trim();
    if (!trimmed || tagNames.includes(trimmed)) return;
    setValue("tagNames", [...tagNames, trimmed]);
    setTagInput("");
  }

  function removeTag(name: string) {
    setValue("tagNames", tagNames.filter((t) => t !== name));
  }

  function handleTagKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tagNames.length > 0) {
      removeTag(tagNames[tagNames.length - 1]);
    }
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    const res = isEdit && id
      ? await updateArtigo(id, data)
      : await createArtigo(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro ao salvar"); return; }
    router.push("/admin/blog");
    router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este artigo? Esta ação não pode ser desfeita.")) return;
    await deleteArtigo(id);
  }

  const previewData = {
    title: watch("title"),
    slug: watch("slug"),
    excerpt: watch("excerpt"),
    content: watch("content"),
    category: watch("category"),
    featuredImage: watch("featuredImage") || undefined,
    author: watch("author"),
    publishedAt: watch("scheduledAt") || undefined,
  };

  const labelClass = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inputClass = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono placeholder-text-muted focus:outline-none focus:border-neon/50 transition-colors";
  const errorClass = "text-xs font-mono text-red-400 mt-1";
  const hintClass = "text-[10px] font-mono text-text-muted mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div className="flex items-center gap-2 p-3 mb-6 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main */}
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Título *</label>
            <input {...register("title")} onChange={handleTitleChange} className={inputClass} placeholder="Título do artigo" />
            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Slug *</label>
            <input {...register("slug")} className={inputClass} placeholder="slug-do-artigo" />
            {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Resumo *</label>
            <textarea {...register("excerpt")} className={`${inputClass} resize-none`} rows={3} placeholder="Breve resumo..." />
            {errors.excerpt && <p className={errorClass}>{errors.excerpt.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Conteúdo *</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor content={field.value} onChange={field.onChange} />
              )}
            />
            {errors.content && <p className={errorClass}>{errors.content.message}</p>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publicação */}
          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">Publicação</p>

            <div>
              <label className={labelClass}>Status</label>
              <select {...register("status")} className={inputClass}>
                <option value="DRAFT">Rascunho</option>
                <option value="SCHEDULED">Agendado</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="ARCHIVED">Arquivado</option>
              </select>
            </div>

            {status === "SCHEDULED" && (
              <div>
                <label className={labelClass}>Agendar para</label>
                <input type="datetime-local" {...register("scheduledAt")} className={inputClass} />
              </div>
            )}

            <div>
              <label className={labelClass}>Categoria</label>
              <select {...register("category")} className={inputClass}>
                {ARTICLE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tagNames.map((tag) => (
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
                onKeyDown={handleTagKey}
                className={inputClass}
                placeholder="Tag + Enter"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register("featured")} className="accent-neon" />
              <span className="font-mono text-xs text-text-secondary">Artigo em destaque</span>
            </label>

            <div>
              <label className={labelClass}>Autor</label>
              <input {...register("author")} className={inputClass} />
            </div>
          </div>

          {/* Imagem destaque */}
          <div className="bg-bg-card border border-border p-4 space-y-3">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">Imagem Destaque</p>
            <Controller
              name="featuredImage"
              control={control}
              render={({ field }) => (
                <ImageUploader value={field.value} onChange={(url) => field.onChange(url ?? "")} folder="articles" />
              )}
            />
            {watch("featuredImage") && (
              <div>
                <label className={labelClass}>Alt text</label>
                <input {...register("featuredImageAlt")} className={inputClass} placeholder="Descrição da imagem" />
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="bg-bg-card border border-border p-4 space-y-3">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">SEO</p>

            <div>
              <label className={labelClass}>Keywords</label>
              <Controller
                name="seoKeywords"
                control={control}
                render={({ field }) => {
                  const [kw, setKw] = useState("");
                  return (
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(field.value ?? []).map((k) => (
                          <span key={k} className="flex items-center gap-1 px-2 py-0.5 bg-bg-primary border border-border font-mono text-[10px] text-text-muted">
                            {k}
                            <button type="button" onClick={() => field.onChange(field.value.filter((x) => x !== k))}><X className="w-2.5 h-2.5" /></button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={kw}
                        onChange={(e) => setKw(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            const t = kw.trim();
                            if (t && !field.value.includes(t)) field.onChange([...field.value, t]);
                            setKw("");
                          }
                        }}
                        className={inputClass}
                        placeholder="Keyword + Enter"
                      />
                    </div>
                  );
                }}
              />
            </div>

            <div>
              <label className={labelClass}>Meta título</label>
              <input {...register("metaTitle")} className={inputClass} placeholder="Deixe vazio para usar o título" maxLength={70} />
              <p className={`${hintClass} ${metaTitle.length > 60 ? "text-yellow-500" : ""}`}>{metaTitle.length}/70</p>
            </div>

            <div>
              <label className={labelClass}>Meta descrição</label>
              <textarea {...register("metaDescription")} className={`${inputClass} resize-none`} rows={3} maxLength={160} />
              <p className={`${hintClass} ${metaDescription.length > 145 ? "text-yellow-500" : ""}`}>{metaDescription.length}/160</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "SALVANDO..." : "SALVAR"}
            </button>

            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-border text-text-secondary font-mono text-sm hover:text-neon hover:border-neon/50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              PREVIEW
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full px-4 py-2 border border-border text-text-muted font-mono text-sm hover:text-neon transition-colors"
            >
              CANCELAR
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                EXCLUIR
              </button>
            )}
          </div>
        </div>
      </div>

      <ArtigoPreview artigo={previewData} isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </form>
  );
}
