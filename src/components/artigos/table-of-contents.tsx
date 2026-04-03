"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(html: string): TocItem[] {
  const regex = /<h([2-3])\s[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/gi;
  const headings: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
    });
  }
  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile dropdown */}
      <div className="lg:hidden mb-6 relative z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full p-3 border border-border bg-bg-card font-mono text-xs text-text-secondary"
        >
          <List className="w-4 h-4 text-neon" />
          ÍNDICE
          <span className="ml-auto text-neon">{isOpen ? "[-]" : "[+]"}</span>
        </button>
        {isOpen && (
          <nav className="absolute left-0 right-0 border border-t-0 border-border bg-bg-card p-3 shadow-lg shadow-black/40">
            <ul className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-1 text-xs font-mono transition-colors hover:text-neon",
                      level === 3 && "pl-4",
                      activeId === id ? "text-neon" : "text-text-muted"
                    )}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop sticky sidebar */}
      <nav className="hidden lg:block sticky top-24">
        <h4 className="font-mono text-xs text-neon uppercase tracking-widest mb-3">
          &gt; Índice
        </h4>
        <ul className="space-y-1 border-l border-border">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block py-1 text-xs font-mono transition-colors border-l-2 -ml-px hover:text-neon",
                  level === 2 ? "pl-3" : "pl-6",
                  activeId === id
                    ? "text-neon border-neon"
                    : "text-text-muted border-transparent"
                )}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
