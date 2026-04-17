"use client";

import { deleteArtigo } from "@/lib/actions/artigos";
import { useRouter } from "next/navigation";

export function DeleteArticleButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Excluir este artigo?")) return;
    await deleteArtigo(id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="font-mono text-[10px] text-text-muted hover:text-red-400 transition-colors"
    >
      [DEL]
    </button>
  );
}
