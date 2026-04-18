"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, AlertCircle } from "lucide-react";
import { updateAboutContent } from "@/lib/actions/aboutContent";
import { ImageUpload } from "@/components/admin/image-upload";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  quote: z.string(),
  quoteAuthor: z.string(),
  paragraph1: z.string(),
  paragraph2: z.string(),
  paragraph3: z.string(),
  photoUrl: z.string().optional(),
  photoAlt: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

interface Props {
  about: {
    title: string; quote: string; quoteAuthor: string;
    paragraph1: string; paragraph2: string; paragraph3: string;
    photoUrl?: string | null; photoAlt?: string | null;
  };
}

export function AboutContentForm({ about }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: about.title,
      quote: about.quote,
      quoteAuthor: about.quoteAuthor,
      paragraph1: about.paragraph1,
      paragraph2: about.paragraph2,
      paragraph3: about.paragraph3,
      photoUrl: about.photoUrl ?? "",
      photoAlt: about.photoAlt ?? "",
    },
  });

  const photoUrl = watch("photoUrl");

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = await updateAboutContent({ ...data, photoUrl: data.photoUrl || undefined, photoAlt: data.photoAlt || undefined });
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.refresh();
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
        <label className={lbl}>Citação</label>
        <textarea {...register("quote")} className={`${inp} resize-none`} rows={3} />
      </div>

      <div>
        <label className={lbl}>Autor da Citação</label>
        <input {...register("quoteAuthor")} className={inp} />
      </div>

      <div>
        <label className={lbl}>Parágrafo 1</label>
        <textarea {...register("paragraph1")} className={`${inp} resize-none`} rows={4} />
      </div>

      <div>
        <label className={lbl}>Parágrafo 2</label>
        <textarea {...register("paragraph2")} className={`${inp} resize-none`} rows={4} />
      </div>

      <div>
        <label className={lbl}>Parágrafo 3</label>
        <textarea {...register("paragraph3")} className={`${inp} resize-none`} rows={4} />
      </div>

      <div>
        <label className={lbl}>Foto</label>
        <ImageUpload value={photoUrl || null} onChange={(url) => setValue("photoUrl", url ?? "")} aspectRatio="aspect-[3/4]" />
      </div>

      <div>
        <label className={lbl}>Alt da Foto</label>
        <input {...register("photoAlt")} className={inp} />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}
        </button>
      </div>
    </form>
  );
}
