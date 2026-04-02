import { cn } from "@/lib/utils";

interface HexagonalFrameProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "w-24 h-24",
  md: "w-48 h-48",
  lg: "w-64 h-64 md:w-80 md:h-80",
};

export function HexagonalFrame({ children, size = "lg", className }: HexagonalFrameProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        sizeStyles[size],
        className
      )}
    >
      {/* Glow border hexagon */}
      <div className="absolute inset-0 hexagonal-clip bg-neon/20 animate-glow-pulse" />
      {/* Inner hexagon with content */}
      <div className="absolute inset-[3px] hexagonal-clip bg-bg-primary overflow-hidden">
        {children}
      </div>
    </div>
  );
}
