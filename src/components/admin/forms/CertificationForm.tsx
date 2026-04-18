"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createCertification, updateCertification, deleteCertification } from "@/lib/actions/certifications";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  issuer: z.string().optional(),
  area: z.string().min(1),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;
interface Props { item?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function CertificationForm({ item, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name ?? "",
      issuer: item?.issuer ?? "",
      area: item?.area ?? "geral",
      displayOrder: item?.displayOrder ?? 0,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = isEdit && id ? await updateCertification(id, data) : await createCertification(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro"); return; }
    router.push("/admin/certifications"); router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir esta certificação?")) return;
    await deleteCertification(id);
    router.push("/admin/certifications"); router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs"><AlertCircle className="w-4 h-4 shrink-0" />{serverError}</div>}
      <div>
        <label className={lbl}>Nome da Certificação *</label>
        <input {...register("name")} className={inp} />
        {errors.name && <p className={err}>{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Emissor</label>
          <input {...register("issuer")} className={inp} placeholder="Ex: EC-Council" />
        </div>
        <div>
          <label className={lbl}>Área</label>
          <select {...register("area")} className={inp}>
            <option value="geral">Geral</option>
            <option value="osint">OSINT</option>
            <option value="forense">Forense</option>
            <option value="cti">CTI</option>
            <option value="segurança">Segurança</option>
            <option value="analise">Análise</option>
          </select>
        </div>
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
