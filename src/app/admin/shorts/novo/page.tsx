"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/admin/tag-input";
import { StatusSelect } from "@/components/admin/status-select";

const statusOptions = [
  { value: "LIVE", label: "Ativo" },
  { value: "PENDING", label: "Pendente" },
  { value: "HIDDEN", label: "Oculto" },
];

export default function AdminShortsNovoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    categoryTags: [] as string[],
    status: "LIVE",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title || !form.youtubeUrl) {
      toast.error("Título e URL são obrigatórios");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/shorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, thumbnailUrl: form.thumbnailUrl || null }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      toast.success("Short criado");
      router.push("/admin/shorts");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary">
          <span className="text-neon">&gt;</span> Novo Short
        </h1>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>CANCELAR</Button>
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} terminal>
            {saving ? "SALVANDO..." : "SALVAR"}
          </Button>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Título</label>
          <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Título do short" />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">URL do YouTube</label>
          <Input value={form.youtubeUrl} onChange={(e) => update("youtubeUrl", e.target.value)} placeholder="https://youtube.com/shorts/..." />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Descrição</label>
          <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} />
        </div>
        <div>
          <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Thumbnail URL (opcional)</label>
          <Input value={form.thumbnailUrl} onChange={(e) => update("thumbnailUrl", e.target.value)} placeholder="URL da thumbnail" />
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
    </div>
  );
}
