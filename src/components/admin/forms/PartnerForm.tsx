"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createPartner, updatePartner, deletePartner } from "@/lib/actions/partners";
import { ImageUpload } from "@/components/admin/image-upload";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  logoUrl: z.string().optional(),
  url: z.string().url("URL inválida").optional().or(z.literal("")),
  displayOrder: z.number().int().min(0),
  active: z.boolean(),
});
type FormData = z.infer<typeof schema>;

interface Props { partner?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function PartnerForm({ partner, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: partner?.name ?? "",
      logoUrl: partner?.logoUrl ?? "",
      url: partner?.url ?? "",
      displayOrder: partner?.displayOrder ?? 0,
      active: partner?.active ?? true,
    },
  });

  const logoUrl = watch("logoUrl");

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError("");
    const payload = { ...data, logoUrl: data.logoUrl || undefined, url: data.url || undefined };
    const res = isEdit && id ? await updatePartner(id, payload) : await createPartner(payload);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro ao salvar"); return; }
    router.push("/admin/partners");
    router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este parceiro?")) return;
    await deletePartner(id);
    router.push("/admin/partners");
    router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && (
        <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />{serverError}
        </div>
      )}

      <div>
        <label className={lbl}>Nome *</label>
        <input {...register("name")} className={inp} />
        {errors.name && <p className={err}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={lbl}>Logo</label>
        <ImageUpload
          value={logoUrl || null}
          onChange={(url) => setValue("logoUrl", url ?? "")}
          aspectRatio="aspect-[3/1]"
        />
      </div>

      <div>
        <label className={lbl}>URL do Site</label>
        <input {...register("url")} className={inp} placeholder="https://" />
        {errors.url && <p className={err}>{errors.url.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Ordem</label>
          <input type="number" {...register("displayOrder", { valueAsNumber: true })} className={inp} min={0} />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("active")} className="accent-neon" />
            <span className="font-mono text-xs text-text-secondary">Ativo</span>
          </label>
        </div>
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
