"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Trash2, AlertCircle } from "lucide-react";
import { createCourseModule, updateCourseModule, deleteCourseModule } from "@/lib/actions/courseModules";

const schema = z.object({
  track: z.enum(["THEORETICAL", "PRACTICAL"]),
  title: z.string().min(1, "Título obrigatório"),
  topics: z.array(z.string().min(1)),
  displayOrder: z.number().int().min(0),
});
type FormData = z.infer<typeof schema>;

interface Props { module?: FormData & { id: string }; id?: string; isEdit?: boolean }

export function CourseModuleForm({ module, id, isEdit }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      track: module?.track ?? "THEORETICAL",
      title: module?.title ?? "",
      topics: module?.topics ?? [],
      displayOrder: module?.displayOrder ?? 0,
    },
  });

  async function onSubmit(data: FormData) {
    setSaving(true); setServerError("");
    const res = isEdit && id ? await updateCourseModule(id, data) : await createCourseModule(data);
    setSaving(false);
    if (!res.success) { setServerError(res.error ?? "Erro ao salvar"); return; }
    router.push("/admin/course-modules");
    router.refresh();
  }

  async function handleDelete() {
    if (!id || !confirm("Excluir este módulo?")) return;
    await deleteCourseModule(id);
    router.push("/admin/course-modules");
    router.refresh();
  }

  const lbl = "block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider";
  const inp = "w-full px-3 py-2 bg-bg-primary border border-border text-text-primary text-sm font-mono focus:outline-none focus:border-neon/50 transition-colors";
  const err = "text-xs font-mono text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      {serverError && <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs"><AlertCircle className="w-4 h-4 shrink-0" />{serverError}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Trilha *</label>
          <select {...register("track")} className={inp}>
            <option value="THEORETICAL">Teórica</option>
            <option value="PRACTICAL">Prática</option>
          </select>
        </div>
        <div>
          <label className={lbl}>Ordem</label>
          <input type="number" {...register("displayOrder", { valueAsNumber: true })} className={inp} min={0} />
        </div>
      </div>

      <div>
        <label className={lbl}>Título *</label>
        <input {...register("title")} className={inp} placeholder="Ex: Módulo 1 — Introdução ao OSINT" />
        {errors.title && <p className={err}>{errors.title.message}</p>}
      </div>

      <div>
        <label className={lbl}>Tópicos (um por linha)</label>
        <Controller
          control={control}
          name="topics"
          render={({ field }) => (
            <textarea
              className={`${inp} resize-none`}
              rows={8}
              value={field.value.join("\n")}
              onChange={(e) => field.onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
              placeholder={"Tópico 1\nTópico 2\nTópico 3"}
            />
          )}
        />
        <p className="text-[10px] font-mono text-text-muted mt-1">Cada linha vira um item na lista.</p>
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
