"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import toast from "react-hot-toast";

// Mock data — will be replaced with SWR/fetch
const mockArticles = [
  { id: "1", title: "Introdução à Forense Digital", category: "forense-digital", status: "PUBLISHED", publishedAt: "15 dez 2024", views: 342 },
  { id: "2", title: "OSINT para Investigações", category: "osint", status: "PUBLISHED", publishedAt: "20 nov 2024", views: 218 },
  { id: "3", title: "Ferramentas de Metadados", category: "ferramentas", status: "DRAFT", publishedAt: "-", views: 0 },
  { id: "4", title: "CTI Frameworks", category: "cti", status: "SCHEDULED", publishedAt: "01 abr 2025", views: 0 },
];

type Article = (typeof mockArticles)[0];

const statusVariant: Record<string, "published" | "draft" | "pending"> = {
  PUBLISHED: "published",
  DRAFT: "draft",
  SCHEDULED: "pending",
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns = [
    {
      key: "title",
      label: "Título",
      render: (item: Article) => (
        <span className="font-mono text-text-primary text-xs">{item.title}</span>
      ),
    },
    {
      key: "category",
      label: "Categoria",
      className: "w-32",
      render: (item: Article) => (
        <span className="font-mono text-xs text-text-muted uppercase">{item.category}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      className: "w-28",
      render: (item: Article) => (
        <Badge variant={statusVariant[item.status] || "default"}>
          {item.status}
        </Badge>
      ),
    },
    { key: "publishedAt", label: "Publicação", className: "w-32 font-mono text-xs" },
    { key: "views", label: "Views", className: "w-20 text-right font-mono text-xs" },
    {
      key: "actions",
      label: "",
      className: "w-20",
      render: (item: Article) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDeleteId(item.id);
          }}
          className="font-mono text-[10px] text-text-muted hover:text-status-hidden transition-colors"
        >
          [DEL]
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary">
            <span className="text-neon">&gt;</span> Blog
          </h1>
          <p className="text-text-muted text-xs font-mono mt-1">
            Gerenciar artigos
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.push("/admin/blog/novo")}
          terminal
        >
          <Plus className="w-4 h-4" />
          NOVO ARTIGO
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={mockArticles}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => router.push(`/admin/blog/${item.id}`)}
      />

      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          // TODO: Call API
          toast.success("Artigo excluído");
        }}
        title="Excluir artigo"
        description="O artigo será permanentemente removido. Continuar?"
      />
    </div>
  );
}
