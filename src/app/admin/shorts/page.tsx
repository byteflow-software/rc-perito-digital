"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import toast from "react-hot-toast";

const mockShorts = [
  { id: "1", title: "OSINT na Prática #1", youtubeUrl: "https://youtube.com/shorts/abc", status: "LIVE", dateAdded: "10 jan 2025" },
  { id: "2", title: "Forense Digital Tip", youtubeUrl: "https://youtube.com/shorts/def", status: "LIVE", dateAdded: "05 jan 2025" },
  { id: "3", title: "Dark Web Intro", youtubeUrl: "https://youtube.com/shorts/ghi", status: "PENDING", dateAdded: "01 jan 2025" },
];

type Short = (typeof mockShorts)[0];

const statusVariant: Record<string, "live" | "pending" | "hidden"> = {
  LIVE: "live",
  PENDING: "pending",
  HIDDEN: "hidden",
};

export default function AdminShortsPage() {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns = [
    {
      key: "title",
      label: "Título",
      render: (item: Short) => (
        <span className="font-mono text-text-primary text-xs">{item.title}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      className: "w-24",
      render: (item: Short) => (
        <Badge variant={statusVariant[item.status] || "default"}>{item.status}</Badge>
      ),
    },
    { key: "dateAdded", label: "Data", className: "w-32 font-mono text-xs" },
    {
      key: "actions",
      label: "",
      className: "w-20",
      render: (item: Short) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }}
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
            <span className="text-neon">&gt;</span> Shorts
          </h1>
          <p className="text-text-muted text-xs font-mono mt-1">Gerenciar shorts do YouTube</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => router.push("/admin/shorts/novo")} terminal>
          <Plus className="w-4 h-4" />NOVO SHORT
        </Button>
      </div>
      <DataTable columns={columns} data={mockShorts} keyExtractor={(item) => item.id} onRowClick={(item) => router.push(`/admin/shorts/${item.id}`)} />
      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { toast.success("Short excluído"); }} title="Excluir short" />
    </div>
  );
}
