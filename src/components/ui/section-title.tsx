import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function SectionTitle({ children, className, action }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center justify-between mb-8", className)}>
      <h2 className="font-mono text-xl md:text-2xl font-bold text-text-primary tracking-wide">
        <span className="text-neon mr-2">&gt;</span>
        {children}
      </h2>
      {action}
    </div>
  );
}
