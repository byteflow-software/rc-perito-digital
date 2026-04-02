import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  terminal?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-neon text-bg-primary font-bold hover:bg-neon-dim active:bg-neon-dark",
  secondary:
    "border border-neon text-neon hover:bg-neon/10 active:bg-neon/20",
  ghost:
    "text-text-secondary hover:text-neon hover:bg-neon/5",
  danger:
    "border border-status-hidden text-status-hidden hover:bg-status-hidden/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", terminal, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-mono tracking-wide transition-all duration-200 cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {terminal ? (
          <>
            <span className="text-neon/60">[</span>
            {children}
            <span className="text-neon/60">]</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
