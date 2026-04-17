"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, Tag, Video, Camera,
  BookOpen, HelpCircle, Mail, Search, Settings, LogOut,
} from "lucide-react";

const nav = [
  {
    section: "Conteúdo",
    links: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/blog", label: "Artigos", icon: FileText },
      { href: "/admin/tags", label: "Tags", icon: Tag },
      { href: "/admin/shorts", label: "Shorts", icon: Video },
      { href: "/admin/instagram", label: "Instagram", icon: Camera },
    ],
  },
  {
    section: "Site",
    links: [
      { href: "/admin/livros", label: "Livros", icon: BookOpen },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
      { href: "/admin/seo", label: "SEO", icon: Search },
      { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-bg-card border-r border-border flex flex-col sticky top-0 h-screen overflow-y-auto hidden lg:flex">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <Link href="/admin" className="block">
          <span className="font-mono text-neon text-sm font-bold tracking-wider">RC_ADMIN</span>
          <p className="font-mono text-[10px] text-text-muted mt-0.5">
            <span className="text-neon">$</span> status:{" "}
            <span className="text-status-published">ONLINE</span>
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-5">
        {nav.map((group) => (
          <div key={group.section}>
            <p className="px-2 mb-1.5 font-mono text-[10px] text-text-muted uppercase tracking-widest">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.links.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        "flex items-center gap-3 px-3 py-2 text-sm font-mono transition-colors border-l-2",
                        active
                          ? "text-neon bg-neon/10 border-neon"
                          : "text-text-secondary hover:text-neon hover:bg-neon/5 border-transparent",
                      ].join(" ")}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-border px-2 py-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-mono text-text-muted hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
