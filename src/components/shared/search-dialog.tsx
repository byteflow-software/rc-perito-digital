"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
}

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function selectResult(slug: string) {
    router.push(`/artigos/${slug}`);
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg mx-4 bg-bg-card border border-border">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-neon shrink-0" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artigos..."
            className="border-none bg-transparent focus:ring-0 focus:border-transparent p-0"
          />
          <button onClick={() => setOpen(false)} className="text-text-muted hover:text-neon">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-neon animate-spin" />
            </div>
          )}

          {!loading && results.length === 0 && query.length >= 2 && (
            <div className="py-8 text-center">
              <p className="font-mono text-text-muted text-xs">Nenhum resultado encontrado.</p>
            </div>
          )}

          {!loading && results.map((r) => (
            <button
              key={r.id}
              onClick={() => selectResult(r.slug)}
              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-neon/5 transition-colors text-left border-b border-border last:border-b-0"
            >
              <FileText className="w-4 h-4 text-neon shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-sm text-text-primary line-clamp-1">{r.title}</p>
                <p className="text-text-muted text-xs line-clamp-1 mt-0.5">{r.excerpt}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="px-4 py-2 border-t border-border">
          <p className="font-mono text-[10px] text-text-muted">
            ESC para fechar | Ctrl+K para buscar
          </p>
        </div>
      </div>
    </div>
  );
}
