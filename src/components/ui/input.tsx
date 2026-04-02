import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "w-full bg-bg-input border border-border px-4 py-2.5 text-sm text-text-primary font-mono",
            "placeholder:text-text-muted",
            "focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30",
            "transition-colors duration-200",
            error && "border-status-hidden focus:border-status-hidden focus:ring-status-hidden/30",
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

Input.displayName = "Input";
export { Input };
