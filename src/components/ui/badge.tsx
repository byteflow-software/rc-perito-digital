import { cn } from "@/lib/utils";

type BadgeVariant = "published" | "draft" | "hidden" | "pending" | "live" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  published: "bg-status-published/15 text-status-published border-status-published/30",
  live: "bg-status-live/15 text-status-live border-status-live/30",
  draft: "bg-status-draft/15 text-status-draft border-status-draft/30",
  pending: "bg-status-pending/15 text-status-pending border-status-pending/30",
  hidden: "bg-status-hidden/15 text-status-hidden border-status-hidden/30",
  default: "bg-border/30 text-text-secondary border-border",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono uppercase tracking-wider border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
