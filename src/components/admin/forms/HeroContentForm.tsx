"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, AlertCircle } from "lucide-react";
import { updateHeroContent } from "@/lib/actions/heroContent";
import { ImageUpload } from "@/components/admin/image-upload";

const schema = z.object({
  label: z.string(),
  name: z.string().min(1, "Nome obrigatório"),
  nameHighlight: z.string().min(1, "Destaque obrigatório"),
  subtitle: z.string().min(1, "Subtítulo obrigatório"),
  bio: z.string(),
  photoUrl: z.string().optional(),
  photoAlt: z.string().optional(),
  primaryCtaText: z.string(),
  primaryCtaUrl: z.string(),
  secondaryCtaText: z.string(),
  secondaryCtaUrl: z.string(),
});
type FormData = z.infer<typeof schema>;

interface Props {
  hero: {
    label: string; name: string; nameHighlight: string; subtitle: string; bio: string;
    photoUrl?: string | null; photoAlt?: string | null;
    primaryCtaText: string; primaryCtaUrl: string;
    secondaryCtaText: string; secondaryCtaUrl: string;
  };
}

export function HeroContentForm({ hero }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: hero.label,
      name: hero.name,
      nameHighlight: hero.nameHighlight,
      subtitle: hero.subtitle,
      bio: hero.bio,
      photoUrl: hero.photoUrl ?? "",
      photoAlt: hero.photoAlt ?? "",
      primaryCtaText: hero.primaryCtaText,
      primaryCtaUrl: hero.primaryCtaUrl,
      secondaryCtaText: hero.secondaryCtaText,
      secondaryCtaUrl: hero.secondaryCtaUrl,
    },
  });

  const photoUrl = watch("photoUrl");

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = await updateHeroContent({ ...data, photoUrl: data.photoUrl || undefined, photoAlt: data.photoAlt || undefined });
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
        <label className={lbl}>Label (ex: &gt; WELCOME)</label>
        <input {...register("label")} className={inp} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Nome *</label>
          <input {...register("name")} className={inp} />
          {errors.name && <p className={err}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={lbl}>Destaque do Nome *</label>
          <input {...register("nameHighlight")} className={inp} />
          {errors.nameHighlight && <p className={err}>{errors.nameHighlight.message}</p>}
        </div>
      </div>

      <div>
        <label className={lbl}>Subtítulo *</label>
        <input {...register("subtitle")} className={inp} />
        {errors.subtitle && <p className={err}>{errors.subtitle.message}</p>}
      </div>

      <div>
        <label className={lbl}>Bio</label>
        <textarea {...register("bio")} className={`${inp} resize-none`} rows={4} />
      </div>

      <div>
        <label className={lbl}>Foto</label>
        <ImageUpload value={photoUrl || null} onChange={(url) => setValue("photoUrl", url ?? "")} aspectRatio="aspect-square" />
      </div>

      <div>
        <label className={lbl}>Alt da Foto</label>
        <input {...register("photoAlt")} className={inp} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>CTA Primário - Texto</label>
          <input {...register("primaryCtaText")} className={inp} />
        </div>
        <div>
          <label className={lbl}>CTA Primário - URL</label>
          <input {...register("primaryCtaUrl")} className={inp} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>CTA Secundário - Texto</label>
          <input {...register("secondaryCtaText")} className={inp} />
        </div>
        <div>
          <label className={lbl}>CTA Secundário - URL</label>
          <input {...register("secondaryCtaUrl")} className={inp} />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/40 text-neon font-mono text-sm hover:bg-neon/20 transition-colors disabled:opacity-50">
          <Save className="w-4 h-4" />{saving ? "SALVANDO..." : "SALVAR"}
        </button>
      </div>
    </form>
  );
}
