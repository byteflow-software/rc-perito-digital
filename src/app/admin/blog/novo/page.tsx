"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { TagInput } from "@/components/admin/tag-input";
import { ImageUpload } from "@/components/admin/image-upload";
import { StatusSelect } from "@/components/admin/status-select";
import { ARTICLE_CATEGORIES } from "@/lib/constants";

const statusOptions = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "SCHEDULED", label: "Agendado" },
  { value: "PUBLISHED", label: "Publicado" },
];

export default function AdminBlogNovoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "osint",
    status: "DRAFT",
    featuredImage: null as string | null,
    featuredImageAlt: "",
    seoKeywords: [] as string[],
    metaTitle: "",
    metaDescription: "",
    scheduledAt: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title || !form.content) {
      toast.error("Título e conteúdo são obrigatórios");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          featuredImageAlt: form.featuredImageAlt || null,
          metaTitle: form.metaTitle || null,
          metaDescription: form.metaDescription || null,
          scheduledAt: form.scheduledAt || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }

      toast.success("Artigo criado com sucesso");
      router.push("/admin/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary">
            <span className="text-neon">&gt;</span> Novo Artigo
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            CANCELAR
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={saving}
            terminal
          >
            {saving ? "SALVANDO..." : "SALVAR"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main content */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
              Título
            </label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Título do artigo"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
              Resumo
            </label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              placeholder="Breve resumo do artigo..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
              Conteúdo (HTML)
            </label>
            <Textarea
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              placeholder="<h2>Título da seção</h2><p>Conteúdo...</p>"
              rows={20}
              className="font-mono text-xs"
            />
            <p className="text-text-muted text-[10px] font-mono mt-1">
              * Editor Tiptap será integrado na próxima fase
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">
              Publicação
            </p>

            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                Status
              </label>
              <StatusSelect
                value={form.status}
                onChange={(v) => update("status", v)}
                options={statusOptions}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                Categoria
              </label>
              <Select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                {ARTICLE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </Select>
            </div>

            {form.status === "SCHEDULED" && (
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                  Agendar para
                </label>
                <Input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(e) => update("scheduledAt", e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">
              Imagem Destaque
            </p>
            <ImageUpload
              value={form.featuredImage}
              onChange={(url) => update("featuredImage", url)}
              bucket="articles"
            />
            {form.featuredImage && (
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                  Alt text
                </label>
                <Input
                  value={form.featuredImageAlt}
                  onChange={(e) => update("featuredImageAlt", e.target.value)}
                  placeholder="Descrição da imagem"
                />
              </div>
            )}
          </div>

          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">
              SEO
            </p>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                Meta título
              </label>
              <Input
                value={form.metaTitle}
                onChange={(e) => update("metaTitle", e.target.value)}
                placeholder="Título para SEO (opcional)"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                Meta descrição
              </label>
              <Textarea
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
                placeholder="Descrição para SEO (opcional)"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                Keywords
              </label>
              <TagInput
                tags={form.seoKeywords}
                onChange={(tags) => update("seoKeywords", tags)}
                placeholder="Adicionar keyword..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
