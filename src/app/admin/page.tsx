"use client";

import { FileText, Video, Camera, BookOpen, Eye, Users } from "lucide-react";
import { StatsCard } from "@/components/admin/stats-card";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/ui/section-title";

// Mock data — will be replaced with API calls
const stats = [
  { label: "Artigos", value: 12, icon: FileText, trend: { value: "2 este mês", positive: true } },
  { label: "Shorts", value: 24, icon: Video },
  { label: "Instagram", value: 18, icon: Camera },
  { label: "Livros", value: 8, icon: BookOpen },
  { label: "Visualizações", value: "3.2K", icon: Eye, trend: { value: "15%", positive: true } },
  { label: "Newsletter", value: 156, icon: Users, trend: { value: "8 novos", positive: true } },
];

const recentArticles = [
  { id: "1", title: "Introdução à Forense Digital", status: "PUBLISHED", publishedAt: "15 dez 2024", views: 342 },
  { id: "2", title: "OSINT para Investigações", status: "PUBLISHED", publishedAt: "20 nov 2024", views: 218 },
  { id: "3", title: "Ferramentas de Metadados", status: "DRAFT", publishedAt: "-", views: 0 },
  { id: "4", title: "CTI Frameworks", status: "SCHEDULED", publishedAt: "01 abr 2025", views: 0 },
];

const statusVariant: Record<string, "published" | "draft" | "pending"> = {
  PUBLISHED: "published",
  DRAFT: "draft",
  SCHEDULED: "pending",
};

const columns = [
  {
    key: "title",
    label: "Título",
    render: (item: (typeof recentArticles)[0]) => (
      <span className="font-mono text-text-primary text-xs">{item.title}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    className: "w-28",
    render: (item: (typeof recentArticles)[0]) => (
      <Badge variant={statusVariant[item.status] || "default"}>
        {item.status}
      </Badge>
    ),
  },
  { key: "publishedAt", label: "Publicação", className: "w-32 font-mono text-xs" },
  { key: "views", label: "Views", className: "w-20 text-right font-mono text-xs" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-mono text-xl font-bold text-text-primary mb-1">
        <span className="text-neon">&gt;</span> Dashboard
      </h1>
      <p className="text-text-muted text-xs font-mono mb-8">
        Visão geral do sistema
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent articles */}
      <SectionTitle>ARTIGOS RECENTES</SectionTitle>
      <DataTable
        columns={columns}
        data={recentArticles}
        keyExtractor={(item) => item.id}
        onRowClick={() => {}}
        emptyMessage="Nenhum artigo criado ainda."
      />
    </div>
  );
}
