import { cn } from "@/lib/utils";

interface CircuitDecorationProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function CircuitDecoration({ position = "bottom-right", className }: CircuitDecorationProps) {
  const positionStyles = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };

  return (
    <svg
      className={cn(
        "absolute w-32 h-32 text-neon/10 pointer-events-none",
        positionStyles[position],
        className
      )}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 128V96h8v-8h8v-8h8V64h8v-8h8v-8h8V32h8v-8h8V8h8V0" stroke="currentColor" strokeWidth="1" />
      <path d="M0 96V64h8v-8h8v-8h8V32h8v-8h8V8h8V0" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="8" cy="96" r="2" fill="currentColor" />
      <circle cx="24" cy="72" r="2" fill="currentColor" />
      <circle cx="40" cy="48" r="2" fill="currentColor" />
      <circle cx="56" cy="32" r="2" fill="currentColor" />
      <circle cx="72" cy="8" r="1.5" fill="currentColor" />
      <rect x="0" y="120" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="16" y="88" width="3" height="3" fill="currentColor" opacity="0.3" />
      <rect x="48" y="40" width="3" height="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
