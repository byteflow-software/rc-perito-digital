"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/image-upload";
import { StatusSelect } from "@/components/admin/status-select";
import { Toggle } from "@/components/ui/toggle";
import { BOOK_CATEGORIES } from "@/lib/constants";

const statusOptions = [
  { value: "SHOW", label: "Visível" },
  { value: "HIDE", label: "Oculto" },
];

export default function AdminLivrosNovoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    coverImage: null as string | null,
    affiliateLink: "",
    category: "osint",
    description: "",
    showOnHomepage: true,
    status: "SHOW",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title || !form.author) { toast.error("Título e autor são obrigatórios"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/livros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, affiliateLink: form.affiliateLink || null }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      toast.success("Livro criado");
      router.push("/admin/livros");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally { setSaving(false); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Novo Livro</h1>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>CANCELAR</Button>
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} terminal>{saving ? "SALVANDO..." : "SALVAR"}</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Título</label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Título do livro" />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Autor</label>
            <Input value={form.author} onChange={(e) => update("author", e.target.value)} placeholder="Nome do autor" />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Descrição</label>
            <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Link afiliado</label>
            <Input value={form.affiliateLink} onChange={(e) => update("affiliateLink", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Categoria</label>
            <Select value={form.category} onChange={(e) => update("category", e.target.value)}>
              {BOOK_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={form.showOnHomepage} onChange={(v) => update("showOnHomepage", v)} />
            <label className="text-xs font-mono text-text-secondary">Mostrar na homepage</label>
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Status</label>
            <StatusSelect value={form.status} onChange={(v) => update("status", v)} options={statusOptions} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">Capa</p>
            <ImageUpload value={form.coverImage} onChange={(url) => update("coverImage", url)} bucket="books" aspectRatio="aspect-[2/3]" />
          </div>
        </div>
      </div>
    </div>
  );
}
