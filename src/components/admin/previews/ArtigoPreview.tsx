"use client";

import { X, Eye, Calendar, User, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Props {
  artigo: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    featuredImage?: string;
    author: string;
    publishedAt?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ArtigoPreview({ artigo, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-bg-card border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-neon" />
            <span className="font-mono text-sm font-bold text-neon">Preview do Artigo</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-neon/10 transition-colors text-text-muted hover:text-neon">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-bg-primary">
          <article>
            {artigo.featuredImage && (
              <div className="relative h-64 bg-bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={artigo.featuredImage} alt={artigo.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6 md:p-8">
              <span className="inline-block px-2 py-0.5 border border-neon/40 text-neon font-mono text-[10px] uppercase tracking-widest mb-3">
                {artigo.category}
              </span>
              <h1 className="text-2xl font-bold text-text-primary mb-4">{artigo.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                  <User className="w-3 h-3" />
                  {artigo.author}
                </div>
                {artigo.publishedAt && (
                  <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                    <Calendar className="w-3 h-3" />
                    {formatDate(artigo.publishedAt)}
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
                  <Tag className="w-3 h-3" />/{artigo.slug}
                </div>
              </div>

              {artigo.excerpt && (
                <p className="text-text-secondary italic border-l-2 border-neon/40 pl-4 mb-6">
                  {artigo.excerpt}
                </p>
              )}

              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: artigo.content }}
              />
            </div>
          </article>
        </div>

        <div className="p-3 border-t border-border bg-bg-card flex justify-between items-center">
          <span className="text-xs font-mono text-text-muted">Apenas uma prévia visual. O layout final pode variar.</span>
          <button onClick={onClose} className="px-3 py-1.5 text-xs font-mono border border-border text-text-muted hover:text-neon transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
