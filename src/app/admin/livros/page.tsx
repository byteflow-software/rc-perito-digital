"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import toast from "react-hot-toast";

const mockBooks = [
  { id: "1", title: "OSINT e Investigação Digital", author: "Romullo Carvalho", category: "osint", status: "SHOW" },
  { id: "2", title: "Introdução à Forense Computacional", author: "Romullo Carvalho", category: "forensics", status: "SHOW" },
  { id: "3", title: "Practical Malware Analysis", author: "Michael Sikorski", category: "malware", status: "SHOW" },
];

type Book = (typeof mockBooks)[0];
const statusVariant: Record<string, "published" | "hidden"> = { SHOW: "published", HIDE: "hidden" };

export default function AdminLivrosPage() {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns = [
    { key: "title", label: "Título", render: (item: Book) => <span className="font-mono text-text-primary text-xs">{item.title}</span> },
    { key: "author", label: "Autor", className: "w-40 font-mono text-xs" },
    { key: "category", label: "Categoria", className: "w-28 font-mono text-xs uppercase" },
    { key: "status", label: "Status", className: "w-24", render: (item: Book) => <Badge variant={statusVariant[item.status] || "default"}>{item.status}</Badge> },
    { key: "actions", label: "", className: "w-20", render: (item: Book) => (
      <button onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }} className="font-mono text-[10px] text-text-muted hover:text-status-hidden transition-colors">[DEL]</button>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Livros</h1>
          <p className="text-text-muted text-xs font-mono mt-1">Gerenciar livros recomendados</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => router.push("/admin/livros/novo")} terminal>
          <Plus className="w-4 h-4" />NOVO LIVRO
        </Button>
      </div>
      <DataTable columns={columns} data={mockBooks} keyExtractor={(item) => item.id} onRowClick={(item) => router.push(`/admin/livros/${item.id}`)} />
      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { toast.success("Livro excluído"); }} title="Excluir livro" />
    </div>
  );
}
