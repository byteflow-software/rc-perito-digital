import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono",
        "bg-neon/10 text-neon border border-neon/30",
        "transition-colors duration-200",
        className
      )}
    >
      <span className="text-neon/50">[</span>
      {children}
      <span className="text-neon/50">]</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 hover:text-status-hidden transition-colors cursor-pointer"
          aria-label={`Remove ${children}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
