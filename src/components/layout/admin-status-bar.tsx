"use client";

import { useSession } from "next-auth/react";
import { Lock, User, Wifi } from "lucide-react";

export function AdminStatusBar() {
  const { data: session } = useSession();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 h-7 bg-bg-card border-t border-border flex items-center px-4 gap-4 font-mono text-[10px] text-text-muted lg:pl-[16.5rem]">
      <span className="flex items-center gap-1">
        <Wifi className="w-3 h-3 text-status-published" />
        CONNECTED
      </span>
      <span className="flex items-center gap-1">
        <User className="w-3 h-3" />
        {session?.user?.name || session?.user?.email || "---"}
      </span>
      <span className="flex items-center gap-1">
        <Lock className="w-3 h-3 text-neon" />
        AES-256
      </span>
      <span className="ml-auto hidden sm:block">
        SESSION: {session ? "ACTIVE" : "NONE"} | TLS 1.3
      </span>
    </footer>
  );
}
