"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminStatusBar } from "@/components/layout/admin-status-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login page renders standalone without sidebar/status bar
  if (pathname === "/admin/login") {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-bg-primary flex">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar (mobile) */}
          <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-bg-primary/80 backdrop-blur-md border-b border-border lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 text-text-secondary hover:text-neon transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-mono text-neon text-sm font-bold tracking-wider">
              RC_ADMIN
            </span>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-12">
            {children}
          </main>
        </div>

        <AdminStatusBar />
      </div>
    </SessionProvider>
  );
}
