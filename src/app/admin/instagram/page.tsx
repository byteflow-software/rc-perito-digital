"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import toast from "react-hot-toast";

const mockPosts = [
  { id: "1", title: "Post OSINT Tools", instagramUrl: "https://instagram.com/p/abc", status: "LIVE", dateAdded: "12 jan 2025" },
  { id: "2", title: "Forense Digital Dica", instagramUrl: "https://instagram.com/p/def", status: "LIVE", dateAdded: "08 jan 2025" },
  { id: "3", title: "Certificação Review", instagramUrl: "https://instagram.com/p/ghi", status: "HIDDEN", dateAdded: "02 jan 2025" },
];

type Post = (typeof mockPosts)[0];
const statusVariant: Record<string, "live" | "pending" | "hidden"> = { LIVE: "live", PENDING: "pending", HIDDEN: "hidden" };

export default function AdminInstagramPage() {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns = [
    { key: "title", label: "Título", render: (item: Post) => <span className="font-mono text-text-primary text-xs">{item.title}</span> },
    { key: "status", label: "Status", className: "w-24", render: (item: Post) => <Badge variant={statusVariant[item.status] || "default"}>{item.status}</Badge> },
    { key: "dateAdded", label: "Data", className: "w-32 font-mono text-xs" },
    { key: "actions", label: "", className: "w-20", render: (item: Post) => (
      <button onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }} className="font-mono text-[10px] text-text-muted hover:text-status-hidden transition-colors">[DEL]</button>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Instagram</h1>
          <p className="text-text-muted text-xs font-mono mt-1">Gerenciar posts do Instagram</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => router.push("/admin/instagram/novo")} terminal>
          <Plus className="w-4 h-4" />NOVO POST
        </Button>
      </div>
      <DataTable columns={columns} data={mockPosts} keyExtractor={(item) => item.id} onRowClick={(item) => router.push(`/admin/instagram/${item.id}`)} />
      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { toast.success("Post excluído"); }} title="Excluir post" />
    </div>
  );
}
