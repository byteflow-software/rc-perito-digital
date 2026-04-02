"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/admin/tag-input";
import { ImageUpload } from "@/components/admin/image-upload";
import { StatusSelect } from "@/components/admin/status-select";

const statusOptions = [
  { value: "LIVE", label: "Ativo" },
  { value: "PENDING", label: "Pendente" },
  { value: "HIDDEN", label: "Oculto" },
];

export default function AdminInstagramNovoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instagramUrl: "",
    imageUrl: null as string | null,
    captionOverride: "",
    categoryTags: [] as string[],
    status: "LIVE",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title || !form.instagramUrl) { toast.error("Título e URL são obrigatórios"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captionOverride: form.captionOverride || null }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      toast.success("Post criado");
      router.push("/admin/instagram");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally { setSaving(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Novo Post Instagram</h1>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>CANCELAR</Button>
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} terminal>{saving ? "SALVANDO..." : "SALVAR"}</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Título</label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Título do post" />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">URL do Instagram</label>
            <Input value={form.instagramUrl} onChange={(e) => update("instagramUrl", e.target.value)} placeholder="https://instagram.com/p/..." />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Descrição</label>
            <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Legenda personalizada</label>
            <Textarea value={form.captionOverride} onChange={(e) => update("captionOverride", e.target.value)} rows={2} placeholder="Sobrescrever legenda (opcional)" />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Tags</label>
            <TagInput tags={form.categoryTags} onChange={(t) => update("categoryTags", t)} />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Status</label>
            <StatusSelect value={form.status} onChange={(v) => update("status", v)} options={statusOptions} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">Imagem</p>
            <ImageUpload value={form.imageUrl} onChange={(url) => update("imageUrl", url)} bucket="instagram" aspectRatio="aspect-square" />
          </div>
        </div>
      </div>
    </div>
  );
}
