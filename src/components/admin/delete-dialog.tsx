"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  description?: string;
}

export function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirmar exclusão",
  description = "Esta ação não pode ser desfeita. Tem certeza que deseja continuar?",
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <p className="text-text-secondary text-sm mb-6">{description}</p>
      <div className="flex justify-end gap-3">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
          CANCELAR
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleConfirm}
          disabled={loading}
          terminal
        >
          {loading ? "EXCLUINDO..." : "EXCLUIR"}
        </Button>
      </div>
    </Dialog>
  );
}
