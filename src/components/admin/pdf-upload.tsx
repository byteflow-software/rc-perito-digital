"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, FileText, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface PdfUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  bucket?: string;
  className?: string;
}

export function PdfUpload({
  value,
  onChange,
  bucket = "general",
  className,
}: PdfUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Apenas PDFs são permitidos");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("PDF deve ter no máximo 20MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("kind", "pdf");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload falhou");

      const data = await res.json();
      onChange(data.url);
      toast.success("PDF enviado");
    } catch {
      toast.error("Erro ao enviar PDF");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (value?.includes("blob.vercel-storage.com")) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        });
      } catch { /* ignore delete errors */ }
    }
    onChange(null);
  }

  function filename(url: string) {
    try {
      const parts = new URL(url).pathname.split("/");
      return decodeURIComponent(parts[parts.length - 1] || url);
    } catch {
      return url;
    }
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        className="hidden"
      />

      {value ? (
        <div className="flex items-center gap-3 p-3 border border-border bg-bg-secondary/30">
          <FileText className="w-5 h-5 text-neon shrink-0" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate font-mono text-xs text-text-primary hover:text-neon transition-colors"
            title={value}
          >
            {filename(value)}
          </a>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-text-muted hover:text-neon transition-colors"
            aria-label="Abrir PDF"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1 text-text-muted hover:text-status-hidden transition-colors"
            aria-label="Remover PDF"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "w-full border border-dashed border-border hover:border-neon/40 bg-bg-secondary/30 flex flex-col items-center justify-center gap-2 transition-colors py-8"
          )}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-neon animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-text-muted" />
              <span className="font-mono text-xs text-text-muted">UPLOAD PDF (máx 20MB)</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
