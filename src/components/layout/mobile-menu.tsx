"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-72 bg-bg-card border-l border-border animate-slide-in flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="font-mono text-sm text-neon">MENU</span>
          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4" aria-label="Menu mobile">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-5 py-3 font-mono text-sm tracking-wide transition-colors",
                  isActive
                    ? "text-neon bg-neon/5 border-r-2 border-neon"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                )}
              >
                <span className="text-neon/50 mr-2">&gt;</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-neon transition-colors text-xs font-mono uppercase"
              >
                {name.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
