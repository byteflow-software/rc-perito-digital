import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("bg-bg-card border border-border p-4", className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
          {label}
        </p>
        <Icon className="w-4 h-4 text-neon/60" />
      </div>
      <p className="font-mono text-2xl font-bold text-text-primary">{value}</p>
      {trend && (
        <p
          className={cn(
            "font-mono text-[10px] mt-1",
            trend.positive ? "text-status-published" : "text-status-hidden"
          )}
        >
          {trend.positive ? "+" : ""}{trend.value}
        </p>
      )}
    </div>
  );
}
