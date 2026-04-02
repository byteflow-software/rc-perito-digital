"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  bucket?: string;
  className?: string;
  aspectRatio?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucket = "general",
  className,
  aspectRatio = "aspect-[16/9]",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Apenas imagens são permitidas");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem deve ter no máximo 5MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload falhou");

      const data = await res.json();
      onChange(data.url);
      toast.success("Imagem enviada");
    } catch {
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {value ? (
        <div className={cn("relative border border-border overflow-hidden", aspectRatio)}>
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="400px"
          />
          <button
            type="button"
            onClick={async () => {
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
            }}
            className="absolute top-2 right-2 p-1 bg-bg-primary/80 border border-border text-text-secondary hover:text-status-hidden transition-colors"
            aria-label="Remover imagem"
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
            "w-full border border-dashed border-border hover:border-neon/40 bg-bg-secondary/30 flex flex-col items-center justify-center gap-2 transition-colors",
            aspectRatio
          )}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-neon animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6 text-text-muted" />
              <span className="font-mono text-xs text-text-muted">UPLOAD IMAGEM</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
