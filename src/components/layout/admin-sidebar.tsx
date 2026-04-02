"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Video,
  Camera,
  BookOpen,
  HelpCircle,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/shorts", label: "Shorts", icon: Video },
  { href: "/admin/instagram", label: "Instagram", icon: Camera },
  { href: "/admin/livros", label: "Livros", icon: BookOpen },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
];

const settingsItems = [
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-bg-card border-r border-border flex flex-col transition-transform duration-300",
          "lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2" onClick={onClose}>
            <span className="font-mono text-neon text-sm font-bold tracking-wider">
              RC_ADMIN
            </span>
            <span className="text-text-muted font-mono text-[10px]">v1.0</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-text-muted hover:text-neon transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal decoration */}
        <div className="px-4 py-2 border-b border-border">
          <p className="font-mono text-[10px] text-text-muted">
            <span className="text-neon">$</span> system status:{" "}
            <span className="text-status-published">ONLINE</span>
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <p className="px-2 mb-2 font-mono text-[10px] text-text-muted uppercase tracking-widest">
            Conteúdo
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-mono transition-colors",
                      active
                        ? "text-neon bg-neon/10 border-l-2 border-neon"
                        : "text-text-secondary hover:text-neon hover:bg-neon/5 border-l-2 border-transparent"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {active && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="my-4 border-t border-border" />

          <p className="px-2 mb-2 font-mono text-[10px] text-text-muted uppercase tracking-widest">
            Sistema
          </p>
          <ul className="space-y-0.5">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-mono transition-colors",
                      active
                        ? "text-neon bg-neon/10 border-l-2 border-neon"
                        : "text-text-secondary hover:text-neon hover:bg-neon/5 border-l-2 border-transparent"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-2 py-3">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-mono text-text-muted hover:text-status-hidden transition-colors"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </button>
        </div>
      </aside>
    </>
  );
}
