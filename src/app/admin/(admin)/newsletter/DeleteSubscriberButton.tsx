"use client";

import { deleteSubscriber } from "@/lib/actions/newsletter";
import { useRouter } from "next/navigation";

export function DeleteSubscriberButton({ id }: { id: string }) {
  const router = useRouter();

  async function handle() {
    if (!confirm("Remover este inscrito?")) return;
    await deleteSubscriber(id);
    router.refresh();
  }

  return (
    <button onClick={handle} className="font-mono text-[10px] text-text-muted hover:text-red-400 transition-colors">
      [DEL]
    </button>
  );
}
