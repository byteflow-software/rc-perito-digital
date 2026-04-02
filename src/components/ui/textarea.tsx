import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-bg-input border border-border px-4 py-2.5 text-sm text-text-primary font-mono",
            "placeholder:text-text-muted resize-y min-h-[100px]",
            "focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30",
            "transition-colors duration-200",
            error && "border-status-hidden focus:border-status-hidden",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-status-hidden font-mono">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
