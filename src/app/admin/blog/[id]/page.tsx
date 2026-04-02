"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { TagInput } from "@/components/admin/tag-input";
import { ImageUpload } from "@/components/admin/image-upload";
import { StatusSelect } from "@/components/admin/status-select";
import { Skeleton } from "@/components/ui/skeleton";
import { ARTICLE_CATEGORIES } from "@/lib/constants";

const statusOptions = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "SCHEDULED", label: "Agendado" },
  { value: "PUBLISHED", label: "Publicado" },
];

interface Props {
  params: Promise<{ id: string }>;
}

export default function AdminBlogEditPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setForm({
          title: data.title || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          category: data.category || "osint",
          status: data.status || "DRAFT",
          featuredImage: data.featuredImage || null,
          featuredImageAlt: data.featuredImageAlt || "",
          seoKeywords: data.seoKeywords || [],
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          scheduledAt: data.scheduledAt || "",
        });
      } catch {
        toast.error("Erro ao carregar artigo");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

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
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
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

      toast.success("Artigo atualizado");
      router.push("/admin/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary">
          <span className="text-neon">&gt;</span> Editar Artigo
        </h1>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            CANCELAR
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} terminal>
            {saving ? "SALVANDO..." : "SALVAR"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Título</label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Resumo</label>
            <Textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={3} />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Conteúdo (HTML)</label>
            <Textarea value={form.content} onChange={(e) => update("content", e.target.value)} rows={20} className="font-mono text-xs" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">Publicação</p>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Status</label>
              <StatusSelect value={form.status} onChange={(v) => update("status", v)} options={statusOptions} />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Categoria</label>
              <Select value={form.category} onChange={(e) => update("category", e.target.value)}>
                {ARTICLE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </Select>
            </div>
            {form.status === "SCHEDULED" && (
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Agendar para</label>
                <Input type="datetime-local" value={form.scheduledAt} onChange={(e) => update("scheduledAt", e.target.value)} />
              </div>
            )}
          </div>

          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">Imagem Destaque</p>
            <ImageUpload value={form.featuredImage} onChange={(url) => update("featuredImage", url)} bucket="articles" />
            {form.featuredImage && (
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Alt text</label>
                <Input value={form.featuredImageAlt} onChange={(e) => update("featuredImageAlt", e.target.value)} />
              </div>
            )}
          </div>

          <div className="bg-bg-card border border-border p-4 space-y-4">
            <p className="font-mono text-xs text-neon uppercase tracking-widest">SEO</p>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Meta título</label>
              <Input value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Meta descrição</label>
              <Textarea value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} rows={2} />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Keywords</label>
              <TagInput tags={form.seoKeywords} onChange={(tags) => update("seoKeywords", tags)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
